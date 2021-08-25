import React from 'react'

const Flex = (props) => {
  const {
    children,
    className,
    alignItems,
    justifyContent,
    flexDirection,
    onClick,
  } = props
  return (
    <div
      className={`${className} ${
        flexDirection ? 'flex-' + flexDirection : ''
      } ${alignItems ? 'align-items-' + alignItems : ''} ${
        justifyContent ? 'justify-content-' + justifyContent : ''
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Flex
