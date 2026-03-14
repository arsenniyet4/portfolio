# Arsen's Portfolio

A personal portfolio web application built to showcase my projects to anyone interested in my work. The site presents a clean, browsable gallery of projects — each displayed as a titled tile — and is designed to grow over time as new projects are added.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## About

This portfolio was built as a simple, maintainable web application that can be easily extended. The goal is to have a single place where visitors can get a quick visual overview of my projects — what they are, what technologies they use, and what problems they solve. Rather than relying on a third-party portfolio service, the app is self-hosted and fully under my control, making it straightforward to customize the look, layout, and content at any point.

---

## Features

- **Sticky top navigation panel** with the portfolio owner's name.
- **Responsive project grid** — 3 columns on desktop, 2 on tablet, 1 on mobile.
- **Project tiles** — wide rectangular cards (16:7 aspect ratio) displaying a project description and technology tags.
- **Hover interactions** — tiles lift and highlight on hover for a polished feel.
- **Light theme** — clean, bright design optimized for readability.
- **Data-driven rendering** — projects are defined in a single JavaScript constant array, making additions trivial.

---

## Technologies

### Runtime & Server

| Technology | Role |
|---|---|
| **Node.js** | JavaScript runtime that powers the server process |
| **Express** | Minimal web framework used to serve static assets |

### Front End

| Technology | Role |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Layout (CSS Grid, Flexbox), theming via custom properties, responsive breakpoints |
| **Vanilla JavaScript** | DOM rendering, project data management (no framework dependencies) |

### Dev Tooling

| Technology | Role |
|---|---|
| **nodemon** | Auto-restarts the server on file changes during development |
| **npm** | Dependency and script management |

No front-end frameworks, build tools, or bundlers are used. The front end is intentionally kept as plain HTML/CSS/JS to minimize complexity and keep load times fast.

---

## Architecture

The application follows a simple **static file server** pattern:

```
Browser  ──HTTP GET──▶  Express (Node.js)  ──serves──▶  public/
                                                          ├── index.html
                                                          ├── styles.css
                                                          └── app.js
```

### How it works

1. **Server layer** (`server.js`): Express starts an HTTP server and mounts the `public/` directory as a static file root. Every request for an asset (HTML, CSS, JS) is resolved directly from the filesystem — no templating, no database, no API.

2. **HTML layer** (`public/index.html`): Defines the page skeleton — a `<header>` for the top panel and a `<main>` containing an empty grid container (`#projects-grid`) that JavaScript populates at runtime.

3. **Style layer** (`public/styles.css`): All visual design is driven by **CSS custom properties** (variables) defined in `:root`. This means the entire color palette, spacing, typography, and layout dimensions can be changed in one place. A CSS Grid with `repeat(3, 1fr)` handles the tile layout, collapsing to fewer columns via media queries for smaller screens.

4. **Logic layer** (`public/app.js`): A `const PROJECTS` array holds all project data (name, description, tags). On `DOMContentLoaded`, the `renderProjects()` function iterates over this array and injects the corresponding HTML into the grid. Adding a new project requires only appending a new object to the `PROJECTS` array — no other changes needed.

### Design principles applied

- **Separation of concerns** — structure (HTML), presentation (CSS), and behaviour (JS) are kept in separate files.
- **Single source of truth** — project content lives in one place (`PROJECTS` array); selectors live in a frozen `SELECTORS` constant.
- **No magic numbers** — all hardcoded values (colours, spacing, aspect ratios, column counts) are CSS custom properties or named JS constants.
- **`'use strict'`** — enforced in both `server.js` and `app.js` to catch common JavaScript mistakes early.

---

## Project Structure

```
portfolio/
├── server.js            # Express server — serves the public/ directory
├── package.json         # Project metadata, npm scripts, dependencies
├── package-lock.json    # Locked dependency tree
└── public/              # Everything served to the browser
    ├── index.html       # Page structure
    ├── styles.css       # All styling and theming
    └── app.js           # Project data + DOM rendering logic
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

### Install dependencies

```bash
cd portfolio
npm install
```

### Run in development mode

Uses `nodemon` to automatically restart the server when files change.

```bash
npm run dev
```

### Run in production mode

```bash
npm start
```

The server starts at **http://localhost:3000** by default. The port can be overridden with the `PORT` environment variable:

```bash
PORT=8080 npm start
```

---

## Deployment

The app is designed to be deployed to any environment that can run Node.js — a cloud VM (e.g. AWS EC2, Google Compute Engine, DigitalOcean Droplet), a PaaS (e.g. Heroku, Railway), or a container (Docker). The only requirements are:

- Node.js installed on the host
- Port exposed/forwarded to the internet
- `npm install --omit=dev` run before starting to skip dev dependencies

A typical production startup on a remote server:

```bash
npm install --omit=dev
NODE_ENV=production PORT=80 node server.js
```

For long-running deployments, consider using a process manager such as [PM2](https://pm2.keymetrics.io/) to keep the server alive across crashes and reboots:

```bash
npm install -g pm2
pm2 start server.js --name portfolio
pm2 save
pm2 startup
```

---

## Roadmap

- Add individual project detail pages.
- Add a contact / about section.
- Integrate a simple CMS or JSON file to manage project data outside of the source code.
- Add project filtering by technology tag.
- Set up a CI/CD pipeline for automated deployment on push.
