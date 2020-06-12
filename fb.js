import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyAll-VaHFJWg6jwQ-BPnx80g6QAdNrMb1s",
    authDomain: "mysharpeyemate.firebaseapp.com",
    databaseURL: "https://mysharpeyemate.firebaseio.com",
    projectId: "mysharpeyemate",
    storageBucket: "mysharpeyemate.appspot.com",
    messagingSenderId: "67037945546",
    appId: "1:67037945546:web:1df278cc49c23a3bef9e33",
    measurementId: "G-274K5GPPX7"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()



// firebase collections
const usersCollection = db.collection('users')
const ordersCollection = db.collection('orders')
const settingsCollection = db.collection('settings')


export {
    db,
    auth,
    usersCollection,
    ordersCollection,
    settingsCollection
}
