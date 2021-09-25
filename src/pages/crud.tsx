import React, { useReducer } from 'react';
import Button from '../modules/common/Button/Button';
import Field from '../modules/common/Field/Field';
import Input from '../modules/common/Input/Input';
import Layout from '../modules/common/Layout/Layout';
import Select from '../modules/common/Select/Select';

interface User {
  id: string;
  name: string;
  surname: string;
}

type State = {
  users: User[];
  name: string;
  surname: string;
  filter: string;
  selectedUser: null | string;
};

type Action =
  | {
      type: 'UPDATE_NAME';
      value: string;
    }
  | {
      type: 'UPDATE_SURNAME';
      value: string;
    }
  | {
      type: 'FILTER';
      value: string;
    }
  | {
      type: 'CREATE';
    }
  | {
      type: 'CHANGE_SELECTED_USER';
      value: string;
    }
  | {
      type: 'DELETE';
    }
  | {
      type: 'UPDATE';
    };

function CRUD() {
  let [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'UPDATE_NAME': {
          return {
            ...state,
            name: action.value,
          };
        }
        case 'UPDATE_SURNAME': {
          return {
            ...state,
            surname: action.value,
          };
        }
        case 'CREATE': {
          if (!(state.name && state.surname)) {
            return state;
          }
          return {
            ...state,
            users: [
              ...state.users,
              {
                id: String(Date.now()),
                name: state.name,
                surname: state.surname,
              },
            ],
            name: '',
            surname: '',
          };
        }
        case 'CHANGE_SELECTED_USER': {
          let user = state.users.find((user) => user.id === action.value);
          return {
            ...state,
            selectedUser: action.value ? action.value : null,
            name: user ? user.name : '',
            surname: user ? user.surname : '',
          };
        }
        case 'UPDATE': {
          if (!(state.name && state.surname)) {
            return state;
          }
          return {
            ...state,
            users: state.users.map((user) => {
              if (user.id === state.selectedUser) {
                return {
                  ...user,
                  name: state.name,
                  surname: state.surname,
                };
              }
              return user;
            }),
          };
        }
        case 'DELETE': {
          return {
            ...state,
            users: state.users.filter((user) => user.id !== state.selectedUser),
            selectedUser: null,
            name: '',
            surname: '',
          };
        }
        case 'FILTER': {
          return {
            ...state,
            filter: action.value,
            selectedUser: null,
            name: '',
            surname: '',
          };
        }
      }
    },
    {
      users: [],
      name: '',
      surname: '',
      filter: '',
      selectedUser: null,
    },
  );

  let { name, surname, filter, users, selectedUser } = state;

  let filteredUsers = users.filter((user) =>
    filter
      ? user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.surname.toLowerCase().includes(filter.toLowerCase())
      : true,
  );

  return (
    <Layout size="lg">
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Field label={'Filter:'}>
              <Input
                value={filter}
                onChange={(e) => {
                  dispatch({ type: 'FILTER', value: e.target.value.trim() });
                }}
              ></Input>
            </Field>
            <Select
              options={[
                { label: '--', value: '' },
                ...filteredUsers.map((user) => ({
                  label: `${user.name}, ${user.surname}`,
                  value: user.id,
                })),
              ]}
              size={8}
              value={selectedUser ? selectedUser : ''}
              onChange={(e) =>
                dispatch({
                  type: 'CHANGE_SELECTED_USER',
                  value: e.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="mt-[74px]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (selectedUser) {
                    dispatch({ type: 'UPDATE' });
                  } else {
                    dispatch({ type: 'CREATE' });
                  }
                }}
              >
                <Field label={'Name:'}>
                  <Input
                    value={name}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_NAME',
                        value: e.target.value.trim(),
                      })
                    }
                  ></Input>
                </Field>
                <Field label={'Surname:'}>
                  <Input
                    value={surname}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_SURNAME',
                        value: e.target.value.trim(),
                      })
                    }
                  ></Input>
                </Field>
                {/* hidden input for submitting */}
                <button type="submit" hidden></button>
              </form>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Button
            onClick={() => dispatch({ type: 'CREATE' })}
            disabled={!!selectedUser || !name || !surname}
          >
            Create
          </Button>
          <Button
            onClick={() => dispatch({ type: 'UPDATE' })}
            disabled={!selectedUser || !name || !surname}
          >
            Update
          </Button>
          <Button
            disabled={!selectedUser || !name || !surname}
            onClick={() => dispatch({ type: 'DELETE' })}
          >
            Delete
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default CRUD;
