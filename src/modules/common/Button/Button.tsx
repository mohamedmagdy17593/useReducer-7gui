import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'secondary';
  block?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    children,
    variant = 'primary',
    block = false,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={clsx(
        styles.btn,
        {
          // colors
          [styles.primary]: variant === 'primary',
          [styles.secondary]: variant === 'secondary',
          // sizes
          [styles.block]: block,
          // disable
          [styles.disabled]: disabled,
        },
        className,
      )}
      disabled={disabled}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
