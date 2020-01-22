import React, { useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Redirect } from "react-router";
import Cookies from "js-cookie";

const AUTHENTICATE = gql`
  query($login: String!, $password: String!) {
    authenticate(login: $login, password: $password) {
      user {
        id
        name
        login
        password
        isAdmin
      }
      token
    }
  }
`;
const SET_USER = gql`
  mutation($key: String!, $value: UserInfo) {
    setUserInfo(key: $key, value: $value)
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticate, { loading, error, data }] = useLazyQuery(AUTHENTICATE);
  const [setUserInfo] = useMutation(SET_USER);
  const onSubmitForm = () => {
    authenticate({
      variables: { login: email, password: password }
    });
  };
  console.dir(data);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  if (data) {
    setUserInfo({
      variables: {
        key: "user",
        value: {
          id: data.authenticate.user.id,
          name: data.authenticate.user.name,
          login: data.authenticate.user.login,
          password: data.authenticate.user.password,
          isAdmin: data.authenticate.user.isAdmin,
          token: data.authenticate.token
        }
      }
    });
    Cookies.set("token", data.authenticate.token)
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
        value={email}
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
