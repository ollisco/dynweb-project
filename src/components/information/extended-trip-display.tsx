import { Paper, Stack, Timeline, Text } from '@mantine/core'
import { MdLocationPin } from 'react-icons/md'
import { Trip } from '../../trip-source'
import AddToCalButton from '../calendar-buttons/add-to-cal-button'
import { getIcon, humanizeDuration } from './information-view'
import { ItemGroup } from '../../model'

interface ExtendedTripDisplayComponentProps {
  index: number
  originAddress: string | undefined
  destinationAddress: string | undefined
  trip: Trip | undefined
  itemGroup: ItemGroup | undefined
}

const ExtendedTripDisplayComponent = ({
  originAddress,
  destinationAddress,
  trip,
  itemGroup,
}: ExtendedTripDisplayComponentProps) => {
  return (
    <Paper style={{ flexGrow: 1 }} p='md' withBorder>
      <Stack>
        <Timeline lineWidth={2} active={trip?.LegList.Leg.length}>
          <Timeline.Item
            bullet={<MdLocationPin size={16} />}
            bulletSize={24}
            title={`${trip?.Origin.time.substring(0, 5)} - ${originAddress?.split(/[,()]/)[0]}`}
          >
            <Text color='dimmed' size='sm'>
              {getIcon(trip?.LegList.Leg[0])} {trip?.LegList.Leg[0].name}
            </Text>
            <Text color='dimmed' size='sm'>
              {trip?.LegList.Leg[0].direction?.split(/[,(]/)[0]}
            </Text>
            <Text color='dimmed' size='sm'>
              {humanizeDuration(trip?.LegList.Leg[0].duration)}
            </Text>
          </Timeline.Item>
          {trip?.LegList.Leg.slice(1).map((leg, index: number) => {
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
            title={`${trip?.Destination.time.substring(0, 5)} - ${
              destinationAddress?.split(/[,()]/)[0]
            }`}
          />
        </Timeline>
        <AddToCalButton
          originAddress={originAddress}
          destinationAddress={destinationAddress}
          trip={trip}
          itemGroup={itemGroup}
        />
      </Stack>
    </Paper>
  )
}

export default ExtendedTripDisplayComponent
