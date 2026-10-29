# 🐴 Pony Panic


**Student:** Oliwia Glowczynska</br>
**ID:** 2157181</br>
**Date:** October 2026</br>

Play the Game: [LIVE DEMO](https://glovolivia.github.io/Pony-Panic/)

### Description
A classics gallery shooter inspired by games such as ***Chicken Invaders***. The player becomes a cute horse, on a mission to feed as many animals as they can! But be careful... since they eat more they also poop more often!

This projects uses Javascript and Phaser 3.

### Playtest
Playtest sample size: 3 players, ranging from "not familiar with games" to "experienced gamer"
Data collection methods: observation, think-aloud, semi-formal interview
Average playtime: 5 minutes

### Running Instructions

##### Play locally:
1. Download and extract project files
2. Open Terminal and navigate to project directory
3. Run: python3 -m http.server 8000
4. Open http://localhost:8000 in your browser.

Python3 is needed for a local server. No additional libraries are required.

### Controls

- Left and Right arrow keys: move horizontally
- Space: shoot cookies

### Gameplay and scoring

Animals spawn in randomized waves with different health, attack rate, formations, and movement paths.

- each cookie hit earns 10 points
- each exploded animal earns an additional 40 points
- getting heat deals 1 damage
- the game ends when health reaches zero
- short pause between waves
- after losing, you can start another game without reloading the browser

### Bonus features 

- saved high score (saved using localStorage, persists between browser sessions)
- Title screen with preview (demo, pony shoots and kills enemies), controls and credits
- Boss fights!

### Art Assets and Audio

Art assets are from Kenney
Audio assets are from OpenGameArt 

Background music: 
“Porch Swing Days - slower” by Kevin MacLeod (incompetech.com)
Licensed under CC BY 4.0: https://creativecommons.org/licenses/by/4.0/
