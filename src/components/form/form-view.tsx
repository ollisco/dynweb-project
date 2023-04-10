import { Button, TextInput, useMantineTheme } from "@mantine/core";


type FormProps = {
  address: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormView = ({
  address,
  onSubmit,
  onChange,
}: FormProps) => {
  const theme = useMantineTheme();

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label="Address"
        name="address"
        placeholder="Armégatan32C"
        required
        value={address}
        onChange={onChange}
        style={{ marginTop: theme.spacing.xs }}
      />
      <Button type="submit" variant="filled" color="blue">
        Submit
      </Button>
    </form>
  );
};

export default FormView