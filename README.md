# metasky-wallet-astar

Metasky has developed a comprehensive set of features aimed at enhancing Astar functionality. Leveraging the Astar documentation (https://docs.astar.network/docs), 
the project encompasses custodial authentication via both phone and email, Astar wallet creation, real-time Astar token balance tracking, seamless Astar token transfers, effortless, and an intuitive transaction history viewer.

:rocket: Features 

- [X] Custodial Authentication using Phone and Email
- [X] Astar Wallet creation
- [X] Astar Coin/NFT Balance
- [X] Astar Coin Transfer
- [X] Astar Transaction History
- [X] Link Astar NFTs with Benefits
- [ ] Astar NFT Transfer
- [ ] Astar NFT claim

:dizzy: Try it out here - [Metasky Wallet](https://astar.metasky.me)

### Depedency 

:eye_speech_bubble: [Backend Github Repository](https://github.com/metaskylabs/metasky-wallet-astar-be)

### Development

To start the project locally,run:

```bash
yarn dev
```

Open `http://localhost:3005` with your browser to see the result.

## Documentation

### Requirements

- Node.js >= 12.22.0
- Yarn 1 (Classic)

### Directory Structure
All sub-directories in the `src` directory use a Page based organization structure for vertical seperation of concern.

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](src/public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.
  - [`src/actions`](./src/actions) — API setup & Collection of all api routes used by pages.
  - [`src/components`](./src/components) — Collection of all stateless UI component required by pages.
  - [`src/hooks`](./src/hooks) — Set of all custom hooks that handle independent pieces of business logic.
  - [`src/pages`](./src/pages) — All application pages/routes.
  - [`src/reducers`](./src/reducers) — Set of all redux reducer slices that modify the central redux store.
  - [`src/styles`](./src/styles) — Collection of all custom styles used by pages.
  - [`src/typings`](./src/typings) — All TypeScript interfaces and type definition.

### Scripts

- `yarn dev` — Starts the application in development mode at `http://localhost:3005`.
- `yarn build` — Creates an optimized production build of your application.
- `yarn start` — Starts the application in production mode.
- `yarn type-check` — Validate code using TypeScript compiler.
- `yarn lint` — Runs ESLint for all files in the `src` directory.
- `yarn format` — Runs Prettier for all files in the `src` directory.
- `yarn commit` — Run commitizen. Alternative to `git commit`.

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';

// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
```

### Switch to npm

By default, this starter uses Yarn 1 (Classic), but this choice is yours. If you'd like to switch to npm, delete the `yarn.lock` file, install the dependencies with `npm install`, and change the CI workflows, Husky Git hooks, and lint-staged steps to use npm commands.


### Naming Conventions

- Enum Name should be all caps
