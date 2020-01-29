import React, { useReducer } from "react";
import { useMutation } from "@apollo/client";
import { Input, Form, Button } from "./FormUser.style";
import {CREATE_USER, SET_USER} from "../GraphqlOperations/mutationConstants";
import Cookies from "js-cookie";

const initialState = { name: "", login: "", password: "" };

function reducer(state: any, action: any) {
  switch (action.type) {
    case "set name":
      return { ...state, name: action.payload };
    case "set login":
      return { ...state, login: action.payload };
    case "return initial state":
      return initialState;
    default:
      throw new Error();
  }
}
const CreateUserForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dataUser = {
    ...state,
    admin: false
  };

  const [createUser] = useMutation(CREATE_USER, {
    variables: { data: dataUser }
  });
  const [setUserInfo] = useMutation(SET_USER);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser().then(res =>{setUserInfo({
      variables: {
        key: res.data.createUser.token,
        value: {id: res.data.createUser.id}
      }
    });
    Cookies.set("registration token", res.data.createUser.token);
    console.dir(res);
    dispatch({ type: "return initial state" });
  });
};

  return (
    <Form onSubmit={onSubmitForm}>
      <Input
        type="name"
        value={state.name}
        placeholder="Name"
        name="name"
        onChange={e => dispatch({ type: "set name", payload: e.target.value })}
      />
      <Input
        type="email"
        value={state.login}
        placeholder="Email"
        name="email"
        onChange={e => dispatch({ type: "set login", payload: e.target.value })}
      />
      <Button type="submit">Create user</Button>
    </Form>
  );
};

export default CreateUserForm;
