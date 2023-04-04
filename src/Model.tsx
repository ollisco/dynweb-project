import { UserCredential } from '@firebase/auth'
import { signInWithGoogle } from './Firebase'
import { makeAutoObservable } from 'mobx'

class Model {
  user: UserCredential | null
  //user: UserCredential | null = null

  constructor(user: UserCredential | null = null) {
    makeAutoObservable(this)
    this.user = user
    this.signIn.bind(this)
  }

  setUser(user: UserCredential | null) {
    this.user = user
  }

  signIn () {
    // const onLogin = (user: UserCredential) => {
    //   console.log(this, user)
    //   this.user = user
    // }
    const onError = (error: unknown) => null
    console.log('logging in')
    signInWithGoogle(this.setUser, onError)
}

}

export default Model
