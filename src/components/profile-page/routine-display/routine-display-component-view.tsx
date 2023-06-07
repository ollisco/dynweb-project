import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import {
  Text,
  Stack,
  Group,
  ActionIcon,
  UnstyledButton,
  TextInput,
  NumberInput,
  Button,
} from '@mantine/core'
import { MdCancel, MdDragIndicator } from 'react-icons/md'
import { Activity } from '../../../model'
import { UseListStateHandlers } from '@mantine/hooks'
import { UseFormReturnType } from '@mantine/form'

interface RoutineDisplayComponentViewProps {
  name: string
  onRemoveRoutine: () => void
  activityState: Activity[]
  activityStateHandlers: UseListStateHandlers<Activity>
  onRemoveActivity: (index: number) => void
  newActivity: boolean
  toggleAddActivity: () => void
  form: UseFormReturnType<
    {
      name: string
      description: string
      duration: number
    },
    (values: { name: string; description: string; duration: number }) => {
      name: string
      description: string
      duration: number
    }
  >
  onAddActivity: () => void
}

const RoutineDisplayComponentView = ({
  name,
  onRemoveRoutine,
  activityState,
  activityStateHandlers,
  onRemoveActivity,
  newActivity,
  toggleAddActivity,
  form,
  onAddActivity,
}: RoutineDisplayComponentViewProps) => {
  return (
    <Stack spacing={0}>
      <Group>
        <Text weight={500} size='lg'>
          {name}
        </Text>
        <ActionIcon onClick={onRemoveRoutine}>
          <MdCancel size={16} />
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
                <Draggable
                  key={index}
                  index={index}
                  draggableId={`activity-${activity.name}-${index}`}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Group align='center' spacing='sm'>
                        <MdDragIndicator size={16} />
                        <Group>
                          <Text>{activity.name}</Text>
                          <Text size='sm' color='dimmed'>
                            {activity.description}
                          </Text>
                          <Text>{activity.duration} min</Text>
                        </Group>
                        <ActionIcon onClick={() => onRemoveActivity(index)}>
                          <MdCancel size={16} />
                        </ActionIcon>
                      </Group>
                    </div>
                  )}
                </Draggable>
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
              + Add new activity
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
            <Group noWrap>
              <Button variant='light' color='gray' size='sm' onClick={toggleAddActivity}>
                Cancel
              </Button>
              <Button variant='light' color='blue' size='sm' onClick={onAddActivity}>
                Add
              </Button>
            </Group>
          </Group>
        )}
      </DragDropContext>
    </Stack>
  )
}

export default RoutineDisplayComponentView
