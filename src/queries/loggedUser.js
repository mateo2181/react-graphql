import { gql } from '@apollo/client';

export const GET_LOGGED_USER = gql`
  {
    getUserLogged {
        email
    }
  }
`;