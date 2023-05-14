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
import { Item } from '../../model'

const ItemComp = ({ name, description, duration }: Item) => {
  return (
    <Group>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{duration}</Text>
    </Group>
  )
}

interface ItemGroupCompProps {
  index: number
  name: string
  items: Item[]
  onUpdateItems: (index: number, items: Item[]) => void
  onRemoveGroup: (index: number) => void
}

export const ItemGroupComp = ({
  index,
  name,
  items,
  onUpdateItems,
  onRemoveGroup,
}: ItemGroupCompProps) => {
  const [itemState, itemStateHandlers] = useListState<Item>(items)
  const [newItem, setNewItem] = useState<boolean>(false)

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
        const totalGroupDuration = itemState.reduce((acc, item) => acc + item.duration, 0) + value
        if (totalGroupDuration > 120) return 'Total duration must be less than 120 minutes'
        return null
      },

      // (value > 0 ? null : 'Duration must be greater than 0'),
    },
  })

  const toggleAddItem = () => {
    form.reset()
    form.setErrors({})
    setNewItem(!newItem)
  }

  const addItem = () => {
    const v = form.validate()
    if (v.hasErrors) {
      form.setErrors(v.errors)
      return
    }
    const { name: itemName, description, duration } = form.values

    const theNewItem = { name: itemName, description, duration }
    itemStateHandlers.append(theNewItem)

    toggleAddItem()
  }

  const removeItem = (index: number) => {
    itemStateHandlers.remove(index)
  }

  useEffect(() => {
    onUpdateItems(index, itemState)
  }, [itemState])

  useEffect(() => {
    itemStateHandlers.setState(items)
  }, [items])

  return (
    <Stack spacing={0}>
      <Group>
        <Text weight={500} size='lg'>
          {name}
        </Text>
        <ActionIcon onClick={() => onRemoveGroup(index)}>
          <IconX color='red' size={14} />
        </ActionIcon>
      </Group>
      <DragDropContext
        onDragEnd={({ source, destination }) => {
          if (!destination) return
          itemStateHandlers.reorder({ from: source.index, to: destination.index })
        }}
      >
        <Droppable droppableId='sop-files-list' direction='vertical'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {itemState.map((item, index) => (
                <>
                  <Draggable index={index} draggableId={`item-${item.name}-${index}`}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Group align='center' spacing='sm'>
                          <IconGripVertical size={14} />
                          <ItemComp {...item} />
                          <ActionIcon onClick={() => removeItem(index)}>
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
        {!newItem ? (
          <UnstyledButton onClick={toggleAddItem}>
            <Text
              px='xl'
              color='blue.6'
              sx={{
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              + Add item
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
                <Button variant='light' color='gray' size='sm' onClick={toggleAddItem}>
                  Cancel
                </Button>
                <Button variant='light' color='blue' size='sm' onClick={addItem}>
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
