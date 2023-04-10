import { useNavigate } from 'react-router'
import Model from '../../Model';

interface CommuteProps {
  model: Model;
}

export function InformationPresenter({ model }: CommuteProps) {
  return (
    <InformationView/>
  );
}