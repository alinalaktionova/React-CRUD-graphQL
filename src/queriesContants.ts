import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
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

export const LOGOUT = gql`
  query($key: String!) {
    logoutUser(key: $key)
  }
`;

export const GET_USERS = gql`
  query($id: Int!) {
    getAllUsers(id: $id) {
      id
      name
      login
      password
      isAdmin
    }
  }
`;

export const AUTHENTICATE = gql`
  query($login: String!, $password: String!) {
    authenticate(login: $login, password: $password) {
      user {
        id
        name
        login
        password
        isAdmin
      }
      token
    }
  }
`;