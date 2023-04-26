import React, { useState } from 'react'
import { calIsAuthed, calAuth, getFirstEvent } from '../../calendarSource'
import { Button, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import GoogleIcon from '../basic/googleicon'

interface UseCalButtonProps {
  date: Date
  setArriveTime: (value: string) => void
  setDestinationAddress: (value: string) => void
}

function UseCalButton(props: UseCalButtonProps) {
  const [calLoading, setCalLoading] = useState<boolean>(false)
  const [calError, setCalError] = useState<string>('')
  const [calMessage, setCalMessage] = useState<string>('')

  async function useCal() {
    setCalLoading(true)
    setCalError('')
    setCalMessage('')
    if (!calIsAuthed()) {
      try {
        await calAuth()
      } catch (error) {
        setCalError('Authentication failed, please try again.')
      }
    }
    if (calIsAuthed()) {
      const event = await getFirstEvent(props.date)
      if (event) {
        props.setArriveTime(event.start.substring(11, 16))
        if (event.location) props.setDestinationAddress(event.location)
        setCalMessage(event.title)
      } else setCalError('No events found in the calendar this day.')
    } else setCalError('Authentication failed, please try again.')
    setCalLoading(false)
  }

  return (
    <div>
      <Button onClick={useCal} loading={calLoading} leftIcon={<GoogleIcon />} variant='light'>
        Use Google Calendar
      </Button>
      {calError ? (
        <Alert icon={<IconAlertCircle size='1rem' />} title='Bummer!' color='red'>
          {calError}
        </Alert>
      ) : null}
      {calMessage ? (
        <Alert icon={<IconAlertCircle size='1rem' />} title='Event:' color='blue'>
          {calMessage}
        </Alert>
      ) : null}
    </div>
  )
}

export default UseCalButton
