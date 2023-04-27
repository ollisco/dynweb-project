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
  useCal: React.MouseEventHandler<HTMLButtonElement>
  calLoading: boolean
  calError: string
  calMessage: string
  searchClicked: React.MouseEventHandler<HTMLButtonElement>
  itemComponent: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<HTMLDivElement>>
}

function FormView(props: FormViewProps) {
  const theme = useMantineTheme()
  return (
    <div>
      <Box w='100vw' h='80vh' sx={{}}>
        <Container h='100%'>
          <Paper m='xl' p='xl' h='100%' withBorder>
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
                maw={400}
                minDate={new Date()}
              />
              <Button onClick={props.useCal} loading={props.calLoading}>
                Use Google Calendar
              </Button>
              {props.calError ? (
                <Alert icon={<IconAlertCircle size='1rem' />} title='Bummer!' color='red'>
                  {props.calError}
                </Alert>
              ) : null}
              {props.calMessage ? (
                <Alert icon={<IconAlertCircle size='1rem' />} title='Event:' color='blue'>
                  {props.calMessage}
                </Alert>
              ) : null}
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
