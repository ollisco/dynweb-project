import axios from 'axios'

class TripError extends Error {
  code = ''
  constructor(error: unknown) {
    super(`Itinerary could not be calculated: ${error}`)
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof error.code === 'string'
    )
      this.code = error.code
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
      type: string
      direction: string
      duration: string
      category: string
    }[]
  }
  duration: string
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

const getTrafficInfo = async (coordsObj: CoordsObj) => {
  let apiUrl = `https://api.resrobot.se/v2.1/trip?format=json&accessId=${
    import.meta.env.VITE_TRAFFICLAB_API_KEY
  }&showPassingPoints=true&`

  const params = new URLSearchParams() // uses URLSearchParams to build URL with the given information
  for (const key in coordsObj) {
    if (coordsObj[key as keyof CoordsObj])
      params.append(key, String(coordsObj[key as keyof CoordsObj]))
  }
  apiUrl += params.toString()

  try {
    const trafficInfo = await axios.get(apiUrl, { timeout: 5000 })
    return trafficInfo
  } catch (error) {
    throw new TripError(error)
  }
}

export type { Trip, CoordsObj }
export { TripError, getTrafficInfo }
