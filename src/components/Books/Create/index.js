import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_BOOK, GET_BOOKS } from '../../../queries/books';
import { GET_AUTHORS } from '../../../queries/authors';
import { useHistory } from "react-router-dom";
import { Dropzone } from '../Dropzone';

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
        // if (validity.valid) {
            setImage(file);
        // }

        // uploadFileMutation({ variables: { file } }).then(() => {
        //     apolloClient.resetStore()
        // })
    };

    if (loading) return "Loading Authors";

    return (
        <div className="bg-white rounded shadow px-2">
            <div className="pt-2 text-xl w-full border-b"> Create Book </div>
            <div className="mt-4 flex flex-wrap items-center w-full">
                <div className="w-full sm:w-2/3 lg:w-3/5">
                    <div className="mb-2 w-full">
                        <select onChange={e => setAuthor(e.target.value)} className="w-full">
                            <option value={null}> Author </option>
                            {data.authors.map(a => (<option key={a.id} value={a.id}> {a.firstName} {a.lastName} </option>))}
                        </select>
                    </div>
                    <div className="mb-2 w-full">
                        <input onChange={e => setTitle(e.target.value)} value={title} className="w-full" placeholder="Title" type="text" />
                    </div>
                    <div className="mb-2 w-full">
                        <textarea rows="5" onChange={e => setDescription(e.target.value)} value={description} className="w-full" placeholder="Description"></textarea>
                    </div>
                </div>
                <div className="px-4 w-full sm:w-1/3 lg:w-2/5">
                    <Dropzone imageEvent={onChangeFile} />
                    {/* <input type="file" accept='image/*' onChange={onChangeFile} /> */}
                </div>
                <div className="pb-2 w-full">
                    <button className="btn btn-blue" onClick={saveBook}> Save </button>
                </div>

                {/* <UploadFile /> */}
            </div>
        </div>
    )
}

export default CreateBook;
