import { GCAL_API_KEY, GCAL_CLIENT_ID } from './apiconf'
import ApiCalendar from './ApiCalendar'
import { Trip } from './tripSource'

const gcal = new ApiCalendar({
  clientId: GCAL_CLIENT_ID || '',
  apiKey: GCAL_API_KEY || '',
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
})

interface rawEvent {
  summary: string
  start: {
    dateTime: string
  }
  location: string
}

interface processedEvent {
  title: string
  start: string
  location: string
}

interface newEvent {
  summary: string
  description: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  reminders?: {
    useDefault: boolean
    overrides: {
      minutes: number
      method: string
    }[]
  }
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

function getDaysEvents(date: Date) {
  function extractData(result: { result: { items: rawEvent[] } }): processedEvent[] {
    return result.result.items.map((event: rawEvent) => {
      return {
        title: event.summary,
        start: event.start.dateTime,
        location: event.location,
      }
    })
  }

  function removeBadEvents(events: [processedEvent]) {
    return events.filter((event: processedEvent) => {
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

function addTripToCalendar(
  originAddress: string,
  destinationAddress: string,
  trip: Trip,
  notification: number,
) {
  const summary = 'Komitid trip'

  let description = `Trip from ${originAddress} to ${destinationAddress}\n`
  trip.LegList.Leg.forEach((leg) => {
    const { time: originTime, name: originName } = leg.Origin
    const { time: destinationTime, name: destinationName } = leg.Destination
    description += `\n${originTime.substring(0, 5)}-${destinationTime.substring(0, 5)}: ${
      leg.name
    } från ${originName} till ${destinationName}`
  })
  description += '\n\nThis event was created automatically by Komitid'

  const startDateTime = new Date(`${trip.Origin.date}T${trip.Origin.time}`)
  const endDateTime = new Date(`${trip.Destination.date}T${trip.Destination.time}`)

  const event: newEvent = {
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

  if (notification > 0) {
    event.reminders = {
      useDefault: false,
      overrides: [
        {
          minutes: notification,
          method: 'popup',
        },
      ],
    }
  } else if (notification == 0) {
    event.reminders = {
      useDefault: false,
      overrides: [],
    }
  }

  return gcal.createEvent(event)
}

export type { processedEvent as event }
export { calAuth, calIsAuthed, getFirstEvent, addTripToCalendar }
