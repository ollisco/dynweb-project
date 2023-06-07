import { Fragment, forwardRef } from 'react'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Loader,
  Paper,
  Select,
  SelectItemProps,
  Stack,
  Text,
} from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates'
import { IconAlertCircle } from '@tabler/icons-react'
import UseCalButton from '../calendar-buttons/use-cal-button'
import { Routine, Activity } from '../../model'

type AddressItemProps = SelectItemProps & { street: string; postcodeAndCity: string }

const AddressItem = forwardRef<HTMLDivElement, AddressItemProps>(
  ({ street, postcodeAndCity, ...others }: AddressItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Text size='sm' style={{ whiteSpace: 'nowrap' }}>
            {street}
          </Text>
          <Text size='xs' color='dimmed' truncate>
            {postcodeAndCity}
          </Text>
        </Group>
      </div>
    )
  },
)

AddressItem.displayName = 'AddressItem'

type RoutineItemProps = SelectItemProps & { routine: Routine }

const RoutineItem = forwardRef<HTMLDivElement, RoutineItemProps>(({ routine, ...others }, ref) => {
  const totalDuration = routine.activities.reduce((prev, curr) => prev + curr.duration, 0)

  return (
    <div ref={ref} {...others}>
      <Group align='center'>
        <Text>{routine.name}</Text>
        <Text>
          {routine.activities.length > 0 &&
            routine.activities.map<React.ReactNode>((item, index) => (
              <Fragment key={`${item.name}-${index}`}>
                <Text span size='sm' color='dimmed'>
                  {item.name}
                </Text>
                {index < routine.activities.length - 1 && (
                  <Text span size='sm' color='dimmed'>
                    ,{' '}
                  </Text>
                )}
              </Fragment>
            ))}
        </Text>
        <Text size='sm' color='dimmed'>
          {totalDuration} min
        </Text>
      </Group>
    </div>
  )
})

RoutineItem.displayName = 'RoutineItem'

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
  searchInProgress: boolean
  searchError: string
  setSearchError: (value: string) => void
  shouldSaveHomeAddress: boolean
  setShouldSaveHomeAddress: (value: boolean) => void
  routines: Routine[]
  setSelectedRoutine: (routine: Routine | undefined) => void
}

const FormView = ({
  originAddress,
  onChangeOriginAddress,
  originAddressAutocompleteData,
  originAddressLoading,
  originAddressError,
  destinationAddress,
  onChangeDestinationAddress,
  destinationAddressAutocompleteData,
  destinationAddressLoading,
  destinationAddressError,
  date,
  setDate,
  arriveTime,
  setArriveTime,
  searchClicked,
  searchInProgress,
  searchError,
  setSearchError,
  shouldSaveHomeAddress,
  setShouldSaveHomeAddress,
  routines,
  setSelectedRoutine,
}: FormViewProps) => {
  return (
    <Box w='100%'>
      <Container px={0} size='sm'>
        <Paper p='xl' withBorder>
          <Stack spacing='xs'>
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
              itemComponent={AddressItem}
              error={originAddressError}
            />
            <Checkbox
              checked={shouldSaveHomeAddress}
              onChange={(event) => setShouldSaveHomeAddress(event.currentTarget.checked)}
              label='Save my home address to my account'
            />
            <DateInput
              label='Day of travel'
              placeholder='Select date'
              required
              value={date}
              onChange={setDate}
              minDate={new Date()}
            />
            <UseCalButton
              date={date}
              setTime={setArriveTime}
              setAddress={onChangeDestinationAddress}
            />
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
              itemComponent={AddressItem}
              error={destinationAddressError}
            />
            <TimeInput
              label='Desired arrival time'
              required
              value={arriveTime}
              onChange={(e) => {
                setArriveTime(e.target.value)
              }}
            />
            <Select
              label='Pre-commute routine'
              placeholder='Select a routine'
              clearable
              searchable
              nothingFound='You have no routines saved, try adding some to your profile!'
              data={routines.map((routine, index) => ({
                value: `${index} ${routine.name}`,
                label:
                  routine.name +
                  ` (${routine.activities.reduce((prev, curr) => prev + curr.duration, 0)} min)`,
                routine: routine,
              }))}
              onChange={(value) => {
                // get the routines
                if (!value) return setSelectedRoutine(undefined)

                const routine = routines[parseInt(value.split(' ')[0])]
                setSelectedRoutine(routine)
              }}
              itemComponent={RoutineItem}
              filter={(value, item) =>
                item.routine.name.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.routine.activities.some((item: Activity) =>
                  item.name.toLowerCase().includes(value.toLowerCase().trim()),
                )
              }
            />
            <Button
              onClick={searchClicked}
              loading={searchInProgress}
              disabled={!(originAddress && destinationAddress && date && arriveTime)}
            >
              Search
            </Button>
            {searchError ? (
              <Alert
                icon={<IconAlertCircle size='1rem' />}
                title='Bummer!'
                color='red'
                withCloseButton
                variant='filled'
                onClose={() => setSearchError('')}
              >
                {searchError}
              </Alert>
            ) : null}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export { AddressItem }
export default FormView
