import Link from "next/link"
import React from "react"

export const SlugItem = ({ href, text }: { href?: string, text: string | React.ReactNode }): JSX.Element => (
  <code className="slug-item">
    { href ? (
      <Link
        href={href}
      >
        {text}
      </Link>
    ): <>{text}</>}
  </code>
)