import { useState } from 'react'
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
  const [selectedTripIndex, setSelectedTripIndex] = useState<number>(0)

  return (
    <InformationView
      originAddress={props.originAddress}
      destinationAddress={props.destinationAddress}
      destinationTime={props.destinationTime}
      searchInProgress={props.searchInProgress}
      trips={props.trips}
      selectedTripIndex={selectedTripIndex}
    />
  )
}

export default InformationPresenter
