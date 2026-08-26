import aiLocalLabRagDocuments from '../../../data/external/ai-local-lab/processed/rag-documents.json'

export type AiLocalLabRagDocument = {
  id: string
  kind: 'external-ai-benchmark'
  title: string
  excerpt: string
  slug: string
  meta: {
    source: string
    sourceRecordUrl: string
    license: string
    attribution: string
    methodologyUrl: string
    datasetVersion: string
    measuredAt: string
    deviceId: string
    modelId: string
    quantization: string
    evidence: 'measured'
  }
}

export function getAiLocalLabRagDocuments(): AiLocalLabRagDocument[] {
  return aiLocalLabRagDocuments as AiLocalLabRagDocument[]
}
