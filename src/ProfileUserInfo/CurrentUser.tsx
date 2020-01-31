import React, { useState } from "react";
import Cookies from "js-cookie";
import { useLazyQuery, useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_USER_INFO, LOGOUT } from "../GraphqlOperations/queriesContants";
import SettingsCard from "../HOC/SettingsCard";
import { Link } from "react-router-dom";

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CurrentUser = () => {
  const { data } = useQuery(GET_USER_INFO);
  const [logoutUser] = useLazyQuery(LOGOUT);
  const onLogoutClick = () => {
    logoutUser({
      variables: { key: Cookies.get("token") }
    });
    Cookies.remove("token");
  };
  const [open, setOpen] = useState(false);

  const initialValues = {
    name: data.getUserInfo && data.getUserInfo.name,
    login: data.getUserInfo && data.getUserInfo.login,
    admin: data.getUserInfo && data.getUserInfo.features.includes("create")
  };
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ProfileInfo>
      <span> My info </span>
      <div>Name: {data.getUserInfo.name}</div>
      <button onClick={() => setOpen(true)}>edit</button>
      <SettingsCard
        open={open}
        close={closeDialog}
        userId={data.getUserInfo.id}
        initialValues={initialValues}
      />
      <Link to="/password">Edit password</Link>
      <button onClick={onLogoutClick}>logout</button>
    </ProfileInfo>
  );
};

export default CurrentUser;
