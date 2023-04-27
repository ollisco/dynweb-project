import { Box, Container, Loader, Stack, Title, Text } from '@mantine/core'

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
}

function InformationView(props: InformationViewProps) {
  const displayString =
    'You should leave ' +
    props.originAddress +
    ' at ' +
    props.originTime +
    ' in order to arrive at ' +
    props.destinationAddress +
    ' at ' +
    props.destinationTime +
    '.'

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
          </>
        </Stack>
      </Box>
    </Container>
  )
}

export default InformationView
