import { useState } from 'react'
import {
  calIsAuthed,
  calAuth,
  addTripToCalendar,
  addPreActivityToCalendar,
} from '../../calendarSource'
import { Button, Alert, Menu } from '@mantine/core'
import { IconAlertCircle, IconChevronDown } from '@tabler/icons-react'
import GoogleIcon from '../basic/googleicon'
import { Trip } from '../../tripSource'
import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
  MdOutlineNotificationsOff,
} from 'react-icons/md'
import { ItemGroup } from '../profile-page/profile-page-components/profile-page-item'

interface AddToCalButtonProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  trip: Trip | undefined
  itemGroup: ItemGroup | undefined
}

function AddToCalButton(props: AddToCalButtonProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [eventLink, setEventLink] = useState<string>('')

  async function addTrip(notification: number) {
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
        if (props.itemGroup) {
          await addPreActivityToCalendar(notification, props.itemGroup, props.trip)
        }

        const event = await addTripToCalendar(
          props.originAddress,
          props.destinationAddress,
          props.trip,
          notification,
        )
        setEventLink(event.result.htmlLink)
      }
    } else setError('Authentication failed, please try again.')
    setLoading(false)
  }

  return (
    <div>
      <Menu position='top-end'>
        <Menu.Target>
          <Button
            disabled={!(props.originAddress && props.destinationAddress)}
            loading={loading}
            leftIcon={<GoogleIcon />}
            variant='light'
            rightIcon={<IconChevronDown size='1.05rem' stroke={1.5} />}
          >
            Add to Google Calendar
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<MdOutlineNotifications />} onClick={() => addTrip(-1)}>
            Default reminders
          </Menu.Item>
          <Menu.Item icon={<MdOutlineNotificationsOff />} onClick={() => addTrip(0)}>
            No reminder
          </Menu.Item>
          <Menu.Item icon={<MdOutlineNotificationsActive />} onClick={() => addTrip(5)}>
            5 min before
          </Menu.Item>
          <Menu.Item icon={<MdOutlineNotificationsActive />} onClick={() => addTrip(15)}>
            15 min before
          </Menu.Item>
          <Menu.Item icon={<MdOutlineNotificationsActive />} onClick={() => addTrip(30)}>
            30 min before
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
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
