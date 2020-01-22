import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {UserItem} from "./UserList.styles";
import UserInfoCard from "../HOCUserInfo";

const DELETE_USER = gql`
  mutation($id: Int!) {
    deleteUser(id: $id)
  }
`;

const UPDATE_USER = gql`
  mutation($id: Int!, $data: UserInfo) {
    updateUser(id: $id, data: $data) {
      id
      name
      login
      password
      isAdmin
    }
  }
`;
const User = (props: any) => {
  console.dir(props);
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.login);
  const [password, setPassword] = useState(props.password);
  const [isAdmin, setAdmin] = useState(props.isAdmin);
  const dataUser = {
    name: name || props.name,
    login: email || props.login,
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
      <UserInfoCard {...props} />
      {props.getUserInfo && props.getUserInfo.isAdmin && (
        <input
          type="checkbox"
          name="admin"
          checked={isAdmin}
          onChange={e => setAdmin(e.target.checked)}
        />
      )}
      {props.getUserInfo && props.getUserInfo.isAdmin && (
        <button onClick={onEditBtnClick}>edit</button>
      )}
      {props.getUserInfo && props.getUserInfo.isAdmin && (
        <button onClick={onDeleteBtnClick}>delete</button>
      )}
    </UserItem>
  );
};

export default User;
