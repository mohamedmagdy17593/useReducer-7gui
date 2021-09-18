import React, { useReducer } from 'react';
import Button from '../modules/common/Button/Button';
import Input from '../modules/common/Input/Input';
import Layout from '../modules/common/Layout/Layout';

type State = {
  count: number;
};

type Action = {
  type: 'INC';
};

function Counter() {
  let [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'INC': {
          return {
            ...state,
            count: state.count + 1,
          };
        }
      }
    },
    { count: 0 },
  );

  let { count } = state;

  return (
    <Layout>
      <div className="flex items-center space-x-3">
        <Input value={count} disabled />
        <Button
          onClick={() => {
            dispatch({ type: 'INC' });
          }}
        >
          Count
        </Button>
      </div>
    </Layout>
  );
}

export default Counter;
