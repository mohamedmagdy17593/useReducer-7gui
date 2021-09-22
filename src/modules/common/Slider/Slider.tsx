import React from 'react';
import { Slider as ReachSlider } from '@reach/slider';
import styles from './Slider.module.scss';

function Slider() {
  return <ReachSlider className={styles.slider} />;
}

export default Slider;
