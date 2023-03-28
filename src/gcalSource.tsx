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

// apiCalendar.listUpcomingEvents(1);
