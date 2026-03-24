# u{1F3AE} Tiny Taps

A fun, keyboard-driven learning game app for kids u{2014} built with Vue 3, Pinia, Vue Router, and Tailwind CSS.

## Games

### u{1F524} Alphabet Game
A picture appears on screen. Type the letter it starts with and press **Enter**. 52 images (2 per letter Au{2013}Z) shown in random order each round. The word is revealed after a correct answer or after 3 failed attempts, with the first letter highlighted.

### u{1F522} Counting Game
A group of objects appears on screen. Type how many you count and press **Enter**. Numbers 1u{2013}10, with a different object for each, shown in random order each round.

### u{1F3A8} Colors Game
A color swatch is shown. Type the full color name letter by letter and press **Enter** to submit. 12 colors shown in random order each round.

## Features

- u{2328}u{FE0F} Keyboard-only interaction u{2014} no clicking required
- u{1F525} Streak counter for consecutive correct answers
- u{2764}u{FE0F} 3 attempts per question before moving on
- u{1F38A} Confetti burst on a perfect score
- u{1F500} Questions shuffled on every play-through
- u{1F4F1} Fully responsive u{2014} works on mobile, tablet, and desktop
- u{1F3E0} Home button resets the game state when leaving

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

Output goes to the `dist/` folder.

## Deploy

The included GitHub Actions workflow (`.github/workflows/release.yaml`) builds the project and force-pushes the `dist/` folder to the `live` branch on manual trigger. Configure GitHub Pages to serve from that branch.

The app is deployed at: `https://<your-username>.github.io/tiny-taps/`

## Tech Stack

- [Vue 3](https://vuejs.org/) u{2014} Composition API
- [Vite](https://vitejs.dev/) u{2014} build tool
- [Pinia](https://pinia.vuejs.org/) u{2014} state management
- [Vue Router](https://router.vuejs.org/) u{2014} client-side routing
- [Tailwind CSS](https://tailwindcss.com/) u{2014} utility-first styling
