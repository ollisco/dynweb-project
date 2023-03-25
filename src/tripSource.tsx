import axios from 'axios'
import { trafikLabKey } from './keys'

function getTrafficInfo(origin: string, destination: string) {
  const apiUrl = `https://api.resrobot.se/v2.1/trip?format=json&originId=${origin}&destId=${destination}&passlist=true&showPassingPoints=true&accessId=${trafikLabKey}`

  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export { getTrafficInfo }
