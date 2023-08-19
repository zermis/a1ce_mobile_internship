# A1CE Mobile Application

This project was made by using [Reat-Native-Expo](https://docs.expo.dev/)

## Table of Contents

- [Software prerequisites](#software-prerequisites)
- [Setup Instructions](#setup-instructions)
  - [First time running app](#first-time-running-app)
  - [iOS Simulator](#ios-simulator)
  - [Android Studio Emulator](#android-studio-emulator)
  - [Mobile (both os)](#mobile-both-os)
- [Available Scripts](#avaliable-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run ios](#npm-run-ios)
  - [npm run android](#npm-run-android)
  - [npm run eject](#npm-run-eject)

## Software prerequisites

Install the below tools/packages
| Serial No | Software | Version | Installation site |
| :---------: | :----------------: | :-------: | :---------------- |
| 1 | Node.js | >= 12.x.x | [Install NodeJS](https://nodejs.org/en/download/) |
| 2 | npm | >= 6.x.x | [Install NPM](https://www.npmjs.com/get-npm) |
| 3 | react-native | >= 0.62.0 | [Install react-native](https://www.npmjs.com/package/react-native) |
| 4 | react-native-cli | >= 2.0.1 | [Install react-native-cli](https://www.npmjs.com/package/react-native-cli) |
| 5 | expo | >= 44.0.0 | [Install Expo](https://docs.expo.dev/get-started/installation/) |

## Setup Instructions

### First time running app

1. Clone the repo with `git clone [REPO_URL]` command
2. Switch to the project's root directory in terminal
3. Install the dependencies by running `npm install`
4. Once, 'npm install' is completed, run `npm start` to start the expo and react-native server
5. If it shows a QR code on the terminal as a result of 'npm start' command, then you are good to go!

you can write your env specific config variables on `.env` file and import them from `react-native-dotenv` package as mentioned [here](https://github.com/zetachang/react-native-dotenv#usage).

### iOS Simulator

Please read more information [here](https://docs.expo.dev/workflow/ios-simulator/)

### Android Studio Emulator

Please read more information [here](https://docs.expo.dev/workflow/android-studio-emulator/)

### Mobile (both OS)

1. Install 'Expo' application on your android/iOS device. You can find the links to Android and iOS apps [here](https://expo.io/tools#client).
2. Scan the QR code shown on the terminal.
3. Once the QR code is successfully scanned, it will take few seconds to load and render the app.

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
# or
expo r -c
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.
