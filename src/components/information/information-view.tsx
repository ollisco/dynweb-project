import { Loader, useMantineTheme } from '@mantine/core'

interface InformationViewProps {
  originAddress: string | undefined
  originTime: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  loading: boolean
}

function InformationView(props: InformationViewProps) {
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
    </div>
  )
}

export default InformationView
