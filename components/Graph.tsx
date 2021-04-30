import { DefaultNode, Graph } from '@visx/network'
import { PostMetadata } from '../lib/types'

export type NetworkProps = {
  width: number
  height: number
  concepts?: string[]
  posts?: PostMetadata[]
}

interface CustomNode {
  x: number
  y: number
  id: string
  type: 'concept' | 'post'
}

interface CustomLink {
  source: CustomNode
  target: CustomNode
  dashed?: boolean
}

const nodes: CustomNode[] = [
  { x: 50, y: 20, id: '1', type: 'post' },
  { x: 200, y: 250, id: '2', type: 'post' },
  { x: 300, y: 40, id: '3', type: 'concept' },
]

const links: CustomLink[] = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[0], dashed: true },
]

const graph = {
  nodes,
  links,
}

const graphColors = {
  post: 'hsl(200, 60%, 60%)',
  concept: 'hsl(80, 60%, 60%)',
  background: 'var(--light)',
}

export default function Example({
  width,
  height,
  concepts,
  posts
}: NetworkProps) {
  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={graphColors.background} />
      <Graph<CustomLink, CustomNode>
        graph={graph}
        top={20}
        left={20}
        nodeComponent={({ node }) =>
          <DefaultNode fill={graphColors[node.type]} />
        }
        linkComponent={({ link: { source, target, dashed } }) => (
          <line
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            strokeWidth={2}
            stroke="#999"
            strokeOpacity={0.6}
            strokeDasharray={dashed ? '8,4' : undefined}
          />
        )}
      />
    </svg>
  )
}
