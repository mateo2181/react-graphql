import { gql } from 'apollo-boost';

export const GET_AUTHORS = gql`
  {
    authors {
        id
        firstName
        lastName
    }
  }
`;

export const GET_AUTHOR_DETAIL = gql`
query Author($id: ID!) {
    author(id: $id) {
        id
        firstName
        lastName
        books {
          id
          title
          description
          image
        }
    }
  }
`;

export const CREATE_AUTHOR = gql`
mutation createAuthor($firstName: String!,$lastName: String!) {
  createAuthor(firstName: $firstName,lastName: $lastName) {   
    firstName
    lastName
  }
}
`;