import axios from 'axios'
import { MAPS_API_KEY } from './apiconf'
import { event } from './calendarSource'
import { CoordsObj } from './tripSource'

async function addressToCoords(address: string) {
  if (address === undefined) return null

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

async function eventToCoordsObj(event: event) {
  let coords = await addressToCoords(event.location)
  const coordsObj: CoordsObj = {
    originCoordLat: '59.329124',
    originCoordLong: '18.068834',
    destCoordLat: coords?.latitude,
    destCoordLong: coords?.longitude,
    date: event.start.substring(0, 10),
    time: event.start.substring(11, 16),
    searchForArrival: 0,
  }
  return coordsObj
}

export { eventToCoordsObj, addressToCoords }
