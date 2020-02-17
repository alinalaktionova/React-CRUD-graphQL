import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UserItem } from "./UserList.styles";
import { UserPropInterface } from "./UsersInterfaces";
import { DELETE_USER } from "../GraphqlOperations/mutations";
import SettingsCard from "../utils/UtilsComponents/SettingsCard";
import { defineRole } from "../utils/UtilsFunctions/RolesFunction";
import { ADMIN } from "../constants/roles";

const User = (props: Partial<UserPropInterface>) => {
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
      <div>{props.admin && <span>admin</span>}</div>
      {props.getUserInfo && defineRole(props.getUserInfo.features) === ADMIN && (
        <React.Fragment>
          <button onClick={() => setOpen(true)}>edit</button>
          <button onClick={() => deleteUser()}>delete</button>
          <SettingsCard
            open={open}
            userId={props.id}
            initialValues={initialValues}
            admin={!!props.admin}
            close={closeDialog}
          />
        </React.Fragment>
      )}
    </UserItem>
  );
};

export default User;
