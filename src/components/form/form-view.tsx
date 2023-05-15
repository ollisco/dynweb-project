import React, { forwardRef } from 'react'
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
import { ItemProps } from './form-presenter'
import UseCalButton from '../calendar-buttons/use-cal-button'
import { Routine, Activity } from '../../model'

type CustomItemProps = SelectItemProps & { routine: Routine }

const CustomItem = forwardRef<HTMLDivElement, CustomItemProps>(({ routine, ...others }, ref) => {
  if (routine.activities.length > 0) {
    const totalDuration = routine.activities.reduce((prev, curr) => prev + curr.duration, 0)

    return (
      <div ref={ref} {...others}>
        <Group align='center'>
          <Text>{routine.name}</Text>
          <Text>
            {routine.activities
              .map<React.ReactNode>((item) => (
                <>
                  <Text span size='sm' color='dimmed'>
                    {item.name}
                  </Text>
                </>
              ))
              .reduce((prev, curr) => [
                prev,
                <>
                  <Text span size='sm' color='dimmed'>
                    ,{' '}
                  </Text>
                </>,
                curr,
              ])}
          </Text>
          <Text size='sm' color='dimmed'>
            {totalDuration} min
          </Text>
        </Group>
      </div>
    )
  } else return null
})

CustomItem.displayName = 'CustomItem'

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
  itemComponent,
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
              itemComponent={itemComponent}
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
              itemComponent={itemComponent}
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
              itemComponent={CustomItem}
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

export default FormView
