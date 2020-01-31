import { Redirect } from "react-router";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PASSWORD } from "../GraphqlOperations/mutationConstants";
import Cookies from "js-cookie";

const token = Cookies.get("registration token");

const PasswordSetup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addPassword] = useMutation(ADD_PASSWORD);
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          throw Error("passwords must match");
        }
        addPassword({
          variables: {
            token: token,
            password: password
          }
        });
        Cookies.remove("registration token");
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

export default PasswordSetup;
