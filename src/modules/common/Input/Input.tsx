import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

type InputProps = React.ComponentPropsWithRef<'input'> & {};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, disabled, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      className={clsx(
        styles.input,
        {
          [styles.disabled]: disabled,
        },
        className,
      )}
      disabled={disabled}
      {...rest}
    />
  );
});

export default Input;
