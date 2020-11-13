import React from 'react';
import cx from 'classnames';

import './FormUtils.scss';

import {
  FormInputProps,
  FormUtilProps,
} from 'src/types/component-props';

export const Label: FormUtilProps = ({
  htmlFor,
  className,
  ...props
}) => {
  return (
    <label
      className={cx('Label', className)}
      htmlFor={htmlFor}
      {...props}
    />
  );
};

export const Input = React.forwardRef<
  HTMLInputElement,
  FormInputProps
>(({ id, className, name, type, ...props }, ref) => (
  <input
    id={id}
    name={name}
    className={cx('Input', className)}
    type={type || 'text'}
    ref={ref}
    {...props}
  />
));

export const Required: FormUtilProps = ({ className, ...props }) => {
  return (
    <span className={cx('Required', className)} {...props}>
      &#42;
    </span>
  );
};

export const Textarea: FormUtilProps = ({ className, ...props }) => {
  return (
    <textarea className={cx('Textarea', className)} {...props} />
  );
};
