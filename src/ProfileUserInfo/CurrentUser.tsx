import React, {useState} from "react";
import Cookies from "js-cookie";
import {useMutation, useQuery} from "@apollo/client";
import styled from "styled-components";
import {GET_USER_INFO} from "../GraphqlOperations/queries";
import SettingsCard from "../utils/UtilsComponents/SettingsCard";
import {Link, Redirect} from "react-router-dom";
import {LOGOUT} from "../GraphqlOperations/mutations";
import {defineRole} from "../utils/UtilsFunctions/RolesFunction";
import {ADMIN} from "../constants/roles";
import {TOKEN} from "../constants/auth";

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CurrentUser = () => {
  const { data } = useQuery(GET_USER_INFO);
  const [logoutUser] = useMutation(LOGOUT);

  const onLogoutClick = () => {
    logoutUser({
      variables: { key: Cookies.get(TOKEN) }
    });
    Cookies.remove(TOKEN);
    return <Redirect to="/"/>
  };

  const [open, setOpen] = useState(false);
  if (data.getUserInfo) {
  }
  const { name, login, features } = data.getUserInfo;

  const initialValues = {
    name,
    login,
    admin: defineRole(features) === ADMIN
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
