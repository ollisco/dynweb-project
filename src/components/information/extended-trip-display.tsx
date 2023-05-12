import { Paper, Stack, Timeline, Text } from '@mantine/core'
import { MdLocationPin } from 'react-icons/md'
import { Trip } from '../../tripSource'
import AddToCalButton from '../calendar-buttons/add-to-cal-button'
import { getIcon, humanizeDuration } from './information-view'

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

export default ExtendedTripDisplayComponent
