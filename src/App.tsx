import Navigator from "./components/navigator/navigator"
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Navigator />
    </MantineProvider>
  );
}

export default App
