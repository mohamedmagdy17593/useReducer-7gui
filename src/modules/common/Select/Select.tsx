import React from 'react';
import clsx from 'clsx';
import styles from './Select.module.scss';

interface Option {
  label: string;
  value: string | number | readonly string[] | undefined | null;
}

type SelectProps = React.ComponentPropsWithRef<'select'> & {
  options: Option[];
};

function Select({ options, ...rest }: SelectProps) {
  return (
    <select className={clsx(styles.select)} {...rest}>
      {options.map((option, i) => {
        return (
          <option
            key={i}
            // @ts-ignore
            value={option.value}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
