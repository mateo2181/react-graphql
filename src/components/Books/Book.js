import React from 'react';
import { NavLink } from "react-router-dom";
import { Grid, Divider, Button } from 'semantic-ui-react';
import Author from '../Authors/Author';

const Book = ({ book, deleteBook }) => {
    let { id, title, description, image, author } = book;
    image = image ? image : '/book-default.jpg';
    return (
        <Grid style={{ width: '100%' }} columns='equal' verticalAlign='middle' padded>
            <Grid.Row>
                <Grid.Column mobile={9} computer={3} textAlign="center">
                    <img src={`${image}`}></img>
                </Grid.Column>
                <Grid.Column mobile={16} computer={13}>
                    <Grid textAlign="justified" columns={2} verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column mobile={12} floated="left">
                                <div className="mt-4 sm:mt-0 font-semibold text-lg"> {title} </div>
                                <div className="text-base text-gray-600"> {author.firstName} {author.lastName} </div>
                            </Grid.Column>
                            <Grid.Column width={3} floated="right">
                                <Button as={NavLink} size='mini' to={`/books/${id}/edit`} basic color="black"> Edit </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <div className="text-sm text-gray-700"> {description} </div>
                </Grid.Column>
                {/* <Grid.Column width={2}>
                    <button className="btn btn-red" onClick={() => deleteBook(book.id)}> Delete </button>
                </Grid.Column> */}
            </Grid.Row>
            <Divider></Divider>
        </Grid>
    )
};

export default Book;