import React from 'react';
import { Link, NavLink } from "react-router-dom";
import BookAuthor from './BookAuthor';
import { Header, Grid, Card, Image, Button } from 'semantic-ui-react';

const Author = ({ author }) => {
    let { id, firstName, lastName, description, nationality, image, books } = author;

    const countBooks = (<div> Books: {books.length} </div>);

    return (
        <Grid padded>
            <Grid.Row className="border-b">
                <Grid.Column mobile={5} tablet={6} computer={6}>
                    <Image rounded className='h-24 object-cover object-top w-full' src={`${process.env.REACT_APP_URI_API}/${image}`} />
                </Grid.Column>
                <Grid.Column verticalAlign='middle' width={10}>
                    <Card.Content>
                        <Card.Header className="text-lg"> {`${firstName} ${lastName}`} </Card.Header>
                        <Card.Meta className="text-gray-500 text-sm"> {nationality} </Card.Meta>
                        <div className="mt-2">
                            <Button as={NavLink} size='mini' to={`/authors/${id}/edit`} basic color="black"> Edit </Button>
                            <Button as={NavLink} size='mini' to={`/authors/${id}`} basic primary> Books </Button>
                        </div>
                    </Card.Content>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Author;