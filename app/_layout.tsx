//

import React, { useEffect, useState } from "react";
import {
  BlossomThemeProvider,
  ComponentManager,
  Icon,
  useBlossomTheme,
} from "@react-native-blossom-ui/components";
import { router, SplashScreen, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import lightTheme from "../lightTheme.json";
import darkTheme from "../darkTheme.json";
import options from "../options.json";
import { Image } from "react-native";

export default function Layout() {
  const [isDark, setIsDark] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BlossomThemeProvider
      theme={isDark ? darkTheme : lightTheme}
      isDark={isDark}
      options={options}
    >
      <Container />
      <StatusBar style={isDark ? "light" : "dark"} />
    </BlossomThemeProvider>
  );
}

export const Container = () => {
  const { colors } = useBlossomTheme();

  useEffect(() => {
    ComponentManager.setDefaultProps({
      ProgressBar(props, theme) {
        return {
          style: {
            marginVertical: 8,
          },
        };
      },
    });
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background100,
        },
        headerTintColor: colors.text100,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: true,
      }}
    >
      {/* Optionally configure static options outside the route. */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="auto" />
    </Stack>
  );
};
