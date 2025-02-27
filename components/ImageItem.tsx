import {
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import React, { memo } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";

function ImageItem({
  url,
  title,
  width = 90,
  height = 80,
  asset,
  onItemPress,
}: {
  url: string;
  width?: number;
  height?: number;
  title?: string;
  asset?: any;
  onItemPress?: () => void;
}) {
  const { colors } = useBlossomTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, { backgroundColor: colors.accent100 }]}
      onPress={onItemPress}
    >
      <Image
        source={asset || { uri: url }}
        style={[
          {
            width,
            height,
          },
          title ? styles.imageBorderBottom : styles.imageBorder,
        ]}
        resizeMode="stretch"
        width={width}
        height={height}
      />
      {title ? <Text style={styles.text}>{title}</Text> : null}
    </TouchableOpacity>
  );
}

export default memo(ImageItem);

const styles = StyleSheet.create({
  imageBorder: {
    borderRadius: 10,
  },
  imageBorderBottom: {
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  text: {
    textAlign: "center",
    padding: 2,
  },
  container: {
    borderRadius: 10,
    alignSelf: "baseline",
    marginEnd: 16,
  },
});
