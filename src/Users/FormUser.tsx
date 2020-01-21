import React, { useState } from "react";
import {gql, useMutation} from "@apollo/client";
import styled from "styled-components";

const Form = styled.form`
    width: 30%;
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    height: 30px;
    margin: 20px;
    border-radius: 10px;
`;
const Button = styled.button`
    width: 20%;
    height: 30px;
    margin: 0 auto;
    border-radius: 10px;
`;
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
        <Form onSubmit={onSubmitForm}>
            <Input
                type="name"
                value={name}
                placeholder="Name"
                name="name"
                onChange={e => setName(e.target.value)}
            />
            <Input
                type="email"
                value={email}
                placeholder="Email"
                name="email"
                onChange={e => setEmail(e.target.value)}
            />
            <Input
                type="password"
                value={password}
                placeholder="Password"
                name="password"
                onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Create user</Button>
        </Form>
    );
};

export default FormUser;
