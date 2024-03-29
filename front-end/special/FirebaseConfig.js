import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/*
Go here to fetch your Firebase Config file:
https://console.firebase.google.com/

Click into the project. Click the gear icon on the top left
then click "Project Settings"

Under "Your apps", create a new web app. After creating there'll be a
window with const firebaseConfig. Copy it here:
*/

const firebaseConfig = {
    apiKey: "AIzaSyDZJbpmAoSvcp2YyQ8tweVRaghjBzu-HTc",
    authDomain: "campus-connect-cmpt474-cbe1f.firebaseapp.com",
    projectId: "campus-connect-cmpt474",
    storageBucket: "campus-connect-cmpt474.appspot.com",
    messagingSenderId: "431311462069",
    appId: "1:431311462069:web:fe75a2c83db09d86b628fc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);