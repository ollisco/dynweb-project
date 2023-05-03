import { MAPS_API_KEY, GEOAPIFY_KEY } from './apiconf'
import axios from 'axios'

interface Coordinates {
  latitude: string
  longitude: string
}

class AddressError extends Error {
  address: string

  constructor(address: string) {
    super(`Invalid address: ${address}`)
    this.address = address
  }
}

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
    throw new AddressError(address)
  }
}

async function getAutocompleteSuggestions(value: string) {
  if (value.trim().length < 3) return [] // API won't give results for strings shorter than 3 letters
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
    return response.data.results.map((item: { address_line1: string; address_line2: string }) => {
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

export type { Coordinates }
export { addressToCoords, getAutocompleteSuggestions, AddressError }
