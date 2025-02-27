import {
  Icon,
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import React from "react";
import { StyleSheet } from "react-native";

function Counter({
  count = 0,
  onPlus,
  onMinus,
}: {
  count: number;
  onPlus: () => void;
  onMinus: () => void;
}) {
  const { colors } = useBlossomTheme();

  return (
    <View row style={styles.center}>
      <Icon
        family="MaterialCommunityIcons"
        name="minus-box-outline"
        status="accent"
        // @ts-ignore
        color={count ? colors.accent500 : "gray"}
        onPress={count ? onMinus : undefined}
        disabled={!count}
      />
      <Text style={styles.countText}>{count}</Text>
      <Icon
        family="MaterialCommunityIcons"
        name="plus-box-outline"
        status="accent"
        onPress={onPlus}
      />
    </View>
  );
}

export default Counter;

const styles = StyleSheet.create({
  countText: {
    paddingHorizontal: 10,
  },
  center: {
    alignItems: "center",
  },
});
