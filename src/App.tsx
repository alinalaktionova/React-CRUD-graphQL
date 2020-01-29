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
import PasswordSetting from "./Users/PasswordSetting";
import PasswordEdit from "./Users/PasswordEdit";

const token = Cookies.get("token");
const regToken = Cookies.get("registration token");
console.log(regToken);
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
          <Route exact path="/">
            {token ? <Redirect to="/users" /> : <Login />}
          </Route>
          <Route path="/signup">
            {regToken ? <PasswordSetting /> : <Redirect to="/" />}
          </Route>
          <Route path="/password">
            <PasswordEdit/>
          </Route>
          <Route path="/users">
            <ActiveUser>
              <CurrentUser />
              {data.getUserInfo && <CreateUserForm />}
            </ActiveUser>
            <UserList {...data} />
          </Route>
        </Switch>
      </ContentWrapper>
    </Router>
  );
};

export default App;
