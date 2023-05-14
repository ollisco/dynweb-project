import { DateInput, TimeInput } from '@mantine/dates'
import { ItemProps } from './form-presenter'
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
import { IconAlertCircle } from '@tabler/icons-react'
import UseCalButton from '../calendar-buttons/use-cal-button'
import React, { forwardRef } from 'react'
import { ItemGroup, Item } from '../../Model'

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
  saveHomeAddress: boolean
  setSaveHomeAddress: (value: boolean) => void
  itemGroups: ItemGroup[]
  setPreActivity: (activity: ItemGroup | undefined) => void
}

function FormView(props: FormViewProps) {
  console.log(props.itemGroups)
  return (
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
            <Select
              label='Select a group of activities to do before travel'
              placeholder='Select an group'
              clearable
              searchable
              nothingFound='No Item Groups found, visit the profile page to add some'
              data={props.itemGroups.map((itemGroup, index) => ({
                value: `${index} ${itemGroup.name}`,
                label:
                  itemGroup.name +
                  ` (${itemGroup.items.reduce((prev, curr) => prev + curr.duration, 0)} min)`,
                itemGroup: itemGroup,
              }))}
              onChange={(value) => {
                // get the itemGroup
                if (!value) return props.setPreActivity(undefined)

                const itemGroup = props.itemGroups[parseInt(value.split(' ')[0])]
                props.setPreActivity(itemGroup)
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
