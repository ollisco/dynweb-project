import { useEffect, useState } from 'react'
import { Trip } from '../../trip-source'
import InformationView from './information-view'
import { ItemGroup } from '../../model'

interface InformationPresenterProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined
  itemGroup: ItemGroup | undefined
}

const InformationPresenter = ({
  originAddress,
  destinationAddress,
  destinationTime,
  searchInProgress,
  trips,
  itemGroup,
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
      itemGroup={itemGroup}
    />
  )
}

export default InformationPresenter
