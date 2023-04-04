import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { getTrafficInfo, CoordsObj } from './tripSource'

const coords: CoordsObj = {
  originCoordLat: '59.34967',
  originCoordLong: '18.00375',
  destCoordLat: '59.34609',
  destCoordLong: '18.07181'
}

getTrafficInfo(coords); 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
