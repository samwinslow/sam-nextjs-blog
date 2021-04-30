import { DefaultNode, Graph as NetworkGraph } from '@visx/network'
import { PostMetadata } from '../lib/types'

export type NetworkProps = {
  width: number
  height: number
  concepts: string[]
  posts: PostMetadata[]
}

type NodeType = 'concept' | 'post'

interface CustomNode {
  x: number
  y: number
  id: string
  type: NodeType
  postMetadata?: PostMetadata
}

interface CustomLink {
  source: CustomNode
  target: CustomNode
  dashed?: boolean
}

const graphColors = {
  post: 'hsl(200, 60%, 60%)',
  concept: 'hsl(10, 80%, 60%)',
  background: 'var(--background)',
}

const buildNode = (id: string, type: NodeType, postMetadata?: PostMetadata): CustomNode => {
  const x = Math.floor(Math.random() * 800)
  const y = Math.floor(Math.random() * 600)
  return { x, y, id, type, postMetadata }
}

const buildLinks = (nodes: CustomNode[]): CustomLink[] => {
  let links: CustomLink[] = []
  // const conceptNodes = nodes.filter(({ type }) => type === 'concept')
  const postNodes = nodes.filter(({ type }) => type === 'post')
  const postNodeRecords = Object.fromEntries(
    postNodes.map(node => [node.id, node])
  )
  postNodes.forEach(({ id, postMetadata: { children = [], parents = [] }}) => {
    children.forEach(childId => links.push({
      source: postNodeRecords[id],
      target: postNodeRecords[childId],
      dashed: true
    }))
    parents.forEach(parentId => links.push({
      source: postNodeRecords[id],
      target: postNodeRecords[parentId],
    }))
  })
  return links
}

const buildGraph = ({ concepts, posts }: { concepts: string[]; posts: PostMetadata[] }) => {
  const nodes: CustomNode[] = [
    ...concepts.map(concept => buildNode(concept, 'concept')),
    ...posts.map(data => buildNode(data.id, 'post', data)),
  ]
  const links = buildLinks(nodes)
  return { nodes, links }
}

export default function Graph({
  width,
  height,
  concepts,
  posts
}: NetworkProps) {
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={graphColors.background} />
      <NetworkGraph<CustomLink, CustomNode>
        graph={buildGraph({ concepts, posts })}
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
