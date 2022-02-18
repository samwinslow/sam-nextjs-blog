import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

type Props = {
  children: React.ReactNode
} & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const Heading = {
  Md: (props: Props) => (<h3 className="headingMd" {...props} />),
  Lg: (props: Props) => (<h2 className="headingLg" {...props} />),
  Xl: (props: Props) => (<h1 className="headingXl" {...props} />),
  Xxl: (props: Props) => (<h1 className="headingXxl" {...props} />),
}
