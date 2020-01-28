import React from "react";
import Cookies from "js-cookie";
import { useLazyQuery, useQuery } from "@apollo/client";
import UserInfoCard from "../HOC/HOCUserInfo";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { GET_USER_INFO, LOGOUT } from "../GraphqlOperations/queriesContants";

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CurrentUser = () => {
  const { data } = useQuery(GET_USER_INFO, {
    variables: { key: "user" }
  });
  const [logoutUser] = useLazyQuery(LOGOUT, { variables: { key: "user" } });
  const onLogoutClick = () => {
    logoutUser();
    Cookies.remove("token");
  };
  return data.getUserInfo ? (
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
