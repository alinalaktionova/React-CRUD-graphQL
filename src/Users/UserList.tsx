import React from "react";
import { gql, useQuery } from "@apollo/client";
import User from "./User";

const GET_USERS = gql`
  {
    getAllUsers {
      id
      name
      login
      password
      isAdmin
    }
  }
`;

const UserList = ({data}: any) => {
  console.dir(data)
/*  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }*/
  return (
    <ul>
      {data.getAllUsers.map((user: any) => (
        <User
          id={user.id}
          key={user.id}
          name={user.name}
          login={user.login}
          isAdmin={user.isAdmin}
        />
      ))}
    </ul>
  );
};

export default UserList;
