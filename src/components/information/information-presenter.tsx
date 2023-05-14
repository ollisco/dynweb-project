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

const InformationPresenter = (props: InformationPresenterProps) => {
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
      itemGroup={props.itemGroup}
    />
  )
}

export default InformationPresenter
