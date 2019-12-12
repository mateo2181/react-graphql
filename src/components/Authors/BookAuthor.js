import React from 'react';

const BookAuthor = ({ book }) => {
    let { title, description, image } = book;
    return (
        <div className="flex p-2">
            <div>
                <img className="w-48 pr-4" src={`${process.env.REACT_APP_URI_API}/${image}`}></img>
            </div>
            <div className="w-full">
                <div className="text-base"> {title} </div>
                <div className="text-sm text-gray-700"> {description} </div>
            </div>
        </div>
    )
};

export default BookAuthor;