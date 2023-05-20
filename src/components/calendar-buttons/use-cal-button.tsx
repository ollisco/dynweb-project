import { useState } from 'react'
import { calIsAuthed, calAuth, getFirstEvent } from '../../calendar-source'
import UseCalButtonView from './use-cal-button-view'

interface UseCalButtonProps {
  date: Date
  setTime: (value: string) => void
  setAddress: (value: string) => void
}

const UseCalButton = ({ date, setTime, setAddress }: UseCalButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [eventTitle, setEventTitle] = useState<string>('')

  const useCal = async () => {
    setLoading(true)
    setError('')
    setEventTitle('')
    if (!calIsAuthed()) {
      try {
        await calAuth()
      } catch (error) {
        setError('Authentication failed, please try again.')
      }
    }
    if (calIsAuthed()) {
      const event = await getFirstEvent(date)
      if (event) {
        setTime(event.start.substring(11, 16))
        if (event.location) setAddress(event.location)
        setEventTitle(event.title)
      } else setError('No events found in the calendar this day.')
    } else setError('Authentication failed, please try again.')
    setLoading(false)
  }

  return (
    <UseCalButtonView
      error={error}
      setError={setError}
      eventTitle={eventTitle}
      setEventTitle={setEventTitle}
      loading={loading}
      onButtonPress={useCal}
    />
  )
}

export default UseCalButton
