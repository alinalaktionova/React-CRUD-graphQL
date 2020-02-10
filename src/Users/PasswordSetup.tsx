import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PASSWORD } from "../GraphqlOperations/mutationConstants";
import queryString from "query-string";
import { withRouter, RouteComponentProps } from "react-router";

const PasswordSetup = (props: RouteComponentProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addPassword] = useMutation(ADD_PASSWORD);
  const values = queryString.parse(props.location.search);
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          throw Error("passwords must match");
        }
        addPassword({
          variables: {
            token: values.token,
            password: password
          }
        });
        props.history.push("/");
      }}
    >
      <input
        type="password"
        value={password}
        placeholder="Enter password"
        name="password"
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="password"
        value={confirmPassword}
        placeholder="Confirm password"
        name="confirmPassword"
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default withRouter(PasswordSetup);
