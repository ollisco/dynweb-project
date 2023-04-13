import ApiCalendar from './ApiCalendar'
import { GCAL_API_KEY, GCAL_CLIENT_ID } from './apiconf'

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
  return !!gcal.getToken()
}

function calAuth() {
  gcal.handleAuthClick()
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

  function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  return gcal
    .listEvents({
      timeMin: date.toISOString(),
      timeMax: addDays(date, 1).toISOString(),
      maxResults: 20,
    })
    .then(extractData)
}

function getFirstEvent(date: Date) {
  function findFirstWithLocation(events: [event]) {
    return events.find((event: event) => {
      return event.location
    })
  }

  return getDaysEvents(date).then(findFirstWithLocation)
}

export type { event }
export { calAuth, calIsAuthed, calSignOut, getFirstEvent }
