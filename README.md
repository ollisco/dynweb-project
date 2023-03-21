# Setup guild v0.1

- Install node and npm (you probably have it)
- Install yarn using: `npm i -g yarn` (you may have to be root). yarn is just a nicer wrapper around npm
- Install packages using: `yarn`
- Start dev server: `yarn dev` or `yarn start`. This will run vite which is our build system. This is faster and more lightweight than webpack which the course uses. Dynwebben is migrating to Vite (pronunced 'veet', since it is french xD)
- to deploy: `yarn build` (creating output in /dist not /public) followed by `firebase deploy`. You may have to do `firebase login`.
- You can test the build localy using `yarn preview` after building.

## Commands (See package.json)
- `lint`: check for problems
- `lint:fix`: run eslint and try to fix potiential problems
- `prettier`: format the code
- `prettier:check`: dry run formatting

Technologies:
- yarn: like npm (Yet Another Resource Neotiatior)
- vite: like webpack
- react-router-dom: handles all the routes but nicer than in the course. Se `navigator.tsx`
- [mantine](https://mantine.dev): Third party component library, also see [mantine ui](https://ui.mantine.dev):
- eslint: checks syntax and findes problems in the code
- prettier: enforces code style and formatting 

