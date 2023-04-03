import Navigator from './components/navigator/navigator'
import { MantineProvider } from '@mantine/core'
import { UserProvider } from './components/login/user-context'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </MantineProvider>
  )
}

export default App
