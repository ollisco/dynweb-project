import { useCallback, useEffect, useState } from 'react'
import ProfilePageView from './profile-page-view'
import { useDebouncedValue } from '@mantine/hooks'
import { getAutocompleteSuggestions } from '../../maps-source'
import { observer } from 'mobx-react'
import Model, { Routine } from '../../model'

interface ProfilePagePresenterProps {
  model: Model
}

const ProfilePagePresenter = observer(({ model }: ProfilePagePresenterProps) => {
  const {
    user,
    homeAddress,
    saveHomeAddress,
    setHomeAddress,
    routines,
    saveRoutines,
    setRoutines,
  } = model

  const [addressSearch, setAddressSearch] = useState('')
  const [debounceedAddressSearch] = useDebouncedValue(addressSearch, 500)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedGetSuggestions = useCallback(async (value: string) => {
    setLoading(true)
    const suggestions = await getAutocompleteSuggestions(value)
    const formattedSuggestions = suggestions.map(
      (item: { postcodeAndCity: string; street: string }) => ({
        ...item,
        value: item.street + ', ' + item.postcodeAndCity, // this is what will be shown if selected
      }),
    )
    setSuggestions(formattedSuggestions)
    setLoading(false)
  }, [])

  const onSaveHomeAddress = () => {
    setHomeAddress(addressSearch)
    saveHomeAddress(addressSearch)
  }

  const onSaveRoutines = (Routines: Routine[]) => {
    saveRoutines(Routines)
    setRoutines(Routines)
  }

  useEffect(() => {
    if (debounceedAddressSearch) debouncedGetSuggestions(debounceedAddressSearch)
  }, [debounceedAddressSearch])

  useEffect(() => {
    if (homeAddress) setAddressSearch(homeAddress)
  }, [homeAddress])

  return (
    <>
      <ProfilePageView
        user={user}
        homeAddress={homeAddress}
        setAddressSearch={setAddressSearch}
        addressSearch={addressSearch}
        addressData={suggestions}
        addressLoading={loading}
        saveHomeAddress={onSaveHomeAddress}
        routines={routines}
        saveRoutines={onSaveRoutines}
      />
    </>
  )
})

export default ProfilePagePresenter
