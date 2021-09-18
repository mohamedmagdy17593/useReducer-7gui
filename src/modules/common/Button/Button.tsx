import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'secondary';
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, variant = 'primary', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={clsx(
        styles.btn,
        {
          [styles.primary]: variant === 'primary',
          [styles.secondary]: variant === 'secondary',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
