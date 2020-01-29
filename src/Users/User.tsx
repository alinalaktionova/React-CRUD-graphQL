import React, {useReducer} from "react";
import { useMutation } from "@apollo/client";
import { UserItem } from "./UserList.styles";
import UserInfoCard from "../HOC/HOCUserInfo";
import { UserPropInterface } from "./UsersInterfaces";
import { UPDATE_USER, DELETE_USER } from "../GraphqlOperations/mutationConstants";



const User = (props: UserPropInterface) => {
  const initialState = { name: props.name, login: props.login, password: props.password, admin: props.admin };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "set name":
        return { ...state, name: action.payload };
      case "set login":
        return { ...state, login: action.payload };
      case "set password":
        return { ...state, password: action.payload };
      case "set admin":
        return { ...state, admin: action.payload };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const dataUser = state;
  console.dir(state);
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
          {...props}
        setName={dispatch}
        setEmail={dispatch}
        setPassword={dispatch}
        name={state.name}
        login={state.login}
        password={state.password}
      />
      {props.getUserInfo && props.getUserInfo.features.includes("create") && (
        <React.Fragment>
          <input
            type="checkbox"
            name="admin"
            checked={state.admin}
            onChange={e => dispatch({type: "set admin" , payload: e.target.value })}
          />
          <button onClick={onEditBtnClick}>edit</button>
          <button onClick={onDeleteBtnClick}>delete</button>
        </React.Fragment>
      )}
    </UserItem>
  );
};

export default User;
