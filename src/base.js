import * as firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_DB_KEY,
    authDomain: process.env.REACT_APP_DB_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_DB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DB_STORAGE_BUCKET,
    messagingSenderId: process.env.EACT_APP_DB_SENDER_ID
})

export default app;