import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { uploadImage } from '../apis/apis';

const Dropzone = (props) => {
    const [bucketUrl, setBucketUrl] = useState("");

    useEffect(() => {
        if(props.bucketUrl){
            setBucketUrl(props.bucketUrl);
            console.log(props.bucketUrl);
        }
    }, [props.bucketUrl]);
    
    const onDrop = useCallback(acceptedFiles => {
            const formData = new FormData();
            const file = acceptedFiles.at(-1);
            const username = 'swag'.concat('_user');
            formData.append('file', file);
            console.log("TEST" + " " + bucketUrl);
            uploadImage(bucketUrl, formData, file, username); // TODO change user name to actual username
            props.setRecentImage(file);
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