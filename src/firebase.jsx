import firebase from  'firebase/compat/app' 
import 'firebase/compat/auth' 

const app = firebase.initializeApp({
  apiKey: "AIzaSyAZkt_KHfc1Wnbcjx-cs66-7dwISsRRP8A",
  authDomain: "test-website-4aef6.firebaseapp.com",
  projectId: "test-website-4aef6",
  storageBucket: "test-website-4aef6.firebasestorage.app",
  messagingSenderId: "421926823892",
  appId: "1:421926823892:web:5c57d0fbaa6371779d9841",
  measurementId: "G-R8J2CQJD6N"
})

export const auth = app.auth()
export default app
