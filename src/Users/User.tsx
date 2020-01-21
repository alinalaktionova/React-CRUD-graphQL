import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";

const DELETE_USER = gql`
    mutation ($id: Int!)
    {
        deleteUser(id: $id) 
    }
`;

const UPDATE_USER = gql`
    mutation ($id: Int!, $name: String!, $login: String!, $password: String!, $isAdmin: Boolean!)
    {
        updateUser(id: $id, name: $name, login: $login, password: $password, isAdmin: $isAdmin) {
            name
            login 
            password
            isAdmin
        }
    }
`;
const User = (props: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let id = props.id;
    const [deleteUser] = useMutation(DELETE_USER, {
        variables: { id }
    });
    const [updateUser] = useMutation(UPDATE_USER, {
        variables: { id: id, name: name, login: email, password: password, isAdmin: false}
    });

    const onDeleteBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       console.log(props.id, name, email, password, props.isAdmin);
        deleteUser();
    };
    const onEditBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(props.id, name, email, password, props.isAdmin);
        updateUser();
    };
    return (
        <li>
            name:{props.name}   login:{props.login}  {props.isAdmin && "____admin"}
            <input
                type="name"
                value={name}
                name="name"
                onChange={e => setName(e.target.value)}
            />
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
            <button onClick={onDeleteBtnClick}>delete</button>
            <button onClick={onEditBtnClick}>edit</button>
        </li>
    );
};

export default User;