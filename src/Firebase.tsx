import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBSjf9kGNa1IzryY7a2GpbJ-8QbIr28Swg',
  authDomain: 'komitid-cb8e5.firebaseapp.com',
  databaseURL: 'https://komitid-cb8e5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'komitid-cb8e5',
  storageBucket: 'komitid-cb8e5.appspot.com',
  messagingSenderId: '568442634445',
  appId: '1:568442634445:web:2b396de1b349bd4541e984',
  measurementId: 'G-KWPFC22M84',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = (
  onLogin: (user: UserCredential) => void,
  onError: (error: unknown) => void,
) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      onLogin(result)
    })
    .catch((error) => {
      console.log(error)
      onError(error)
    })
}
