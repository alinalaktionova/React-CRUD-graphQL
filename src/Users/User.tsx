import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Field } from "react-final-form";
import { UserItem } from "./UserList.styles";
import { UserPropInterface } from "./UsersInterfaces";
import {
  UPDATE_USER,
  DELETE_USER
} from "../GraphqlOperations/mutationConstants";
import { Dialog, Button, Checkbox, TextField } from "@material-ui/core";
import styled from "styled-components";
import InputValidate from "../HOC/InputValidateHOC";

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;



const User = (props: Partial<UserPropInterface>) => {
  console.log(props);

  const initialValues: any = {
    name: "",
    login: "",
    admin: props.admin
  };

  const [open, setOpen] = useState(false);
  const [admin, setAdmin] = useState(props.admin);
  /*  const initialState = {
    name: props.name,
    login: props.login,
    admin: props.admin
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "set name":
        return { ...state, name: action.payload };
      case "set login":
        return { ...state, login: action.payload };
      case "set admin":
        return { ...state, admin: action.payload };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const dataUser = state;*/
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: props.id }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /*  const [updateUser] = useMutation(UPDATE_USER, {
    variables: {
      id: props.id,
      data: dataUser
    }
  });*/

  const handleFormSubmit = (formObj: any) => {
    console.log(formObj);
    /*    updateUser();*/
  };

  return (
    <UserItem>
      <div>Name: {props.name}</div>
      <div>{props.admin && "admin"}</div>
      {props.getUserInfo && props.getUserInfo.features.includes("create") && (
        <React.Fragment>
          <button onClick={handleClickOpen}>edit</button>
          <button onClick={() => deleteUser()}>delete</button>
          <Dialog open={open}>
            <Form
              onSubmit={(formObj:any) => {
                handleFormSubmit(formObj);
              }}
              initialValues={initialValues}
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
                  <span>admin</span>
                  <Checkbox
                    checked={!!admin}
                    onChange={e => setAdmin(e.target.checked)}
                    value="primary"
                  />
                  <Button type="submit" variant="outlined" color="primary">
                    Submit
                  </Button>
                </SettingsForm>
              )}
            />
            <i className="fas fa-times" onClick={handleClose} />
          </Dialog>
        </React.Fragment>
      )}
    </UserItem>
  );
};

export default User;
