import axios from 'axios';

const TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4YmY1YzM3NzJkZDRlN2E3MjdhMTAxYmY1MjBmNjU3NWNhYzMyNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3Mzc5MzU2ODM0NTQ2NzQ5MzA4IiwiZW1haWwiOiJmcmVlbWFueGpsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoia1hYNjkyQWxLQjAzMkdJVk5fUXEtdyIsIm5iZiI6MTcxMDMxMTEyMCwiaWF0IjoxNzEwMzExNDIwLCJleHAiOjE3MTAzMTUwMjAsImp0aSI6ImQ0OWM0NmIwMmI3MGViMzJlODUwY2I4Njg3ZWY1ZjA2MjYyMzhlNjUifQ.qxNYhW1m0yDTzo7a_NqOIDq3hyvD76Ebf2Hh8gjMgr4MtGm1xuQGdz6OAPsA1drUpuwONtm1CSbeB9i_bKp2M1xtoVbnqc6HYrvK1kfrlr2SGGHU2mHeqTRNIR2jY3Emal38STCJJU-ed6kQVfHBbCUxp5VW9-Wp9s7Ah4N0IyDMdktwYqILA7O29Bg6SsRm6uZUy3s3NB9NWp86Uir9SRjq9LmabtuDOf2KPKAfHIZYth1Aivls3e1lXjlo6RjKjImkCbLDWCHjKnRnuFvf7GXm7JZBD7jLVYiXFERuP9E-lGErjryiTk-vRZiHkWZXw00iIW-lF25US3qli4sgCQ"

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
            ContentType: "application/json",
            Authorization: `Bearer $(gcloud auth print-identity-token)`,
        }
      });
      console.log(response);
    //   return response.data;
    // const result = await post('https://httpbin.org/delay/3', token, req);
};