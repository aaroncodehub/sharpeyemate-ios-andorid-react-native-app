import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "mysharpeyemate",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
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
