import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Redirect } from "react-router";
import { SET_USER } from "../GraphqlOperations/mutations";
import { AUTHENTICATE } from "../GraphqlOperations/mutations";
import Cookies from "js-cookie";
import {TOKEN} from "../constants/auth";

const Login = () => {
  const [login, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticate, {data}] = useMutation(AUTHENTICATE);
  const [setUserInfo] = useMutation(SET_USER);

  const onSubmitForm = () => {
    authenticate({
      variables: { login: login, password: password }
    }).then(res => console.log(res));
  };
  if (data) {
    const { id, features } = data.authenticate.user;
    setUserInfo({
      variables: {
        key: data.authenticate.token,
        value: { id: id, features: features }
      }
    }).then(res => {
      if (res.data.setUserInfo === true) {
        Cookies.set(TOKEN, data.authenticate.token, { expires: 1 / 24 });
        return <Redirect to="/users"/>
      }
    });
  }
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitForm();
      }}
    >
      <input
        type="email"
        value={login}
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login ;
