// time is expressed in `ms`

import React, { useReducer, useEffect } from 'react';
import Button from '../modules/common/Button/Button';
import Layout from '../modules/common/Layout/Layout';
import ProgressBar from '../modules/common/ProgressBar/ProgressBar';
import Slider from '../modules/common/Slider/Slider';

const MAX_DURATION = 30 * 1000;
const INITIAL_DURATION = 10 * 1000;
const INTERVAL = 50;

type State = {
  state: 'running' | 'paused';
  duration: number;
  progress: number;
};

type Action =
  | {
      type: 'PROGRESS_TICK';
    }
  | {
      type: 'PAUSE';
    }
  | {
      type: 'RUN';
    }
  | {
      type: 'CHANGE_DURATION';
      value: number;
    }
  | {
      type: 'RESET';
    };

function Timer() {
  let [{ state, progress, duration }, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (state.state) {
        case 'running': {
          switch (action.type) {
            case 'PROGRESS_TICK': {
              return {
                ...state,
                progress: state.progress + INTERVAL,
              };
            }
            case 'PAUSE': {
              return {
                ...state,
                state: 'paused',
              };
            }
          }
        }
        case 'paused': {
          switch (action.type) {
            case 'RUN': {
              return {
                ...state,
                state: 'running',
              };
            }
          }
        }
        default: {
          switch (action.type) {
            case 'CHANGE_DURATION': {
              return {
                ...state,
                duration: action.value,
              };
            }
            case 'RESET': {
              return {
                state: 'running',
                duration: INITIAL_DURATION,
                progress: 0,
              };
            }
            default: {
              return state;
            }
          }
        }
      }
    },
    {
      state: 'running',
      duration: INITIAL_DURATION,
      progress: 0,
    },
  );

  useEffect(() => {
    if (progress >= duration) {
      dispatch({ type: 'PAUSE' });
    } else {
      dispatch({ type: 'RUN' });
    }
  }, [duration, progress]);

  useEffect(() => {
    // effect when state is running
    if (state === 'running') {
      let id = setInterval(() => {
        dispatch({ type: 'PROGRESS_TICK' });
      }, INTERVAL);
      return () => {
        clearInterval(id);
      };
    }
  }, [state]);

  return (
    <Layout>
      <div className="grid grid-cols-[110px,1fr,60px] items-center gap-4 mb-4">
        <span className="text-right font-bold">Elapsed Time</span>
        <ProgressBar min={0} max={duration} value={progress} />
        <span className="text-gray-500 text-sm">
          {(progress / 1000).toFixed(2)} S
        </span>
      </div>
      <div className="grid grid-cols-[110px,1fr,60px] gap-4 items-center mb-4">
        <span className="text-right font-bold">Duration</span>
        <Slider
          minLabel={'0 S'}
          maxLabel={`${MAX_DURATION / 1000} S`}
          min={0}
          max={MAX_DURATION}
          step={INTERVAL}
          value={duration}
          onChange={(value) => dispatch({ type: 'CHANGE_DURATION', value })}
        />
        <span className="text-gray-500 text-sm">
          {(duration / 1000).toFixed(2)} S
        </span>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Reset</Button>
      </div>
    </Layout>
  );
}

export default Timer;
