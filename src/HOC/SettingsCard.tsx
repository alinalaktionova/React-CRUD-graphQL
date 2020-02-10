import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Dialog } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../GraphqlOperations/mutationConstants";
import { Field, Form } from "react-final-form";
import InputValidate from "./InputValidateHOC";
import { UserPropInterface } from "../Users/UsersInterfaces";
import {CloseIcon, SettingsForm} from "./SettingCard.style";

interface SettingsCardProps {
    open: boolean,
    userId: number,
    admin?: boolean,
    initialValues: any,
    close(): void
}

const SettingsCard = (props: SettingsCardProps) => {
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
