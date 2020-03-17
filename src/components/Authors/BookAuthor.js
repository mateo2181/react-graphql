import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';

const BookAuthor = ({ book }) => {
    let { title, description, image } = book;
    image = image ? image : '/book-default.jpg';
    return (
        <Grid style={{width: '100%'}} columns='equal' verticalAlign='middle' padded>
        <Grid.Row>
            <Grid.Column mobile={9} computer={3}>
                <img src={`${image}`}></img>
            </Grid.Column>
            <Grid.Column mobile={16} computer={13}>
                <div className="mt-4 sm:mt-0 font-semibold text-lg"> {title} </div>
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