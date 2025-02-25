import { StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

import { Text, View } from "@react-native-blossom-ui/components";

export default function Notifications() {
  return (
    <>
      <Stack.Screen options={{ title: "Notifications" }} />
      <View style={styles.container}>
        <Text typography="h6">Notifications.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
