import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import { firebaseConfig } from './apiconf'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';



// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = firebase.firestore();

const provider = new GoogleAuthProvider()

export const signInWithGoogle = (
  onLogin: (user: UserCredential) => void,
  onError: (error: unknown) => void,
) => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      onLogin(result)
    })
    .catch((error) => {
      onError(error)
    })
}

