import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import Model from './model'
import { makeAutoObservable, observe } from 'mobx'

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

class Auth {
  user: UserCredential | null
  model: Model

  constructor(model: Model) {
    makeAutoObservable(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.setUser = this.setUser.bind(this)
    this.loadData = this.loadData.bind(this)
    this.saveData = this.saveData.bind(this)
    this.model = model

    const savedUser = localStorage.getItem('user')
    this.user = savedUser ? (JSON.parse(savedUser) as UserCredential) : null
    if (this.user) this.loadData()
    observe(this.model, (change) => {
      if (change.name === 'savedHomeAddress' || change.name === 'routines') {
        this.saveData()
      }
    })
  }

  async signIn() {
    const user = await signInWithPopup(auth, provider)
    this.setUser(user)
    localStorage.setItem('user', JSON.stringify(this.user))
    this.loadData()
  }

  signOut() {
    this.setUser(null)
    localStorage.removeItem('user')
    this.model.clear()
  }

  setUser(user: UserCredential | null) {
    this.user = user
  }

  async loadData() {
    if (this.user) {
      const data = (await db.collection('users').doc(this.user.user.uid).get()).data()
      if (data) {
        if (data.homeAddress) {
          this.model.setHomeAddress(data.homeAddress)
          this.model.setSavedHomeAddress(data.homeAddress)
        }
        if (data.routines) {
          this.model.setRoutines(data.routines)
        }
      }
    }
  }

  saveData() {
    if (this.user) {
      const homeAddress = this.model.homeAddress ? this.model.homeAddress : ''
      const routines = this.model.routines ? this.model.routines : []
      db.collection('users').doc(this.user.user.uid).set({
        homeAddress: homeAddress,
        routines: routines,
      })
    }
  }
}

export default Auth
