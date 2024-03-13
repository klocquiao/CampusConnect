import axios from 'axios';

// Users microservice
const createUser = async (data) => {
    try {
        return await axios.post('/user-service/api/users/create', data);
    } catch (error) {
        console.log(error);
    }
};

// Post microservice - get posts
const getPosts = async () => {
    try{
        const response = await fetch('/posting-service/api/posts', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

// Advertising microservice
const uploadImage = async (data, username) => {
    try {
        // return await axios.post(`/upload?username=${username}`, data);
        return await fetch(`/upload?username=${username}`, {
            method: 'POST',
            body: data
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    createUser,
    getPosts, 
    uploadImage
};