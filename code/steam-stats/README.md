# Steam Player Stats

Try it at https://steam-stats-snowy.vercel.app.

Or follow the instructions below to run it locally.

## Prerequisites

- Install NodeJS from https://nodejs.org

## Getting Started

1. Clone the repository from:
   - Https: [git@github.com:rakeshta/SteamStatsHobby.git](https://github.com/rakeshta/SteamStatsHobby.git) _or_
   - SSH: `git@github.com:rakeshta/SteamStatsHobby.git` _or_
   - GitHub CLI: `gh repo clone rakeshta/SteamStatsHobby`
2. Change directory to `code/steam-stats`
3. Install packages: `npm install`
4. Create a `.env` file and add your Steam API Key
   ```
   STEAM_API_KEY=<your steam API key here>
   ```
5. Start the development server: `npm run dev`
6. Open the app in your browser: http://localhost:3000/


## Enhancement Ideas

- Add E2E testing using Cypress or Playwright
- Cleanup unnecessary over engineering
- Extract re-usable components for consistent styling
- Analytics & crash reporting
- Use direct function call instead of "fetch" to get summarized player stats.
- Page header / navbar
- Playtime by genre shown as a bar graph
- Link from genre tag to similar games
- Icons for platforms that the games are available on
- Some type of achievements summary
- Spruce up player summary. (Perhaps show key stats like hours played, total achievements unlocked etc as trophies.)
- A fast API to valid steam IDs to be used before navigating.
- Use proper NextJS API for handling invalid steam ID error.

## Known Issues

- If any of your top 10 most played games is no longer in the store, the server will not skip to the next game in the
  list. This will cause the resulting list to have less than 10 items.
- Loading page is being ignored by NextJS.
