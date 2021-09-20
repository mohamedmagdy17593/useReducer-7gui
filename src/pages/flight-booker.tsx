import React, { useReducer, useState } from 'react';
import Button from '../modules/common/Button/Button';
import DatePicker from '../modules/common/DatePicker/DatePicker';
import Layout from '../modules/common/Layout/Layout';
import Select from '../modules/common/Select/Select';
import { isAfter } from 'date-fns';

type FlightTypes = 'one-way' | 'return';

type State = {
  type: FlightTypes;
  start: Date | null;
  end: Date | null;
  booked: boolean;
};

type Action =
  | {
      type: 'change-type';
      value: FlightTypes;
    }
  | {
      type: 'change-start';
      value: Date | null;
    }
  | {
      type: 'change-end';
      value: Date | null;
    }
  | {
      type: 'book';
    }
  | {
      type: 'reset';
    };

function FlightBooker() {
  let [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      if (state.booked) {
        switch (action.type) {
          case 'reset': {
            return {
              ...state,
              booked: false,
            };
          }
          default: {
            return state;
          }
        }
      } else {
        switch (action.type) {
          case 'change-type': {
            return { ...state, type: action.value };
          }
          case 'change-start': {
            return { ...state, start: action.value };
          }
          case 'change-end': {
            return { ...state, end: action.value };
          }
          case 'book': {
            return { ...state, booked: true };
          }
          default: {
            return state;
          }
        }
      }
    },
    {
      type: 'one-way',
      start: new Date(),
      end: new Date(),
      booked: false,
    },
  );

  let { type, start, end, booked } = state;

  let endIsDisabled = type === 'one-way';
  let bookIsDisabled =
    !start || !end || (type === 'return' && isAfter(start, end));

  return (
    <Layout size="xs">
      <div className="mb-2">
        <Select
          value={type}
          onChange={(e) =>
            dispatch({
              type: 'change-type',
              value: e.target.value as FlightTypes,
            })
          }
          options={[
            { label: 'One-Way flight', value: 'one-way' },
            { label: 'Return flight', value: 'return' },
          ]}
        />
      </div>

      <div className="mb-2">
        <DatePicker
          value={start}
          onChange={(date) =>
            dispatch({
              type: 'change-start',
              value: date,
            })
          }
        />
      </div>

      <div className="mb-2">
        <DatePicker
          disabled={endIsDisabled}
          value={end}
          onChange={(date) =>
            dispatch({
              type: 'change-end',
              value: date,
            })
          }
        />
      </div>

      {booked ? (
        <Button
          block
          variant="secondary"
          onClick={() => dispatch({ type: 'reset' })}
        >
          Reset
        </Button>
      ) : (
        <Button
          block
          disabled={bookIsDisabled}
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: 'book' });
          }}
        >
          Booked
        </Button>
      )}
    </Layout>
  );
}

export default FlightBooker;
