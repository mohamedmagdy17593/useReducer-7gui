import React from 'react';
import { useProgressBar } from '@react-aria/progress';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  min: number;
  max: number;
  value: number;
}

function ProgressBar({ min, max, value }: ProgressBarProps) {
  let { progressBarProps } = useProgressBar({
    maxValue: max,
    minValue: min,
    value,
  });

  // Calculate the width of the progress bar as a percentage
  let percentage = (value - min) / (max - min);
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
