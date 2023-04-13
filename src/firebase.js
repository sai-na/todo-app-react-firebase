// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: YOUR_API_KEY,
//   authDomain: YOUR_AUTHDOMAIN,
//   projectId: YOUR_PROJECTID,
//   storageBucket: YOUR_STORAGEBUCKET,
//   messagingSenderId: YOUR_MESSAGING_SENDER_ID,
//   appId: YOUR_APPID
// };


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf3Cl47EZWnrwbcFnv1qnl4HtMxrB0lk8",
  authDomain: "todo-test-b9ae4.firebaseapp.com",
  projectId: "todo-test-b9ae4",
  storageBucket: "todo-test-b9ae4.appspot.com",
  messagingSenderId: "550119004993",
  appId: "1:550119004993:web:c964d445445062ea04dfc0"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)