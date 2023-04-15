import FormView from './form-view'
import { calAuth, calIsAuthed, getFirstEvent } from '../../calendarSource'
import { createCoordsObj, getTrafficInfo } from '../../tripSource'
import { useCallback, useState } from 'react'
import { getSuggestions } from '../../mapsSource'
import { debounce } from 'lodash'

interface FormPresenterProps {
  homeAddress: string | undefined
  setHomeAddress: (value: string) => void
  setRoute: (destionationAddress: string, leaveTime: string, arriveTime: string) => void
  setRouteLoading: (value: boolean) => void
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
  const [date, setDate] = useState<Date>(new Date())
  const [arriveTime, setArriveTime] = useState<string>('')

  const handleOriginAddressChange = async (value: string) => {
    setOriginAddress(value)
    if (value) {
      setOriginAddressLoading(true)
      originAddressDebouncedSave(value)
    } else {
      setOriginAddressAutocompleteData([])
    }
  }

  const originAddressDebouncedSave = useCallback(
    debounce(async (newValue) => {
      const rep = await getSuggestions(newValue)
      setOriginAddressAutocompleteData(rep)
      setOriginAddressLoading(false)
    }, 1000),
    [],
  )

  const handleDestinationAddressChange = async (value: string) => {
    setDestinationAddress(value)
    if (value) {
      setDestinationAddressLoading(true)
      destinationAddressDebouncedSave(value)
    } else {
      setDestinationAddressAutocompleteData([])
    }
  }

  const destinationAddressDebouncedSave = useCallback(
    debounce(async (newValue) => {
      const rep = await getSuggestions(newValue)
      setDestinationAddressAutocompleteData(rep)
      setDestinationAddressLoading(false)
    }, 1000),
    [],
  )

  async function useCal() {
    if (!calIsAuthed()) await calAuth()
    if (calIsAuthed() && date) {
      const event = await getFirstEvent(date)
      setDestinationAddress(event.location)
      setArriveTime(event.start.substring(11, 16))
    }
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
      const trafficInfo = await getTrafficInfo(coordsObj)
      const originTime = trafficInfo.Trip.pop().Origin.time.substring(0, 5)
      props.setHomeAddress(originAddress)
      props.setRoute(destinationAddress, originTime, arriveTime)
      props.setRouteLoading(false)
    }
  }

  return (
    <FormView
      originAddress={originAddress}
      onChangeOriginAddress={handleOriginAddressChange}
      originAddressAutocompleteData={originAddressAutocompleteData}
      originAddressLoading={originAddressLoading}
      destinationAddress={destinationAddress}
      onChangeDestinationAddress={handleDestinationAddressChange}
      destinationAddressAutocompleteData={destinationAddressAutocompleteData}
      destinationAddressLoading={destinationAddressLoading}
      date={date}
      setDate={setDate}
      arriveTime={arriveTime}
      setArriveTime={setArriveTime}
      useCal={useCal}
      searchClicked={performSearch}
    />
  )
}

export default FormPresenter
