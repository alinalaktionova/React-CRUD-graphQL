import React from "react";
import { gql, useQuery } from "@apollo/client";
import User from "./User";
import styled from "styled-components";

const GET_USERS = gql`
  query($id: Int!) {
    getAllUsers(id: $id) {
      id
      name
      login
      password
      isAdmin
    }
  }
`;

const List = styled.ul`
  width: 60%;
`;
const UserList = (props: any) => {
  console.dir(props);
  const { loading, error, data } = useQuery(GET_USERS, {variables: {id: props.getUserInfo ? props.getUserInfo.id: 0}});
  console.dir(data)
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <List>
      {data.getAllUsers.map((user: any) => (
        <User
          id={user.id}
          key={user.id}
          name={user.name}
          login={user.login}
          password={user.password}
          isAdmin={user.isAdmin}
        />
      ))}
    </List>
  );
};

export default UserList;
