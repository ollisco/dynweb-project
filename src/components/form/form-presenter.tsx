import FormView from './form-view'
import { createCoordsObj, getTrafficInfo } from '../../tripSource'
import { LegacyRef, forwardRef, useCallback, useEffect, useState } from 'react'
import { getSuggestions } from '../../mapsSource'
import { debounce } from 'lodash'
import { Group, Text, SelectItemProps, MantineColor } from '@mantine/core'
import { Trip } from '../../Model'

interface FormPresenterProps {
  homeAddress: string | undefined
  setHomeAddress: (value: string) => void
  saveHomeAddress: (value: string) => void
  setRoute: (destionationAddress: string, leaveTime: string, arriveTime: string) => void
  setRouteLoading: (value: boolean) => void
  setRouteTrip: (trip: Trip) => void
}

// Items used in autocorrect
export interface ItemProps extends SelectItemProps {
  color: MantineColor
  street: string
  postcodeAndCity: string
}

// Style search results
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
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
        const suggestions = await getSuggestions(newValue)
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
    if (originAddress && destinationAddress && date && arriveTime) {
      props.setRouteLoading(true)
      const coordsObj = await createCoordsObj(
        originAddress,
        destinationAddress,
        date,
        arriveTime,
        1,
      )

      // Check for errors in addresses.
      if (!coordsObj.originCoordLat || !coordsObj.originCoordLong) {
        setOriginAddressError('Please check your input and try again.')
      } else if (!coordsObj.destCoordLat || !coordsObj.destCoordLong) {
        setDestinationAddressError('Please check your input and try again.')
      } else {
        try {
          const trafficInfo = await getTrafficInfo(coordsObj)
          const originTime = trafficInfo.data.Trip.pop().Origin.time.substring(0, 5)
          props.setHomeAddress(originAddress)
          props.saveHomeAddress(originAddress)
          props.setRoute(destinationAddress, originTime, arriveTime)
          props.setRouteTrip(trafficInfo.data.Trip.pop())
        } catch (error) {
          setDestinationAddressError(
            'Itinerary could not be calculated. Please try a different address.',
          )
        }
      }
      props.setRouteLoading(false)
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
      itemComponent={SelectItem}
    />
  )
}

export default FormPresenter
