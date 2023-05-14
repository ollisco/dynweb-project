import { LegacyRef, forwardRef, useCallback, useEffect, useState } from 'react'
import { Group, Text, SelectItemProps, MantineColor } from '@mantine/core'
import { debounce } from 'lodash'
import { AddressError, getAutocompleteSuggestions } from '../../mapsSource'
import { TripError } from '../../tripSource'
import FormView from './form-view'
import { ItemGroup } from '../profile-page/profile-page-components/profile-page-item'

// Items used in autocorrect
interface ItemProps extends SelectItemProps {
  color: MantineColor
  street: string
  postcodeAndCity: string
}

// Style search results
export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    { street, postcodeAndCity, ...others }: ItemProps,
    ref: LegacyRef<HTMLDivElement> | undefined,
  ) => {
    return (
      <div ref={ref} {...others}>
        <Group>
          <Text size='sm'>{street}</Text>
          <Text size='xs' opacity={0.65}>
            {postcodeAndCity}
          </Text>
        </Group>
      </div>
    )
  },
)

SelectItem.displayName = 'SelectItem'

interface FormPresenterProps {
  homeAddress: string | undefined
  itemGroups: ItemGroup[]
  saveHomeAddress: (value: string) => void
  searchInProgress: boolean
  doSearch: (
    originAddress: string,
    destinationAddress: string,
    date: Date,
    arriveTime: string,
  ) => void
}

function FormPresenter(props: FormPresenterProps) {
  const [originAddress, setOriginAddress] = useState<string>('')
  const [originAddressLoading, setOriginAddressLoading] = useState(false)
  const [originAddressAutocompleteData, setOriginAddressAutocompleteData] = useState<string[]>([])
  const [destinationAddress, setDestinationAddress] = useState<string>('')
  const [destinationAddressLoading, setDestinationAddressLoading] = useState(false)
  const [destinationAddressAutocompleteData, setDestinationAddressAutocompleteData] = useState<
    string[]
  >([])
  const [date, setDate] = useState<Date>(new Date(new Date().setUTCHours(0, 0, 0, 0)))
  const [arriveTime, setArriveTime] = useState<string>('')
  const [originAddressError, setOriginAddressError] = useState<string>('')
  const [destinationAddressError, setDestinationAddressError] = useState<string>('')
  const [searchError, setSearchError] = useState<string>('')
  const [saveHomeAddress, setSaveHomeAddress] = useState<boolean>(false)

  // Load saved home address
  useEffect(() => {
    if (props.homeAddress) setOriginAddress(props.homeAddress)
  }, [props.homeAddress])

  const debouncedGetSuggestions = useCallback(
    // useCallback caches functions between rerenders
    debounce(
      async (
        newValue: string,
        setAutocompleteData: (arg0: never[]) => void,
        setLoading: (arg0: boolean) => void,
      ) => {
        const suggestions = await getAutocompleteSuggestions(newValue)
        const formattedSuggestions = suggestions.map(
          (item: { postcodeAndCity: string; street: string }) => ({
            ...item,
            value: item.street + ', ' + item.postcodeAndCity, // this is what will be shown if selected
          }),
        )
        setAutocompleteData(formattedSuggestions)
        setLoading(false)
      },
      500, // only load search results when user is not typing
      { maxWait: 2000 }, // after a maximum of 2 seconds the results will be showed either way
    ),
    [],
  )

  const handleAddressChange = (
    value: string,
    setAutocompleteData: (arg0: never[]) => void,
    setLoading: (arg0: boolean) => void,
  ) => {
    setAutocompleteData([])
    if (value) {
      setLoading(true)
      debouncedGetSuggestions(value, setAutocompleteData, setLoading)
    } else {
      setLoading(false)
    }
  }

  const handleOriginAddressChange = (value: string) => {
    setOriginAddress(value)
    setOriginAddressError('')
    handleAddressChange(value, setOriginAddressAutocompleteData, setOriginAddressLoading)
  }

  const handleDestinationAddressChange = (value: string) => {
    setDestinationAddress(value)
    setDestinationAddressError('')
    handleAddressChange(value, setDestinationAddressAutocompleteData, setDestinationAddressLoading)
  }

  async function performSearch() {
    setOriginAddressError('')
    setDestinationAddressError('')
    setSearchError('')
    try {
      await props.doSearch(originAddress, destinationAddress, date, arriveTime)
      if (saveHomeAddress) props.saveHomeAddress(originAddress)
    } catch (error) {
      if (error instanceof AddressError) {
        if (error.address === originAddress)
          setOriginAddressError('Invalid address, please check your input and try again.')
        if (error.address === destinationAddress)
          setDestinationAddressError('Invalid address, please check your input and try again.')
      } else if (error instanceof TripError) {
        if (error.code === 'ECONNABORTED')
          setSearchError('Request timed out, please try again later.')
        else setSearchError('Could not calculate itinerary, please try a different address')
      } else console.error(error)
    }
  }

  return (
    <FormView
      originAddress={originAddress}
      onChangeOriginAddress={handleOriginAddressChange}
      originAddressAutocompleteData={originAddressAutocompleteData}
      originAddressLoading={originAddressLoading}
      originAddressError={originAddressError}
      destinationAddress={destinationAddress}
      onChangeDestinationAddress={handleDestinationAddressChange}
      destinationAddressAutocompleteData={destinationAddressAutocompleteData}
      destinationAddressLoading={destinationAddressLoading}
      destinationAddressError={destinationAddressError}
      date={date}
      setDate={setDate}
      arriveTime={arriveTime}
      setArriveTime={setArriveTime}
      searchClicked={performSearch}
      searchInProgress={props.searchInProgress}
      itemComponent={SelectItem}
      searchError={searchError}
      setSearchError={setSearchError}
      saveHomeAddress={saveHomeAddress}
      setSaveHomeAddress={setSaveHomeAddress}
      itemGroups={props.itemGroups}
    />
  )
}

export type { ItemProps }
export default FormPresenter
