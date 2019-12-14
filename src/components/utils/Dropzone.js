import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'


const Container = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    padding: '8px',
    borderWidth: '2px',
    borderRadius: '2px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#dad9d9',
    color: '#424242',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

export function Dropzone({ imageEvent }) {
    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        const img = acceptedFiles[0];
        imageEvent(img);
        setFile(URL.createObjectURL(img));

    };
    
    const { getRootProps, getInputProps } = useDropzone({ multiple: false, accept: 'image/jpeg, image/png', onDrop })

    return (
        <div>
            {file ?
                <div>
                    <img className="mx-auto mt-2 object-contain w-24 h-40" src={file}></img>
                </div>
                : ''}
            <div {...getRootProps({ style: Container, className: 'text-sm w-full mx-auto' })}>
                <input {...getInputProps({ max: 1 })} />
                <p>Drag and drop image here, or click to select</p>
            </div>
        </div>

    )
}