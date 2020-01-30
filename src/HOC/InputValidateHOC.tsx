import React from 'react';
import { Field } from 'react-final-form';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  fieldName: string;
  id: string;
  label: string;
  variant: string;
  type: string;
  validate?: any;
}

const Input = styled.div`
  margin: 12px 0px;
`;

const InputError = styled.div`
  margin-bottom: -10px;
  padding-top: 5px;
  font-size: 12px;
  color: #d73c2a;
  text-align: center;
`;

const InputValidate: React.FC<Props> = ({ fieldName, id, label, type }) => (
  <Input>
    <Field 
      name={ fieldName }
    >
      {({ input, meta }) => (
        <div>
          <TextField
            variant="outlined" 
            id={id}
            label={ label }
            type={type}
            { ...input }
          />
          {
            meta.error && 
            meta.touched &&
            <InputError>{meta.error}</InputError>
          }
        </div>
      )}
    </Field>
  </Input>
);

export default InputValidate;