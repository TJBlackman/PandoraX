# Pandora X | Chrome Extension

## Introduction

Pandora X is a chrome extension used to remove limits of Pandora free accounts, such as limited skips. It also adds many great utilities, like allowing you to replay songs, scrub through song timelines, and even download songs with song name, artist name, and album name information.

## Development

In your terminal, navigate to this projects root directory and run `npm install` to install it's dependancies. You can develop the extension ui just like a react site by running `npm run dev`. You can build a production version that is deposited in a `/dist` folder by running `npm run build`. When you need to test browser features, you'll unfotrunately need to keep running the build step and refreshing the extension from inside Chrome's extenion manager.

| Command       | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| npm run dev   | Develop the React UI with live reloading in a browser window.   |
| npm run build | Build a production version of the extension into a dist folder. |

## Features

- Unlimited Skips (via extension UI only)
- Song Replays (via extension UI only)
- Song Downloads (via extension UI only)
- Thumbs Up and Down
- Scrub Song timeline (via extension UI only)
- Audio Ad Skipping
- Video Ad Skipping

> Note: This app does not block advertisements. It detects when Pandora plays you an audio or video ad, and skips immediately to the end of the ad, making Pandora think the ad as played successfully. To block banner ads on the website itself, it is recommended that you run a dedicated Ad Blocker (we like uBlock Origin).

##### Future Features

- Edit download location in-app
- In-browser song library
- Song history
- Customise theme
- Override Pandora controls to enable unlimited skips via native UI

## Technology & Skills

- React (HTML, CSS, JS)
- Webpack
- Web Animations
- Chrome Browser APIs
