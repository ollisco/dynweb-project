import { UserCredential } from '@firebase/auth'
import { signInWithGoogle } from './Firebase'
import { makeAutoObservable } from 'mobx'
import useAuth from './components/login/user-context'


class Model {
  user: UserCredential | null
  

  constructor(user: UserCredential | null = null) {
    makeAutoObservable(this)
    this.user = user
    this.onLogin = this.onLogin.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  onLogin(user: UserCredential | null) {
    this.user = user
    console.log("has user changed?", user)
  }

  signIn () {
    const onError = (error: unknown) => null
    console.log('logging in')
    signInWithGoogle(this.onLogin, onError)
  }

}

export default Model
