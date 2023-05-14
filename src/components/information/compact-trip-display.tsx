import { useMantineTheme, Paper, Stack, Flex, Text } from '@mantine/core'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Trip } from '../../trip-source'
import { humanizeDuration, getIcon } from './information-view'

interface CompactTripDisplayComponentProps {
  tripIndex: number
  trip: Trip | undefined
  isSelected: boolean
  selectTrip: (index: number) => void
}

const CompactTripDisplayComponent = (props: CompactTripDisplayComponentProps) => {
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

export default CompactTripDisplayComponent
