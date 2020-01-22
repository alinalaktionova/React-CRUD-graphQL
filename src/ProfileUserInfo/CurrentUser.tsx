import React, { useState } from "react";
import Cookies from "js-cookie";
import { gql, useMutation, useQuery } from "@apollo/client";
import UserInfoCard from "../HOCUserInfo";
import styled from "styled-components";
import { Redirect } from "react-router-dom";



const GET_USER_INFO = gql`
  query($key: String!) {
    getUserInfo(key: $key) {
      id
      name
      login
      password
      isAdmin
    }
  }
`;
const LOGOUT = gql`
  mutation($key: String!) {
    logoutUser(key: $key)
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CurrentUser = () => {
    const token = Cookies.get("token");
    console.log(token);
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { key: "user" }
  });
  const [logoutUser] = useMutation(LOGOUT, { variables: { key: "user" } });
  console.dir(data);
  const onLogoutClick = () => {
    logoutUser();
    Cookies.remove("token");
  };

  if (error) {
    console.dir(error);
  }
  return (data.getUserInfo) ? (
    <ProfileInfo>
      <span> My info </span>
      <UserInfoCard {...data.getUserInfo} />
      <button onClick={onLogoutClick}>logout</button>
    </ProfileInfo>
  ) : (
    <Redirect to="/" />
  );
};

export default CurrentUser;
