import React from 'react';
import Button from '../modules/common/Button/Button';
import Field from '../modules/common/Field/Field';
import Input from '../modules/common/Input/Input';
import Layout from '../modules/common/Layout/Layout';
import Select from '../modules/common/Select/Select';

function CRUD() {
  return (
    <Layout size="lg">
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Field label={'Filter:'}>
              <Input placeholder="filter"></Input>
            </Field>
            <Select
              options={[
                { label: 'Mohamed', value: 'mohamed' },
                { label: 'Mohamed', value: 'mohamed1' },
                { label: 'Mohamed', value: 'mohamed55' },
              ]}
              size={8}
            />
          </div>
          <div>
            <div className="mt-[74px]">
              <Field label={'Name:'}>
                <Input></Input>
              </Field>
              <Field label={'Surname:'}>
                <Input></Input>
              </Field>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Button>Create</Button>
          <Button>Update</Button>
          <Button>delete</Button>
        </div>
      </div>
    </Layout>
  );
}

export default CRUD;
