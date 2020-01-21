import React from "react";
import FormUser from "./Users/FormUser";
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
import UserInfo from "./Users/UserInfo";


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

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

const App: React.FC = () => {
  const {loading, error, data} = useQuery(GET_USER_INFO, {variables: {key: "user"}});
  console.dir(data && data.getUserInfo);
  if(error) {
    console.dir(error)
  }
  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <Route exact path="/">
            { data? <Redirect to="/users"/> : <Login />}
          </Route>
          <Route path="/users">
            <div>
            <UserInfo />
              {data.getUserInfo.isAdmin && <FormUser />}
            </div>
            <UserList {...data} />
          </Route>
        </Switch>
      </ContentWrapper>
    </Router>
  );
};

export default App;
