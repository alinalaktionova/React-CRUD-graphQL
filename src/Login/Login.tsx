import React, { useState } from "react";
import {useLazyQuery, useMutation } from "@apollo/client";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import { SET_USER } from "../GraphqlOperations/mutationConstants";
import { AUTHENTICATE } from "../GraphqlOperations/queriesContants";

const Login = () => {
  const [login, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticate, { error, data }] = useLazyQuery(AUTHENTICATE);
  const [setUserInfo] = useMutation(SET_USER);
  const onSubmitForm = () => {
    authenticate({
      variables: { login: login, password: password }
    });
  };
  if (error) {
    return <p>Error</p>;
  }
  if (data) {
    console.dir(data);
    setUserInfo({
      variables: {
        key: data.authenticate.token,
        value: {
          id: data.authenticate.user.id,
          name: data.authenticate.user.name,
          login: data.authenticate.user.login,
          password: data.authenticate.user.password,
          isAdmin: data.authenticate.user.isAdmin
        }
      }
    });
    Cookies.set("token", data.authenticate.token, {expires: 1/24});
  }
  return data ? (
      <Redirect to="/users" />
  ) : (
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

export default Login;
