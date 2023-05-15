# Komitid

Komitid is an app that allows the user to plan their daily commuting using Trafiklab:s API and the Google Calendar API. The user is able to set their travel plan directly in the app depending on events found in their calendar, or manually if they so desire. For example, if there is a lecture at 8:00 present in the users Google Calendar, the app will automatically fill out the location and time information into the form.

Using the routine feature, the user is able to insert their daily morning routine which helps the user visualize how long they need to get ready before the commute. A routine can have several activies, which the user can drag and drop to change the ordering.

The user can also add the trip and preparation as events in their calendar. The routine event will have the different activities in its description and the trip event will have the different legs of the trip.

In firebase we store all of the different routines the user has created. The user can also store their home address if they so wish, which then fills out automatically when searching for a trip.

## Setup guide

- Install node and npm (you probably have it).
- Install yarn using: `npm i -g yarn` (you may have to be sudo).
- Install packages using `yarn`.
- Start dev server: `yarn dev` or `yarn start`. This will run vite which is our build system. This is faster and more lightweight than webpack.
- To deploy: `yarn build` (creating output in /dist not /public) followed by `firebase deploy`. You may have to do `firebase login`.
- You can test the build localy using `yarn preview` after building.

### Commands (see package.json)

- `yarn lint`: check for problems
- `yarn lint:fix`: run eslint and try to fix potiential problems
- `yarn format`: format the code
- `yarn format:check`: dry run formatting

### Technologies

- yarn: like npm (Yet Another Resource Negotiatior)
- vite: like webpack
- react-router-dom: handles all the routes in a simple and intuitive way. See `src/components/navigator.tsx`
- [mantine](https://mantine.dev): Third party component library, also see [mantine ui](https://ui.mantine.dev):
- eslint: checks syntax and finds problems in the code
- prettier: enforces code style and formatting
