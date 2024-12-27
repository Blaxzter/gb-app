# GB-App Prototype

A modern, mobile-friendly digital hymnal application built with React Native. 
This app serves as a companion to the GB Dashboard web application, bringing the music to the mobile device with interactive features and MIDI playback capabilities using [ABCjs](https://github.com/paulrosen/abcjs).

![MobilePreview](https://github.com/user-attachments/assets/f04df895-e68d-40ec-a733-3c7a2958223c)

## Features

- Browse and search through the list of hymns (only the one you uploaded.)
- View sheet music with clear, readable notation
- Play back songs using high-quality MIDI instruments
- Customizable instrument selection (piano, organ, strings, and more)
- Create and manage personal playlists
- Dark mode support for comfortable viewing
- Offline access to hymns and sheet music

![Features](https://github.com/user-attachments/assets/95e425a0-e3a2-4b71-a3eb-d586a1a6b42f)

## Getting Started

### Prerequisites

You do require the directus server from the [GB Dashboard](https://github.com/Blaxzter/gb-dashboard) to be running to use this app combined with uploaded data.
Otherwise you'd need a directus server with the same data structure as the GB Dashboard as shown  in [thunk.tsx](src%2Fstore%2Fqueries%2Fthunk.tsx)

You will need the following tools to run this app (from the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup)):
- Node.js 16 or newer
- Java Development Kit (JDK) 11 or newer
- Android Studio and Android SDK for Android development
- Xcode (Mac only) for iOS development
- React Native CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Blaxzter/gb-app
   cd gb-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install iOS dependencies (Mac only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running the App

#### Start the Metro Bundler:
```bash
npm start
# or
yarn start
```

#### Run on Android:
```bash
npm run android
# or
yarn android
```

#### Run on iOS (Mac only):
```bash
npm run ios
# or
yarn ios
```

## Development

### Project Structure
```
gb-app/
├── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # Screen components
│   ├── navigation/    # Navigation configuration
│   ├── services/      # API and MIDI services
│   └── assets/        # Images, fonts, and other static files
├── android/          # Android-specific files
└── ios/             # iOS-specific files
```

## Related Projects

This mobile app works in conjunction with the [GB Dashboard](https://github.com/Blaxzter/gb-dashboard), a web-based management system for the Johannische Kirche hymnal.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
