import React from "react";
import CreateUserForm from "./ProfileUserInfo/CreateUserForm";
import UserList from "./Users/UserList";
import { useQuery } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Login from "./Login/Login";
import CurrentUser from "./ProfileUserInfo/CurrentUser";
import Cookies from "js-cookie";
import { ActiveUser, ContentWrapper } from "./App.styles";
import { GET_USER_INFO } from "./GraphqlOperations/queriesContants";

const token = Cookies.get("token");
const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { key: "user" }
  });
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
            {/*{token ? <Redirect to="/users" /> : */}<Login />
          </Route>
          <Route path="/users">
            <ActiveUser>
              <CurrentUser />
            {/*  {data.getUserInfo && data.getUserInfo.isAdmin && (*/}
                <CreateUserForm />

            </ActiveUser>
            <UserList {...data} />
          </Route>
        </Switch>
      </ContentWrapper>
    </Router>
  );
};

export default App;
