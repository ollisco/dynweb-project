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
import { ItemGroup, Item } from '../../model'

type CustomItemProps = SelectItemProps & { itemGroup: ItemGroup }

const CustomItem = forwardRef<HTMLDivElement, CustomItemProps>(({ itemGroup, ...others }, ref) => {
  const totalDuration = itemGroup.items.reduce((prev, curr) => prev + curr.duration, 0)

  return (
    <div ref={ref} {...others}>
      <Group align='center'>
        <Text>{itemGroup.name}</Text>
        <Text>
          {itemGroup.items
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
  itemGroups: ItemGroup[]
  setPreActivity: (activity: ItemGroup | undefined) => void
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
  itemGroups,
  setPreActivity,
}: FormViewProps) => {
  console.log(itemGroups)
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
              label='Select a group of activities to do before travel'
              placeholder='Select an group'
              clearable
              searchable
              nothingFound='No Item Groups found, visit the profile page to add some'
              data={itemGroups.map((itemGroup, index) => ({
                value: `${index} ${itemGroup.name}`,
                label:
                  itemGroup.name +
                  ` (${itemGroup.items.reduce((prev, curr) => prev + curr.duration, 0)} min)`,
                itemGroup: itemGroup,
              }))}
              onChange={(value) => {
                // get the itemGroup
                if (!value) return setPreActivity(undefined)

                const itemGroup = itemGroups[parseInt(value.split(' ')[0])]
                setPreActivity(itemGroup)
              }}
              itemComponent={CustomItem}
              filter={(value, item) =>
                item.itemGroup.name.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.itemGroup.items.some((item: Item) =>
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
