import { useEffect, useState } from 'react'
import { Trip } from '../../trip-source'
import InformationView from './information-view'
import { Routine } from '../../model'

interface InformationPresenterProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined
  routine: Routine | undefined
}

const InformationPresenter = ({
  originAddress,
  destinationAddress,
  destinationTime,
  searchInProgress,
  trips,
  routine,
}: InformationPresenterProps) => {
  const [selectedTripIndex, setSelectTripIndex] = useState<number>(0)

  useEffect(() => {
    setSelectTripIndex(0)
  }, [trips])

  return (
    <InformationView
      originAddress={originAddress}
      destinationAddress={destinationAddress}
      destinationTime={destinationTime}
      searchInProgress={searchInProgress}
      trips={trips}
      selectedTripIndex={selectedTripIndex}
      setSelectedTripIndex={setSelectTripIndex}
      routine={routine}
    />
  )
}

export default InformationPresenter
