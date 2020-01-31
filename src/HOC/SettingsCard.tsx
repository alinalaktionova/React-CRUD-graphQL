import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../GraphqlOperations/mutationConstants";
import { Field, Form } from "react-final-form";
import InputValidate from "./InputValidateHOC";
import {UserPropInterface} from "../Users/UsersInterfaces";

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const CloseIcon = styled.i`
  position: absolute;
  color: #9ba6b2;
  font-size: 24px;
  right: 0;
  top: 0;
  padding: 10px;
  &:hover {
    color: #20233f;
  }
`;

const SettingsCard = (props: any) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [admin, setAdmin] = useState(props.admin);

  const handleFormSubmit = (formObj: Partial<UserPropInterface>) => {
    updateUser({
      variables: {
        id: props.userId,
        data: formObj
      }
    }).then(() => {
      props.close();
    });
  };

  return (
    <Dialog open={props.open}>
      <Form
        onSubmit={formObj => {
          handleFormSubmit(formObj);
        }}
        initialValues={props.initialValues}
        render={({ handleSubmit }) => (
          <SettingsForm
            onSubmit={(e: React.ChangeEvent<{}>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <InputValidate
              id="name"
              label="Name"
              variant="outlined"
              type="text"
              fieldName="name"
            />
            <InputValidate
              id="login"
              label="Login"
              variant="outlined"
              type="email"
              fieldName="login"
            />
            {props.admin && (
              <Field name="admin" type="checkbox">
                {({ input }) => (
                  <div>
                    <span>admin</span>
                    <input
                      type="checkbox"
                      id="admin"
                      checked={!!admin}
                      onChange={e => setAdmin(e.target.checked)}
                      {...input}
                    />
                  </div>
                )}
              </Field>
            )}
            <Button type="submit" variant="outlined" color="primary">
              Submit
            </Button>
          </SettingsForm>
        )}
      />
      <CloseIcon className="fas fa-times" onClick={props.close} />
    </Dialog>
  );
};

export default SettingsCard;
