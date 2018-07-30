import React from "react";
import { string, bool, func, oneOf, node } from 'prop-types'

const Button = ({ disabled, className, onClick, text }) => (
  <div disabled={disabled} className={className} onClick={onClick}>
    {text}
  </div>
);

Button.propTypes = {
  text: string.isRequired,
  disabled: bool,
  className: string,
  child: node,
  type: oneOf(['primary', 'default', 'danger']),
  onClick: func,
}

Button.defaultProps = {
  disabled: false,
  type: 'default',
  onClick: () => {},
}

export default Button
