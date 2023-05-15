import {
  ActionIcon,
  Button,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { IconGripVertical, IconX } from '@tabler/icons-react'
import { useListState } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { Activity } from '../../model'

const ActivityDisplayComponent = ({ name, description, duration }: Activity) => {
  return (
    <Group>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{duration}</Text>
    </Group>
  )
}

interface RoutineCompProps {
  index: number
  name: string
  activities: Activity[]
  onUpdateActivities: (index: number, activities: Activity[]) => void
  onRemoveRoutine: (index: number) => void
}

const RoutineDisplayComponent = ({
  index,
  name,
  activities,
  onUpdateActivities,
  onRemoveRoutine,
}: RoutineCompProps) => {
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
        const totalRoutineDuration = activityState.reduce((acc, activity) => acc + activity.duration, 0) + value
        if (totalRoutineDuration > 120) return 'Total duration must be less than 120 minutes'
        return null
      },

      // (value > 0 ? null : 'Duration must be greater than 0'),
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
    <Stack spacing={0}>
      <Group>
        <Text weight={500} size='lg'>
          {name}
        </Text>
        <ActionIcon onClick={() => onRemoveRoutine(index)}>
          <IconX color='red' size={14} />
        </ActionIcon>
      </Group>
      <DragDropContext
        onDragEnd={({ source, destination }) => {
          if (!destination) return
          activityStateHandlers.reorder({ from: source.index, to: destination.index })
        }}
      >
        <Droppable droppableId='sop-files-list' direction='vertical'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {activityState.map((activity, index) => (
                <>
                  <Draggable index={index} draggableId={`activity-${activity.name}-${index}`}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Group align='center' spacing='sm'>
                          <IconGripVertical size={14} />
                          <ActivityDisplayComponent {...activity} />
                          <ActionIcon onClick={() => removeActivity(index)}>
                            <IconX color='red' size={14} />
                          </ActionIcon>
                        </Group>
                      </div>
                    )}
                  </Draggable>
                </>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {!newActivity ? (
          <UnstyledButton onClick={toggleAddActivity}>
            <Text
              px='xl'
              color='blue.6'
              sx={{
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              + Add Activity
            </Text>
          </UnstyledButton>
        ) : (
          <Group pl='xl' align='flex-start' position='apart' noWrap>
            <Group noWrap align='flex-start'>
              <TextInput label='Name' placeholder='Name' required {...form.getInputProps('name')} />
              <TextInput
                label='Description'
                placeholder='Description'
                {...form.getInputProps('description')}
              />
              <NumberInput
                label='Duration (min)'
                placeholder='How long it will take'
                required
                {...form.getInputProps('duration')}
              />
            </Group>
            <Stack spacing={0}>
              <Text sx={{ visibility: 'hidden' }}>invisible lable</Text>
              <Group noWrap>
                <Button variant='light' color='gray' size='sm' onClick={toggleAddActivity}>
                  Cancel
                </Button>
                <Button variant='light' color='blue' size='sm' onClick={addActivity}>
                  Add
                </Button>
              </Group>
            </Stack>
          </Group>
        )}
      </DragDropContext>
    </Stack>
  )
}

export default RoutineDisplayComponent
