import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import { firebaseConfig } from './apiconf'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { Item, ItemGroup } from './components/profile-page/profile-page-components/profile-page-item'

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

function saveData(user: UserCredential, data: { [key: string]: string }) {
  db.collection('users').doc(user.user.uid).set(data)
}

function saveItemData(user: UserCredential, itemGroups: ItemGroup[]) {
  db.collection('users').doc(user.user.uid).set({ itemGroups: [] }, { merge: true })
  db.collection('users').doc(user.user.uid).set({
    itemGroups: itemGroups.map((group: ItemGroup) => ({
      name: group.name,
      items: group.items.map((item: Item) => ({
        name: item.name,
        description: item.description,
        duration: item.duration,
      }))
    }))
  })
}


export { signInWithGoogle, loadData, saveData , saveItemData }
