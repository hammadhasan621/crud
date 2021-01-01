import React from 'react';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAtQHAF3mc3SUdcvttw3xx8MKh9HMBFKo8",
    authDomain: "schoolregistration-6f592.firebaseapp.com",
    projectId: "schoolregistration-6f592",
    storageBucket: "schoolregistration-6f592.appspot.com",
    messagingSenderId: "568447516316",
    appId: "1:568447516316:web:b5cb02964a8aace4133759",
    measurementId: "G-0K5W91WZPR"
  };
 
  export default firebase.initializeApp(firebaseConfig);
  