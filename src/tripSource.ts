import { TRAFFICLAB_API_KEY } from './apiconf'
import axios from 'axios'
import { addressToCoords } from './mapsSource'

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

async function createCoordsObj(
  originAddress: string,
  destinationAddress: string,
  date: Date,
  time: string,
  searchForArrival: number,
) {
  const originCoords = await addressToCoords(originAddress)
  const destinationCoords = await addressToCoords(destinationAddress)
  const coordsObj: CoordsObj = {
    originCoordLat: originCoords?.latitude,
    originCoordLong: originCoords?.longitude,
    destCoordLat: destinationCoords?.latitude,
    destCoordLong: destinationCoords?.longitude,
    date: date.toISOString().substring(0, 10),
    time: time.substring(0, 5),
    searchForArrival: searchForArrival,
  }
  return coordsObj
}

async function getTrafficInfo(coordsObj: CoordsObj) {
  let apiUrl = `https://api.resrobot.se/v2.1/trip?format=json&accessId=${TRAFFICLAB_API_KEY}&showPassingPoints=true&`

  const params = new URLSearchParams() // uses URLSearchParams to build URL with the given information
  for (const key in coordsObj) {
    if (coordsObj[key as keyof CoordsObj])
      params.append(key, String(coordsObj[key as keyof CoordsObj]))
  }
  apiUrl += params.toString()

  return axios.get(apiUrl)
}


// ↓ unused currently
// function getRelevantInfo(data: any) {
//   function getStartAndArrivalTimes(trip: any) {
//     return {
//       origin: { date: trip.Origin.date, time: trip.Origin.time },
//       destination: { date: trip.Destination.date, time: trip.Destination.time },
//     }
//   }
//   return data.Trip.map(getStartAndArrivalTimes) // Add more if needed
// }

export type { CoordsObj }
export { createCoordsObj, getTrafficInfo }
