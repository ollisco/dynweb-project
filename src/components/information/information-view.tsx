import { Loader, useMantineTheme } from '@mantine/core'

interface InformationViewProps {
  originAddress: string | undefined
  originTime: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  loading: boolean
}

function InformationView({
  originAddress,
  originTime,
  destinationAddress,
  destinationTime,
  loading,
}: InformationViewProps) {
  return (
    <div>
      <h2>Your commute:</h2>
      <div>
        {loading ? (
          <Loader />
        ) : (
          'You should leave ' +
          originAddress +
          ' at ' +
          originTime +
          ' in order to arrive at ' +
          destinationAddress +
          ' at ' +
          destinationTime +
          '.'
        )}
      </div>
    </div>
  )
}

export default InformationView
