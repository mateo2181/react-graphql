import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_BOOKS, DELETE_BOOK } from '../../queries/books';
import Book from './Book';
import { Link } from "react-router-dom";
import { Grid, Button, Divider, Container, Icon } from 'semantic-ui-react';

const Books = () => {

    const { loading, error, data } = useQuery(GET_BOOKS);
    const [deleteBook] = useMutation(DELETE_BOOK,
        {
            update(cache, { data: { deleteBook } }) {
                const { books } = cache.readQuery({ query: GET_BOOKS });
                cache.writeQuery({
                    query: GET_BOOKS,
                    data: { books: books.filter(b => b.id !== deleteBook) },
                });
            }
        });

    const openModalDeleteBook = (id) => {
        deleteBook({ variables: { id: id } });
        // console.log(id);
    };

    if (loading) return "Loading";
    if (error) return <React.Fragment>Error :(</React.Fragment>;
    return (
        <Container className="bg-white rounded">
            <Grid padded>
                <Grid.Column>
                    <Button size={'small'} className="cursor-pointer" as={Link} icon labelPosition='left' to={`/books/create`} >
                        <Icon name='plus' />
                        New Book
                    </Button>
                </Grid.Column>
            </Grid>
            <Grid>
                {data.books.map(b => (
                    <Book deleteBook={openModalDeleteBook} book={b} key={b.id} />
                ))}
            </Grid>
        </Container>
    );
}

export default Books;