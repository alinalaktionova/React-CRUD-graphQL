import { FormControl, Input, InputLabel } from "@material-ui/core";
import React from "react";

const UserInfoCard = (props: any) => {
    console.dir(props);
  return (
    <React.Fragment>
      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          value={props.name}
          onChange={e => props.setName({type: "set name" , payload: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="login">Login</InputLabel>
        <Input
          id="login"
          value={props.login}
          onChange={e => props.setEmail({type: "set login" , payload: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          value={props.password}
          onChange={e => props.setPassword({type: "set password" , payload: e.target.value })}
        />
      </FormControl>
      <span>{props.admin && "admin"}</span>
    </React.Fragment>
  );
};
export default UserInfoCard;
