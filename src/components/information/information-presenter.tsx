import InformationView from './information-view'
import { calAuth, calIsAuthed, getFirstEvent } from '../../calendarSource'
import { createCoordsObj, getTrafficInfo } from '../../tripSource'
import { useState } from 'react'

interface InformationPresenterProps {
  homeAddress: string | null
}

export function InformationPresenter(props: InformationPresenterProps) {
  const [destinationAddress, setDestinationAddress] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [arriveTime, setArriveTime] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  async function useCal() {
    if (!calIsAuthed()) await calAuth()
    if (calIsAuthed() && date) {
      const event = await getFirstEvent(date)
      setDestinationAddress(event.location)
      setArriveTime(event.start.substring(11, 16))
    }
  }

  async function performSearch() {
    if (props.homeAddress && destinationAddress && date && arriveTime) {
      setLoading(true)
      const coordsObj = await createCoordsObj(
        props.homeAddress,
        destinationAddress,
        date,
        arriveTime,
        1,
      )
      const trafficInfo = await getTrafficInfo(coordsObj)
      const originTime = trafficInfo.Trip.pop().Origin.time.substring(0, 5)
      setLoading(false)
      setMessage(
        'You should leave ' +
          props.homeAddress +
          ' at ' +
          originTime +
          ' in order to arrive at ' +
          destinationAddress +
          ' at ' +
          arriveTime +
          '.',
      ) // very temporary
    }
  }

  return (
    <InformationView
      originAddress={props.homeAddress}
      destinationAddress={destinationAddress}
      setDestinationAddress={setDestinationAddress}
      date={date}
      setDate={setDate}
      arriveTime={arriveTime}
      setArriveTime={setArriveTime}
      useCal={useCal}
      searchClicked={performSearch}
      message={message}
      loading={loading}
    />
  )
}
