import React from 'react';

const Book = ({ book, deleteBook }) => {
    let { title, description, image } = book;
    return (
        <div className="flex justify-between items-center border-b p-2">
            <div>
                <img className="w-40 pr-4" src={`${process.env.REACT_APP_URI_API}/${image}`}></img>
            </div>
            <div className="w-full">
                <div className="font-semibold text-lg"> {title} </div>
                <div className="text-sm text-gray-700"> {description} </div>
            </div>
            <div className="w-auto">
                <button className="btn btn-red" onClick={() => deleteBook(book.id)}> Delete </button>
            </div>

        </div>
    )
};

export default Book;