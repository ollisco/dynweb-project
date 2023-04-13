import { useNavigate } from 'react-router'
import Model, { Coordinates } from '../../Model'
import InformationView from './information-view'
import { getFirstEvent } from '../../calendarSource'
import { eventToCoordsObj } from '../../eventToTrip'
import { getTrafficInfo } from '../../tripSource'
import { useState } from 'react'

interface InformationPresenterProps {
  homeAddress: string | null
  homeCoords: Coordinates | null
}

export function InformationPresenter(props: InformationPresenterProps) {
  const [destinationAddress, setDestinationAddress] = useState<string>('')
  const [day, setDay] = useState<Date | null>(null)
  const [leaveTime, setLeaveTime] = useState<string>('')
  const [arriveTime, setArriveTime] = useState<string>('')

  async function performSearch() {
    console.log('day:', day)
    console.log('homeCoords:', props.homeCoords)
    if (day && props.homeCoords) {
      console.log(day)
      const event = await getFirstEvent(day)
      const coordsObj = await eventToCoordsObj(event, props.homeCoords)
      const trafficInfo = await getTrafficInfo(coordsObj)
      console.log('yes')
      console.log(trafficInfo)
      setDestinationAddress(event.location)
      setLeaveTime(trafficInfo.Trip.pop().Origin.time)
      setArriveTime(trafficInfo.Trip.pop().Destination.time)
    }
  }

  return (
    <InformationView
      originAddress={props.homeAddress}
      destinationAddress={destinationAddress}
      day={day}
      setDay={setDay}
      leaveTime={leaveTime}
      arriveTime={arriveTime}
      searchClicked={performSearch}
    />
  )
}
