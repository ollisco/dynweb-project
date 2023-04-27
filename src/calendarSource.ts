import { GCAL_API_KEY, GCAL_CLIENT_ID } from './apiconf'
import ApiCalendar from './ApiCalendar'
import { Trip } from './Model'

const gcal = new ApiCalendar({f
  clientId: GCAL_CLIENT_ID,
  apiKey: GCAL_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
})

interface event {
  title: string
  start: string
  location: string
}

function calIsAuthed() {
  return !!gcal.getToken() && !!gcal.getToken().access_token
}

function calAuth() {
  return gcal.handleAuthClick()
}

// function calSignOut() {
//   gcal.handleSignoutClick()
// }

function getDaysEvents(date: Date, calendar: string | undefined = undefined) {
  function extractData(result: any) {
    return result.result.items.map((event: any) => {
      return {
        title: event.summary,
        start: event.start.dateTime,
        location: event.location,
      }
    })
  }

  function removeBadEvents(events: [event]) {
    return events.filter((event: event) => {
      return (
        event.start &&
        event.start.substring(0, 10) == date.toISOString().substring(0, 10) &&
        event.title !== 'Komitid trip'
      )
    })
  }

  return gcal
    .listEvents({
      timeMin: date.toISOString(),
      timeMax: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1,
        date.getHours(),
      ).toISOString(),
      maxResults: 10,
    })
    .then(extractData)
    .then(removeBadEvents)
}

async function getFirstEvent(date: Date) {
  const events = await getDaysEvents(date)
  if (events) return events[0]
  else return null
}

function addTripToCalendar(originAddress: string, destinationAddress: string, trip: Trip) {
  const summary = 'Komitid trip'

  let description = `Trip from ${originAddress} to ${destinationAddress}\n`
  trip.LegList.Leg.forEach((leg) => {
    const { time: originTime, name: originName } = leg.Origin
    const { time: destinationTime, name: destinationName } = leg.Destination
    description += `\n${originTime.substring(0, 5)}-${destinationTime.substring(0, 5)}: ${leg.name} från ${originName} till ${destinationName}`
  })
  description += '\n\nThis event was created automatically by Komitid'

  const startDateTime = new Date(`${trip.Origin.date}T${trip.Origin.time}`)
  const endDateTime = new Date(`${trip.Destination.date}T${trip.Destination.time}`)

  const event = {
    summary: summary,
    description: description,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Europe/Stockholm',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Europe/Stockholm',
    },
  }

  return gcal.createEvent(event)
}

export type { event }
export { calAuth, calIsAuthed, getFirstEvent, addTripToCalendar }
