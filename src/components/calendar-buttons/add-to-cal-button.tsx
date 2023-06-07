import { useState } from 'react'
import {
  calIsAuthed,
  calAuth,
  addPreActivityToCalendar,
  addTripToCalendar,
} from '../../calendar-source'
import { Routine } from '../../model'
import { Trip } from '../../trip-source'
import AddToCalButtonView from './add-to-cal-button-view'

interface AddToCalButtonProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  trip: Trip | undefined
  routine: Routine | undefined
}

const AddToCalButton = ({
  originAddress,
  destinationAddress,
  trip,
  routine,
}: AddToCalButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [eventLink, setEventLink] = useState<string>('')

  const addTrip = async (notification: number) => {
    setLoading(true)
    setError('')
    setEventLink('')
    if (!calIsAuthed()) {
      try {
        await calAuth()
      } catch (error) {
        setError('Authentication failed, please try again.')
      }
    }
    if (calIsAuthed()) {
      if (originAddress && destinationAddress && trip) {
        if (routine) {
          await addPreActivityToCalendar(routine, trip)
        }

        const event = await addTripToCalendar(originAddress, destinationAddress, trip, notification)
        setEventLink(event.result.htmlLink)
      }
    } else setError('Authentication failed, please try again.')
    setLoading(false)
  }

  return (
    <AddToCalButtonView
      disabled={!(originAddress && destinationAddress)}
      loading={loading}
      error={error}
      setError={setError}
      eventLink={eventLink}
      setEventLink={setEventLink}
      onButtonPress={addTrip}
    />
  )
}

export default AddToCalButton
