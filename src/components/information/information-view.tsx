import { Loader, useMantineTheme } from '@mantine/core'
import AddToCalButton from '../calendar-buttons/add-to-cal-button'
import { Trip } from '../../Model'

interface InformationViewProps {
  originAddress: string | undefined
  originTime: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  loading: boolean
  trip: Trip | undefined
}

function InformationView(props: InformationViewProps) {
  const theme = useMantineTheme()
  return (
    <div>
      <h2>Your commute:</h2>
      <div>
        {props.loading ? (
          <Loader />
        ) : (
          'You should leave ' +
          props.originAddress +
          ' at ' +
          props.originTime +
          ' in order to arrive at ' +
          props.destinationAddress +
          ' at ' +
          props.destinationTime +
          '.'
        )}
      </div>
      <AddToCalButton
        originAddress={props.originAddress}
        destinationAddress={props.destinationAddress}
        trip={props.trip}
      ></AddToCalButton>
    </div>
  )
}

export default InformationView
