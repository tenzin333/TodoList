import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyB9QofmfbFfQMldt5My-r1bsWB4L3LdbYI",
    authDomain: "fir-db-3225f.firebaseapp.com",
    databaseURL: "https://fir-db-3225f.firebaseio.com",
    projectId: "fir-db-3225f",
    storageBucket: "fir-db-3225f.appspot.com",
    messagingSenderId: "956995939666",
    appId: "1:956995939666:web:e9888547d906c8da8d9e8b"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Export initialized modules
export { app as firebase ,db};
