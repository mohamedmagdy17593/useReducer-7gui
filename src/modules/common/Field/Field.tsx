import React from 'react';
import { useId } from '@reach/auto-id';
import clsx from 'clsx';

type FieldProps = React.ComponentPropsWithRef<'label'> &
  React.PropsWithChildren<{ label: React.ReactNode }>;

function Field({ label, id, className = '', children, ...rest }: FieldProps) {
  let inputId = useId(id);

  let inputEl = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { id: inputId });
    }
    return child;
  });

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className={clsx(
          'block text-sm font-medium text-gray-700 mb-1',
          className,
        )}
        {...rest}
      >
        {label}
      </label>
      {inputEl}
    </div>
  );
}

export default Field;
