import { DateInput, TimeInput } from '@mantine/dates'
import { ItemProps } from './form-presenter'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  Loader,
  Paper,
  Stack,
  useMantineTheme,
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
}

function FormView(props: FormViewProps) {
  const theme = useMantineTheme()
  return (
    <div>
      <Box w='100vw'>
        <Container>
          <Paper m='xl' p='xl' withBorder>
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
                style={{ marginTop: theme.spacing.xs }}
              />
              {props.originAddressError ? (
                <Alert icon={<IconAlertCircle size='1rem' />} title='Invalid address.' color='red'>
                  {props.originAddressError}
                </Alert>
              ) : null}
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
                style={{ marginTop: theme.spacing.xs }}
              />
              {props.destinationAddressError ? (
                <Alert icon={<IconAlertCircle size='1rem' />} title='Invalid address.' color='red'>
                  {props.destinationAddressError}
                </Alert>
              ) : null}
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
                  !(
                    props.originAddress &&
                    props.destinationAddress &&
                    props.date &&
                    props.arriveTime
                  )
                }
              >
                Search
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </div>
  )
}

export default FormView
