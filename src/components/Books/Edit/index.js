import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EDIT_BOOK, GET_BOOKS, GET_BOOK_DETAIL } from '../../../queries/books';
import { GET_AUTHORS } from '../../../queries/authors';
import { useHistory } from "react-router-dom";
import { Dropzone } from '../../utils/Dropzone';
import { Input, TextArea, Form, Button, Grid, Header, Image } from 'semantic-ui-react';

function EditBook(props) {
    const { match: { params: { id } } } = props;
    const { loading: loadingBookDetail, error: errorBookDetail, data: dataBookDetail } = useQuery(GET_BOOK_DETAIL, {
        variables: { id }
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [authorId, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    let history = useHistory();

    const { loading, error, data: dataAuthors } = useQuery(GET_AUTHORS);

    const [editBook] = useMutation(EDIT_BOOK);
    // const [editBook] = useMutation(EDIT_BOOK,
    //     {
    //         update(cache, { data: { editBook } }) {
    //             const { books } = cache.readQuery({ query: GET_BOOKS });
    //             console.log(books);
    //             const booksNew = books.map(a => { return (a.id == id) ? editBook : a });
    //             cache.writeQuery({
    //                 query: GET_BOOKS,
    //                 data: { books: booksNew },
    //             });
    //         }
    //     });

    async function saveBook() {
        await editBook({ variables: { id, title, description, authorId, file: image } });
        setTitle('')
        setDescription('')
        history.push("/books");

    }

    const onChangeFile = (file) => {
        setImage(file);
    };

    useEffect(() => {
        if (dataBookDetail) {
            // mutate data if you need to
            setTitle(dataBookDetail.book.title)
            setDescription(dataBookDetail.book.description)
            setAuthor(dataBookDetail.book.author.id)
            setCurrentImage(dataBookDetail.book.image)
        }
    }, [dataBookDetail])

    if (loading) return "Loading Authors...";

    return (
        <div className="bg-white rounded shadow px-2">
            <div className="mt-2">
                <Form className="w-full">
                    <Grid columns='equal' verticalAlign='middle' padded style={{ width: '100%' }}>
                        <Header as="h2" style={{ marginBottom: '2px', paddingTop: '20px' }}> Update Book </Header>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={10} computer={10}>
                                <div className="mb-2 w-full">
                                    <select onChange={e => setAuthor(e.target.value)} value={authorId} className="w-full">
                                        <option value={null}> Author </option>
                                        {dataAuthors.authors.map(a => (<option key={a.id} value={a.id}> {a.firstName} {a.lastName} </option>))}
                                    </select>
                                </div>
                                <div className="mb-2 w-full">
                                    <Input onChange={e => setTitle(e.target.value)} value={title} className="w-full" placeholder="Title" type="text" />
                                </div>
                                <div className="mb-2 w-full">
                                    <TextArea rows="6" onChange={e => setDescription(e.target.value)} value={description} className="w-full" placeholder="Description" />
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                {currentImage && !image ? <Image className='mx-auto w-30 h-40 object-top' src={`${process.env.REACT_APP_URI_API}/${currentImage}`} /> : ''}
                                <Dropzone imageEvent={onChangeFile} />
                            </Grid.Column>
                        </Grid.Row>
                        <div className="pb-2 w-full">
                            <Button primary onClick={saveBook}> Update </Button>
                        </div>
                    </Grid>
                </Form>

            </div>
        </div>
    )
}

export default EditBook;
