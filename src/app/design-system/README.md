# Design System

This folder contains the reusable design system for the portfolio.

## Structure

- `tokens.ts` – centralized design tokens (color aliases, typography, spacing, radius, shadows)
- `components/` – UI primitives used across pages
- `index.ts` – public exports
- `DesignSystemShowcase.tsx` – lightweight preview page at `/design-system`

## Components

- `DSContainer` – responsive max-width layout wrapper (`md | lg | xl`)
- `DSSectionHeader` – section title with optional eyebrow, subtitle, and right-side content
- `DSButton` – variant-based button (`primary | secondary | ghost`, `sm | md | lg`)
- `DSCard` – base card shell with optional interactive hover behavior
- `DSChip` – pill tag for skill and metadata labels
- `DSImageDialog` – clickable image component with dialog + zoom hint (`artifact | plain` variants)
- `DSArtifactImageView` – named artifact-style image view component
- `DSCaptionImageView` – named Databases Service Blueprint image view component
- `DSStaticImageView` – named KeyBank-style static image view (1px border + native image fit)

## Usage

```tsx
import {
	DSArtifactImageView,
	DSButton,
	DSCard,
	DSChip,
	DSContainer,
	DSImageDialog,
	DSSectionHeader,
	DSCaptionImageView,
	DSStaticImageView,
} from "./design-system";
```

## Visual documentation

- Open `http://localhost:5173/design-system` while the dev server is running.
- This page shows token previews, typography, spacing/radius/shadows, and component examples.
- To export a PDF, click **Export to PDF** on the page (or use browser print and choose **Save as PDF**).

## Styling

Global utility classes and DS CSS tokens live in:

- `src/styles/design-system.css`
- Imported by `src/styles/index.css`

Typography utility classes include:

- `ds-heading-xl` – display heading
- `ds-heading-lg` – section heading
- `ds-heading-md` – heading level four (`h4`)
