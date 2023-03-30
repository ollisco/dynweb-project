import axios from 'axios'
import { trafikLabKey } from './keys'

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

function getTrafficInfo(coordsObj: CoordsObj) {
  let apiUrl = `https://api.resrobot.se/v2.1/trip?format=json&accessId=${trafikLabKey}&showPassingPoints=true&`

  const params = new URLSearchParams() // uses URLSearchParams to build URL with the given information
  for (const key in coordsObj) {
    if (coordsObj[key as keyof CoordsObj])
      params.append(key, String(coordsObj[key as keyof CoordsObj]))
  }
  apiUrl += params.toString()

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data) // just logging response to terminal for now
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

export type { CoordsObj }
export { getTrafficInfo }
