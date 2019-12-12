import { gql } from 'apollo-boost';

export const GET_LOGGED_USER = gql`
  {
    getUserLogged {
        email
    }
  }
`;