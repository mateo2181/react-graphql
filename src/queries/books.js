import { gql } from 'apollo-boost';

export const GET_BOOKS = gql`
query Books($offset: Int, $limit: Int) {
    books(offset: $offset, limit: $limit) {
        id
        title
        description
        image
        author {
          id
          firstName
          lastName
        }
    }
  }
`;

export const GET_BOOK_DETAIL = gql`
query Book($id: ID!) {
    book(id: $id) {
        id
        title
        description
        image
        author {
          id
        }
    }
  }
`;

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $description: String!,$authorId: ID!, $file: Upload) {
  createBook(title:$title,description:$description,authorId: $authorId, file: $file) {
    id
    title
    description
    image
  }
}
`;

export const EDIT_BOOK = gql`
mutation editBook($id: ID!,$title: String!, $description: String!,$authorId: ID!, $file: Upload) {
  editBook(id: $id,title:$title,description:$description,authorId: $authorId, file: $file) {
    id
    title
    description
    image
    author {
      id
      firstName
      lastName
    }
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($id: ID!) {
  deleteBook(id: $id)
}
`;
