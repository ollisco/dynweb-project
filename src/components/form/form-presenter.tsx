import Model from '../../Model'
import { useForm } from '@mantine/form'
import { addressToCoords } from '../../eventToTrip'
import { observer } from 'mobx-react'
import React from 'react'
import FormView from './form-view'

interface FormPresenterProps {
  model: Model
}

const FormPresenter = observer(({ model }: FormPresenterProps) => {
  const [address, setAddress] = React.useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const coords = await addressToCoords(address)
    if (coords !== null) model.setHomeAddress(address, coords)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  return <FormView address={address} onSubmit={handleSubmit} onChange={handleChange} />
})

export default FormPresenter
