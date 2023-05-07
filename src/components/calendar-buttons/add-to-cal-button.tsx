import React, { useState } from 'react'
import { calIsAuthed, calAuth, addTripToCalendar } from '../../calendarSource'
import { Button, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import GoogleIcon from '../basic/googleicon'
import { Trip } from '../../tripSource'

interface AddToCalButtonProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  trip: Trip | undefined
}

function AddToCalButton(props: AddToCalButtonProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [eventLink, setEventLink] = useState<string>('')

  async function addTrip() {
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
      if (props.originAddress && props.destinationAddress && props.trip) {
        const event = await addTripToCalendar(
          props.originAddress,
          props.destinationAddress,
          props.trip,
        )
        setEventLink(event.result.htmlLink)
      }
    } else setError('Authentication failed, please try again.')
    setLoading(false)
  }

  return (
    <div>
      <Button
        onClick={addTrip}
        disabled={!(props.originAddress && props.destinationAddress)}
        loading={loading}
        leftIcon={<GoogleIcon />}
        variant='light'
      >
        Add to Google Calendar
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
      {eventLink ? (
        <Alert
          icon={<IconAlertCircle size='1rem' />}
          title='Event added!'
          color='blue'
          withCloseButton
          onClose={() => {
            setEventLink('')
          }}
        >
          <a href={eventLink}>{eventLink}</a>
        </Alert>
      ) : null}
    </div>
  )
}

export default AddToCalButton
