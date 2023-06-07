import { useCallback, useEffect, useState } from 'react'
import ProfilePageView from './profile-page-view'
import { useDebouncedValue } from '@mantine/hooks'
import { getAutocompleteSuggestions } from '../../maps-source'
import { observer } from 'mobx-react'
import Model, { Activity } from '../../model'
import Auth from '../../auth'

interface ProfilePagePresenterProps {
  model: Model
  auth: Auth
}

const ProfilePagePresenter = observer(({ model, auth }: ProfilePagePresenterProps) => {
  const { savedHomeAddress, setSavedHomeAddress, setHomeAddress, routines, setRoutines } = model
  const [addressSearch, setAddressSearch] = useState(savedHomeAddress ?? '')
  const [debouncedAddressSearch] = useDebouncedValue(addressSearch, 500)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [addressLoading, setAddressLoading] = useState(false)
  const [newRoutineName, setNewRoutineName] = useState<string>('')
  const [newRoutineError, setNewRoutineError] = useState<string>('')

  const userInitials = auth.user?.user.displayName
    ? auth.user.user.displayName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .slice(0, 2)
    : 'UU'

  const userPhotoUrl = auth.user?.user.photoURL ?? ''
  const userDisplayName = auth.user?.user.displayName ?? ''
  const userEmail = auth.user?.user.email ?? ''

  const debouncedGetSuggestions = useCallback(async (value: string) => {
    setAddressLoading(true)
    const suggestions = await getAutocompleteSuggestions(value)
    const formattedSuggestions = suggestions.map(
      (item: { postcodeAndCity: string; street: string }) => ({
        ...item,
        value: item.street + ', ' + item.postcodeAndCity, // this is what will be shown if selected
      }),
    )
    setSuggestions(formattedSuggestions)
    setAddressLoading(false)
  }, [])

  const createRoutine = (closePopup: () => void) => {
    if (!newRoutineName) {
      setNewRoutineError('Name is required')
      return
    }
    const newRoutine = {
      name: newRoutineName,
      activities: [],
    }
    const newRoutines = routines ? [...routines, newRoutine] : [newRoutine]
    setNewRoutineName('')
    setNewRoutineError('')
    setRoutines(newRoutines)
    closePopup()
  }

  const updateRoutine = (index: number, activities: Activity[]) => {
    const newRoutines = routines ? [...routines] : []
    newRoutines[index].activities = activities
    setRoutines(newRoutines)
  }

  const removeRoutine = (index: number) => {
    const newRoutines = routines ? [...routines] : []
    newRoutines.splice(index, 1)
    setRoutines(newRoutines)
  }

  useEffect(() => {
    if (debouncedAddressSearch) debouncedGetSuggestions(debouncedAddressSearch)
  }, [debouncedAddressSearch])

  useEffect(() => {
    if (savedHomeAddress) setAddressSearch(savedHomeAddress)
  }, [savedHomeAddress])

  return (
    <ProfilePageView
      userInitials={userInitials}
      userPhotoUrl={userPhotoUrl}
      userDisplayName={userDisplayName}
      userEmail={userEmail}
      homeAddress={savedHomeAddress}
      setAddressSearch={setAddressSearch}
      addressSearch={addressSearch}
      addressData={suggestions}
      addressLoading={addressLoading}
      onSaveHomeAddress={() => {
        setHomeAddress(addressSearch)
        setSavedHomeAddress(addressSearch)
      }}
      routines={routines}
      onCreateRoutine={createRoutine}
      onUpdateRoutine={updateRoutine}
      onRemoveRoutine={removeRoutine}
      newRoutineName={newRoutineName}
      setNewRoutineName={setNewRoutineName}
      newRoutineError={newRoutineError}
      setNewRoutineError={setNewRoutineError}
    />
  )
})

export default ProfilePagePresenter
