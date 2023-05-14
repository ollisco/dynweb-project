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
import { useState } from 'react'
import { useForm } from '@mantine/form'

export interface ItemGroup {
  name: string
  items: Item[]
}

export interface Item {
  name: string
  description: string
  duration: number // minutes
}

const ItemComp = ({ name, description, duration }: Item) => {
  return (
    <Group>
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{duration}</Text>
    </Group>
  )
}

export const ItemGroupComp = ({ name, items }: ItemGroup) => {
  console.log(JSON.stringify(name), JSON.stringify(items))
  const [files, filesHandlers] = useListState<Item>(items)
  const [newItem, setNewItem] = useState<boolean>(false)

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      duration: 0,
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      description: (value) => (value.trim().length > 0 ? null : 'Description is required'),
      duration: (value) => (value > 0 ? null : 'Duration must be greater than 0'),
    },
  })

  const toggleAddItem = () => {
    form.reset()
    form.setErrors({})
    setNewItem(!newItem)
  }

  const addItem = () => {
    const r = form.validate()
    if (r.hasErrors) {
      form.setErrors(r.errors)
      return
    }
    console.log(r)
    const { name, description, duration } = form.values

    filesHandlers.append({ name, description, duration })
    toggleAddItem()
  }

  const removeItem = (index: number) => {
    filesHandlers.remove(index)
  }

  return (
    <Stack spacing={0}>
      <Text weight={500}>{name}</Text>
      <DragDropContext
        onDragEnd={({ source, destination }) => {
          if (!destination) return
          filesHandlers.reorder({ from: source.index, to: destination.index })
        }}
      >
        <Droppable droppableId='sop-files-list' direction='vertical'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {files.map((item, index) => (
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
            <Group noWrap>
              <TextInput label='Name' placeholder='Name' required {...form.getInputProps('name')} />
              <TextInput
                label='Description'
                placeholder='Description'
                required
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
