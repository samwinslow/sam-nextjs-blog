import Tweet from 'react-tweet-embed'
import Link from 'next/link'
import Image from './Image'

const MDXComponents = {
  a: Link,
  img: Image,
  Tweet
}

export default MDXComponents
