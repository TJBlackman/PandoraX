# Pandora X

## Introduction

Pandora X is a Chrome extension used to modify the limits of Pandora free accounts, such as limited song skips. It also adds many great utilities, like allowing you to replay songs, scrub through song timelines, and even download songs with song name, artist name, and album name information.

## Features

- Unlimited Song Skips
- Song Song Replays
- Song Downloads (via extension UI only)
- Thumbs Up and Down
- Scrub Song timeline (via extension UI only)
- Audio Ad Skipping
- Video Ad Skipping
- Super small bundle < 250KB!

> Note: This app does not block advertisements. It detects when Pandora plays you an audio or video ad, and skips immediately to the end of the ad, making Pandora think the ad was played successfully. To block banner ads on the website itself, it is recommended that you run a dedicated ad blocker (I like uBlock Origin).

## Installation

Unfortunately, Chrome wont let this extentsion into their store because there is already a plethora of Pandora extensions. However, most existing extensions are several megabytes in size, while Pandora X is less than 250 KB on disk.

To install Pandora X:

1. In your Chrome browser, navigate to chrome://extensions
2. In the top-right corner, use the toggle to enter "developer mode"
3. In the upper-left corner, click the button that reads "Load Unpacked Extension"
4. Select the Pandora X folder

> Hint: It can be helpful to store the Pandora X extension folder in the same location as other Chrome extensions. See the paths below for default extension locations.

- Windows: `C:\Documents and Settings\<USER_NAME>\Local Settings\Application Data\Google\Chrome\User Data\Default\Extensions`
- Mac: `~/Library/Application\ Support/Google/Chrome/Default`

## Development

In your terminal, navigate to this project's root directory and run `npm install` to install it's dependancies. You can develop the extension UI just like a react site by running `npm run dev`. You can build a production version that is deposited into a `/dist` folder by running `npm run build`.

To test browser features, you should run the build process, then in your Chrome browser, navigate to chrome://extensions, and enter developer mode (toggle in the top right corner). Click the button that say _Load Unpacked_ (top left corner), then point to the `/dist/` folder you created in your build step. After making changes to the code, run the build step again, and in you Chrome extension manager, click the refresh icon for this extension (you also need to refresh the pandora website).

| Command       | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| npm run dev   | Develop the React UI with live reloading in a browser window.   |
| npm run build | Build a production version of the extension into a dist folder. |

##### Future Features

- Edit download location in-app
- In-browser song library
- Song history
- Customise theme
- Override Pandora controls to enable unlimited skips via native UI
- Firefox support

## Technology & Skills

- React (HTML, CSS, JS)
- Webpack
- Web Animations
- Chrome Browser APIs
