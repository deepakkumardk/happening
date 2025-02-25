import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  Icon,
  ModalContent,
  SegmentedButton,
  Spacer,
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import { ImageItem, LocationModalContent } from "@/components";
import {
  categoryList,
  categoryList2,
  popularList,
  recentLocationsList,
  recommendationList,
  resumeBookingList,
} from "@/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { getCurrentLocation } from "@/app/modules";
import React from "react";

export default function HomeScreen() {
  const { colors } = useBlossomTheme();

  const [showModal, setShowModal] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("");

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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View>
      <Pressable
        style={[
          styles.locationContainer,
          { backgroundColor: colors.accent100 },
        ]}
        onPress={() => setShowModal(true)}
      >
        <Icon name="location" style={{ marginHorizontal: 12 }} />
        <View style={{ backgroundColor: "transparent" }}>
          <Text status="accent" typography="b2">
            {selectedLocation.city}
          </Text>
          <Text typography="l2"> {selectedLocation.address}</Text>
        </View>
      </Pressable>

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
          data={categoryList2}
          renderItem={({ item }) => (
            <ImageItem url={item.url} asset={item.asset} title={item.title} />
          )}
        />

        <Title>Most Popular</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularList}
          renderItem={({ item }) => (
            <ImageItem
              url={item.url}
              width={300}
              height={125}
              asset={item.asset}
              onItemPress={() => router.push("/event/[id]/")}
            />
          )}
        />

        <Title>Resume Your Booking</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={resumeBookingList}
          renderItem={({ item }) => (
            <ImageItem
              url={item.url}
              width={110}
              // height={125}
              asset={item.asset}
            />
          )}
        />

        <Title>Recommended for you</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recommendationList}
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
              width={110}
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

      <Modal transparent visible={showModal} animationType="slide">
        <View style={{ backgroundColor: "#00000040", flex: 1 }}>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              end: 0,
              start: 0,
            }}
          >
            <View style={{ marginHorizontal: 20, marginVertical: 32 }}>
              <LocationModalContent
                locations={recentLocationsList}
                onCancelPress={() => setShowModal(false)}
                onConfirm={setSelectedLocation}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 160,
  },
  locationContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 4,
    margin: 8,
  },
});
