import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHOR_DETAIL } from '../../../queries/authors';
import Author from '../Author';

function AuthorDetail(props) {

    const { match: { params: { id } } } = props;

    const { loading, error, data } = useQuery(GET_AUTHOR_DETAIL, {
        variables: { id }
    });

    if (loading) return "Loading";
    if (error) return <React.Fragment>Error :(</React.Fragment>;
    return (
        <div className="bg-white rounded shadow px-2">
            {/* <h4 className="px-2 font-semibold text-xl"> Authors </h4> */}
            <Author author={data.author} />
        </div>
    );
}

export default AuthorDetail;