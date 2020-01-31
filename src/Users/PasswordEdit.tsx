import React from "react";
import Button from "@material-ui/core/Button";
import { SettingsForm } from "../HOC/SettingsCard";
import { useMutation } from "@apollo/client";
import { Form } from "react-final-form";
import InputValidate from "../HOC/InputValidateHOC";
import { UPDATE_PASSWORD } from "../GraphqlOperations/mutationConstants";
import {PasswordEditInterface} from "./UsersInterfaces";

const initialValues = {
  oldPass: "",
  newPass: "",
  confirmPass: ""
};

const PasswordEdit = () => {
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const handleFormSubmit = (formObj: PasswordEditInterface) => {
      updatePassword({
          variables: {oldPassword: formObj.oldPass, newPassword: formObj.newPass}
      });
  };
  return (
    <Form
      onSubmit={formObj => {
        handleFormSubmit(formObj);
      }}
      initialValues={initialValues}
      validate={values => {
        const errors: any = {};
        if (values.confirmPass !== values.newPass) {
          errors.confirmPass = "Passwords must match!";
        }
        return errors;
      }}
      render={({ handleSubmit }) => (
        <SettingsForm
          onSubmit={(e: React.ChangeEvent<{}>) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <InputValidate
            id="oldPass"
            label="Old Password"
            variant="outlined"
            type="password"
            fieldName="oldPass"
          />
          <InputValidate
            id="newPass"
            label="New password"
            variant="outlined"
            type="password"
            fieldName="newPass"
          />
          <InputValidate
            id="confirmPass"
            label="Confirm password"
            variant="outlined"
            type="password"
            fieldName="confirmPass"
          />
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </SettingsForm>
      )}
    />
  );
};

export default PasswordEdit;
