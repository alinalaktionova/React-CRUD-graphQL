import React, { useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Redirect } from "react-router";

const AUTHENTICATE = gql`
  query($login: String!, $password: String!) {
    authenticate(login: $login, password: $password) {
      id
      name
      login
      password
      isAdmin
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
   if(data){
       setUserInfo({
         variables: {
           key: "user",
           value: {
             id: data.authenticate.id,
             name: data.authenticate.name,
             login: data.authenticate.login,
             password: data.authenticate.password,
             isAdmin: data.authenticate.isAmin
           }
         }
       });
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
