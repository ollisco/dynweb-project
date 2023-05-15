import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme, useLocalStorage } from '@mantine/hooks'
import Model from './model'
import Navigator from './components/navigator/navigator'
import HeaderPresenter from './components/header/header-presenter'

const model = new Model()

const App = () => {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: preferredColorScheme,
  })

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell
          padding='md'
          header={
            <HeaderPresenter
              model={model}
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            />
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          })}
        >
          <Navigator model={model} />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
