import { timingSafeEqual } from 'node:crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 60

type UnknownRecord = Record<string, unknown>

function authorized(request: Request) {
  const expected = process.env.MARKET_DATA_INGEST_SECRET || ''
  const received = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
  if (!expected || !received) return false
  const expectedBuffer = Buffer.from(expected)
  const receivedBuffer = Buffer.from(received)
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  )
}

function record(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as UnknownRecord) : {}
}

function text(value: unknown, max = 500) {
  const normalized = typeof value === 'string' ? value.trim() : ''
  return normalized ? normalized.slice(0, max) : null
}

function number(value: unknown) {
  if (value === null || value === undefined || value === '') return null
  const normalized = Number(value)
  return Number.isFinite(normalized) ? normalized : null
}

function integer(value: unknown) {
  const normalized = number(value)
  return normalized !== null && Number.isInteger(normalized) ? normalized : null
}

function boolean(value: unknown) {
  return typeof value === 'boolean' ? value : null
}

function array(value: unknown) {
  return Array.isArray(value) ? value : []
}

function validDate(value: unknown) {
  const normalized = text(value, 10)
  return normalized && /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null
}

function validTimestamp(value: unknown) {
  const normalized = text(value, 40)
  return normalized && !Number.isNaN(Date.parse(normalized)) ? normalized : null
}

function chunks<T>(items: T[], size: number) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  )
}

function uniqueBy<T>(items: T[], key: (item: T) => string) {
  return Array.from(new Map(items.map((item) => [key(item), item])).values())
}

function invalid(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status })
}

export async function POST(request: Request) {
  if (!authorized(request)) return invalid('unauthorized', 401)

  const body = record(await request.json().catch(() => null))
  const action = text(body.action, 24)
  const database = createServiceClient()
  if (!database) return invalid('database-not-configured', 503)

  if (action === 'start') {
    const summary = record(body.summary)
    const observedDate = validDate(summary.date)
    const capturedAt = validTimestamp(summary.generatedAt)
    const catalogGeneratedAt = validTimestamp(summary.catalogGeneratedAt)
    const catalogRunId = text(summary.catalogRunId, 120) || catalogGeneratedAt
    const totalCategoryPaths = integer(summary.totalCategoryPaths)
    const totalCategories = integer(summary.totalCategories)
    const coveredCategories = integer(summary.coveredCategories)
    const uniqueProducts = integer(summary.uniqueProducts)
    const rankingMemberships = integer(summary.rankingMemberships)
    const categoriesWithProducts = integer(summary.categoriesWithProducts)
    const emptyCategories = integer(summary.emptyCategories)
    const failedCategories = integer(summary.failedCategories)
    const coverage = number(summary.coverage)

    if (
      summary.status !== 'PASS' ||
      !observedDate ||
      !capturedAt ||
      !catalogGeneratedAt ||
      !catalogRunId ||
      totalCategoryPaths === null ||
      totalCategoryPaths < 1 ||
      totalCategories === null ||
      totalCategories < 1 ||
      coveredCategories === null ||
      coveredCategories < 1 ||
      uniqueProducts === null ||
      uniqueProducts < 1 ||
      rankingMemberships === null ||
      rankingMemberships < 1 ||
      categoriesWithProducts === null ||
      categoriesWithProducts < 1 ||
      emptyCategories === null ||
      emptyCategories < 0 ||
      failedCategories === null ||
      failedCategories < 0 ||
      coverage === null ||
      coverage < 95
    ) {
      return invalid('quality-gate-rejected', 422)
    }

    const { error: deleteError } = await database
      .from('market_taxonomy_runs')
      .delete()
      .eq('marketplace', 'trendyol')
      .eq('observed_date', observedDate)
    if (deleteError) {
      console.error('Taxonomy run reset error:', deleteError.message)
      return invalid('run-reset-failed', 500)
    }

    const { data: run, error } = await database
      .from('market_taxonomy_runs')
      .insert({
        marketplace: 'trendyol',
        observed_date: observedDate,
        captured_at: capturedAt,
        catalog_run_id: catalogRunId,
        catalog_generated_at: catalogGeneratedAt,
        status: 'LOADING',
        total_category_paths: totalCategoryPaths,
        total_categories: totalCategories,
        covered_categories: coveredCategories,
        coverage,
        unique_products: uniqueProducts,
        ranking_memberships: rankingMemberships,
        categories_with_products: categoriesWithProducts,
        empty_categories: emptyCategories,
        failed_categories: failedCategories,
        roots: array(summary.roots),
        levels: record(summary.levels),
        source_commit: text(body.sourceCommit, 80),
      })
      .select('id')
      .single()
    if (error || !run?.id) {
      console.error('Taxonomy run start error:', error?.message || 'missing-run-id')
      return invalid('run-start-failed', 500)
    }
    return NextResponse.json({ ok: true, runId: run.id })
  }

  const runId = text(body.runId, 80)
  const rows = array(body.rows)
  if (!runId || rows.length < 1 || rows.length > 1000) return invalid('invalid-batch')

  const { data: run, error: runError } = await database
    .from('market_taxonomy_runs')
    .select(
      'id,observed_date,captured_at,catalog_generated_at,status,total_category_paths,total_categories,unique_products,ranking_memberships',
    )
    .eq('id', runId)
    .eq('status', 'LOADING')
    .maybeSingle()
  if (runError || !run) return invalid('loading-run-not-found', 404)

  if (action === 'categories') {
    const categoryRows = rows
      .map((value) => record(value))
      .map((row) => ({
        marketplace: 'trendyol',
        category_id: integer(row.categoryId),
        name: text(row.name, 240),
        slug: text(row.slug, 240),
        level: integer(row.level),
        has_children: Boolean(row.hasChildren),
        child_count: integer(row.childCount) || 0,
        root_id: integer(row.rootId),
        root_name: text(row.rootName, 240),
        source_url: text(row.url, 1000),
        first_seen_at: run.catalog_generated_at,
        last_seen_at: run.catalog_generated_at,
      }))
      .filter(
        (row) =>
          row.category_id !== null &&
          row.name &&
          row.slug &&
          row.level !== null &&
          row.root_id !== null &&
          row.root_name &&
          row.source_url,
      )
    if (!categoryRows.length) return invalid('invalid-category-batch')
    const categories = uniqueBy(categoryRows, (row) => String(row.category_id))
    const { error: categoryError } = await database
      .from('market_taxonomy_categories')
      .upsert(categories, { onConflict: 'marketplace,category_id' })
    if (categoryError) {
      console.error('Taxonomy category ingest error:', categoryError.message)
      return invalid('category-upsert-failed', 500)
    }
    const pathRows = rows
      .map((value) => record(value))
      .map((row) => {
        const pathIds = array(row.pathIds)
          .map(integer)
          .filter((value): value is number => value !== null)
        const categoryId = integer(row.categoryId)
        return {
          marketplace: 'trendyol',
          path_key: pathIds.length ? pathIds.join('/') : String(categoryId || ''),
          category_id: categoryId,
          parent_id: integer(row.parentId),
          level: integer(row.level),
          root_id: integer(row.rootId),
          path: text(row.path, 1000),
          path_ids: pathIds,
          path_slug: text(row.pathSlug, 1000),
          source_url: text(row.url, 1000),
          last_seen_at: run.catalog_generated_at,
        }
      })
      .filter(
        (row) =>
          row.path_key &&
          row.category_id !== null &&
          row.level !== null &&
          row.root_id !== null &&
          row.path &&
          row.path_slug &&
          row.source_url,
      )
    const { error: pathError } = await database
      .from('market_taxonomy_category_paths')
      .upsert(pathRows, { onConflict: 'marketplace,path_key' })
    if (pathError) {
      console.error('Taxonomy category path ingest error:', pathError.message)
      return invalid('category-path-upsert-failed', 500)
    }
    return NextResponse.json({ ok: true, accepted: pathRows.length })
  }

  if (action === 'products') {
    const products = rows
      .map((value) => record(value))
      .map((row) => ({
        marketplace: 'trendyol',
        product_key: text(row.productKey, 160),
        product_id: text(row.productId, 80),
        merchant_id: text(row.merchantId, 80),
        title: text(row.name, 600),
        brand: text(row.brand, 240),
        canonical_url: text(row.url, 1200),
        image_url: text(row.imageUrl, 1200),
        category_name: text(row.categoryName, 240),
        first_seen_at: run.captured_at,
        last_seen_at: run.captured_at,
      }))
      .filter((row) => row.product_key && row.product_id && row.title && row.canonical_url)
    if (!products.length) return invalid('invalid-product-batch')
    const { error: productError } = await database
      .from('market_taxonomy_products')
      .upsert(products, { onConflict: 'marketplace,product_key' })
    if (productError) {
      console.error('Taxonomy product ingest error:', productError.message)
      return invalid('product-upsert-failed', 500)
    }
    const observations = rows
      .map((value) => record(value))
      .map((row) => ({
        run_id: run.id,
        marketplace: 'trendyol',
        product_key: text(row.productKey, 160),
        observed_date: run.observed_date,
        captured_at: run.captured_at,
        price: number(row.price),
        original_price: number(row.originalPrice),
        currency: text(row.currency, 8) || 'TRY',
        in_stock: boolean(row.inStock),
        running_out: boolean(row.runningOut),
        rating: number(row.rating),
        rating_count: integer(row.ratingCount),
        promotions: array(row.promotions)
          .map((item) => String(item).slice(0, 300))
          .slice(0, 20),
        fast_delivery: boolean(row.fastDelivery),
        rush_delivery_hours: integer(row.rushDeliveryHours),
      }))
      .filter((row) => row.product_key)
    const { error: observationError } = await database
      .from('market_taxonomy_product_observations')
      .upsert(observations, { onConflict: 'run_id,product_key' })
    if (observationError) {
      console.error('Taxonomy product observation ingest error:', observationError.message)
      return invalid('product-observation-upsert-failed', 500)
    }
    return NextResponse.json({ ok: true, accepted: observations.length })
  }

  if (action === 'rankings') {
    const rankings = rows
      .map((value) => record(value))
      .map((row) => ({
        run_id: run.id,
        marketplace: 'trendyol',
        observed_date: run.observed_date,
        category_id: integer(row.categoryId),
        rank: integer(row.rank),
        product_key: text(row.productKey, 160),
      }))
      .filter(
        (row) => row.category_id !== null && row.rank !== null && row.rank > 0 && row.product_key,
      )
    if (!rankings.length) return invalid('invalid-ranking-batch')
    for (const batch of chunks(rankings, 500)) {
      const { error } = await database
        .from('market_taxonomy_rankings')
        .upsert(batch, { onConflict: 'run_id,category_id,rank,product_key' })
      if (error) {
        console.error('Taxonomy ranking ingest error:', error.message)
        return invalid('ranking-upsert-failed', 500)
      }
    }
    return NextResponse.json({ ok: true, accepted: rankings.length })
  }

  if (action === 'complete') {
    return invalid('invalid-complete-payload')
  }

  return invalid('unknown-action')
}

export async function PUT(request: Request) {
  if (!authorized(request)) return invalid('unauthorized', 401)
  const body = record(await request.json().catch(() => null))
  const runId = text(body.runId, 80)
  if (!runId || body.action !== 'complete') return invalid('invalid-payload')
  const database = createServiceClient()
  if (!database) return invalid('database-not-configured', 503)

  const { data: run, error: runError } = await database
    .from('market_taxonomy_runs')
    .select(
      'id,total_category_paths,total_categories,unique_products,ranking_memberships,catalog_generated_at,status',
    )
    .eq('id', runId)
    .maybeSingle()
  if (runError || !run || run.status !== 'LOADING') return invalid('loading-run-not-found', 404)

  const [categories, paths, products, rankings] = await Promise.all([
    database.from('market_taxonomy_categories').select('*', { count: 'exact', head: true }),
    database
      .from('market_taxonomy_category_paths')
      .select('*', { count: 'exact', head: true })
      .eq('last_seen_at', run.catalog_generated_at),
    database
      .from('market_taxonomy_product_observations')
      .select('*', { count: 'exact', head: true })
      .eq('run_id', runId),
    database
      .from('market_taxonomy_rankings')
      .select('*', { count: 'exact', head: true })
      .eq('run_id', runId),
  ])
  const queryError = categories.error || paths.error || products.error || rankings.error
  if (queryError) {
    console.error('Taxonomy completion count error:', queryError.message)
    return invalid('completion-count-failed', 500)
  }
  const counts = {
    categories: categories.count || 0,
    paths: paths.count || 0,
    products: products.count || 0,
    rankings: rankings.count || 0,
  }
  if (
    counts.categories < run.total_categories ||
    counts.paths !== run.total_category_paths ||
    counts.products !== run.unique_products ||
    counts.rankings !== run.ranking_memberships
  ) {
    console.error('Taxonomy completion mismatch:', { expected: run, actual: counts })
    return NextResponse.json(
      { ok: false, error: 'completion-count-mismatch', counts },
      { status: 422 },
    )
  }
  const { error: completeError } = await database
    .from('market_taxonomy_runs')
    .update({ status: 'PASS', completed_at: new Date().toISOString() })
    .eq('id', runId)
    .eq('status', 'LOADING')
  if (completeError) {
    console.error('Taxonomy completion error:', completeError.message)
    return invalid('run-completion-failed', 500)
  }

  revalidateTag('trendyol-market')
  revalidateTag('trendyol-taxonomy')
  revalidatePath('/pazar-nabzi/trendyol')
  return NextResponse.json({ ok: true, runId, counts })
}
