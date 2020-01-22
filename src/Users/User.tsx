import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UserItem } from "./UserList.styles";
import UserInfoCard from "../HOCUserInfo";
import { UserPropInterface } from "./UsersInterfaces";
import { UPDATE_USER, DELETE_USER } from "../mutationConstants";

const User = (props: UserPropInterface) => {
  const [name, setName] = useState(props.name);
  const [login, setEmail] = useState(props.login);
  const [password, setPassword] = useState(props.password);
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const dataUser = {
    name: name || props.name,
    login: login || props.login,
    password: password || props.password,
    isAdmin: isAdmin || props.isAdmin
  };
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id: props.id }
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: {
      id: props.id,
      data: dataUser
    }
  });

  const onDeleteBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deleteUser();
  };
  const onEditBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    updateUser();
  };
  return (
    <UserItem>
      <UserInfoCard
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        name={name}
        login={login}
        password={password}
      />
      {props.getUserInfo && props.getUserInfo.isAdmin && (
        <React.Fragment>
          <input
            type="checkbox"
            name="admin"
            checked={isAdmin}
            onChange={e => setAdmin(e.target.checked)}
          />
          <button onClick={onEditBtnClick}>edit</button>
          <button onClick={onDeleteBtnClick}>delete</button>
        </React.Fragment>
      )}
    </UserItem>
  );
};

export default User;
