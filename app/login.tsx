import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";

import {
  Button,
  Spacer,
  Text,
  TextInput,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import { useAuthStore, useIsDarkStore } from "@/store";

export default function LoginScreen() {
  const { colors } = useBlossomTheme();
  const toggleAuthState = useAuthStore((state) => state.toggleAuthState);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Image source={require("@/assets/images/icon.png")} />
        <Spacer height={50} />

        <Text typography="h6" style={styles.slogan}>
          Login now to find whats happening around you
        </Text>
        <Spacer height={40} />

        <TextInput
          containerStyle={styles.fullWidth}
          placeholder="Email address or mobile number"
        />
        <Spacer />
        <TextInput
          containerStyle={styles.fullWidth}
          placeholder="Click on send OTP"
        />
        <Spacer />

        <Button
          status="accent"
          style={styles.fullWidth}
          onPress={() => {
            toggleAuthState();
            router.replace("/(tabs)");
          }}
        >
          Login
        </Button>
        <Spacer />

        <Button
          status="accent"
          style={styles.sendOtp}
          mode="plain"
          titleStyle={{ color: colors.accent500 }}
        >
          Send OTP
        </Button>
        <Spacer />

        <Text>Or</Text>
        <Spacer />
        <Text>Sign in with other accounts</Text>

        <View row>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("@/assets/images/instagram.png")}
              style={[styles.icon, styles.resetLeftMargin]}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("@/assets/images/facebook.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("@/assets/images/twitter.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  slogan: {
    maxWidth: "80%",
    textAlign: "center",
  },
  sendOtp: {
    alignSelf: "flex-end",
  },
  icon: {
    width: 28,
    height: 28,
    marginVertical: 8,
    marginLeft: 8,
    backgroundColor: "transparent",
  },
  resetLeftMargin: {
    marginLeft: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
