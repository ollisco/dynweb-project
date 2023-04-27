import { Box, Container, Loader, Stack, Title, Text } from '@mantine/core'
import AddToCalButton from '../calendar-buttons/add-to-cal-button'
import { Trip } from '../../Model'

interface DisplayComponentProps {
  originAddress?: string
  originTime?: string
  destinationAddress?: string
  destinationTime?: string
}

function DisplayComponent({
  originAddress,
  originTime,
  destinationAddress,
  destinationTime
}: DisplayComponentProps) {

  return (
    <Text>
      You should leave
      <Text span> {originAddress} </Text>
      at
      <Text span fw='bold'> {originTime} </Text>
      in order to arrive at
      <Text span> {destinationAddress} </Text>
      at
      <Text span fw='bold'> {destinationTime} </Text>
    </Text>
  )
}

interface InformationViewProps {
  originAddress: string | undefined
  originTime: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  loading: boolean
  trip: Trip | undefined
}

function InformationView(props: InformationViewProps) {

  return (
    <Container>
      <Box m='xl'>
        <Stack spacing='xs'>
          <Title order={2}>Your commute:</Title>
          <>
            {props.loading ? (
              <Loader />
            ) : (
              <DisplayComponent
                originAddress={props.originAddress}
                originTime={props.originTime}
                destinationAddress={props.destinationAddress}
                destinationTime={props.destinationTime}
              />
            )}
            <AddToCalButton
              originAddress={props.originAddress}
              destinationAddress={props.destinationAddress}
              trip={props.trip}
            />
          </>
        </Stack>
      </Box>
    </Container>
  )
}

export default InformationView
