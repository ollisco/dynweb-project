import { Box, Container, Stack, Title, Flex, useMantineTheme } from '@mantine/core'
import { Trip } from '../../trip-source'
import {
  MdDirectionsWalk,
  MdTrain,
  MdTransferWithinAStation,
  MdDirectionsSubway,
  MdDirectionsBus,
} from 'react-icons/md'
import { useMediaQuery } from '@mantine/hooks'
import CompactTripDisplayComponent from './compact-trip-display'
import ExtendedTripDisplayComponent from './extended-trip-display'
import { ItemGroup } from '../../model'

const getIcon = (leg: { type: string; category: string } | undefined) => {
  switch (leg?.category) {
    case 'BLT':
      return <MdDirectionsBus />
    case 'JLT':
      return <MdTrain />
    case 'ULT':
      return <MdDirectionsSubway />
    default:
      break
  }
  switch (leg?.type) {
    case 'WALK':
      return <MdDirectionsWalk />
    case 'JNY':
      return <MdTrain />
    case 'TRSF':
      return <MdTransferWithinAStation />
    default:
      return
  }
}

const humanizeDuration = (duration: string | undefined) => {
  if (duration)
    return duration
      .replace('P', '')
      .replace('T', '')
      .replace('D', ' d ')
      .replace('H', ' h ')
      .replace('M', ' min')
      .trim()
}

interface InformationViewProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined
  itemGroup: ItemGroup | undefined
  selectedTripIndex: number
  setSelectedTripIndex: (index: number) => void
}

const InformationView = (props: InformationViewProps) => {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width:${theme.breakpoints.sm})`)

  const renderCompactTripCards = (fromIndex: number, toIndex?: number) => {
    if (!props.trips) return null
    return props.trips.slice(fromIndex, toIndex).map((trip: Trip, index: number) => {
      return (
        <CompactTripDisplayComponent
          key={index}
          tripIndex={fromIndex + index}
          trip={trip}
          isSelected={fromIndex + index == props.selectedTripIndex}
          selectTrip={props.setSelectedTripIndex}
        />
      )
    })
  }

  return (
    <>
      {!props.searchInProgress && props.destinationAddress && props.trips ? (
        <Box w='100%'>
          <Container px={0} size='sm'>
            <Title order={2} align='center' m='xl'>
              Your commute
            </Title>
            {isMobile ? (
              <Stack>
                {renderCompactTripCards(0, props.selectedTripIndex)}
                <ExtendedTripDisplayComponent
                  index={props.selectedTripIndex}
                  originAddress={props.originAddress}
                  destinationAddress={props.destinationAddress}
                  trip={props.trips.at(props.selectedTripIndex)}
                  itemGroup={props.itemGroup}
                />
                {renderCompactTripCards(props.selectedTripIndex + 1)}
              </Stack>
            ) : (
              <Flex gap='md' justify='center' align='flex-start' direction='row'>
                <Stack>{renderCompactTripCards(0)}</Stack>
                <ExtendedTripDisplayComponent
                  index={props.selectedTripIndex}
                  originAddress={props.originAddress}
                  destinationAddress={props.destinationAddress}
                  trip={props.trips.at(props.selectedTripIndex)}
                  itemGroup={props.itemGroup}
                />
              </Flex>
            )}
          </Container>
        </Box>
      ) : (
        <Box />
      )}
    </>
  )
}

export default InformationView
export { getIcon, humanizeDuration }
