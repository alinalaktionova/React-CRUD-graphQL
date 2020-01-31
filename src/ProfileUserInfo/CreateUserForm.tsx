import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input, Form, Button } from "./FormUser.style";
import { CREATE_USER, SET_USER } from "../GraphqlOperations/mutationConstants";
import Cookies from "js-cookie";

const CreateUserForm = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const dataUser = {
    name: name,
    login: login,
    admin: false
  };

  const [createUser] = useMutation(CREATE_USER, {
    variables: { data: dataUser }
  });
  const [setUserInfo] = useMutation(SET_USER);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser().then(res => {
      setUserInfo({
        variables: {
          key: res.data.createUser.token,
          value: { id: res.data.createUser.id }
        }
      });
      Cookies.set("registration token", res.data.createUser.token);
      setName("");
      setLogin("");
    });
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Input
        type="name"
        value={state.name}
        placeholder="Name"
        name="name"
        onChange={e => setName(e.target.value)}
      />
      <Input
        type="email"
        value={state.login}
        placeholder="Email"
        name="email"
        onChange={e => setLogin(e.target.value)}
      />
      <Button type="submit">Create user</Button>
    </Form>
  );
};

export default CreateUserForm;
