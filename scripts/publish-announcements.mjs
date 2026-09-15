#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import {
  buildSocialContent,
  loadAnnouncements,
  loadAnnouncementsFromSource,
  platformPublishers,
  SOCIAL_PLATFORMS,
  waitForLiveAnnouncement,
} from './social-publisher-core.mjs'

function argument(name) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : undefined
}

function hasFlag(name) {
  return process.argv.includes(name)
}

function git(args, options = {}) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  }).trim()
}

async function resolveAnnouncements() {
  const current = await loadAnnouncements()
  const slug = argument('--slug')
  if (slug) {
    const announcement = current.find((item) => item.slug === slug)
    if (!announcement) throw new Error(`Duyuru bulunamadı: ${slug}`)
    return [announcement]
  }

  const before = argument('--changed-since')
  if (!before) throw new Error('--slug veya --changed-since parametresi gerekli.')
  if (/^0+$/.test(before)) return [current.toSorted((a, b) => b.addedOrder - a.addedOrder)[0]]

  let previousSource
  try {
    previousSource = git(['show', `${before}:src/lib/announcements.ts`])
  } catch {
    previousSource = await readFile('src/lib/announcements.ts', 'utf8').then(
      () => 'export const announcements = []',
    )
  }
  const previous = await loadAnnouncementsFromSource(previousSource)
  const previousSlugs = new Set(previous.map((item) => item.slug))
  return current.filter((item) => !previousSlugs.has(item.slug))
}

function tagName(platform, slug) {
  return `social/${platform}/${slug}`
}

function hasRemoteTag(tag) {
  try {
    git(['ls-remote', '--exit-code', '--tags', 'origin', `refs/tags/${tag}`])
    return true
  } catch {
    return false
  }
}

function recordPublished(tag) {
  git(['tag', '-f', tag])
  git(['push', 'origin', `refs/tags/${tag}`])
}

const dryRun = hasFlag('--dry-run')
const requestedPlatforms = (argument('--platforms') || SOCIAL_PLATFORMS.join(','))
  .split(',')
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean)
const invalidPlatforms = requestedPlatforms.filter(
  (platform) => !SOCIAL_PLATFORMS.includes(platform),
)
if (invalidPlatforms.length) throw new Error(`Geçersiz platform: ${invalidPlatforms.join(', ')}`)
if (!dryRun && process.env.SOCIAL_PUBLISH_ENABLED !== 'true') {
  throw new Error('Canlı sosyal yayın kapalı. SOCIAL_PUBLISH_ENABLED=true olarak ayarlayın.')
}

const announcements = await resolveAnnouncements()
if (!announcements.length) {
  console.log('Yeni duyuru bulunmadı; yayın yapılmadı.')
  process.exit(0)
}

let failures = 0
for (const announcement of announcements) {
  const content = buildSocialContent(announcement, process.env.SITE_URL || 'https://verimimari.com')
  if (dryRun) {
    console.log(JSON.stringify({ slug: announcement.slug, content }, null, 2))
    continue
  }

  await waitForLiveAnnouncement(content)
  for (const platform of requestedPlatforms) {
    const tag = tagName(platform, announcement.slug)
    if (hasRemoteTag(tag)) {
      console.log(`${platform}: daha önce yayınlandı (${tag}).`)
      continue
    }

    try {
      const result = await platformPublishers[platform](content)
      recordPublished(tag)
      console.log(`${platform}: yayınlandı (${result?.id ?? result?.data?.id ?? 'ok'}).`)
    } catch (error) {
      failures += 1
      console.error(`${platform}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

if (failures) process.exitCode = 1
