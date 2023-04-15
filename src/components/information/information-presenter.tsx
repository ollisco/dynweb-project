import InformationView from './information-view'

interface InformationPresenterProps {
  originAddress: string | undefined
  originTime: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  loading: boolean
}

function InformationPresenter(props: InformationPresenterProps) {
  return (
    <InformationView
      originAddress={props.originAddress}
      originTime={props.originTime}
      destinationAddress={props.destinationAddress}
      destinationTime={props.destinationTime}
      loading={props.loading}
    />
  )
}

export default InformationPresenter
