import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
        confirmed
      }
    }
  }
`;


// UserDbs query
export const GET_USER_DBS = gql`
  query UserDbs {
    userDbs {
      DOB
      Name
      documentId
      email
      phone
      is_active
    }
  }
`;

