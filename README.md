# 🎮 Tiny Taps

A fun, interactive learning game app for kids - built with Vue 3, Pinia, Vue Router, and Tailwind CSS. Playable on keyboard, touch screen, and mobile.

## Games

### 🔤 Alphabet Game
A picture appears on screen. Type the letter it starts with and press **Enter**. 52 images (2 per letter A–Z) shown in random order each round. The word is revealed after a correct answer or after 3 failed attempts, with the first letter highlighted.

### 🔢 Counting Game
A group of objects appears on screen. Type how many you count and press **Enter**. Numbers 1–10, with a different object for each, shown in random order each round.

### 🎨 Colors Game
A color swatch is shown. Type the full color name letter by letter and press **Enter** to submit. 12 colors shown in random order each round.

## Features

- ⌨️ Keyboard and touch input - works on desktop, tablet, and mobile
- 📱 Mobile keyboard auto-opens for each question; Done/Return acts as Enter
- 🔥 Streak counter for consecutive correct answers
- ❤️ 3 attempts per question before moving on
- 🎊 Confetti burst on a perfect score
- 🔀 Questions shuffled on every play-through
- 📐 Fully responsive - optimized for all screen sizes
- 🏠 Game state resets automatically when leaving a game

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

The app is deployed at: `https://troll-warlord.github.io/tiny-taps/`

## Tech Stack

- [Vue 3](https://vuejs.org/) - Composition API
- [Vite](https://vitejs.dev/) - build tool
- [Pinia](https://pinia.vuejs.org/) - state management
- [Vue Router](https://router.vuejs.org/) - client-side routing
- [Tailwind CSS](https://tailwindcss.com/) - utility-first styling
- [Nunito](https://fonts.google.com/specimen/Nunito) - self-hosted font (no external requests)
