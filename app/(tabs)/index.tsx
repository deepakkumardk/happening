import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  Icon,
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
  offersList,
  popularList,
  recentLocationsList,
  recommendationList,
  resumeBookingList,
  seasonalEventsList,
} from "@/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { getCurrentLocation } from "@/modules";

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
          { backgroundColor: colors.accentTransparent100 },
        ]}
        onPress={() => setShowModal(true)}
      >
        <Icon name="location-outline" style={styles.locationIcon} />
        <View style={styles.locationName}>
          <Text status="accent" typography="b2">
            {/* @ts-ignore */}
            {selectedLocation.city || "Select Location"}
          </Text>
          {/* @ts-ignore */}
          <Text typography="l2"> {selectedLocation.address}</Text>
        </View>
      </Pressable>

      <ScrollView contentContainerStyle={styles.container}>
        <Spacer height={16} />

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
          activeColor={colors.accentTransparent300}
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
              onItemPress={() => router.push(`/event/${item.id}/`)}
            />
          )}
        />

        <Title>Resume Your Booking</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={resumeBookingList}
          renderItem={({ item }) => (
            <ImageItem url={item.url} width={110} asset={item.asset} />
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
          data={offersList}
          renderItem={({ item }) => (
            <ImageItem url={item.url} width={110} asset={item.asset} />
          )}
        />

        <Title>Seasonal Events</Title>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={seasonalEventsList}
          renderItem={({ item }) => (
            <ImageItem url={item.url} asset={item.asset} title={item.title} />
          )}
        />
      </ScrollView>

      <Modal transparent visible={showModal} animationType="slide">
        <Pressable
          style={styles.modalContainer}
          onPress={() => setShowModal(false)}
        >
          <Pressable style={styles.bottomSheetContainer}>
            <View style={styles.locationModalContainer}>
              <LocationModalContent
                locations={recentLocationsList}
                onCancelPress={() => setShowModal(false)}
                onConfirm={setSelectedLocation}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  locationName: {
    backgroundColor: "transparent",
  },
  locationIcon: {
    marginHorizontal: 8,
  },
  locationModalContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
  },
  modalContainer: {
    backgroundColor: "#00000040",
    flex: 1,
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    end: 0,
    start: 0,
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 160,
  },
  locationContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 4,

    margin: 12,
  },
});
