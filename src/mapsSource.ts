import { MAPS_API_KEY } from './apiconf'
import axios from 'axios'

async function addressToCoords(address: string) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: MAPS_API_KEY,
      },
    })
    const coords = response.data.results[0].geometry.location
    return {
      latitude: coords.lat,
      longitude: coords.lng,
    }
  } catch (error) {
    console.error(`Error calling Geocoding API: ${error}`)
    return null
  }
}

export { addressToCoords }
