import axios from 'axios';

// Users microservice
export const createUser = async (url, data) => {
    try {
        return await axios.post(url, data);
    } catch (error) {
        console.log(error);
    }
};