import axios from 'axios'
import { trafikLabKey } from './keys'

// Structure on parameter object in getTrafficInfo.
interface CoordsObj {
  originCoordLat: string
  originCoordLong: string
  destCoordLat: string
  destCoordLong: string
}

function getTrafficInfo(coordsObj: CoordsObj) {
  let apiUrl = `https://api.resrobot.se/v2.1/trip?format=json&accessId=${trafikLabKey}&showPassingPoints=true&`

  const params = new URLSearchParams() // uses URLSearchParams to build URL with the given information
  for (const key in coordsObj) {
    params.append(key, coordsObj[key as keyof CoordsObj])
  }
  apiUrl += params.toString()

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data) // just logging response to terminal for now
    })
    .catch((error) => {
      console.error(error)
    })
}

export type { CoordsObj }
export { getTrafficInfo }
