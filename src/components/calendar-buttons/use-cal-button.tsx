import { useState, useEffect } from 'react'
import { calIsAuthed, calAuth, getFirstEvent } from '../../calendarSource'
import { Button, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import GoogleIcon from '../basic/googleicon'

interface UseCalButtonProps {
  date: Date
  setTime: (value: string) => void
  setAddress: (value: string) => void
}

function UseCalButton(props: UseCalButtonProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [eventTitle, setEventTitle] = useState<string>('')
  const buttonDesc =
    'Set your destination and arrival time with one click by using your Google Calendar.\n' +
    'This will automatically find the first event of the chosen date and use its start time and location (if available) to calculate your commute.'

  async function useCal() {
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
      const event = await getFirstEvent(props.date)
      if (event) {
        props.setTime(event.start.substring(11, 16))
        if (event.location) props.setAddress(event.location)
        setEventTitle(event.title)
      } else setError('No events found in the calendar this day.')
    } else setError('Authentication failed, please try again.')
    setLoading(false)
  }

  return (
    <div>
      <Button
        title={buttonDesc}
        onClick={useCal}
        loading={loading}
        leftIcon={<GoogleIcon />}
        variant='light'
      >
        Use Google Calendar
      </Button>
      {error ? (
        <Alert
          icon={<IconAlertCircle size='1rem' />}
          title='Bummer!'
          color='red'
          withCloseButton
          onClose={() => {
            setError('')
          }}
        >
          {error}
        </Alert>
      ) : null}
      {eventTitle ? (
        <Alert
          icon={<IconAlertCircle size='1rem' />}
          title='Event:'
          color='blue'
          withCloseButton
          onClose={() => {
            setEventTitle('')
          }}
        >
          {eventTitle}
        </Alert>
      ) : null}
    </div>
  )
}

export default UseCalButton
