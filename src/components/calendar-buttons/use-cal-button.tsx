import { useState } from 'react'
import { calIsAuthed, calAuth, getFirstEvent } from '../../calendar-source'
import { Button, Alert, ActionIcon, Group, Text, Popover } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { MdInfoOutline } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'

interface UseCalButtonProps {
  date: Date
  setTime: (value: string) => void
  setAddress: (value: string) => void
}

const UseCalButton = (props: UseCalButtonProps) => {
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
      <Group spacing='xs'>
        <Button onClick={useCal} loading={loading} leftIcon={<FcGoogle />} variant='light'>
          Use Google Calendar
        </Button>
        <Popover>
          <Popover.Target>
            <ActionIcon size='lg'>
              <MdInfoOutline size={20} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size='sm' w='300px'>
              Set your destination and arrival time with one click by using your Google Calendar.
            </Text>
            <Text size='sm' w='300px'>
              This will automatically find the first event of the chosen date and use its start time
              and location (if available) to calculate your commute.
            </Text>
          </Popover.Dropdown>
        </Popover>
      </Group>
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
