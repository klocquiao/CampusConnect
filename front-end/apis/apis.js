import axios from 'axios';

// Users microservice
export const createUser = async (url, data) => {
    try {
        return await axios.post(url, data);
    } catch (error) {
        console.log(error);
    }
};

// Post microservice - get posts
export const getPosts = async () => {
    try{
        const response = await fetch('/posting-service/api/posts', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authentication': 'Bearer $(gcloud auth print-identity-token)',
            },
        });
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};