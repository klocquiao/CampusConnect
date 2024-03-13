import axios from 'axios';

const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4YmY1YzM3NzJkZDRlN2E3MjdhMTAxYmY1MjBmNjU3NWNhYzMyNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3Mzc5MzU2ODM0NTQ2NzQ5MzA4IiwiZW1haWwiOiJmcmVlbWFueGpsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiaVp4alVqVmNMT3p2aV9kMlNpS2JzZyIsIm5iZiI6MTcxMDMwNzIxNSwiaWF0IjoxNzEwMzA3NTE1LCJleHAiOjE3MTAzMTExMTUsImp0aSI6IjJlMTZlYTQ2ODhjZDQ1MjBiMTU4YzhlNWVjMjVlNTg0Mzk1NWY0NjMifQ.I9C6pBYmNI98DGxGppS8-T6dsclDqsvYn7f3SM_PS4PcdDMIEq6DIeblF5EZjHLANL2U_93zOfNFq3n0gB9SnFTz5UgxrXNpHBSAvggX71aLTripa5fZVEv2gJ0g7SW1Qstcn3V2oaZcxSd56zNP4STFJLPilZ1dACSkg2Bp8ngywutjV08NmjLZqqzVer78NQxoc3NG7kIUyT-19_9xD9Z-fv9-_mOG-IHvD8pKMDUHNastYrSOvDS_7FVqY0CJB2cANT_mLrE4dsFx6U4mLHnLrvkt3OoTqY5Q4RqGcyFUiF6pcuvVeP2_ckJ9WUGrCOY2eksMlKsrvOw5C2n4PQ"

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
    const response = await axios.get(
      '/posting-service/api/posts',
      {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
      });
      console.log(response);
    //   return response.data;
    // const result = await post('https://httpbin.org/delay/3', token, req);
};