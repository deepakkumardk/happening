import { StyleSheet } from "react-native";

import {
  Avatar,
  Switch,
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";

export default function AccountScreen() {
  const {} = useBlossomTheme();
  return (
    <View style={styles.container}>
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
        onValueChange={() => {}}
      />
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
