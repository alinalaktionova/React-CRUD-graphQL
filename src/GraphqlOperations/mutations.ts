import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation($id: Int!) {
    deleteUser(id: $id) {
      id
      name
      login
      features
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: Int!, $data: UserInfo) {
    updateUser(id: $id, data: $data) {
      id
      name
      login
      features
    }
  }
`;
export const CREATE_USER = gql`
  mutation($data: UserInfo) {
    createUser(data: $data) {
      token
      id
    }
  }
`;
export const SET_USER = gql`
  mutation($key: String!, $value: CurrentUserInfo) {
    setUserInfo(key: $key, value: $value)
  }
`;

export const ADD_PASSWORD = gql`
  mutation($token: String!, $password: String!) {
    addPassword(token: $token, password: $password)
  }
`;
export const UPDATE_PASSWORD = gql`
  mutation($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;
export const LOGOUT = gql`
  mutation ($key: String!) {
    logoutUser(key: $key)
  }
`;

export const AUTHENTICATE = gql`
  mutation ($login: String!, $password: String!) {
    authenticate(login: $login, password: $password) {
      user {
        id
        features
      }
      token
    }
  }
`;

