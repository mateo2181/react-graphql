import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORS } from '../../../queries/authors';
import Author from '../Author';
import { Link } from "react-router-dom";
import { Grid, Button, Container, Icon } from 'semantic-ui-react';

const Authors = () => {

    const { loading, error, data, fetchMore } = useQuery(GET_AUTHORS, {
        variables: {
            offset: 0,
            limit: 10
        },
        fetchPolicy: "cache-and-network"
    });

    if (error) return <React.Fragment>Error :(</React.Fragment>;
    return (
        <Grid padded className="bg-white rounded">
            {/* {data ? */}
            {/* // <Grid> */}
            <Grid.Column width={16}>
                <Button size={'small'} className="cursor-pointer" as={Link} icon labelPosition='left' to={`/authors/create`} >
                    <Icon name='plus' /> New Author
                </Button>
            </Grid.Column>
            <Grid mobile={1} tablet={2}>
                {data ? data.authors.map(a => (
                    <Grid.Column mobile={16} tablet={8} computer={8} key={a.id}>
                        <Author author={a} key={a.id} />
                    </Grid.Column>
                )) : ''}

            </Grid>
            {/* </Grid> : ''} */}
            {loading ? <Grid> <Grid.Column> Loading... </Grid.Column> </Grid>: ''}
            <Grid.Column width={16}>
                <Button
                    size={'small'}
                    onClick={() =>
                        fetchMore({
                            variables: { offset: data.authors.length },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                    authors: [...prev.authors, ...fetchMoreResult.authors]
                                });
                            }
                        })
                    }
                > Load More </Button>
            </Grid.Column>
        </Grid>
    );
}

export default Authors;