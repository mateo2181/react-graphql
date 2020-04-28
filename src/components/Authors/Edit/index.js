import React, { useState, useEffect } from 'react';
import { CacheResolver } from 'apollo-cache-inmemory';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AUTHOR, GET_AUTHOR_DETAIL, GET_AUTHORS } from '../../../queries/authors';
import { useHistory } from "react-router-dom";
import { Dropzone } from '../../utils/Dropzone';
import { Form, Grid, Header, Input, Button, TextArea, Image } from 'semantic-ui-react';

function EditAuthor(props) {
    const { match: { params: { id } } } = props;
    const { loading, error, data } = useQuery(GET_AUTHOR_DETAIL, {
        variables: { id }
    });

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [description, setDescription] = useState('');
    const [nationality, setNationality] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    let history = useHistory();

    const [editAuthor] = useMutation(EDIT_AUTHOR,
        {
            update(cache, { data: { editAuthor } }) {
                const { data } = cache.readQuery({ query: GET_AUTHORS });
                const authorsNew = data.authors.map(a => { return (a.id == id) ? editAuthor : a });
                cache.writeQuery({
                    query: GET_AUTHORS,
                    data: { authors: authorsNew },
                });
            }
        });

    async function saveAuthor() {
        await editAuthor({ variables: { id,firstName: firstname, lastName: lastname, description, nationality, file: image } });
        setFirstname('')
        setLastname('')
        setDescription('')
        setNationality('')
        history.push("/authors");
    }

    const onChangeFile = (file) => {
        setImage(file);
    };


    useEffect(() => {
        if (data) {
            // mutate data if you need to
            setFirstname(data.author.firstName)
            setLastname(data.author.lastName)
            setDescription(data.author.description)
            setNationality(data.author.nationality)
            setCurrentImage(data.author.image)
        }
    }, [data])

    if (loading) return "Loading Author...";
    if (error) return <React.Fragment>Error :(</React.Fragment>;


    return (
        <div className="bg-white rounded shadow px-2">
            <Form className="w-full">
                <Grid columns='equal' verticalAlign='middle' padded style={{ width: '100%' }}>
                    <Header as="h2" style={{ marginBottom: '2px', paddingTop: '20px' }}> Edit Author </Header>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={10} computer={10}>
                            <div className="mb-2 w-full">
                                <Input onChange={e => setFirstname(e.target.value)} value={firstname} className="w-full" placeholder="Firstname" type="text" />
                            </div>
                            <div className="mb-2 w-full">
                                <Input onChange={e => setLastname(e.target.value)} value={lastname} className="w-full" placeholder="Lastname" type="text" />
                            </div>
                            <div className="mb-2 w-full">
                                <Input onChange={e => setNationality(e.target.value)} value={nationality} className="w-full" placeholder="Nationality" type="text" />
                            </div>
                            <div className="mb-2 w-full">
                                <TextArea rows="6" onChange={e => setDescription(e.target.value)} value={description} className="w-full" placeholder="Description" type="text" />
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            {currentImage && !image ? <Image className='mx-auto w-30 h-40 object-top' src={`${currentImage}`} /> : ''}
                            <Dropzone imageEvent={onChangeFile} />
                        </Grid.Column>
                    </Grid.Row>
                    <div className="pb-2 w-full">
                        <Button primary onClick={saveAuthor}> Update </Button>
                    </div>
                </Grid>
            </Form>
        </div>
    )
}

export default EditAuthor;
