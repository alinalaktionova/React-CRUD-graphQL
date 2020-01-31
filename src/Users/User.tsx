import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UserItem } from "./UserList.styles";
import { UserPropInterface } from "./UsersInterfaces";
import { DELETE_USER } from "../GraphqlOperations/mutationConstants";
import SettingsCard from "../HOC/SettingsCard";

const User = (props: Partial<UserPropInterface>) => {
  console.log(props);

  const initialValues: Partial<UserPropInterface> = {
    name: props.name,
    login: props.login,
    admin: props.admin
  };

  const [open, setOpen] = useState(false);
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: props.id }
  });

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <UserItem>
      <div>Name: {props.name}</div>
      <div>{props.admin && "admin"}</div>
      {props.getUserInfo && props.getUserInfo.features.includes("create") && (
        <React.Fragment>
          <button onClick={() => setOpen(true)}>edit</button>
          <button onClick={() => deleteUser()}>delete</button>
          <SettingsCard
            open={open}
            userId={props.id}
            initialValues={initialValues}
            admin={props.admin}
            close={closeDialog}
          />
        </React.Fragment>
      )}
    </UserItem>
  );
};

export default User;
