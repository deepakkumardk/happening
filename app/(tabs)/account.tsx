import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  Avatar,
  Button,
  Icon,
  Spacer,
  Switch,
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import { useAuthStore, useIsDarkStore } from "@/store";
import { router } from "expo-router";

export default function AccountScreen() {
  const isDark = useIsDarkStore((state) => state.isDark);
  const toggleTheme = useIsDarkStore((state) => state.toggleTheme);
  const toggleAuthState = useAuthStore((state) => state.toggleAuthState);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Avatar size={120} style={styles.avatar} />
          <Text typography="h6" style={styles.name}>
            Deepak Kumar
          </Text>
          <Text>React Native Developer</Text>
        </View>
        <Text typography="h6">Appearance</Text>
        <Switch
          label="Toggle Theme"
          position="right"
          adjacent={false}
          value={isDark}
          onChange={toggleTheme}
        />
        <Spacer height={50} />
        <Button
          mode="plain"
          status="error"
          left={
            <Icon
              family="MaterialCommunityIcons"
              name="logout"
              status="error"
            />
          }
          onPress={() => {
            toggleAuthState();
            router.replace("/login");
          }}
        >
          Logout
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignSelf: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 8,
  },
  name: {
    textAlign: "center",
  },
});
