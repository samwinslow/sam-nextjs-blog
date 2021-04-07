import NextImage, { ImageProps } from 'next/image'
import styles from './Image.module.css'

const Image = ({ src, ...props }: ImageProps) => (
  <div style={{ margin: '0.618rem 0' }}>
    <NextImage
      {...props}
      src={`/img/${src}`}
      width={800}
      height={495}
      layout="responsive"
      className="responsive"
      quality={75}
      loading="eager"
    />
  </div>
)

export default Image
