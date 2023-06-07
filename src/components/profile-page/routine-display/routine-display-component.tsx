import { useListState } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { Activity } from '../../../model'
import RoutineDisplayComponentView from './routine-display-component-view'

interface RoutineDisplayComponentProps {
  index: number
  name: string
  activities: Activity[]
  onUpdateActivities: (index: number, activities: Activity[]) => void
  onRemoveRoutine: () => void
}

const RoutineDisplayComponent = ({
  index,
  name,
  activities,
  onUpdateActivities,
  onRemoveRoutine,
}: RoutineDisplayComponentProps) => {
  const [activityState, activityStateHandlers] = useListState<Activity>(activities)
  const [newActivity, setNewActivity] = useState<boolean>(false)

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      duration: 0,
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      duration: (value) => {
        if (value <= 0) return 'Duration must be greater than 0'
        const totalRoutineDuration =
          activityState.reduce((acc, activity) => acc + activity.duration, 0) + value
        if (totalRoutineDuration > 120) return 'Total duration must be less than 120 minutes'
        return null
      },
    },
  })

  const toggleAddActivity = () => {
    form.reset()
    form.setErrors({})
    setNewActivity(!newActivity)
  }

  const addActivity = () => {
    const v = form.validate()
    if (v.hasErrors) {
      form.setErrors(v.errors)
      return
    }
    const { name: activityName, description, duration } = form.values

    const theNewActivity = { name: activityName, description, duration }
    activityStateHandlers.append(theNewActivity)

    toggleAddActivity()
  }

  const removeActivity = (index: number) => {
    activityStateHandlers.remove(index)
  }

  useEffect(() => {
    onUpdateActivities(index, activityState)
  }, [activityState])

  useEffect(() => {
    activityStateHandlers.setState(activities)
  }, [activities])

  return (
    <RoutineDisplayComponentView
      name={name}
      onRemoveRoutine={onRemoveRoutine}
      activityState={activityState}
      activityStateHandlers={activityStateHandlers}
      onRemoveActivity={removeActivity}
      newActivity={newActivity}
      toggleAddActivity={toggleAddActivity}
      form={form}
      onAddActivity={addActivity}
    />
  )
}

export default RoutineDisplayComponent
