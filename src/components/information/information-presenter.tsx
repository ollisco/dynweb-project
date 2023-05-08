import { useEffect, useState } from 'react'
import { Trip } from '../../tripSource'
import InformationView from './information-view'

interface InformationPresenterProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined
}

function InformationPresenter(props: InformationPresenterProps) {
  const [selectedTripIndex, setSelectTripIndex] = useState<number>(0)

  useEffect(() => {
    setSelectTripIndex(0)
  }, [props.trips])

  return (
    <InformationView
      originAddress={props.originAddress}
      destinationAddress={props.destinationAddress}
      destinationTime={props.destinationTime}
      searchInProgress={props.searchInProgress}
      trips={props.trips}
      selectedTripIndex={selectedTripIndex}
      setSelectedTripIndex={setSelectTripIndex}
    />
  )
}

export default InformationPresenter
