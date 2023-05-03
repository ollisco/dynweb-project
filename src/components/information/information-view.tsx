import { Box, Container, Stack, Title, Text } from '@mantine/core'
import AddToCalButton from '../calendar-buttons/add-to-cal-button'
import { Trip } from '../../tripSource'

interface TripDisplayComponentProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  trip: Trip | undefined
}

function TripDisplayComponent({
  originAddress,
  destinationAddress,
  trip,
}: TripDisplayComponentProps) {
  return (
    <Text>
      You should leave
      <Text span> {originAddress} </Text>
      at
      <Text span fw='bold'>
        {' '}
        {trip?.Origin.time}{' '}
      </Text>
      in order to arrive at
      <Text span> {destinationAddress} </Text>
      at
      <Text span fw='bold'>
        {' '}
        {trip?.Destination.time}{' '}
      </Text>
    </Text>
  )
}

interface InformationViewProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined
  selectedTripIndex: number
}

function InformationView(props: InformationViewProps) {
  return (
    <>
      {!props.searchInProgress && props.destinationAddress && props.trips ? (
        <Container>
          <Box m='xl'>
            <Stack spacing='xs'>
              <Title order={2}>Your commute</Title>
              <>
                {props.trips.map((trip: Trip, index: number) => {
                  return (
                    <TripDisplayComponent
                      key={index}
                      originAddress={props.originAddress}
                      destinationAddress={props.destinationAddress}
                      trip={trip}
                    />
                  )
                })}
                <AddToCalButton
                  originAddress={props.originAddress}
                  destinationAddress={props.destinationAddress}
                  trip={props.trips.at(props.selectedTripIndex)}
                />
              </>
            </Stack>
          </Box>
        </Container>
      ) : (
        <Container />
      )}
    </>
  )
}

export default InformationView
