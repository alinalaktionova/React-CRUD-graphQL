import React from "react";
import { useQuery } from "@apollo/client";
import User from "./User";
import { List } from "react-virtualized";
import { ListUser } from "./UserList.styles";
import { CurrentUserInterface, UserDataInterface } from "./UsersInterfaces";
import { GET_USERS } from "../GraphqlOperations/queries";
import { defineRole } from "../utils/UtilsFunctions/RolesFunction";
import { ADMIN } from "../constants/roles";

const UserList = (props: CurrentUserInterface) => {
  const { data } = useQuery(GET_USERS, {
    variables: { id: props.getUserInfo ? props.getUserInfo.id : 0 }
  });
  function rowRenderer({ key, style }: any) {
    return (
      <ListUser key={key} style={style}>
        <span>User List</span>
        {data &&
          data.getAllUsers.map((user: UserDataInterface) => (
            <User
              id={user.id}
              key={user.id}
              name={user.name}
              login={user.login}
              admin={defineRole(user.features) === ADMIN}
              {...props}
            />
          ))}
      </ListUser>
    );
  }
  return (
    <List
      width={700}
      height={600}
      rowCount={1}
      rowHeight={600}
      rowRenderer={rowRenderer}
    />
  );
};

export default UserList;
