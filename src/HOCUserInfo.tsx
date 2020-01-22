import { FormControl, Input, InputLabel } from "@material-ui/core";
import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";

const UPDATE_USER = gql`
    mutation($id: Int!, $data: UserInfo) {
        updateUser(id: $id, data: $data) {
            id
            name
            login
            password
            isAdmin
        }
    }
`;
const UserInfoCard = (props: any) => {
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.login);
    const [password, setPassword] = useState(props.password);
    const dataUser = {
        name: name || props.name,
        login: email || props.login,
        password: password || props.password,
        isAdmin: true
    };

    const [updateUser] = useMutation(UPDATE_USER, {
        variables: {
            id: props.id,
            data: dataUser
        }
    });

      const onEditBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    updateUser();
  };
  return (
    <React.Fragment>
      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" value={name} onChange={e => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="login">Login</InputLabel>
        <Input
          id="login"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>
      <span>{props.isAdmin && "admin"}</span>
    </React.Fragment>
  );
};
export default UserInfoCard;