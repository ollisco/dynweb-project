import { useEffect, useState } from 'react'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import Model from './Model'
import Navigator from './components/navigator/navigator'
import { UserProvider } from './components/login/user-context'

const model = new Model()

function App() {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme)
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    setColorScheme(preferredColorScheme)
  }, [preferredColorScheme])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <UserProvider>
          <Navigator model={model} />
        </UserProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
