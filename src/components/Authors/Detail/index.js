import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHOR_DETAIL } from '../../../queries/authors';
import { Header, Grid } from 'semantic-ui-react';
import BookAuthor from '../BookAuthor';

function AuthorDetail(props) {

    const { match: { params: { id } } } = props;

    const { loading, error, data } = useQuery(GET_AUTHOR_DETAIL, {
        variables: { id }
    });

    if (loading) return "Loading";
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    let { firstName, lastName, books } = data.author;

    return (
        <div className="bg-white rounded shadow px-2">
            <Header as="h2" style={{ marginBottom: '2px', paddingTop: '20px' }}> {firstName} {lastName} </Header>
            {books ?
                <div className="w-full">
                    <Header as="h3" style={{ marginBottom: '10px', paddingTop: '15px' }}> Books </Header>
                    <Grid>
                        {books.map(b => <BookAuthor key={b.id} book={b} />)}
                    </Grid>
                </div>
                : ''
            }
        </div>
    );
}

export default AuthorDetail;