import React, { useEffect, useState } from "react"

interface ColorWrapperProps {
  disabled?: boolean
}

const ColorWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [hue, setHue] = useState(160)
  useEffect(() => {
    const max = 210
    const min = 45
    const interval = setInterval(() => {
      setHue(Math.floor(Math.random() * (max - min) + min))
    }, 3000)
    return () => clearInterval(interval);
  }, [])
  return (
    <span
      style={{
        color: `hsl(${hue}, 80%, 40%)`,
        transition: 'color 3s linear',
      }}
      className="color-wrapper"
    >
      {children}
    </span>
  )
}

export const withColorWrapper = <P extends object>(Component: React.ComponentType<P>) =>
  class WithColorWrapper extends React.Component<P & ColorWrapperProps> {
    render() {
      const { disabled, ...props } = this.props
      const bareComponent = <Component {...props as P} />
      return disabled
        ? bareComponent
        : (
          <ColorWrapper>
            <Component {...props as P} />
          </ColorWrapper>
        )
    }
  }


export default ColorWrapper
