import React from "react";
import Button from "@material-ui/core/Button";
import { SettingsForm } from "../utils/UtilsComponents/SettingCard.style";
import { useMutation } from "@apollo/client";
import { Form } from "react-final-form";
import InputValidate from "../utils/UtilsComponents/InputValidate";
import { UPDATE_PASSWORD } from "../GraphqlOperations/mutations";
import { PasswordEditInterface } from "./UsersInterfaces";
import { Redirect } from "react-router";

const initialValues = {
  oldPass: "",
  newPass: "",
  confirmPass: ""
};

const PasswordEdit = () => {
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const handleFormSubmit = (formObj: PasswordEditInterface) => {
    updatePassword({
      variables: { oldPassword: formObj.oldPass, newPassword: formObj.newPass }
    }).then(res => {
      if (res.data.updatePassword === true) {
        return <Redirect to="/users" />;
      } else {
        throw new Error("User with this password isn`t found");
      }
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
