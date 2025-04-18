import Link, { LinkProps } from 'next/link'

const ConditionalExternalLink = ({ className = '', ...props }) => {
  if (props.href?.match(/(^https?:\/\/)/g)) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className={`externalLink ${className}`}
      />
    )
  }
  return <Link {...props as LinkProps} />
}

export default ConditionalExternalLink
