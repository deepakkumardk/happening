import React, { useEffect } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import { router, Tabs, useNavigation } from "expo-router";

import { Icon, useBlossomTheme } from "@react-native-blossom-ui/components";

export default function TabLayout() {
  const { colors } = useBlossomTheme();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerTitle({}) {
        return (
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
          />
        );
      },
      headerRight: () => (
        <Icon
          name="notifications-outline"
          onPress={() => router.push("/notifications")}
        />
      ),
    });
  }, [navigation]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary500,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: colors.background100,
          },
          default: {
            backgroundColor: colors.background100,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              size={28}
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              size={28}
              family="MaterialCommunityIcons"
              name={focused ? "calendar-check" : "calendar-check-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              size={28}
              name={focused ? "search" : "search-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              size={28}
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              size={28}
              family="MaterialCommunityIcons"
              name={focused ? "account-circle" : "account-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 48,
    alignSelf: "center",
  },
});
