import React from 'react';
import cx from 'classnames';

import { ButtonProps } from 'src/types/component-props.d';

import './Button.css';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, className, children, onClick }, ref) => (
    <button
      type={type}
      className={cx('Button', className)}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  ),
);

export default Button;
