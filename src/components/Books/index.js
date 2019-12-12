import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_BOOKS, DELETE_BOOK } from '../../queries/books';
import Book from './Book';
import { Link } from "react-router-dom";

const Books = () => {

    const { loading, error, data } = useQuery(GET_BOOKS);
    const [deleteBook] = useMutation(DELETE_BOOK,
        {
            update(cache, { data: { deleteBook } }) {
                const { books } = cache.readQuery({ query: GET_BOOKS });
                cache.writeQuery({
                    query: GET_BOOKS,
                    data: { books: books.filter(b => b.id != deleteBook) },
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
        <div className="bg-white rounded shadow px-2">
            <div className="pt-2 flex justify-start">
                <Link className="btn btn-black" to={`/books/create`} > New Book </Link>
            </div>
            {data.books.map(b => (
                <Book deleteBook={openModalDeleteBook} book={b} key={b.id} />
            ))}
        </div>
    );
}

export default Books;