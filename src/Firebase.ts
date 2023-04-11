import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import { firebaseConfig } from './apiconf'

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
      onLogin(result)
    })
    .catch((error) => {
      onError(error)
    })
}
