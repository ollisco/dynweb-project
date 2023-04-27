const GCAL_API_KEY = process.env.GCAL_API_KEY 
const GCAL_CLIENT_ID = process.env.GCAL_CLIENT_ID 
const MAPS_API_KEY = process.env.MAPS_API_KEY 
const TRAFFICLAB_API_KEY = process.env.TRAFFICLAB_API_KEY 
const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY 

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'komitid-cb8e5.firebaseapp.com',
  databaseURL: 'https://komitid-cb8e5-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'komitid-cb8e5',
  storageBucket: 'komitid-cb8e5.appspot.com',
  messagingSenderId: '568442634445',
  appId: '1:568442634445:web:2b396de1b349bd4541e984',
  measurementId: 'G-KWPFC22M84',
}

export {
  GCAL_API_KEY,
  GCAL_CLIENT_ID,
  MAPS_API_KEY,
  TRAFFICLAB_API_KEY,
  GEOAPIFY_KEY,
  firebaseConfig,
}
