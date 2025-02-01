import React from 'react'

interface ShowProps {
  children: React.ReactNode
}

const Show: React.FC<ShowProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Show