import Link from "next/link"
import React from "react"

export const SlugItem = ({ href, text }: { href?: string, text: string | React.ReactNode }): JSX.Element => (
  <span className="slug-item">
    { href ? (
      <Link
        href={href}
        style={{ textDecoration: 'none' }}
      >
        {text}
      </Link>
    ): <>{text}</>}
  </span>
)