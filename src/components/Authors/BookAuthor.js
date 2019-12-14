import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

const BookAuthor = ({ book }) => {
    let { title, description, image } = book;
    return (
        <Grid style={{width: '100%'}} columns='equal' verticalAlign='middle' padded>
        <Grid.Row>
            <Grid.Column>
                <img src={`${process.env.REACT_APP_URI_API}/${image}`}></img>
            </Grid.Column>
            <Grid.Column width={13}>
                <div className="font-semibold text-lg"> {title} </div>
                <div  className="text-sm text-gray-700"> {description} </div>
            </Grid.Column>
            {/* <Grid.Column width={2}>
                <button className="btn btn-red" onClick={() => deleteBook(book.id)}> Delete </button>
            </Grid.Column> */}
        </Grid.Row>
        <Divider></Divider>
    </Grid>
    )
};

export default BookAuthor;