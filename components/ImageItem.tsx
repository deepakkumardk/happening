import {
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

function ImageItem({
  url,
  title,
  width = 90,
  height = 80,
  asset,
}: {
  url: string;
  width?: number;
  height?: number;
  title?: string;
  asset?: any;
}) {
  const { colors } = useBlossomTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.accent100 }]}>
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
    </View>
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
