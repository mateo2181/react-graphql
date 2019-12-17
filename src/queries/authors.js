import { gql } from 'apollo-boost';

export const GET_AUTHORS = gql`
  {
    authors {
        id
        firstName
        lastName
        description
        nationality
        image
        books {
          id
        }
    }
  }
`;

export const GET_AUTHOR_DETAIL = gql`
query Author($id: ID!) {
    author(id: $id) {
        id
        firstName
        lastName
        description
        nationality
        image
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
mutation createAuthor($firstName: String!,$lastName: String!,$description: String!,$nationality: String!,$file: Upload!) {
  createAuthor(firstName: $firstName,lastName: $lastName, description: $description,nationality: $nationality,file: $file) {   
    firstName
    lastName
    description
    nationality
    image
  }
}
`;

export const EDIT_AUTHOR = gql`
mutation editAuthor($id: ID!,$firstName: String!,$lastName: String!,$description: String,$nationality: String!,$file: Upload) {
  editAuthor(id: $id,firstName: $firstName,lastName: $lastName, description: $description,nationality: $nationality,file: $file) {   
    firstName
    lastName
    description
    nationality
    image
  }
}
`;