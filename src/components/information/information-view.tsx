import {
  Box,
  Container,
  Stack,
  Title,
  Text,
  Paper,
  Flex,
  Timeline,
  useMantineTheme,
} from '@mantine/core'
import AddToCalButton from '../calendar-buttons/add-to-cal-button'
import { Trip } from '../../tripSource'
import {
  MdDirectionsWalk,
  MdLocationPin,
  MdTrain,
  MdTransferWithinAStation,
  MdKeyboardArrowRight,
  MdDirectionsSubway,
  MdDirectionsBus,
} from 'react-icons/md'

function getIcon(leg: { type: string; category: string } | undefined) {
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

function humanizeDuration(duration: string | undefined) {
  if (duration)
    return duration
      .replace('P', '')
      .replace('T', '')
      .replace('D', ' d ')
      .replace('H', ' h ')
      .replace('M', ' min')
      .trim()
}

interface CompactTripDisplayComponentProps {
  tripIndex: number
  trip: Trip | undefined
  isSelected: boolean
  selectTrip: (index: number) => void
}

function CompactTripDisplayComponent(props: CompactTripDisplayComponentProps) {
  const theme = useMantineTheme()
  return (
    <Paper
      p='md'
      withBorder
      shadow={props.isSelected ? 'xl' : ''}
      onClick={() => props.selectTrip(props.tripIndex)}
      style={{ border: props.isSelected ? '1px solid ' + theme.colors.blue[6] : '' }}
    >
      <Stack>
        <Flex gap='md' justify='space-between'>
          <Text fw={700}>
            {props.trip?.Origin.time.substring(0, 5)} -{' '}
            {props.trip?.Destination.time.substring(0, 5)}
          </Text>
          <Text>{humanizeDuration(props.trip?.duration)}</Text>
        </Flex>
        <Text color='dimmed' style={{ display: 'flex', flexDirection: 'row' }}>
          {getIcon(props.trip?.LegList.Leg[0])}
          {props.trip?.LegList.Leg.slice(1).map((leg, index: number) => {
            return (
              <div key={index}>
                <MdKeyboardArrowRight />
                {getIcon(leg)}
              </div>
            )
          })}
        </Text>
      </Stack>
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
  return (
    <Paper style={{ flexGrow: 1 }} p='md' withBorder>
      <Stack>
        <Timeline lineWidth={2} active={props.trip?.LegList.Leg.length}>
          <Timeline.Item
            bullet={<MdLocationPin size={16} />}
            bulletSize={24}
            title={`${props.trip?.Origin.time.substring(0, 5)} - ${
              props.originAddress?.split(/[,()]/)[0]
            }`}
          >
            <Text color='dimmed' size='sm'>
              {getIcon(props.trip?.LegList.Leg[0])} {props.trip?.LegList.Leg[0].name}
            </Text>
            <Text color='dimmed' size='sm'>
              {props.trip?.LegList.Leg[0].direction?.split(/[,(]/)[0]}
            </Text>
            <Text color='dimmed' size='sm'>
              {humanizeDuration(props.trip?.LegList.Leg[0].duration)}
            </Text>
          </Timeline.Item>
          {props.trip?.LegList.Leg.slice(1).map((leg, index: number) => {
            return (
              <Timeline.Item
                bulletSize={16}
                title={`${leg.Origin.time.substring(0, 5)} - ${leg.Origin.name.split(/[,(]/)[0]}`}
                key={index}
              >
                <Text color='dimmed' size='sm'>
                  {getIcon(leg)} {leg.name}
                </Text>
                <Text color='dimmed' size='sm'>
                  {leg.direction?.split(/[,(]/)[0]}
                </Text>
                <Text color='dimmed' size='sm'>
                  {humanizeDuration(leg.duration)}
                </Text>
              </Timeline.Item>
            )
          })}
          <Timeline.Item
            bullet={<MdLocationPin size={16} />}
            bulletSize={24}
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
