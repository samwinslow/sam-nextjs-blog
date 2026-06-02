import NextImage from 'next/image'
import type { ImgHTMLAttributes } from 'react'

const Image = ({ src, alt = '', ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
  <div style={{ margin: '0.618rem 0' }} className="next-image-override">
    <NextImage
      {...props as any}
      src={`/img/${src}`}
      alt={alt}
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
