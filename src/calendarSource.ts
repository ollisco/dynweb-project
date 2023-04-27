import { GCAL_API_KEY, GCAL_CLIENT_ID } from './apiconf'
import ApiCalendar from './ApiCalendar'

const gcal = new ApiCalendar({
  clientId: GCAL_CLIENT_ID,
  apiKey: GCAL_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar.readonly',
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

function calSignOut() {
  gcal.handleSignoutClick()
}

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
      return event.start && event.start.substring(0, 10) == date.toISOString().substring(0, 10)
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

export type { event }
export { calAuth, calIsAuthed, getFirstEvent }
