import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...props }: ImageProps) => (
  <div style={{ margin: '0.618rem 0' }} className="next-image-override">
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
