import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_AUTHOR, GET_AUTHORS } from '../../../queries/authors';
import { useHistory } from "react-router-dom";
import { Dropzone } from '../../utils/Dropzone';
import { Form, Grid, Header, Input, Button, TextArea } from 'semantic-ui-react';

function CreateAuthor() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [description, setDescription] = useState('');
    const [nationality, setNationality] = useState('');
    const [image, setImage] = useState(null);

    let history = useHistory();

    const [createAuthor] = useMutation(CREATE_AUTHOR,
        {
            update(cache, { data: { createAuthor } }) {
                const { authors } = cache.readQuery({ query: GET_AUTHORS });
                cache.writeQuery({
                    query: GET_AUTHORS,
                    data: { authors: authors.concat([createAuthor]) },
                });
            }
        });

    async function saveAuthor() {
        await createAuthor({ variables: { firstName: firstname, lastName: lastname, description, nationality, file: image } });
        setFirstname('')
        setLastname('')
        setDescription('')
        setNationality('')
        history.push("/authors");
    }

    const onChangeFile = (file) => {
        setImage(file);
    };

    return (
        <div className="bg-white rounded shadow px-2">
            <Form className="w-full">
                <Grid columns='equal' verticalAlign='middle' padded style={{ width: '100%' }}>
                    <Header as="h2" style={{ marginBottom: '2px', paddingTop: '20px' }}> Create Author </Header>
                    <Grid.Row>
                        <Grid.Column width={10}>
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
                                <TextArea rows="5" onChange={e => setDescription(e.target.value)} value={description} className="w-full" placeholder="Description" type="text" />
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <Dropzone imageEvent={onChangeFile} />
                        </Grid.Column>
                    </Grid.Row>
                    <div className="pb-2 w-full">
                        <Button primary onClick={saveAuthor}> Save </Button>
                    </div>
                </Grid>
            </Form>
        </div>
    )
}

export default CreateAuthor;
