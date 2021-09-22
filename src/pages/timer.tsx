import React from 'react';
import Layout from '../modules/common/Layout/Layout';
import ProgressBar from '../modules/common/ProgressBar/ProgressBar';
import Slider from '../modules/common/Slider/Slider';

function Timer() {
  return (
    <Layout>
      <div className="grid grid-cols-[110px,1fr,50px] items-center gap-4 mb-4">
        <span className="text-right font-bold">Elapsed Time</span>
        <ProgressBar minValue={0} maxValue={100} value={20} />
        <span className="text-gray-500 text-sm">5.00 S</span>
      </div>

      <div className="grid grid-cols-[110px,1fr,50px] gap-4 items-center">
        <span className="text-right font-bold">Duration</span>
        <Slider />
        <span className="text-gray-500 text-sm">5.00 S</span>
      </div>
    </Layout>
  );
}

export default Timer;
