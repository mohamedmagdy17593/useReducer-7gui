import React, { useReducer } from 'react';
import Input from '../modules/common/Input/Input';
import Layout from '../modules/common/Layout/Layout';

type State = {
  C: string;
  F: string;
};

type Action =
  | {
      type: 'C';
      value: string;
    }
  | {
      type: 'F';
      value: string;
    };

const baseState = {
  C: '',
  F: '',
};

function TemperatureConverter() {
  let [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'C': {
        let C = action.value;
        if (!C) {
          return baseState;
        }
        return {
          C,
          F: round(+C * (9 / 5) + 32),
        };
      }
      case 'F': {
        let F = action.value;
        if (!F) {
          return baseState;
        }
        return {
          C: round((+F - 32) * (5 / 9)),
          F,
        };
      }
    }
  }, baseState);

  let { C, F } = state;

  return (
    <Layout>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={C}
            onChange={(e) => {
              dispatch({
                type: 'C',
                value: e.target.value,
              });
            }}
          ></Input>
          <span className="flex-shrink-0">&deg; C</span>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={F}
            onChange={(e) => {
              dispatch({
                type: 'F',
                value: e.target.value,
              });
            }}
          ></Input>
          <span className="flex-shrink-0">&deg; F</span>
        </div>
      </div>
    </Layout>
  );
}

function round(value: number): string {
  return String(+value.toFixed(2));
}

export default TemperatureConverter;
