import { Trip } from '../../Model'
import InformationView from './information-view'

interface InformationPresenterProps {
  originAddress: string | undefined
  originTime: string | undefined
  destinationAddress: string | undefined
  destinationTime: string | undefined
  loading: boolean
  doSearch: boolean
  trip: Trip | undefined
}

function InformationPresenter(props: InformationPresenterProps) {
  return (
    <InformationView
      originAddress={props.originAddress}
      originTime={props.originTime}
      destinationAddress={props.destinationAddress}
      destinationTime={props.destinationTime}
      loading={props.loading}
      doSearch={props.doSearch}
      trip={props.trip}
    />
  )
}

export default InformationPresenter
