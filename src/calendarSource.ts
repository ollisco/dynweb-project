import { GCAL_API_KEY, GCAL_CLIENT_ID } from './apiconf'
import ApiCalendar from './ApiCalendar'
import { Trip } from './tripSource'
import {
  Item,
  ItemGroup,
} from './components/profile-page/profile-page-components/profile-page-item'

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
  location?: string
}

interface processedEvent {
  title: string
  start: string
  location: string | undefined
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

function getDaysEvents(date: Date) {
  function removeBadEvents(result: { result: { items: rawEvent[] } }) {
    console.log(result)
    return result.result.items.filter((event: rawEvent) => {
      return event.start && event.summary !== 'Komitid trip'
    })
  }

  function extractRelevantData(events: rawEvent[]): processedEvent[] {
    return events.map((event: rawEvent) => {
      return {
        title: event.summary,
        start: event.start.dateTime,
        location: event.location,
      }
    })
  }

  function sortByStartTime(events: processedEvent[]) {
    return events.sort((a, b) => {
      return new Date(a.start).getTime() - new Date(b.start).getTime()
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
      singleEvents: true,
    })
    .then(removeBadEvents)
    .then(extractRelevantData)
    .then(sortByStartTime)
}

async function getFirstEvent(date: Date) {
  const events = await getDaysEvents(date)
  if (events) return events[0]
  else return null
}

function addPreActivityToCalendar(notification: number, itemGroup: ItemGroup, trip: Trip) {
  const summary = `${itemGroup.name}, before komitid trip`

  let description = 'Things to get done before the komitid trip:\n\n'
  itemGroup.items.forEach((item: Item) => {
    description += `${item.name}: ${item.description} (${item.duration})\n`
  })

  description += '\n\nThis event was created automatically by Komitid'
  const totalDuration = itemGroup.items.reduce((acc: number, item: Item) => {
    return acc + item.duration
  }, 0)

  // start time is end time - total duration
  const startDateTime = new Date(
    new Date(`${trip.Origin.date}T${trip.Origin.time}`).getTime() - totalDuration * 60000,
  )

  const endDateTime = new Date(`${trip.Origin.date}T${trip.Origin.time}`)
  console.log(startDateTime, endDateTime, totalDuration)

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
export { calAuth, calIsAuthed, getFirstEvent, addTripToCalendar, addPreActivityToCalendar }
