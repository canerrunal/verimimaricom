'use client'

import { useMemo, useState } from 'react'

function groupColor(group: string) {
  switch (group) {
    case 'AI':
      return '#2563eb'
    case 'Data':
      return '#7c3aed'
    case 'Web':
      return '#059669'
    case 'Growth':
      return '#d97706'
    default:
      return '#52525b'
  }
}

function maturityColor(maturity: string) {
  const m = String(maturity || '').toLowerCase()
  if (m === 'evergreen') return '#16a34a'
  if (m === 'growing') return '#2563eb'
  return '#d97706'
}

type GraphNode = {
  id: string
  label: string
  slug?: string
  group?: string
  weight?: number
  maturity?: string
  recency?: string
}

type GraphEdge = {
  source: string
  target: string
  relationType?: string
  strength?: number
}

type KnowledgeGraphProps = {
  graph?: {
    nodes?: GraphNode[]
    edges?: GraphEdge[]
  }
}

export default function KnowledgeGraph({ graph }: KnowledgeGraphProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [topicFilter, setTopicFilter] = useState('all')
  const [maturityFilter, setMaturityFilter] = useState('all')
  const [recencyFilter, setRecencyFilter] = useState('all')

  const availableTopics = useMemo(() => {
    const groups = new Set((graph?.nodes || []).map((n: any) => String(n.group || 'General')))
    return ['all', ...Array.from(groups)]
  }, [graph])

  const layout = useMemo(() => {
    const width = 900
    const height = 420
    const cx = width / 2
    const cy = height / 2
    const radius = Math.min(width, height) * 0.34
    const rawNodes = graph?.nodes || []
    const rawEdges = graph?.edges || []

    const nodes = rawNodes.filter((node: any) => {
      const topicOk = topicFilter === 'all' || String(node.group || '') === topicFilter
      const maturityOk = maturityFilter === 'all' || String(node.maturity || '') === maturityFilter
      const recencyOk = recencyFilter === 'all' || String(node.recency || 'archive') === recencyFilter
      return topicOk && maturityOk && recencyOk
    })

    const nodeIdSet = new Set(nodes.map((n: any) => n.id))
    const edges = rawEdges.filter(
      (edge: any) => nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target),
    )

    const index = new Map<string, number>()
    nodes.forEach((n: any, i: number) => index.set(n.id, i))

    const points = nodes.map((node: any, i: number) => {
      const t = (i / Math.max(1, nodes.length)) * Math.PI * 2
      const localR = radius + ((node.weight || 1) % 4) * 7
      return {
        ...node,
        x: cx + Math.cos(t) * localR,
        y: cy + Math.sin(t) * localR,
      }
    })

    const lines = edges
      .map((edge: any) => {
        const si = index.get(edge.source)
        const ti = index.get(edge.target)
        if (si === undefined || ti === undefined) return null
        return {
          ...edge,
          sourceNode: points[si],
          targetNode: points[ti],
        }
      })
      .filter(Boolean)

    return { width, height, points, lines }
  }, [graph, topicFilter, maturityFilter, recencyFilter])

  return (
    <div className="garden-graph" aria-label="Digital Garden knowledge graph">
      <div className="garden-filters" aria-label="Bilgi grafigi filtreleri">
        <label>
          Topic
          <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
            {availableTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic === 'all' ? 'All Topics' : topic}
              </option>
            ))}
          </select>
        </label>

        <label>
          Maturity
          <select value={maturityFilter} onChange={(e) => setMaturityFilter(e.target.value)}>
            <option value="all">All Levels</option>
            <option value="seed">Seed</option>
            <option value="growing">Growing</option>
            <option value="evergreen">Evergreen</option>
          </select>
        </label>

        <label>
          Recency
          <select value={recencyFilter} onChange={(e) => setRecencyFilter(e.target.value)}>
            <option value="all">All Time</option>
            <option value="recent">Recent</option>
            <option value="mid">Mid</option>
            <option value="archive">Archive</option>
          </select>
        </label>
      </div>

      <svg viewBox={`0 0 ${layout.width} ${layout.height}`} role="img" aria-label="Blog ve notlar arasi iliski agi">
        {layout.lines.map((line: any, idx: number) => {
          const active = activeNode && (line.source === activeNode || line.target === activeNode)
          return (
            <line
              key={`${line.source}-${line.target}-${idx}`}
              x1={line.sourceNode.x}
              y1={line.sourceNode.y}
              x2={line.targetNode.x}
              y2={line.targetNode.y}
              stroke={active ? '#18181b' : '#d4d4d8'}
              strokeWidth={Math.max(1, Number(line.strength || 0.3) * 2)}
            />
          )
        })}

        {layout.points.map((node: any) => {
          const active = activeNode === node.id
          const fill = groupColor(node.group)
          const ring = maturityColor(node.maturity)
          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r={active ? 14 : 10}
                fill={fill}
                stroke="white"
                strokeWidth="1.5"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => (window.location.href = node.slug ? `/blog/${node.slug}` : '#')}
                style={{ cursor: 'pointer' }}
              />
              <circle r={active ? 17 : 13} fill="none" stroke={ring} strokeWidth="1.2" opacity="0.5" />
              <text x="14" y="4" fill="#18181b" fontSize="11" fontFamily="JetBrains Mono, monospace" pointerEvents="none">
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
