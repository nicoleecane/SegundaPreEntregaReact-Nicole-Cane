import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAxfkAjMmJCkv7CJXJsenQd665cyWpONE",
  authDomain: "attack-af0ae.firebaseapp.com",
  projectId: "attack-af0ae",
  storageBucket: "attack-af0ae.appspot.com",
  messagingSenderId: "237171675273",
  appId: "1:237171675273:web:b9af2cebc97cf4e70ff658"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);




