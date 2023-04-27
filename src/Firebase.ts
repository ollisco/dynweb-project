import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import { firebaseConfig } from './apiconf'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = firebase.firestore()

const provider = new GoogleAuthProvider()

function signInWithGoogle() {
  return signInWithPopup(auth, provider)
}

function loadData(user: UserCredential) {
  return db
    .collection('users')
    .doc(user.user.uid)
    .get()
    .then((doc) => {
      return doc.data()
    })
}

function saveData(user: UserCredential, data: {[key: string]: string}) {
  db.collection('users').doc(user.user.uid).set(data)
}

export { signInWithGoogle, loadData, saveData }
