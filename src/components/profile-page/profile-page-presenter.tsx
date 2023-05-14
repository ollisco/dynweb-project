import React, { useCallback, useEffect, useState } from 'react'
import ProfilePageView from './profile-page-view'
import { useDebouncedValue } from '@mantine/hooks'
import { getAutocompleteSuggestions } from '../../mapsSource'
import { observer } from 'mobx-react'
import Model, { ItemGroup } from '../../Model'

interface ProfilePagePresenterProps {
  model: Model
}

const ProfilePagePresenter = observer(({ model }: ProfilePagePresenterProps) => {
  const {
    user,
    homeAddress,
    saveHomeAddress,
    setHomeAddress,
    itemGroups,
    saveItemGroups,
    setItemGroups,
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

  const save = () => {
    setHomeAddress(addressSearch)
    saveHomeAddress(addressSearch)
  }

  const saveGroups = (itemGroups: ItemGroup[]) => {
    saveItemGroups(itemGroups)
    setItemGroups(itemGroups)
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
        saveFunction={save}
        itemGroups={itemGroups}
        saveGroups={saveGroups}
      />
    </>
  )
})

export default ProfilePagePresenter
