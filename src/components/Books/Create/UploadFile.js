import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { SINGLE_UPLOAD_BOOK } from '../../../queries/books';


export const UploadFile = () => {
    const [uploadFileMutation] = useMutation(SINGLE_UPLOAD_BOOK)
    const apolloClient = useApolloClient()

    const onChange = ({ target: { validity, files: [file] } }) =>
        validity.valid &&
        uploadFileMutation({ variables: { file } }).then(() => {
            apolloClient.resetStore()
        })

    return <input type="file" required onChange={onChange} />
}