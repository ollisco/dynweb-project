import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { ItemGroup, Item } from './model'

const app = firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'komitid-cb8e5.firebaseapp.com',
  databaseURL: 'https://komitid-cb8e5-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'komitid-cb8e5',
  storageBucket: 'komitid-cb8e5.appspot.com',
  messagingSenderId: '568442634445',
  appId: '1:568442634445:web:2b396de1b349bd4541e984',
  measurementId: 'G-KWPFC22M84',
})
const auth = getAuth(app)
const db = firebase.firestore()
const provider = new GoogleAuthProvider()

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
}

const loadData = (user: UserCredential) => {
  return db
    .collection('users')
    .doc(user.user.uid)
    .get()
    .then((doc) => {
      return doc.data()
    })
}

const saveHomeAddress = (user: UserCredential, homeAddress: string) => {
  db.collection('users').doc(user.user.uid).set({ homeAddress }, { merge: true })
}

const saveItemData = (user: UserCredential, itemGroups: ItemGroup[]) => {
  db.collection('users')
    .doc(user.user.uid)
    .set(
      {
        itemGroups: itemGroups.map((group: ItemGroup) => ({
          name: group.name,
          items: group.items.map((item: Item) => ({
            name: item.name,
            description: item.description,
            duration: item.duration,
          })),
        })),
      },
      { merge: true },
    )
}

export { signInWithGoogle, loadData, saveHomeAddress, saveItemData }
