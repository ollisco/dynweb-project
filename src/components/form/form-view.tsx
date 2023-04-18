import { DateInput, TimeInput } from '@mantine/dates'
import { Autocomplete, Button, Loader, useMantineTheme } from '@mantine/core'
import { ItemProps } from './form-presenter'

interface FormViewProps {
  originAddress: string | undefined
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
  searchClicked: React.MouseEventHandler<HTMLButtonElement>
  itemComponent: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<HTMLDivElement>>
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
  searchClicked,
  itemComponent
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
        filter={() => true} // API filters the data instead of this component
        itemComponent={itemComponent}
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
      <Button onClick={useCal}>Use Google Calendar</Button>
      <Autocomplete
        value={destinationAddress}
        data={destinationAddressAutocompleteData}
        onChange={onChangeDestinationAddress}
        rightSection={destinationAddressLoading ? <Loader size='1rem' /> : null}
        label='Destination address'
        placeholder='Drottning Kristinas väg 13'
        name='address'
        required
        filter={() => true} // API filters the data instead of this component
        itemComponent={itemComponent}
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
