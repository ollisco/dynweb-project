import { useNavigate } from 'react-router'
import Model from '../../Model';
import InformationView from './information-view'

interface CommuteProps {
  model: Model;
}

export function InformationPresenter({ model }: CommuteProps) {
  return (
    <InformationView/>
  );
}