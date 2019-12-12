import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORS } from '../../../queries/authors';
import Author from '../Author';
import { Link } from "react-router-dom";

const Authors = () => {

    const { loading, error, data  } = useQuery(GET_AUTHORS);

    if (loading) return "Loading";
    if (error) return <React.Fragment>Error :(</React.Fragment>;
    return (
        <div className="bg-white rounded shadow px-2">
            <div className="pt-2 flex justify-start">
                <Link className="btn btn-black" to={`/authors/create`} > New Author </Link>
            </div>

            {data.authors.map(a => (
                <Author author={a} key={a.id} />
            ))}
            
        </div>
    );
}

export default Authors;