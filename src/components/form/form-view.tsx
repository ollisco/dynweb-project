import { DateInput, TimeInput } from '@mantine/dates'
import { ItemProps } from './form-presenter'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Loader,
  Paper,
  Stack,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import UseCalButton from '../calendar-buttons/use-cal-button'

interface FormViewProps {
  originAddress: string
  onChangeOriginAddress: (value: string) => void
  originAddressAutocompleteData: string[]
  originAddressLoading: boolean
  originAddressError: string
  destinationAddress: string
  onChangeDestinationAddress: (value: string) => void
  destinationAddressAutocompleteData: string[]
  destinationAddressLoading: boolean
  destinationAddressError: string
  date: Date
  setDate: (value: Date) => void
  arriveTime: string
  setArriveTime: (value: string) => void
  searchClicked: React.MouseEventHandler<HTMLButtonElement>
  itemComponent: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<HTMLDivElement>>
  searchInProgress: boolean
  searchError: string
  setSearchError: (value: string) => void
  saveHomeAddress: boolean
  setSaveHomeAddress: (value: boolean) => void
}

function FormView(props: FormViewProps) {
  return (
    <Box w='100%'>
      <Container>
        <Paper m='md' p='xl' withBorder>
          <Stack spacing='xs'>
            <Autocomplete
              value={props.originAddress}
              data={props.originAddressAutocompleteData}
              onChange={props.onChangeOriginAddress}
              rightSection={props.originAddressLoading ? <Loader size='1rem' /> : null}
              label='Home address'
              placeholder='Drottning Kristinas väg 13'
              name='address'
              required
              filter={() => true} // API filters the data instead of this component
              itemComponent={props.itemComponent}
              error={props.originAddressError}
            />
            <Checkbox
              checked={props.saveHomeAddress}
              onChange={(event) => props.setSaveHomeAddress(event.currentTarget.checked)}
              label='Save my home address to my account'
            />
            <DateInput
              label='Day of travel'
              placeholder='Select date'
              required
              value={props.date}
              onChange={props.setDate}
              minDate={new Date()}
            />
            <UseCalButton
              date={props.date}
              setTime={props.setArriveTime}
              setAddress={props.onChangeDestinationAddress}
            />
            <Autocomplete
              value={props.destinationAddress}
              data={props.destinationAddressAutocompleteData}
              onChange={props.onChangeDestinationAddress}
              rightSection={props.destinationAddressLoading ? <Loader size='1rem' /> : null}
              label='Destination address'
              placeholder='Drottning Kristinas väg 13'
              name='address'
              required
              filter={() => true} // API filters the data instead of this component
              itemComponent={props.itemComponent}
              error={props.destinationAddressError}
            />
            <TimeInput
              label='Desired arrival time'
              required
              value={props.arriveTime}
              onChange={(e) => {
                props.setArriveTime(e.target.value)
              }}
            />
            <Button
              onClick={props.searchClicked}
              loading={props.searchInProgress}
              disabled={
                !(props.originAddress && props.destinationAddress && props.date && props.arriveTime)
              }
            >
              Search
            </Button>
            {props.searchError ? (
              <Alert
                icon={<IconAlertCircle size='1rem' />}
                title='Bummer!'
                color='red'
                withCloseButton
                variant='filled'
                onClose={() => props.setSearchError('')}
              >
                {props.searchError}
              </Alert>
            ) : null}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default FormView
