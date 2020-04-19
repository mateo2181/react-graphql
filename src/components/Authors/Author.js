import React from 'react';
import { Link, NavLink } from "react-router-dom";
import BookAuthor from './BookAuthor';
import { Grid, Card, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { FlexWrap } from '../../globalStyles';

const WrapperAuthor = styled(FlexWrap)`
    align-items: center; 
    margin-bottom: 3px;
    padding-bottom: 5px;
    border-bottom: 1px solid #cacaca;
`;

const ContentAuthor = styled.div`
    flex: 2;
    min-width: 120px;
`;

const ImageAuthor = styled.div`
    width: 120px;   
    padding: 0 20px 0 0;
    img { 
        height: 120px;
        width: 100%;
        object-fit: contain;
        border-radius: 10px;
        align-content: start;
    }
`;

const Author = ({ author }) => {
    let { id, firstName, lastName, description, nationality, image, books } = author;

    const countBooks = (<div> Books: {books.length} </div>);
    image = image ? image : '/author-default.jpg';
    
    return (
        <WrapperAuthor>
                <ImageAuthor>
                    <img src={`${image}`} />
                </ImageAuthor>
                <ContentAuthor>
                    <Card.Content>
                        <Card.Header className="text-lg"> {`${firstName} ${lastName}`} </Card.Header>
                        <Card.Meta className="text-gray-500 text-sm"> {nationality} </Card.Meta>
                        <div className="mt-2">
                            <Button as={NavLink} size='mini' to={`/authors/${id}/edit`} basic color="black"> Edit </Button>
                            <Button as={NavLink} size='mini' to={`/authors/${id}`} basic primary> Books </Button>
                        </div>
                    </Card.Content>
                </ContentAuthor>
        </WrapperAuthor>
    )
};

export default Author;