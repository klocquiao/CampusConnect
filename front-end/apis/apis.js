import axios from 'axios';
const {GoogleAuth} = require('google-auth-library');

const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
});
const token = await auth.getAccessToken()

const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

// Users microservice
export const createUser = async (url, data) => {
    try {
        return await axios.post(url, data, config);
    } catch (error) {
        console.log(error);
    }
};