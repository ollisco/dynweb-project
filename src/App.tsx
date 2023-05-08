import { useEffect, useState } from 'react'
import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import Model from './Model'
import Navigator from './components/navigator/navigator'
import { UserProvider } from './components/login/user-context'
import HeaderPresenter from './components/header/header-presenter'

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
          <AppShell
            padding='md'
            header={<HeaderPresenter model={model} />}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
              },
            })}
          >
            <Navigator model={model} />
          </AppShell>
        </UserProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
