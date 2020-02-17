import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query {
    getUserInfo {
      id
      name
      login
      features
    }
  }
`;


export const GET_USERS = gql`
  query($id: Int!) {
    getAllUsers(id: $id) {
      id
      name
      login
      features
    }
  }
`;
