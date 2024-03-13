import axios from 'axios';

// Users microservice
const createUser = async (data) => {
    try {
        return await axios.post('/user-service/api/users/create', data);
    } catch (error) {
        console.log(error);
    }
};

// Post microservice - create posts
const createPost = async (data) => {
    try {
        return await axios.post('/posting-service/api/posts/create', data);
    } catch (error) {
        console.log(error);
    }
}

// Post microservice - get posts
const getPosts = async (setPost) => {
    try{/api/posts
        await axios.get('/posting-service')
            .then((resp) => {
                setPost(resp.data);
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
    createPost,
    getPosts, 
    uploadImage
};