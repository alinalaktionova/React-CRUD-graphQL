import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formObj = {
    email: email,
    password: password
  };
  const onSubmitForm = () => {
    console.log(formObj);
  };
  return (
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
