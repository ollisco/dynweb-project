import { MAPS_API_KEY, GEOAPIFY_KEY } from './apiconf'
import axios from 'axios'
import { ItemProps } from './components/form/form-presenter'

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

async function getSuggestions(value: string) {
  try {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
      params: {
        apiKey: GEOAPIFY_KEY,
        text: value,
        filter: 'countrycode:se', // only search for swedish adresses
        lang: 'sv',
        format: 'json',
      },
    })
    console.log(response)
    return response.data.results.map((item: { address_line1: string; address_line2: string }, index: number) => {
      const returnObj = {
        street: item.address_line1,
        postcodeAndCity: item.address_line2,
      }
      return returnObj
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export { addressToCoords, getSuggestions }
