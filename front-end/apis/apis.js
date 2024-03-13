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
const getPosts = async (setPost) => {
    try{
        await axios.get('/posting-service/api/posts')
            .then((resp) => {
                setPost(resp);
            })
            .catch((err) => {
                console.log(err);
            })
    } catch (err) {
        console.log(err);
    }
}

// Advertising microservice
const uploadImage = async (data, file, username) => {
    try {
        // return await axios.post(`/upload?username=${username}`, data);
        return await fetch(`/upload?username=${username}`, {
            method: 'POST',
            body: data,
            files: file
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