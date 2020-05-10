import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../../../queries/authors';
import Author from '../Author';
import { Link } from "react-router-dom";
import { Grid, Button, Container, Icon } from 'semantic-ui-react';
import { FlexWrap } from '../../../globalStyles';
import styled from 'styled-components';
import useIntersection from '../../../hooks/useIntersection';

const WrapperAuthor = styled.div`
    width: 50%;
    @media(max-width: 630px) {
        width: 100%;
    }   
`;

const Authors = () => {

    const {isIntersecting, ref} = useIntersection({once: false});

    const { loading, error, data, fetchMore } = useQuery(GET_AUTHORS, {
        variables: {
            offset: 0,
            limit: 10
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        if(!loading && isIntersecting) {
            console.log("LOAD");
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
    },[isIntersecting])

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
            <FlexWrap data-testid="author-children" className="w-full">
                {data ? data.authors.map(a => (
                    <WrapperAuthor key={a.id}> <Author author={a} key={a.id} /> </WrapperAuthor>
                )) 
                : ''}

            </FlexWrap>
            {/* </Grid> : ''} */}
            {loading ? <div style={{minHeight: '20vh'}}> Loading... </div>: ''}

            <div ref={ref}></div>
        </Grid>
    );
}

export default Authors;