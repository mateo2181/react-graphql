import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHOR_DETAIL } from '../../../queries/authors';
import { Header, Grid, Image } from 'semantic-ui-react';
import BookAuthor from '../BookAuthor';

function AuthorDetail(props) {

    const { match: { params: { id } } } = props;

    const { loading, error, data } = useQuery(GET_AUTHOR_DETAIL, {
        variables: { id }
    });

    if (loading) return "Loading";
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    let { firstName, lastName, description, image, books } = data.author;

    return (
        <Grid padded className="bg-white rounded">
            <Grid columns='equal' verticalAlign='middle'>
                <Grid.Column mobile={4} tablet={4} computer={4}>
                    <Image rounded className='h-40 object-cover object-top w-full' src={`${image}`} />
                </Grid.Column>
                <Grid.Column>
                    <Header as="h2" style={{ marginBottom: '2px', paddingTop: '20px' }}> {firstName} {lastName} </Header>
                    <div className="text-gray-700">
                        {description}
                    </div>
                </Grid.Column>
            </Grid>
            {books.length > 0 ?
                <div className="w-full">
                    <Header as="h3" style={{ marginBottom: '10px', paddingTop: '15px' }}> Books </Header>
                    <Grid>
                        {books.map(b => <BookAuthor key={b.id} book={b} />)}
                    </Grid>
                </div>
                : 
                <Grid className="w-full mt-2">
                    <Grid.Column className="text-lg"> No Books </Grid.Column>
                </Grid>
            }
        </Grid>
    );
}

export default AuthorDetail;