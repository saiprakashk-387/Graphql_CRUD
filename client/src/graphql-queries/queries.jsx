import { gql } from "@apollo/client";

export const GET_USER = gql`
  {
    users {
      username
      email
      mobile
      id
    }
  }
`;
export const GET_USER_ID = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      username
      email
      mobile
    }
  }
`;
export const CREATE_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $mobile: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      mobile: $mobile
    ) {
      username
      email
      password
      mobile
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $mobile: String!
    $id: ID!
  ) {
    updateUser(username: $username, email: $email, mobile: $mobile, id: $id) {
      id
      username
      email
      mobile
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      username
    }
  }
`;
