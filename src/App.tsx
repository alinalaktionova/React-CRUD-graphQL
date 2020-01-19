import React from 'react';
import Login from "./Login/Login";
import {gql, useQuery} from "@apollo/client";
import FormUser from "./Login/FormUser";


const GET_USERS = gql`
    {
        getAllUsers {
            id
            name
            login
            password
            isAdmin
        }
    }
`;

const App: React.FC = () => {
    const { loading, error, data } = useQuery(GET_USERS);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error</p>;
    }
  return (
    <div className="App">
      <FormUser/>
       {data.getAllUsers.map((user: any) => <div key={user.id}>{user.name} {user.isAdmin && 'admin'}</div>)}
    </div>

  );
}

export default App;
