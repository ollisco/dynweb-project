import { Box, Container, Stack, Title, Text, Paper, Flex, Timeline } from '@mantine/core'
import AddToCalButton from '../calendar-buttons/add-to-cal-button'
import { Trip } from '../../tripSource'
import { MdDirectionsWalk, MdLocationPin, MdTrain, MdTransferWithinAStation } from 'react-icons/md'

interface CompactTripDisplayComponentProps {
  tripIndex: number
  trip: Trip | undefined
  isSelected: boolean
  selectTrip: (index: number) => void
}

function CompactTripDisplayComponent(props: CompactTripDisplayComponentProps) {
  return (
    <Paper
      p='md'
      withBorder
      shadow={props.isSelected ? 'xl' : ''}
      onClick={() => props.selectTrip(props.tripIndex)}
    >
      <Text fw={700}>
        {props.trip?.Origin.time.substring(0, 5)} - {props.trip?.Destination.time.substring(0, 5)}
      </Text>
      <Text>{props.trip?.duration.split('PT')[1].replace('H', ' t ').replace('M', ' min')}</Text>
    </Paper>
  )
}

interface ExtendedTripDisplayComponentProps {
  index: number
  originAddress: string | undefined
  destinationAddress: string | undefined
  trip: Trip | undefined
}

function ExtendedTripDisplayComponent(props: ExtendedTripDisplayComponentProps) {
  function getIcon(legType: string | undefined) {
    switch (legType) {
      case 'WALK':
        return <MdDirectionsWalk />
      case 'JNY':
        return <MdTrain />
      case 'TRSF':
        return <MdTransferWithinAStation />
    }
  }

  return (
    <Paper style={{ flexGrow: 1 }} p='md' withBorder>
      <Stack>
        <Timeline bulletSize={24} lineWidth={2} active={props.trip?.LegList.Leg.length}>
          <Timeline.Item
            bullet={<MdLocationPin size={16} />}
            title={`${props.trip?.Origin.time.substring(0, 5)} - ${
              props.originAddress?.split(/[,()]/)[0]
            }`}
          >
            <Text color='dimmed' size='sm'>
              {getIcon(props.trip?.LegList.Leg[0].type)} {props.trip?.LegList.Leg[0].name}
            </Text>
            <Text color='dimmed' size='sm'>
              {props.trip?.LegList.Leg[0].direction?.split(/[,(]/)[0]}
            </Text>
            <Text color='dimmed' size='sm'>
              {props.trip?.LegList.Leg[0].duration
                .split('PT')[1]
                .replace('H', ' t ')
                .replace('M', ' min')}
            </Text>
          </Timeline.Item>
          {props.trip?.LegList.Leg.slice(1).map((leg, index: number) => {
            return (
              <Timeline.Item
                title={`${leg.Origin.time.substring(0, 5)} - ${leg.Origin.name.split(/[,(]/)[0]}`}
                key={index}
              >
                <Text color='dimmed' size='sm'>
                  {getIcon(leg.type)} {leg.name}
                </Text>
                <Text color='dimmed' size='sm'>
                  {leg.direction?.split(/[,(]/)[0]}
                </Text>
                <Text color='dimmed' size='sm'>
                  {leg.duration.split('PT')[1].replace('H', ' t ').replace('M', ' min')}
                </Text>
              </Timeline.Item>
            )
          })}
          <Timeline.Item
            bullet={<MdLocationPin size={16} />}
            title={`${props.trip?.Destination.time.substring(0, 5)} - ${
              props.destinationAddress?.split(/[,()]/)[0]
            }`}
          />
        </Timeline>
        <AddToCalButton
          originAddress={props.originAddress}
          destinationAddress={props.destinationAddress}
          trip={props.trip}
        />
      </Stack>
    </Paper>
  )
}

interface InformationViewProps {
  originAddress: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  searchInProgress: boolean
  trips: Trip[] | undefined
  selectedTripIndex: number
  setSelectedTripIndex: (index: number) => void
}

function InformationView(props: InformationViewProps) {
  return (
    <>
      {!props.searchInProgress && props.destinationAddress && props.trips ? (
        <Box w='100vw'>
          <Container>
            <Title order={2} align='center'>
              Your commute
            </Title>
            <Flex p='xl' gap='md' justify='flex-start' align='flex-start' direction='row'>
              <Stack>
                {props.trips.map((trip: Trip, index: number) => {
                  return (
                    <CompactTripDisplayComponent
                      key={index}
                      tripIndex={index}
                      trip={trip}
                      isSelected={index == props.selectedTripIndex}
                      selectTrip={props.setSelectedTripIndex}
                    />
                  )
                })}
              </Stack>
              <ExtendedTripDisplayComponent
                index={props.selectedTripIndex}
                originAddress={props.originAddress}
                destinationAddress={props.destinationAddress}
                trip={props.trips.at(props.selectedTripIndex)}
              />
            </Flex>
          </Container>
        </Box>
      ) : (
        <Box />
      )}
    </>
  )
}

export default InformationView
