import React from "react";
import CreateUserForm from "./ProfileUserInfo/CreateUserForm";
import UserList from "./Users/UserList";
import { useQuery } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import CurrentUser from "./ProfileUserInfo/CurrentUser";
import Cookies from "js-cookie";
import { ActiveUser, ContentWrapper } from "./App.styles";
import { GET_USER_INFO } from "./GraphqlOperations/queriesContants";
import PasswordSetup from "./Users/PasswordSetup";
import PasswordEdit from "./Users/PasswordEdit";
import RouteHOC from "./HOC/RouteHOC";

const token = Cookies.get("token");
const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);
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
          <RouteHOC
            exact path="/"
            redirect="users"
            token={!!token}
            children={<Login />}
          />
          <Route path="/signup">
            <PasswordSetup />
          </Route>
          <RouteHOC
            path="/password"
            redirect="/"
            token={!token}
            children={<PasswordEdit />}
          />
          <RouteHOC
            path="/users"
            redirect="/"
            token={!token}
            children={
              <React.Fragment>
                <ActiveUser>
                  <CurrentUser />
                  {data.getUserInfo &&
                    data.getUserInfo.features.includes("create") && (
                      <CreateUserForm />
                    )}
                </ActiveUser>
                <UserList {...data} />
              </React.Fragment>
            }
          />
        </Switch>
      </ContentWrapper>
    </Router>
  );
};

export default App;
