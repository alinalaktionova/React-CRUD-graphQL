import React, { useState } from "react";
import {gql, useMutation} from "@apollo/client";

const CREATE_USER = gql`
    mutation ($name: String!, $login: String!, $password: String!, $isAdmin: Boolean!)
    {
        createUser(name: $name, login: $login, password: $password, isAdmin: $isAdmin) {
            id
            name
            login
            password
            isAdmin
        }
    }
`;

const FormUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createUser] = useMutation(CREATE_USER, {
        variables: { name: name, login: email, password: password, isAdmin: false }
    });
    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, email, password);
        createUser();
        setName("");
        setPassword("");
        setEmail("")
    };

    return (
        <form onSubmit={onSubmitForm}>
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
            <button type="submit">Create user</button>
        </form>
    );
};

export default FormUser;
