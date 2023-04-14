import Model from '../../Model'
import { addressToCoords } from '../../eventToTrip'
import { observer } from 'mobx-react'
import React, { useCallback, useState } from 'react'
import FormView from './form-view'
import { getSuggestions } from '../../autocompleteSrc'
import { debounce } from 'lodash'

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

  const debouncedSave = useCallback(
    debounce(async (newValue) => {
      const rep = await getSuggestions(newValue)
      setData(rep)
      setLoading(false)
    }, 1000),
    [],
  )

  const handleChange = async (value: string) => {
    setAddress(value)
    console.log('test')
    if (value) {
      setLoading(true)
      debouncedSave(value)
    } else {
      setData([])
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
