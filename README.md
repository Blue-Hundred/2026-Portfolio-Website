
  # Portfolio website with case studies

  This is a code bundle for Portfolio website with case studies. The original project is available at https://www.figma.com/design/DO1ICBMXq62T9c7VMomJ6n/Portfolio-website-with-case-studies.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Design system and component library

  A reusable design system is available in `src/app/design-system`.

  - Tokens: `src/app/design-system/tokens.ts`
  - Components: `src/app/design-system/components/*`
  - Exports: `src/app/design-system/index.ts`
  - Styles/utilities: `src/styles/design-system.css`
  - Showcase page: `/design-system`

  Example import:

  ```tsx
  import { DSButton, DSCard, DSChip, DSContainer, DSSectionHeader } from "./app/design-system";
  ```
  