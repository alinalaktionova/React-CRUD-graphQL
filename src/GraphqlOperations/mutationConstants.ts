import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation($id: Int!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation($id: Int!, $data: UserInfo) {
    updateUser(id: $id, data: $data) {
      id
      name
      login
      password
      features
    }
  }
`;
export const CREATE_USER = gql`
  mutation($data: UserInfo) {
    createUser(data: $data) {
      id
      name
      login
      password
      features
    }
  }
`;
export const SET_USER = gql`
  mutation($key: String!, $value: CurrentUserInfo) {
    setUserInfo(key: $key, value: $value)
  }
`;
