import axios from 'axios';
// const {GoogleAuth} = require('google-auth-library');

// const auth = new GoogleAuth({
//     scopes: 'https://www.googleapis.com/auth/cloud-platform',
// });
// const token = await auth.getAccessToken()

// const config = {
//     headers: {
//         'Authorization': `Bearer ${token}`
//     }
// };

// Users microservice
export const createUser = async (url, data, token) => {
    try {
        return await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
    }
};