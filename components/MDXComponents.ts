import Tweet from 'react-tweet-embed'
import ColoredLink from './ColoredLink'
import Image from './Image'

const MDXComponents = {
  a: ColoredLink,
  img: Image,
  Tweet
}

export default MDXComponents
