import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const fireBaseConfig = {
    apiKey: "AIzaSyDaqAqf76C0aDgo2JzMmlMCGBdXEUK4r2Q",
    authDomain: "appquiz-4258a.firebaseapp.com",
    projectId: "appquiz-4258a",
    storageBucket: "appquiz-4258a.appspot.com",
    messagingSenderId: "505264836201",
    appId: "1:505264836201:web:ba1b06ccd06397fccfdcf8",
    measurementId: "G-LF43N727XD"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase }