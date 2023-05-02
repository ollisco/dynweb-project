const GCAL_API_KEY = import.meta.env.VITE_GCAL_API_KEY
const GCAL_CLIENT_ID = import.meta.env.VITE_GCAL_CLIENT_ID
const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY
const TRAFFICLAB_API_KEY = import.meta.env.VITE_TRAFFICLAB_API_KEY
const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
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
