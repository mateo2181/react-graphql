import { gql } from 'apollo-boost';

export const GET_BOOKS = gql`
  {
    books {
        id
        title
        description
        image
    }
  }
`;

export const GET_BOOK_DETAIL = gql`
query Book($id: ID!) {
    book(id: $id) {
        id
        title
        description
    }
  }
`;

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $description: String!,$authorId: ID!, $file: Upload!) {
  createBook(title:$title,description:$description,authorId: $authorId, file: $file) {
    id
    title
    description
    image
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($id: ID!) {
  deleteBook(id: $id)
}
`;

export const SINGLE_UPLOAD_BOOK = gql`
mutation singleUploadBook($file: Upload!) {
  singleUploadBook(file: $file) {
    id
  }
}
`;
