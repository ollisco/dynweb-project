import { TRAFFICLAB_API_KEY } from './apiconf'
import axios from 'axios'

class TrafficLabError extends Error {
  constructor(error: unknown) {
    super(`Itinerary could not be calculated: ${error}`)
  }
}

interface Trip {
  Origin: {
    date: string
    time: string
  }
  Destination: {
    date: string
    time: string
  }
  LegList: {
    Leg: {
      Origin: {
        name: string
        time: string
      }
      Destination: {
        name: string
        time: string
      }
      name: string
    }[]
  }
}

// Structure on parameter object in getTrafficInfo.
interface CoordsObj {
  originCoordLat: string
  originCoordLong: string
  destCoordLat: string
  destCoordLong: string
  date: string // YYYY-MM-DD, today if empty
  time: string // HH:MM, now if empty
  searchForArrival: number // 1 if time of arrival instead of departure
}

async function getTrafficInfo(coordsObj: CoordsObj) {
  let apiUrl = `https://api.resrobot.se/v2.1/trip?format=json&accessId=${TRAFFICLAB_API_KEY}&showPassingPoints=true&`

  const params = new URLSearchParams() // uses URLSearchParams to build URL with the given information
  for (const key in coordsObj) {
    if (coordsObj[key as keyof CoordsObj])
      params.append(key, String(coordsObj[key as keyof CoordsObj]))
  }
  apiUrl += params.toString()

  try {
    const trafficInfo = await axios.get(apiUrl)
    return trafficInfo
  } catch (error) {
    throw new TrafficLabError(error)
  }
}

export type { Trip, CoordsObj }
export { TrafficLabError, getTrafficInfo }
