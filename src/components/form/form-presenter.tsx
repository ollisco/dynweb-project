import Model from '../../Model'
import { addressToCoords } from '../../eventToTrip'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import FormView from './form-view'
import { getSuggestions } from '../../autocompleteSrc'

interface FormPresenterProps {
  model: Model
}

const FormPresenter = observer(({ model }: FormPresenterProps) => {
  const [address, setAddress] = React.useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const coords = await addressToCoords(address)
    if (coords !== null) model.setHomeAddress(address, coords)
  }

  const handleChange = async (value: string) => {
    setAddress(value)
    if (value.trim().length < 3) { // may result in bugs
      setLoading(false)
    } else {
      setLoading(true)
      const newdata: string[] = await getSuggestions(value)
      setData(newdata)
    }
  }

  return (
    <FormView
      address={address}
      onSubmit={handleSubmit}
      onChange={handleChange}
      autocompleteData={data}
      loading={loading}
    />
  )
})

export default FormPresenter
