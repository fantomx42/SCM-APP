# SCM Developer Guide

## Setup

1. **Prerequisites**: Node.js v18+ (v20+ recommended).
2. **Install Dependencies**:

    ```bash
    npm install
    ```

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

* `src/lib/scm`: **The Engine**. Pure TypeScript. No React.
* `src/store`: **State**. Zustand store.
* `src/components/viz`: **Graphics**. Canvas/SVG components.
* `src/components/controls`: **UI**. Shadcn/Tailwind components.

## Common Issues

* **"Module not found: @/components/ui/..."**: This means Shadcn components are missing. Run:

    ```bash
    npx shadcn@latest add button input slider card
    ```

## Contribution Guidelines

* **Math**: If modifying `src/lib/scm`, you MUST update `docs/SCM_v3.1_Spec.tex` to match.
* **UI**: Keep the "Premium/Scientific" aesthetic. Dark mode default.
