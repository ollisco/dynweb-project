import { Coordinates } from '../../Model'
import InformationView from './information-view'
import { calAuth, calIsAuthed, getFirstEvent } from '../../calendarSource'
import { createCoordsObj, getTrafficInfo } from '../../tripSource'
import { useState } from 'react'

interface InformationPresenterProps {
  homeAddress: string | null
}

export function InformationPresenter(props: InformationPresenterProps) {
  const [destinationAddress, setDestinationAddress] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)
  const [leaveTime, setLeaveTime] = useState<string>('')
  const [arriveTime, setArriveTime] = useState<string>('')

  async function useCal() {
    await calAuth()
    if (calIsAuthed() && date) {
      const event = await getFirstEvent(date)
      setDestinationAddress(event.location)
      setArriveTime(event.start.substring(11, 16))
    }
  }

  async function performSearch() {
    if (props.homeAddress && destinationAddress && date && arriveTime) {
      const coordsObj = await createCoordsObj(
        props.homeAddress,
        destinationAddress,
        date,
        arriveTime,
        1,
      )
      const trafficInfo = await getTrafficInfo(coordsObj)
      setLeaveTime(trafficInfo.Trip.pop().Origin.time.substring(0, 5))
    }
  }

  return (
    <InformationView
      originAddress={props.homeAddress}
      destinationAddress={destinationAddress}
      setDestinationAddress={setDestinationAddress}
      date={date}
      setDate={setDate}
      leaveTime={leaveTime}
      arriveTime={arriveTime}
      setArriveTime={setArriveTime}
      useCal={useCal}
      searchClicked={performSearch}
    />
  )
}
