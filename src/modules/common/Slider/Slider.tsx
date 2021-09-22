import React from 'react';
import { Slider as ReachSlider } from '@reach/slider';
import styles from './Slider.module.scss';
import clsx from 'clsx';

interface SliderProps {
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  value: number;
}

function Slider({ min, max, minLabel, maxLabel, value }: SliderProps) {
  return (
    <div className="flex flex-row items-center space-x-2">
      {minLabel && (
        <span className="text-xs text-gray-500 font-bold">{minLabel}</span>
      )}
      <ReachSlider
        className={clsx(styles.slider, 'flex-1')}
        min={min}
        max={max}
        value={value}
      />
      {maxLabel && (
        <span className="text-xs text-gray-500 font-bold">{maxLabel}</span>
      )}
    </div>
  );
}

export default Slider;
