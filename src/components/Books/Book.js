import React from 'react';
import { NavLink } from "react-router-dom";
import { Grid, Divider, Button } from 'semantic-ui-react';
import Author from '../Authors/Author';
import styled from 'styled-components';
import { FlexWrap, FlexWrapBetween } from '../../globalStyles.js';

const WrapperBook = styled(FlexWrap)`
    align-items: center; 
    margin-bottom: 3px;
    padding-bottom: 8px;
    padding-top: 8px;
    border-bottom: 1px solid #cacaca;
`;

const ContentBook = styled.div`
    flex: 2;
    min-width: 300px;
`;

const ImageBook = styled.div`
    min-width: 200px;   
    padding: 0 4px;
    img {
        height: 200px;
        width: 150px;
        object-fit: cover;
        align-content: start;
        object-position: top;
    }
`;

const Book = ({ book, deleteBook }) => {
    let { id, title, description, image, author } = book;
    image = image ? image : '/book-default.jpg';
    return (
        <div style={{ width: '100%' }}>
            <WrapperBook>
                <ImageBook>
                    <img src={`${image}`} />
                </ImageBook>
                <ContentBook>
                    <FlexWrapBetween className="w-full">
                        {/* <div className="w-full"> */}
                            <Grid.Column mobile={12} floated="left">
                                <div className="mt-4 sm:mt-0 font-semibold text-lg"> {title} </div>
                                <div className="text-base text-gray-600"> {author.firstName} {author.lastName} </div>
                            </Grid.Column>
                            <Grid.Column width={3} floated="right">
                                <Button as={NavLink} size='mini' to={`/books/${id}/edit`} basic color="black"> Edit </Button>
                            </Grid.Column>
                        {/* </div> */}
                    </FlexWrapBetween>
                    <div className="text-sm text-gray-700"> {description} </div>
                </ContentBook>
                {/* <Grid.Column width={2}>
                    <button className="btn btn-red" onClick={() => deleteBook(book.id)}> Delete </button>
                </Grid.Column> */}
            </WrapperBook>
        </div>
    )
};

export default Book;