import { DateInput, TimeInput } from '@mantine/dates'
import { Alert, Autocomplete, Button, Loader, useMantineTheme } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'

interface FormViewProps {
  originAddress: string
  onChangeOriginAddress: (value: string) => void
  originAddressAutocompleteData: string[]
  originAddressLoading: boolean
  destinationAddress: string
  onChangeDestinationAddress: (value: string) => void
  destinationAddressAutocompleteData: string[]
  destinationAddressLoading: boolean
  date: Date
  setDate: (value: Date) => void
  arriveTime: string
  setArriveTime: (value: string) => void
  useCal: React.MouseEventHandler<HTMLButtonElement>
  calLoading: boolean
  calError: string
  calMessage: string
  searchClicked: React.MouseEventHandler<HTMLButtonElement>
}

function FormView({
  originAddress,
  onChangeOriginAddress,
  originAddressAutocompleteData,
  originAddressLoading,
  destinationAddress,
  onChangeDestinationAddress,
  destinationAddressAutocompleteData,
  destinationAddressLoading,
  date,
  setDate,
  arriveTime,
  setArriveTime,
  useCal,
  calLoading,
  calError,
  calMessage,
  searchClicked,
}: FormViewProps) {
  const theme = useMantineTheme()
  return (
    <div>
      <Autocomplete
        value={originAddress}
        data={originAddressAutocompleteData}
        onChange={onChangeOriginAddress}
        rightSection={originAddressLoading ? <Loader size='1rem' /> : null}
        label='Home address'
        placeholder='Drottning Kristinas väg 13'
        name='address'
        required
        style={{ marginTop: theme.spacing.xs }}
      />
      <DateInput
        label='Day of travel'
        placeholder='Select date'
        required
        value={date}
        onChange={setDate}
        maw={400}
        minDate={new Date()}
      />
      <Button onClick={useCal} loading={calLoading}>Use Google Calendar</Button>
      {calError ?
        <Alert icon={<IconAlertCircle size="1rem" />} title="Bummer!" color="red">
          {calError}
        </Alert> : null
      }
      {calMessage ?
        <Alert icon={<IconAlertCircle size="1rem" />} title="Event:" color="blue">
          {calMessage}
        </Alert> : null
      }
      <Autocomplete
        value={destinationAddress}
        data={destinationAddressAutocompleteData}
        onChange={onChangeDestinationAddress}
        rightSection={destinationAddressLoading ? <Loader size='1rem' /> : null}
        label='Destination address'
        placeholder='Drottning Kristinas väg 13'
        name='address'
        required
        style={{ marginTop: theme.spacing.xs }}
      />
      <TimeInput
        label='Desired arrival time'
        required
        value={arriveTime}
        onChange={(e) => {
          setArriveTime(e.target.value)
        }}
      />
      <Button
        onClick={searchClicked}
        disabled={!(originAddress && destinationAddress && date && arriveTime)}
      >
        Search
      </Button>
    </div>
  )
}

export default FormView
