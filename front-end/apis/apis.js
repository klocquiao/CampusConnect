import axios from 'axios';

// Users microservice
const createUser = async (data) => {
    try {
        return await axios.post('/user-service/api/users/create', data);
    } catch (error) {
        console.log(error);
    }
};

// Advertising microservice
const uploadImage = async (data, username) => {
    try {
        return await axios.post(`/upload?username=${username}`, data);
    } catch (error) {
        console.log(error);
    }
}

export {
    createUser, 
    uploadImage
};