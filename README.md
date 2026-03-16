# Project Setup & Development Guide

## Prerequisites

Install [Node.js](https://nodejs.org/) (LTS version recommended). You can verify it's installed with:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install dependencies

```bash
npm install
```

This installs Astro and all other project dependencies into `node_modules/`. You do **not** need to install Astro globally.

---

## Common Commands

| Command | Action |
|---|---|
| `npm run dev` | Start local dev server at `http://localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

### Stop the dev server

Press **Ctrl + C** in the terminal.

---

## Deploying / Building

```bash
npm run build
```

Output goes into the `dist/` folder. Upload or deploy the contents of `dist/` to your host.

---

## What's in .gitignore (don't commit these)

- `node_modules/` — reinstalled via `npm install`
- `dist/` — regenerated via `npm run build`
- `.astro/` — Astro's local cache, auto-generated

---

## Folder Structure

```
/
├── public/          # Static assets (images, fonts, etc.)
├── src/
│   ├── components/  # Reusable UI components
│   ├── layouts/     # Page layouts
│   └── pages/       # One file = one route
├── astro.config.mjs # Astro configuration
└── package.json     # Project dependencies and scripts
```

---

## Troubleshooting

**`npm run dev` fails after pulling changes?**  
Run `npm install` again — new dependencies may have been added.

**Port already in use?**  
Another process is on port 4321. Stop it, or run `npm run dev -- --port 3000` to use a different port.
