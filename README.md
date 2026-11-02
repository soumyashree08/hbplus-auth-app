
# HBPlusAuth

A cross-platform authentication application built using Expo,
React Native, React Native Web, and Firebase Authentication.

## Features

- Google authentication
- Restricted access to @hbplus.fit email accounts
- Verified email requirement
- Protected dashboard
- User profile information
- Logout functionality
- Authentication persistence
- Loading and error handling
- Android, iOS, and Web support

## Technologies

- React
- React Native
- Expo
- React Native Web
- Firebase Authentication
- Google Sign-In
- React Navigation
- AsyncStorage

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd HBPlusAuth
npm install
```

Install Expo dependencies:

```bash
npx expo install
```

## Environment Configuration

Create a .env file in the project root.

Add your Firebase configuration and Google Web Client ID:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=

EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=
```

Never commit your .env file.

## Run on Web

```bash
npx expo start --web
```

## Run on Android

```bash
npx expo run:android
```

## Run on iOS

```bash
npx expo run:ios
```

iOS local builds require macOS and Xcode.

## Authentication Restriction

Only verified Google accounts with an email
ending in @hbplus.fit are allowed to access
the dashboard.

## Security

Firestore rules restrict access to verified
HBPlus accounts and their own user documents.

## Author

Soumyashree Sahoo
