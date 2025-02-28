# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. Start the iOS app

   ```bash
    yarn ios
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## UI library

I have chose the [react-native-blossom-ui](https://github.com/deepakkumardk/react-native-blossom-ui), as it's the largest UI library out there with a lot of customization and to ship app faster.

## State Management

I Chose Zustand as it simplify the state management with just store and few lines of code and it's easy to manage.

## Navigation & Routing

Since this is in expo and expo-router comes by default so just use it.

## Styling & Theming

For styling `StyleSheet` is enough, while for theming Blossom-UI done the trick as it comes in dark theme support out of the box.

## Any Performance Optimization

I have cached the user's current location and fetched it only once,and used react memo hook wherever possible.
