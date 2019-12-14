import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_BOOK, GET_BOOKS } from '../../../queries/books';
import { GET_AUTHORS } from '../../../queries/authors';
import { useHistory } from "react-router-dom";
import { Dropzone } from '../../utils/Dropzone';
import { Input, TextArea, Form, Button, Grid, Header } from 'semantic-ui-react';

function CreateBook() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [authorId, setAuthor] = useState('');
    const [image, setImage] = useState(null);

    let history = useHistory();

    const { loading, error, data } = useQuery(GET_AUTHORS);

    const [createBook] = useMutation(CREATE_BOOK,
        {
            update(cache, { data: { createBook } }) {
                const { books } = cache.readQuery({ query: GET_BOOKS });
                cache.writeQuery({
                    query: GET_BOOKS,
                    data: { books: books.concat([createBook]) },
                });
            }
        });

    async function saveBook() {
        await createBook({ variables: { title, description, authorId, file: image } });
        setTitle('')
        setDescription('')
        history.push("/books");

    }

    const onChangeFile = (file) => {
        setImage(file);
    };

    if (loading) return "Loading Authors";

    return (
        <div className="bg-white rounded shadow px-2">
            <div className="mt-2">
                <Form className="w-full">
                    <Grid columns='equal' verticalAlign='middle' padded style={{ width: '100%' }}>
                        <Header as="h2" style={{ marginBottom: '2px', paddingTop: '20px' }}> Create Book </Header>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <div className="mb-2 w-full">
                                    <select onChange={e => setAuthor(e.target.value)} className="w-full">
                                        <option value={null}> Author </option>
                                        {data.authors.map(a => (<option key={a.id} value={a.id}> {a.firstName} {a.lastName} </option>))}
                                    </select>
                                </div>
                                <div className="mb-2 w-full">
                                    <Input onChange={e => setTitle(e.target.value)} value={title} className="w-full" placeholder="Title" type="text" />
                                </div>
                                <div className="mb-2 w-full">
                                    <TextArea rows="5" onChange={e => setDescription(e.target.value)} value={description} className="w-full" placeholder="Description" />
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <Dropzone imageEvent={onChangeFile} />
                            </Grid.Column>
                        </Grid.Row>
                        <div className="pb-2 w-full">
                            <Button primary onClick={saveBook}> Save </Button>
                        </div>
                    </Grid>
                </Form>

                {/* <UploadFile /> */}
            </div>
        </div>
    )
}

export default CreateBook;
