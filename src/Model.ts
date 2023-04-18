import { UserCredential } from '@firebase/auth'
import { signInWithGoogle, loadData, saveData } from './Firebase'
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

  constructor() {
    makeAutoObservable(this)
    this.signIn = this.signIn.bind(this)
    this.setUser = this.setUser.bind(this)
    this.setHomeAddress = this.setHomeAddress.bind(this)
    this.saveHomeAddress = this.saveHomeAddress.bind(this)
    this.setRoute = this.setRoute.bind(this)
    this.setRouteLoading = this.setRouteLoading.bind(this)
    this.user = null
    this.homeAddress = undefined
    this.destinationAddress = undefined
    this.leaveTime = undefined
    this.arriveTime = undefined
    this.routeLoading = false
  }

  async signIn() {
    try {
      const user = await signInWithGoogle()
      this.setUser(user)
      const data = await loadData(user)
      if (data) this.setHomeAddress(data.homeAddress)
    } catch (error) {
      console.error(error)
    }
  }

  setUser(user: UserCredential) {
    this.user = user
  }

  setHomeAddress(address: string) {
    this.homeAddress = address
  }

  saveHomeAddress(address: string) {
    if (this.user) saveData(this.user, { homeAddress: address })
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
