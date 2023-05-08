import { UserCredential } from '@firebase/auth'
import { signInWithGoogle, loadData, saveData } from './Firebase'
import { makeAutoObservable } from 'mobx'
import { CoordsObj, TrafficLabError, Trip, getTrafficInfo } from './tripSource'
import { Coordinates } from './mapsSource'

class Model {
  user: UserCredential | null
  homeAddress: string | undefined
  destinationAddress: string | undefined
  leaveTime: string | undefined
  arriveTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined

  constructor() {
    makeAutoObservable(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.setUser = this.setUser.bind(this)
    this.setHomeAddress = this.setHomeAddress.bind(this)
    this.saveHomeAddress = this.saveHomeAddress.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.setRoute = this.setRoute.bind(this)
    this.setSearchInProgress = this.setSearchInProgress.bind(this)

    const user = localStorage.getItem('user')
    this.user = user ? (JSON.parse(user) as UserCredential) : null

    this.homeAddress = undefined
    this.destinationAddress = undefined
    this.leaveTime = undefined
    this.arriveTime = undefined
    this.searchInProgress = false
    this.trips = undefined
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

  signOut() {
    localStorage.removeItem('user')
    this.user = null
  }

  setUser(user: UserCredential) {
    this.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }

  setHomeAddress(address: string) {
    this.homeAddress = address
  }

  saveHomeAddress(address: string) {
    if (this.user) saveData(this.user, { homeAddress: address })
  }

  async doSearch(
    originAddress: string,
    originCoords: Coordinates,
    destinationAddress: string,
    destinationCoords: Coordinates,
    date: Date,
    arriveTime: string,
  ) {
    this.setSearchInProgress(true)
    const coordsObj: CoordsObj = {
      originCoordLat: originCoords.latitude,
      originCoordLong: originCoords.longitude,
      destCoordLat: destinationCoords.latitude,
      destCoordLong: destinationCoords.longitude,
      date: date.toISOString().substring(0, 10),
      time: arriveTime.substring(0, 5),
      searchForArrival: 1,
    }
    try {
      const trafficInfo = await getTrafficInfo(coordsObj)
      this.setHomeAddress(originAddress)
      this.saveHomeAddress(originAddress)
      this.setRoute(destinationAddress, arriveTime, trafficInfo.data.Trip)
      this.setSearchInProgress(false)
    } catch (error) {
      this.setSearchInProgress(false)
      throw new TrafficLabError(error)
    }
  }

  setRoute(destinationAddress: string, arriveTime: string, trips: Trip[]) {
    this.destinationAddress = destinationAddress
    this.arriveTime = arriveTime
    this.trips = trips
  }

  setSearchInProgress(searchInProgress: boolean) {
    this.searchInProgress = searchInProgress
  }
}

export default Model
