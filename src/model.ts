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
  duration: number
}

class Model {
  homeAddress: string | undefined
  savedHomeAddress: string | undefined
  routines: Routine[] | undefined
  selectedRoutine: Routine | undefined
  destinationAddress: string | undefined
  arriveTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined

  constructor() {
    makeAutoObservable(this)
    this.setHomeAddress = this.setHomeAddress.bind(this)
    this.setRoutines = this.setRoutines.bind(this)
    this.setSelectedRoutine = this.setSelectedRoutine.bind(this)
    this.setSavedHomeAddress = this.setSavedHomeAddress.bind(this)
    this.clear = this.clear.bind(this)
    this.doSearch = this.doSearch.bind(this)
    this.setRoute = this.setRoute.bind(this)
    this.setSearchInProgress = this.setSearchInProgress.bind(this)
    this.homeAddress = undefined
    this.savedHomeAddress = undefined
    this.routines = undefined
    this.selectedRoutine = undefined
    this.destinationAddress = undefined
    this.arriveTime = undefined
    this.searchInProgress = false
    this.trips = undefined
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

  setSavedHomeAddress(address: string) {
    this.savedHomeAddress = address
  }

  clear() {
    this.homeAddress = undefined
    this.savedHomeAddress = undefined
    this.routines = undefined
    this.selectedRoutine = undefined
    this.destinationAddress = undefined
    this.arriveTime = undefined
    this.searchInProgress = false
    this.trips = undefined
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
      this.setRoute(undefined, undefined, undefined)
      this.setSearchInProgress(false)
      throw error
    }
  }

  setRoute(
    destinationAddress: string | undefined,
    arriveTime: string | undefined,
    trips: Trip[] | undefined,
  ) {
    this.destinationAddress = destinationAddress
    this.arriveTime = arriveTime
    this.trips = trips
  }

  setSearchInProgress(searchInProgress: boolean) {
    this.searchInProgress = searchInProgress
  }
}

export type { Routine, Activity, Model }
export default Model
