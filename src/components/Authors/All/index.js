import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORS } from '../../../queries/authors';
import Author from '../Author';
import { Link } from "react-router-dom";
import { Grid, Button, Container, Icon } from 'semantic-ui-react';

const Authors = () => {

    const { loading, error, data } = useQuery(GET_AUTHORS);

    if (loading) return "Loading";
    if (error) return <React.Fragment>Error :(</React.Fragment>;
    return (
        <Container className="bg-white rounded">
            <Grid padded>
                <Grid.Column>
                    <Button size={'small'} className="cursor-pointer" as={Link} icon labelPosition='left' to={`/authors/create`} >
                        <Icon name='plus' />
                        New Author
                    </Button>
                </Grid.Column>
            </Grid>
            <Grid columns={2}>
                {data.authors.map(a => (
                    <Grid.Column mobile={16} tablet={8} computer={8} key={a.id}>
                        <Author author={a} key={a.id} />
                    </Grid.Column>
                ))}

            </Grid>
        </Container>
    );
}

export default Authors;