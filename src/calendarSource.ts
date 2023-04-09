import ApiCalendar from 'react-google-calendar-api'
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

function calAuth() {
  gcal.handleAuthClick()
}

function calSignOut() {
  gcal.handleSignoutClick()
}

function getUpcomingEvents(amountToFetch: number, calendar: string | undefined = undefined) {
  function extractData(result: any) {
    return result.result.items.map((event: any) => {
      return {
        title: event.summary,
        start: event.start.dateTime,
        location: event.location,
      }
    })
  }

  return gcal.listUpcomingEvents(amountToFetch, calendar).then(extractData)
}

function getFirstEvent() {
  function findFirstWithLocation(events: [event]) {
    return events.find((event: event) => {
      return event.location
    })
  }

  return getUpcomingEvents(25).then(findFirstWithLocation)
}

export type { event }
export { calAuth, calSignOut, getFirstEvent }
