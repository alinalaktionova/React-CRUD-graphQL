import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { withRouter, RouteComponentProps } from "react-router";
import { SET_USER } from "../GraphqlOperations/mutationConstants";
import { AUTHENTICATE } from "../GraphqlOperations/queriesContants";
import Cookies from "js-cookie";

const Login = (props: RouteComponentProps) => {
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
    return <p>{error.message}</p>;
  }
  if (data) {
    const { id, features } = data.authenticate.user;
    setUserInfo({
      variables: {
        key: data.authenticate.token,
        value: { id: id, features: features }
      }
    }).then(res => {
      if (res.data.setUserInfo === true) {
        Cookies.set("token", data.authenticate.token, { expires: 1 / 24 });
        props.history.push("/users");
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

export default withRouter(Login);
