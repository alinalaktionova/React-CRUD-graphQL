import React from "react";
import { gql, useQuery } from "@apollo/client";
import User from "./User";
import {List} from "./UserList.styles";

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

const UserList = (props: any) => {
  console.dir(props);
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { id: props.getUserInfo ? props.getUserInfo.id : 0 }
  });
  console.dir(data);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <List>
      <span>User List</span>
      {data.getAllUsers.map((user: any) => (
        <User
          id={user.id}
          key={user.id}
          name={user.name}
          login={user.login}
          password={user.password}
          isAdmin={user.isAdmin}
          {...props}
        />
      ))}
    </List>
  );
};

export default UserList;
