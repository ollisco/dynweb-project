import { Button, TextInput, useMantineTheme } from '@mantine/core'

type FormProps = {
  address: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormView = ({ address, onSubmit, onChange }: FormProps) => {
  const theme = useMantineTheme()

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput
          label='Home address'
          name='address'
          placeholder='Drottning Kristinas väg 13'
          required
          value={address}
          onChange={onChange}
          style={{ marginTop: theme.spacing.xs }}
        />
        <Button type='submit' variant='filled' color='blue'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default FormView
