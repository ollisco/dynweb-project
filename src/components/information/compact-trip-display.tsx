import { useMantineTheme, Paper, Stack, Flex, Text } from '@mantine/core'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Trip } from '../../trip-source'
import { humanizeDuration, getIcon } from './information-view'
import { Fragment } from 'react'

interface CompactTripDisplayComponentProps {
  tripIndex: number
  trip: Trip | undefined
  isSelected: boolean
  selectTrip: (index: number) => void
}

const CompactTripDisplayComponent = ({
  tripIndex,
  trip,
  isSelected,
  selectTrip,
}: CompactTripDisplayComponentProps) => {
  const theme = useMantineTheme()

  return (
    <Paper
      p='md'
      withBorder
      shadow={isSelected ? 'xl' : ''}
      onClick={() => selectTrip(tripIndex)}
      style={{ border: isSelected ? '1px solid ' + theme.colors.blue[6] : '' }}
    >
      <Stack>
        <Flex gap='md' justify='space-between'>
          <Text fw={700}>
            {trip?.Origin.time.substring(0, 5)} - {trip?.Destination.time.substring(0, 5)}
          </Text>
          <Text>{humanizeDuration(trip?.duration)}</Text>
        </Flex>
        <Text color='dimmed' style={{ display: 'flex', flexDirection: 'row' }}>
          {getIcon(trip?.LegList.Leg[0])}
          {trip?.LegList.Leg.slice(1).map((leg, index: number) => {
            return (
              <Fragment key={index}>
                <MdKeyboardArrowRight />
                {getIcon(leg)}
              </Fragment>
            )
          })}
        </Text>
      </Stack>
    </Paper>
  )
}

export default CompactTripDisplayComponent
