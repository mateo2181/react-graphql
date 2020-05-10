import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS, DELETE_BOOK } from '../../queries/books';
import Book from '../../components/Books/Book';
import { Link } from "react-router-dom";
import { Grid, Button, Icon } from 'semantic-ui-react';
import { FlexWrap } from '../../globalStyles';
import useIntersection from '../../hooks/useIntersection';

const Books = () => {

    const { isIntersecting, ref } = useIntersection({once: false});
    const { loading, error, data, fetchMore } = useQuery(GET_BOOKS, {
        variables: {
            offset: 0,
            limit: 10
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if(!loading && isIntersecting) {
            fetchMore({
                variables: { offset: data.books.length },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                        books: [...prev.books, ...fetchMoreResult.books]
                    });
                }
            })
        }
    },[isIntersecting]);

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

    if (error) return <React.Fragment>Error :(</React.Fragment>;
    return (
        <Grid padded className="bg-white rounded">
            <Grid.Column width={16}>
                <Button size={'small'} className="cursor-pointer" as={Link} icon labelPosition='left' to={`/books/create`} >
                    <Icon name='plus' />
                    New Book
                </Button>
            </Grid.Column>
            
            <FlexWrap data-testid="author-children" className="w-full">
                {data ? data.books.map(b => (
                    <Book deleteBook={openModalDeleteBook} book={b} key={b.id} />
                )) : ''}
            </FlexWrap>
            {loading ? <div style={{minHeight: '20vh'}}> Loading... </div> : ''}

            <div ref={ref}></div>
        </Grid>
    );
}

export default Books;