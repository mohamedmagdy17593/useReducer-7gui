import React from 'react';
import ReactDatePicker from 'react-datepicker';
import clsx from 'clsx';
import styles from './DatePicker.module.css';

export type DateValue = null | Date;

export interface DatePickerProps {
  value: DateValue;
  onChange(date: DateValue): void;
  className?: string;
  disabled?: boolean;
}

function DatePicker({ value, onChange, className, disabled }: DatePickerProps) {
  return (
    <ReactDatePicker
      className={clsx(
        styles.input,
        {
          [styles.disabled]: disabled,
        },
        className,
      )}
      disabled={disabled}
      closeOnScroll={(e) => e.target === document}
      selected={value}
      onChange={(date) => onChange(date as DateValue)}
    />
  );
}

export default DatePicker;
