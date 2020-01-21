import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { Input, FormControl, InputLabel } from "@material-ui/core";
export const UserItem = styled.li`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  margin: 20px;
  height: 60px;
  align-items: center;
`;
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
  const dataUser = {
    name: name || props.name,
    login: email || props.login,
    password: password || props.password,
    isAdmin: true
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
      <FormControl>
      <InputLabel htmlFor="name">Name</InputLabel>
      <Input id="name" value={name} onChange={e => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="login">Login</InputLabel>
        <Input id="login" value={email} onChange={e => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" value={password} onChange={e => setPassword(e.target.value)} />
      </FormControl>
      <span>{props.isAdmin && "admin"}</span>
      <button onClick={onDeleteBtnClick}>delete</button>
      <button onClick={onEditBtnClick}>edit</button>
    </UserItem>
  );
};

export default User;
