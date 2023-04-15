import { Button, Autocomplete, useMantineTheme, Loader } from '@mantine/core'

type FormProps = {
  address: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onChange: (value: string) => void
  autocompleteData: string[]
  loading: boolean
}

const FormView = ({ address, onSubmit, onChange, autocompleteData, loading }: FormProps) => {
  const theme = useMantineTheme()

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Autocomplete
          value={address}
          data={autocompleteData}
          onChange={onChange}
          rightSection={loading ? <Loader size='1rem' /> : null}
          label='Address'
          placeholder='Drottning Kristinas väg 13'
          name='address'
          required
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
