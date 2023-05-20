import { Button, Alert, ActionIcon, Group, Text, Popover } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { MdInfoOutline } from 'react-icons/md'
import { FcGoogle } from 'react-icons/fc'

interface UseCalButtonViewProps {
  error: string
  setError: (value: string) => void
  eventTitle: string
  setEventTitle: (value: string) => void
  loading: boolean
  onButtonPress: () => void
}

const UseCalButtonView = ({
  error,
  setError,
  eventTitle,
  setEventTitle,
  loading,
  onButtonPress,
}: UseCalButtonViewProps) => {
  return (
    <div>
      <Group spacing='xs'>
        <Button onClick={onButtonPress} loading={loading} leftIcon={<FcGoogle />} variant='light'>
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

export default UseCalButtonView
