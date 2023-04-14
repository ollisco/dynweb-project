import { DateInput, TimeInput } from '@mantine/dates'
import { Button, TextInput } from '@mantine/core'

type InformationViewProps = {
  originAddress: string | null
  destinationAddress: string
  date: Date | null
  leaveTime: string
  arriveTime: string
  searchClicked: React.MouseEventHandler<HTMLButtonElement>
  setDate: (value: Date) => void
  setDestinationAddress: (value: string) => void
  setArriveTime: (value: string) => void
  useCal: React.MouseEventHandler<HTMLButtonElement>
}

const InformationView = ({
  originAddress,
  destinationAddress,
  date,
  leaveTime,
  arriveTime,
  setDate,
  useCal,
  searchClicked,
  setDestinationAddress,
  setArriveTime,
}: InformationViewProps) => {
  return (
    <div>
      <DateInput
        value={date}
        onChange={setDate}
        required
        label='Day of travel'
        placeholder='Select date'
        maw={400}
        minDate={new Date()}
      />
      <Button onClick={useCal}>Use Google Calendar</Button>
      <TextInput
        label='Destination address'
        required
        placeholder='Drottning Kristinas väg 13'
        value={destinationAddress}
        onChange={(e) => {
          setDestinationAddress(e.target.value)
        }}
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
        disabled={!(originAddress && date && arriveTime && destinationAddress)}
      >
        Search
      </Button>
      <h2>Your commute:</h2>
      <div>
        You should leave {originAddress} at {leaveTime} in order to arrive at {destinationAddress}{' '}
        at {arriveTime}
      </div>
    </div>
  )
}

export default InformationView
