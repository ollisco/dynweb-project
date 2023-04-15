import { UserCredential } from '@firebase/auth'
import { signInWithGoogle } from './Firebase'
import { makeAutoObservable } from 'mobx'

export interface Coordinates {
  latitude: string
  longitude: string
}

class Model {
  user: UserCredential | null
  homeAddress: string | undefined
  destinationAddress: string | undefined
  leaveTime: string | undefined
  arriveTime: string | undefined
  routeLoading: boolean

  constructor(user: UserCredential | null = null) {
    makeAutoObservable(this)
    this.user = user
    this.onLogin = this.onLogin.bind(this)
    this.signIn = this.signIn.bind(this)
    this.setHomeAddress = this.setHomeAddress.bind(this)
    this.setRoute = this.setRoute.bind(this)
    this.setRouteLoading = this.setRouteLoading.bind(this)
    this.homeAddress = undefined
    this.destinationAddress = undefined
    this.leaveTime = undefined
    this.arriveTime = undefined
    this.routeLoading = false
  }

  onLogin(user: UserCredential | null) {
    this.user = user
  }

  signIn() {
    const onError = (error: unknown) => null
    signInWithGoogle(this.onLogin, onError)
  }

  setHomeAddress(address: string) {
    this.homeAddress = address
  }

  setRoute(destionationAddress: string, leaveTime: string, arriveTime: string) {
    this.destinationAddress = destionationAddress
    this.leaveTime = leaveTime
    this.arriveTime = arriveTime
  }

  setRouteLoading(loading: boolean) {
    this.routeLoading = loading
  }
}

export default Model
