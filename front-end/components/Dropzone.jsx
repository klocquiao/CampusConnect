import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { uploadImage } from '../apis/apis';

const Dropzone = (props) => {
    
    const onDrop = useCallback(acceptedFiles => {
            const formData = new FormData();
            const file = acceptedFiles.at(-1);
            const username = 'swag'.concat('_user');
            const bucketUrl = props.bucketUrl;
            formData.append('file', file);
            uploadImage(bucketUrl, formData, file, username); // TODO change user name to actual username
            props.setRecentImage(file);
            props.setUploadStatus(respJson.message);
        }, [])
        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

        return (
        <div {...getRootProps()} className={props.className}>
            <input {...getInputProps()} />
            {
            isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
        )
};

export {Dropzone};