import { FlatList, Image, ScrollView, StyleSheet } from "react-native";

import {
  SegmentedButton,
  Spacer,
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import { ImageItem } from "@/components";
import { categoryList } from "@/constants";
import { useCallback, useMemo } from "react";

export default function HomeScreen() {
  const { colors } = useBlossomTheme();

  const buttonCommonProps = useMemo(
    () => ({
      withCheckIcon: false,
      style: {
        borderWidth: 1,
        borderColor: colors.accent500,
      },
    }),
    [colors.accent500]
  );

  const Title = useCallback(
    ({ children }: { children: string }) => (
      <>
        <Spacer height={24} />
        <Text typography="h6">{children}</Text>
        <Spacer height={24} />
      </>
    ),
    []
  );

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <SegmentedButton
          data={[
            {
              title: "Entertainment",
              ...buttonCommonProps,
            },
            {
              title: "Academic",
              ...buttonCommonProps,
            },
            {
              title: "Volunteering",
              ...buttonCommonProps,
            },
          ]}
          activeColor={colors.accent100}
          // withVerticalDivider
          borderRadius={8}
          size="large"
        />

        <Title>Pick Your Category</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryList}
          renderItem={({ item }) => (
            <ImageItem url={item.url} asset={item.asset} title={item.title} />
          )}
        />
        <Spacer height={16} />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryList}
          renderItem={({ item }) => (
            <ImageItem url={item.url} asset={item.asset} title={item.title} />
          )}
        />

        <Title>Most Popular</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryList}
          renderItem={({ item }) => (
            <ImageItem
              url={item.url}
              width={300}
              height={125}
              asset={item.asset}
            />
          )}
        />

        <Title>Resume Your Booking</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryList}
          renderItem={({ item }) => (
            <ImageItem
              url={item.url}
              // width={300}
              // height={125}
              asset={item.asset}
            />
          )}
        />

        <Title>Recommended for you</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryList}
          renderItem={({ item }) => (
            <ImageItem
              url={item.url}
              width={300}
              height={125}
              asset={item.asset}
            />
          )}
        />

        <Title>Offers for you</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryList}
          renderItem={({ item }) => (
            <ImageItem
              url={item.url}
              // width={300}
              // height={125}
              asset={item.asset}
            />
          )}
        />

        <Title>Seasonal Events</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryList}
          renderItem={({ item }) => (
            <ImageItem
              url={item.url}
              // width={300}
              // height={125}
              asset={item.asset}
              title={item.title}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 160,
  },
});
