import React, {useState} from "react";
import User, {UserItem} from "./User";
import Cookies from "js-cookie";
import {gql, useQuery} from "@apollo/client";


const GET_USER_INFO = gql`
    query ($key: String!){
        getUserInfo(key:$key){
            id 
            name
            login
            password
            isAdmin
        }
    }
`;

const UserInfo = () => {
    const {loading, error, data} = useQuery(GET_USER_INFO, {variables: {key: "user"}});
    console.dir(data);
    if(error) {
        console.dir(error)
    }
    return (
        data ? <User {...data.getUserInfo}/>: <div/>
    )
};

export default UserInfo;