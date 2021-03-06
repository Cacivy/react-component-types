import React from 'react'

interface ButtonProps {
  text: string
  disabled: boolean
  className: string
  onClick: Function
}

export class Button extends React.Component<ButtonProps> {}
