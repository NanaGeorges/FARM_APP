// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTrGIhjLS8jtLYQF1z3OgrBzK1RzCa6RA",
  authDomain: "mymcaproject-1687c.firebaseapp.com",
  projectId: "mymcaproject-1687c",
  storageBucket: "mymcaproject-1687c.appspot.com",
  messagingSenderId: "264839913317",
  appId: "1:264839913317:web:489e0ba5a3ae1937444b8c",
  measurementId: "G-WD94W5MZBZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);