import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_AUTHOR, GET_AUTHORS } from '../../../queries/authors';
import { useHistory } from "react-router-dom";

function CreateAuthor() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

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
        await createAuthor({ variables: { firstName: firstname, lastName: lastname } });
        setFirstname('')
        setLastname('')
        history.push("/authors");

    }

    return (
        <div className="bg-white rounded shadow px-2">
            <div className="pt-2 text-xl w-full border-b"> Create Author </div>
            <div className="mt-4 w-full flex flex-wrap">
                <div className="mb-2 sm:mr-2 w-full sm:w-48">
                    <input onChange={e => setFirstname(e.target.value)} value={firstname} className="w-full" placeholder="Firstname" type="text" />
                </div>
                <div className="mb-2 w-full sm:w-48">
                    <input onChange={e => setLastname(e.target.value)} value={lastname} className="w-full" placeholder="Lastname" type="text" />
                </div>
                <div className="pb-2 w-full">
                    <button className="btn btn-blue" onClick={saveAuthor}> Save </button>
                </div>
            </div>
        </div>
    )
}

export default CreateAuthor;
