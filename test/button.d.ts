import React from 'react'

interface ButtonProps {
  text: string
  disabled: boolean
  className: string
  child: string | number | Array<any> | Element
  type: 'primary' | 'default' | 'danger'
  onClick: Function
}

export class Button extends React.Component<ButtonProps> {}
