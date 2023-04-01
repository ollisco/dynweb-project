import ApiCalendar from "react-google-calendar-api";
import { GCAL_API_KEY, GCAL_CLIENT_ID, MAPS_API_KEY } from "./apiconf";

const gcal = new ApiCalendar({
  clientId: GCAL_CLIENT_ID,
  apiKey: GCAL_API_KEY,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",],
});

function calAuth() {
  gcal.handleAuthClick()
}

function calSignOut() {
  gcal.handleSignoutClick()
}

function getFirstEventData() {

  function extractData(result: any) {
    return result.result.items.map((event: any) => {
      return {
        'start': event.start.dateTime,
        'location': event.location
      }
    })
  }

  function convertToCoords(events: any) {
    events.map((event: any) => {
      convertAddressToCoords(event.location)
      .then((coords) => {event.location = coords})
    })
    return events
  }

  return gcal.listUpcomingEvents(10).then(extractData).then(convertToCoords);
}

function convertAddressToCoords(address: string) {
  return (
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${MAPS_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const coords = data.results[0].geometry.location;
      return {
        'latitude': coords.lat,
        'longitude': coords.lng
      }
    })
    .catch(error => {
      console.error(`Error calling Geocoding API: ${error}`);
      return null;
    })
  )
}

export {calAuth, calSignOut, getFirstEventData, convertAddressToCoords}