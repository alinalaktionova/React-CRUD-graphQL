import React from "react";
import CreateUserForm from "./ProfileUserInfo/CreateUserForm";
import UserList from "./Users/UserList";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Login from "./Login/Login";
import CurrentUser from "./ProfileUserInfo/CurrentUser";
import Cookies from "js-cookie";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const ActiveUser = styled.div`
  width: 30%;
`;

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

const token = Cookies.get("token");
console.dir(token);
const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { key: "user" }
  });
  console.dir(data);
  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <Route exact path="/">
            {token? <Redirect to="/users" /> : <Login />}
          </Route>
          <Route path="/users">
            <ActiveUser>
              <CurrentUser />
              {data.getUserInfo && data.getUserInfo.isAdmin && <CreateUserForm />}
            </ActiveUser>
            <UserList {...data} />
          </Route>
        </Switch>
      </ContentWrapper>
    </Router>
  );
};

export default App;
