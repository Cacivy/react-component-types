import React, { Component } from 'react'
import { string, bool, func, oneOf } from 'prop-types'

class Button extends Component {

  static propTypes = {
    text: string.isRequired,
    disabled: bool,
    className: string,
    type: oneOf(['primary', 'default', 'danger']),
    onClick: func,
  }

  static defaultProps = {
    disabled: false,
    type: 'default',
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
