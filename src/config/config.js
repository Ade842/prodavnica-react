import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
var firebaseConfig = {
    apiKey: "AIzaSyDM3B4Nu8j3XxncCFD_HPXCjgbRMF-pEdw",
    authDomain: "ispit-32a0e.firebaseapp.com",
    projectId: "ispit-32a0e",
    storageBucket: "ispit-32a0e.appspot.com",
    messagingSenderId: "261728715587",
    appId: "1:261728715587:web:a71643bc3e97842d4425f6",
    measurementId: "G-H4XB63GGDF"
};
firebase.initializeApp(firebaseConfig);

const auth= firebase.auth();
const db=firebase.firestore();
const storage=firebase.storage();

export {auth, db, storage};