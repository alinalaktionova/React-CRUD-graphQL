import React, { useState } from "react";
import {gql, useMutation} from "@apollo/client";
import * as style from "./FormUser.style";

const CREATE_USER = gql`
    mutation ($data: UserInfo)
    {
        createUser(data:$data) {
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
    const dataUser = {
        name: name,
        login: email,
        password: password,
        isAdmin: false
    };
    const [createUser] = useMutation(CREATE_USER, {
        variables: { data: dataUser }
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
        <style.Form onSubmit={onSubmitForm}>
            <style.Input
                type="name"
                value={name}
                placeholder="Name"
                name="name"
                onChange={e => setName(e.target.value)}
            />
            <style.Input
                type="email"
                value={email}
                placeholder="Email"
                name="email"
                onChange={e => setEmail(e.target.value)}
            />
            <style.Input
                type="password"
                value={password}
                placeholder="Password"
                name="password"
                onChange={e => setPassword(e.target.value)}
            />
            <style.Button type="submit">Create user</style.Button>
        </style.Form>
    );
};

export default FormUser;
