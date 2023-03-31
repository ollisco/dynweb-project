import ApiCalendar from "react-google-calendar-api";
import { API_KEY, CLIENT_ID } from "./apiConfig";

const config = {
  clientId: CLIENT_ID,
  apiKey: API_KEY,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);

function calAuth() {apiCalendar.handleAuthClick()}

function calSignOut() {apiCalendar.handleSignoutClick()}

function getFirstEventData() {
  function getData(result: any) {
    return {
      'start': result.result.items[0].start.dateTime,
      'location': result.result.items[0].location
    }
  }

  return apiCalendar.listUpcomingEvents(1).then(getData)
}

export {calAuth, calSignOut, getFirstEventData}