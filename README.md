# Komitid

## Desciption

Komitid is an app that allows the user to plan their daily commuting using SL:s API and Google Calendar. The user will be able to set their travel plan directly in the app depending on events found in their calendar. For example, if there is a lecture at 8 set into Google Calendar, the app will plan the
commuting automatically so that the user can arrive on time. The user will also be able to state how long they need to get ready in the morning so the app can plan the travel accordingly

## What has been done

We decided to split up the work with regards to app functionality and at the time of writing this, 2 "main" branches have been established. Branch "henry" worked on by Henry and Olle tackled the login view and functionality to allow users to sign into the app using Google. Branch "vilmer" by Vilmer and Oscar focused on API calls to SL and Google Calender to be able to fetch ones calender events and commuting possibilities using SL. The deployed app version is currently based on the "vilmer" branch, the "henry" branch having been merged into it.

## What we plan to do

Right now the main page has not been contructed yet so logging into the app using Google only takes the user to a placeholder form, where the user can input home address, which is then saved to the model and displayed on the screen (conversion uses the Geocoding API by Google). However, the placeholder form is locked behind authentication and only accessible once the user has logged in. Trying to access the page without logging in redirects the user to the login page. Moving forward, the plan is to create an UI using the API calls to SL and Google Calender and linking the login page and the main page together.

## Project structure

As in the TW labs, we use an overarching model called Model that stores data and handles business logic in the app. Futhermore, the app is divided into components which then has a presenter and a view e.g login is a component and is divided into login-presenter and login-view. The presenters and views works as in TW where presenters fetches data from the model and manages the state of the view whilst views provides visualization of the data and keeps track of the user’s action so it can notify the presenter.

# Setup guild v0.1

- Install node and npm (you probably have it)
- Install yarn using: `npm i -g yarn` (you may have to be root). yarn is just a nicer wrapper around npm
- Install packages using: `yarn`
- Start dev server: `yarn dev` or `yarn start`. This will run vite which is our build system. This is faster and more lightweight than webpack which the course uses. Dynwebben is migrating to Vite (pronunced 'veet', since it is french xD)
- to deploy: `yarn build` (creating output in /dist not /public) followed by `firebase deploy`. You may have to do `firebase login`.
- You can test the build localy using `yarn preview` after building.

## Commands (See package.json)

- `lint`: check for problems
- `lint:fix`: run eslint and try to fix potiential problems
- `prettier`: format the code
- `prettier:check`: dry run formatting

Technologies:

- yarn: like npm (Yet Another Resource Neotiatior)
- vite: like webpack
- react-router-dom: handles all the routes but nicer than in the course. Se `navigator.tsx`
- [mantine](https://mantine.dev): Third party component library, also see [mantine ui](https://ui.mantine.dev):
- eslint: checks syntax and findes problems in the code
- prettier: enforces code style and formatting
