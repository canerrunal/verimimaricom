export type FeedbackSubmission = {
  toolName: string
  vote: 'yes' | 'no'
  comment: string
  pagePath: string
}

export type ContactSubmission = {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
  pagePath: string
  website: string
}

type ParseResult<T> = { ok: true; data: T } | { ok: false; error: string }

function cleanString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function cleanSingleLine(value: unknown, maxLength: number) {
  return cleanString(value, maxLength).replace(/\s+/g, ' ')
}

export function parseFeedbackSubmission(input: unknown): ParseResult<FeedbackSubmission> {
  if (!input || typeof input !== 'object') return { ok: false, error: 'invalid-payload' }

  const body = input as Record<string, unknown>
  const toolName = cleanSingleLine(body.toolName, 160)
  const vote = body.vote === 'yes' || body.vote === 'no' ? body.vote : null

  if (!toolName) return { ok: false, error: 'tool-required' }
  if (!vote) return { ok: false, error: 'vote-required' }

  return {
    ok: true,
    data: {
      toolName,
      vote,
      comment: cleanString(body.comment, 2_000),
      pagePath: cleanSingleLine(body.pagePath, 500) || '/',
    },
  }
}

export function parseContactSubmission(input: unknown): ParseResult<ContactSubmission> {
  if (!input || typeof input !== 'object') return { ok: false, error: 'invalid-payload' }

  const body = input as Record<string, unknown>
  const name = cleanSingleLine(body.name, 120)
  const email = cleanSingleLine(body.email, 254).toLowerCase()
  const projectType = cleanSingleLine(body.projectType, 160)
  const budget = cleanSingleLine(body.budget, 100)

  if (!name) return { ok: false, error: 'name-required' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'valid-email-required' }
  }
  if (!projectType) return { ok: false, error: 'project-type-required' }
  if (!budget) return { ok: false, error: 'budget-required' }

  return {
    ok: true,
    data: {
      name,
      email,
      projectType,
      budget,
      message: cleanString(body.message, 5_000),
      pagePath: cleanSingleLine(body.pagePath, 500) || '/is-birligi',
      website: cleanSingleLine(body.website, 300),
    },
  }
}
