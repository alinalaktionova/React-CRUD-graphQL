import React from "react";
import { useQuery } from "@apollo/client";
import User from "./User";
import { List } from "react-virtualized";
import { ListUser } from "./UserList.styles";
import { CurrentUserInterface } from "./UsersInterfaces";
import { GET_USERS } from "../queriesContants";

const UserList = (props: CurrentUserInterface) => {
  const { data } = useQuery(GET_USERS, {
    variables: { id: props.getUserInfo ? props.getUserInfo.id : 0 }
  });
  function rowRenderer({ key, style }: any) {
    return (
      <ListUser key={key} style={style}>
        <span>User List</span>
        {data && data.getAllUsers.map((user: any) => (
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
