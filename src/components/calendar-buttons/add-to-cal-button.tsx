import React, { useState } from 'react'
import { calIsAuthed, calAuth, addTripToCalendar } from '../../calendarSource'
import { Button, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import GoogleIcon from '../basic/googleicon'
import { Trip } from '../../Model'

interface AddToCalButtonProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  trip: Trip | undefined
}

function AddToCalButton(props: AddToCalButtonProps) {
  const [calLoading, setCalLoading] = useState<boolean>(false)
  const [calError, setCalError] = useState<string>('')
  const [calLink, setCalLink] = useState<string>('')

  async function addTrip() {
    setCalLoading(true)
    setCalError('')
    setCalLink('')
    if (!calIsAuthed()) {
      try {
        await calAuth()
      } catch (error) {
        setCalError('Authentication failed, please try again.')
      }
    }
    if (calIsAuthed()) {
      if (props.originAddress && props.destinationAddress && props.trip) {
        const event = await addTripToCalendar(
          props.originAddress,
          props.destinationAddress,
          props.trip,
        )
        setCalLink(event.result.htmlLink)
      }
    } else setCalError('Authentication failed, please try again.')
    setCalLoading(false)
  }

  return (
    <div>
      <Button
        onClick={addTrip}
        disabled={!(props.originAddress && props.destinationAddress)}
        loading={calLoading}
        variant='light'
        leftIcon={<GoogleIcon />}
      >
        Add to Google Calendar
      </Button>
      {calError ? (
        <Alert icon={<IconAlertCircle size='1rem' />} title='Bummer!' color='red'>
          {calError}
        </Alert>
      ) : null}
      {calLink ? (
        <Alert icon={<IconAlertCircle size='1rem' />} title='Event added!' color='blue'>
          <a href={calLink}>{calLink}</a>
        </Alert>
      ) : null}
    </div>
  )
}

export default AddToCalButton
