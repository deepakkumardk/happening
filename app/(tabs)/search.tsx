import { StyleSheet } from "react-native";
import { Stack } from "expo-router";

import { Text, View } from "@react-native-blossom-ui/components";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text typography="h6">Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
