import React from 'react';
import { Link } from "react-router-dom";
import BookAuthor from './BookAuthor';

const Author = ({ author }) => {
    let { id, firstName, lastName } = author;
    return (
        <div className="border-b p-2">
            <div className="flex flex-wrap items-center justify-between">
                <div className="text-xl font-semibold"> {firstName} {lastName} </div>
                {author.books ?
                    <div className="w-full">
                        <div className="py-2 font-semibold text-lg"> Books </div>
                        <div className="w-full flex flex-wrap">
                            {author.books.map(b => {
                                return <div key={b.id} className="border-b w-full">
                                    <BookAuthor key={b.id} book={b} />
                                </div>
                            })}
                        </div>
                    </div>
                    :
                    <div>
                        <Link className="btn btn-blue" to={`/authors/${id}`}> Books </Link>
                    </div>
                }
            </div>

        </div>
    )
};

export default Author;