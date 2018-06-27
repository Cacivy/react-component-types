import React from "react";
import { string, bool, func } from 'prop-types'

const Button = ({ disabled, className, onClick, text }) => (
  <div disabled={disabled} className={className} onClick={onClick}>
    {text}
  </div>
);

Button.propTypes = {
  text: string.isRequired,
  disabled: bool,
  className: string,
  onClick: func,
}

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
}

export default Button
