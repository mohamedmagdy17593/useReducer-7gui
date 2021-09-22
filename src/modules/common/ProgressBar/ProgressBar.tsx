import React from 'react';
import { useProgressBar } from '@react-aria/progress';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  minValue: number;
  maxValue: number;
  value: number;
}

function ProgressBar({ minValue, maxValue, value }: ProgressBarProps) {
  let { progressBarProps } = useProgressBar({
    minValue,
    maxValue,
    value,
  });

  // Calculate the width of the progress bar as a percentage
  let percentage = (value - minValue) / (maxValue - minValue);
  let barWidth = `${Math.round(percentage * 100)}%`;

  return (
    <div className={styles.progressBar} {...progressBarProps}>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBarArea} style={{ width: barWidth }} />
      </div>
    </div>
  );
}

export default ProgressBar;
