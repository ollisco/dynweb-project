import { DateInput, TimeInput } from '@mantine/dates'
import { Button, Loader, TextInput } from '@mantine/core'

type InformationViewProps = {
  originAddress: string | null
  destinationAddress: string
  date: Date
  arriveTime: string
  message: string
  loading: boolean
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
  arriveTime,
  message,
  loading,
  setDate,
  useCal,
  searchClicked,
  setDestinationAddress,
  setArriveTime,
}: InformationViewProps) => {
  return (
    <div>
      <DateInput
        label='Day of travel'
        placeholder='Select date'
        required
        value={date}
        onChange={setDate}
        maw={400}
        minDate={new Date()}
      />
      <Button onClick={useCal}>Use Google Calendar</Button>
      <TextInput
        label='Destination address'
        placeholder='Drottning Kristinas väg 13'
        required
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
        disabled={!(originAddress && destinationAddress && date && arriveTime)}
      >
        Search
      </Button>
      <h2>Your commute:</h2>
      <div>{loading ? <Loader /> : message}</div>
    </div>
  )
}

export default InformationView
