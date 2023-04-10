import { UserCredential } from '@firebase/auth'
import { signInWithGoogle } from './Firebase'
import { makeAutoObservable } from 'mobx'
import useAuth from './components/login/user-context'
import { CoordsObj } from './tripSource'

interface Coordinates {
  latitude: string
  longitude: string
}

class Model {
  user: UserCredential | null
  homeCoords: Coordinates | null

  constructor(user: UserCredential | null = null) {
    makeAutoObservable(this)
    this.user = user
    this.onLogin = this.onLogin.bind(this)
    this.signIn = this.signIn.bind(this)
    this.homeCoords = null
  }

  onLogin(user: UserCredential | null) {
    this.user = user
    console.log('has user changed?', user)
  }

  signIn() {
    const onError = (error: unknown) => null
    console.log('logging in')
    signInWithGoogle(this.onLogin, onError)
  }

  setHomeCoords(coords: Coordinates) {
    this.homeCoords = coords
  }
}

export default Model
