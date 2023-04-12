import { UserCredential } from '@firebase/auth'
import { signInWithGoogle } from './Firebase'
import { makeAutoObservable } from 'mobx'

export interface Coordinates {
  latitude: string
  longitude: string
}

class Model {
  user: UserCredential | null
  homeCoords: Coordinates | null
  homeAddress: string | null

  constructor(user: UserCredential | null = null) {
    makeAutoObservable(this)
    this.user = user
    this.onLogin = this.onLogin.bind(this)
    this.signIn = this.signIn.bind(this)
    this.homeCoords = null
    this.homeAddress = null
  }

  onLogin(user: UserCredential | null) {
    this.user = user
  }

  signIn() {
    const onError = (error: unknown) => null
    signInWithGoogle(this.onLogin, onError)
  }

  setHomeAddress(address: string, coords: Coordinates) {
    this.homeAddress = address
    this.homeCoords = coords
  }
}

export default Model
