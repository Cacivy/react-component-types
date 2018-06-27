import React, { Component } from 'react'
import { string, bool, func } from 'prop-types'

class Button extends Component {

  static propTypes = {
    text: string.isRequired,
    disabled: bool,
    className: string,
    onClick: func,
  }

  static defaultProps = {
    disabled: false,
    onClick: () => {},
  }

  render () {
    const { disabled, className, onClick, text } = this.props
    return (
      <div disabled={disabled} className={className} onClick={onClick}>
        {text}
      </div>
    )
  }
}

export default Button
