import { Button, Alert, Menu, Anchor } from '@mantine/core'
import { IconAlertCircle, IconChevronDown } from '@tabler/icons-react'
import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
  MdOutlineNotificationsOff,
} from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'

interface AddToCalButtonViewProps {
  disabled: boolean
  loading: boolean
  error: string
  setError: (value: string) => void
  eventLink: string
  setEventLink: (value: string) => void
  onButtonPress: (value: number) => void
}

const AddToCalButtonView = ({
  disabled,
  loading,
  error,
  setError,
  eventLink,
  setEventLink,
  onButtonPress,
}: AddToCalButtonViewProps) => {
  return (
    <div>
      <Menu position='top-end'>
        <Menu.Target>
          <Button
            disabled={disabled}
            loading={loading}
            leftIcon={<FcGoogle />}
            variant='light'
            rightIcon={<IconChevronDown size='1.05rem' stroke={1.5} />}
          >
            Add to Google Calendar
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<MdOutlineNotifications />} onClick={() => onButtonPress(-1)}>
            Default reminders
          </Menu.Item>
          <Menu.Item icon={<MdOutlineNotificationsOff />} onClick={() => onButtonPress(0)}>
            No reminder
          </Menu.Item>
          <Menu.Item icon={<MdOutlineNotificationsActive />} onClick={() => onButtonPress(5)}>
            5 min before
          </Menu.Item>
          <Menu.Item icon={<MdOutlineNotificationsActive />} onClick={() => onButtonPress(15)}>
            15 min before
          </Menu.Item>
          <Menu.Item icon={<MdOutlineNotificationsActive />} onClick={() => onButtonPress(30)}>
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
          <Anchor href={eventLink} target='_blank'>
            View Event
          </Anchor>
        </Alert>
      ) : null}
    </div>
  )
}

export default AddToCalButtonView
