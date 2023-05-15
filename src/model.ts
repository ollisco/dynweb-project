import { UserCredential } from '@firebase/auth'
import { signInWithGoogle, loadData, saveRoutineData, saveHomeAddress } from './firebase'
import { makeAutoObservable } from 'mobx'
import { CoordsObj, Trip, getTrafficInfo } from './trip-source'
import { addressToCoords } from './maps-source'

interface Routine {
  name: string
  activities: Activity[]
}

interface Activity {
  name: string
  description: string
  duration: number // minutes
}

class Model {
  user: UserCredential | null
  homeAddress: string | undefined
  routines: Routine[] | undefined
  selectedRoutine: Routine | undefined
  destinationAddress: string | undefined
  arriveTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined

  constructor() {
    makeAutoObservable(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
    this.setUser = this.setUser.bind(this)
    this.setHomeAddress = this.setHomeAddress.bind(this)
    this.setRoutines = this.setRoutines.bind(this)
    this.setSelectedRoutine = this.setSelectedRoutine.bind(this)
    this.saveHomeAddress = this.saveHomeAddress.bind(this)
    this.saveRoutines = this.saveRoutines.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.setRoute = this.setRoute.bind(this)
    this.setSearchInProgress = this.setSearchInProgress.bind(this)

    const user = localStorage.getItem('user')
    this.user = user ? (JSON.parse(user) as UserCredential) : null
    this.homeAddress = undefined
    this.routines = undefined
    this.selectedRoutine = undefined
    this.destinationAddress = undefined
    this.arriveTime = undefined
    this.searchInProgress = false
    this.trips = undefined

    if (this.user) this.loadData()
  }

  async signIn() {
    try {
      const user = await signInWithGoogle()
      this.setUser(user)
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async loadData() {
    if (this.user) {
      try {
        const data = await loadData(this.user)
        if (data) {
          this.setHomeAddress(data.homeAddress)
          this.setRoutines(data.routines)
        }
      } catch (error) {
        console.error(error)
      }
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

  setRoutines(routines: Routine[]) {
    this.routines = routines
  }

  setSelectedRoutine(selectedRoutine: Routine | undefined) {
    this.selectedRoutine = selectedRoutine
  }

  saveHomeAddress(address: string) {
    if (this.user) saveHomeAddress(this.user, address)
  }

  saveRoutines(routines: Routine[]) {
    if (this.user) saveRoutineData(this.user, routines)
  }

  async doSearch(
    originAddress: string,
    destinationAddress: string,
    date: Date,
    arriveTime: string,
  ) {
    this.setSearchInProgress(true)
    try {
      const originCoords = await addressToCoords(originAddress)
      const destinationCoords = await addressToCoords(destinationAddress)
      const coordsObj: CoordsObj = {
        originCoordLat: originCoords.latitude,
        originCoordLong: originCoords.longitude,
        destCoordLat: destinationCoords.latitude,
        destCoordLong: destinationCoords.longitude,
        date: date.toISOString().substring(0, 10),
        time: arriveTime.substring(0, 5),
        searchForArrival: 1,
      }
      const trafficInfo = await getTrafficInfo(coordsObj)
      this.setHomeAddress(originAddress)
      this.setRoute(destinationAddress, arriveTime, trafficInfo.data.Trip.reverse())
      this.setSearchInProgress(false)
    } catch (error) {
      this.setSearchInProgress(false)
      throw error
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

export type { Routine, Activity }
export default Model