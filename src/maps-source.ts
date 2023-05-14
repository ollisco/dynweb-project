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

const addressToCoords = async (address: string) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: import.meta.env.VITE_MAPS_API_KEY,
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

const getAutocompleteSuggestions = async (value: string) => {
  if (value.trim().length < 3) return [] // API won't give results for strings shorter than 3 letters
  try {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
      params: {
        apiKey: import.meta.env.VITE_GEOAPIFY_KEY,
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
