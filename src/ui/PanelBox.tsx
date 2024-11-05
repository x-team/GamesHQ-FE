import React from 'react'

interface IProps {
  children: React.ReactNode
  className?: string
}

function PanelBox(props: IProps) {
  return (
    <span
      className={`p-6 bg-white rounded-xl border border-gray-200 flex flex-col ${props.className}`}
    >
      {props.children}
    </span>
  )
}

export default PanelBox
