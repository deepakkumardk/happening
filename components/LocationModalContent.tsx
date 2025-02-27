import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";

import {
  Button,
  Icon,
  Radio,
  Spacer,
  Switch,
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import * as Location from "expo-location";

import { getCachedLocation, getCurrentLocation } from "@/modules";

function LocationModalContent({
  locations,
  onCurrentLocationPress,
  onCancelPress,
  onConfirm,
}: {
  locations: Array<{ id: number; city: string; address: string }>;
  onCurrentLocationPress?: () => void;
  onCancelPress?: () => void;
  onConfirm?: (location: string) => void;
}) {
  const { colors } = useBlossomTheme();
  const [selectedLocation, setSelectedLocation] = useState<any>();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    getCachedLocation().location
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const { location, error } = await getCurrentLocation();
      setLocation(location);
      setErrorMsg(error);
    };
    fetchLocation();
  }, []);

  const LocationView = useCallback(
    () => (
      <Pressable
        style={[
          styles.locationContainer,
          { backgroundColor: colors.accentTransparent100 },
        ]}
        onPress={onCurrentLocationPress}
      >
        <View style={styles.transparent} row>
          <Icon name="location-outline" style={styles.locationIcon} />
          <View style={styles.transparent}>
            <Text status="accent" typography="b2">
              {/* @ts-ignore */}
              {location.city}
            </Text>
            {/* @ts-ignore */}
            <Text typography="l2">{location.address}</Text>
          </View>
        </View>
        <Radio onValueChange={() => setSelectedLocation(location)} />
      </Pressable>
    ),
    []
  );

  if (onCurrentLocationPress) {
    return <LocationView />;
  }

  return (
    <View>
      <Text typography="h6">Select your location</Text>
      <Spacer height={20} />
      <Switch
        value={!errorMsg}
        position="right"
        adjacent={false}
        label={errorMsg || "Phone location permission"}
      />
      <Spacer height={20} />
      <LocationView />
      <Spacer height={20} />
      <Text typography="h6">Recent locations</Text>
      <Spacer />
      {locations.map((item) => (
        <View key={item.id} row style={{ marginHorizontal: 8 }}>
          <Icon name="location-outline" />
          <Radio
            position="right"
            adjacent={false}
            label={item.address}
            containerStyle={styles.radioContainer}
            onValueChange={() => setSelectedLocation(item)}
          />
        </View>
      ))}
      <Spacer height={20} />
      <View row style={styles.buttonRow}>
        <Button title="Cancel" mode="plain" onPress={onCancelPress} />
        <Button
          title="Confirm"
          disabled={!selectedLocation}
          onPress={() => {
            onCancelPress?.();
            onConfirm?.(selectedLocation);
          }}
        />
      </View>
    </View>
  );
}

export default LocationModalContent;

export const styles = StyleSheet.create({
  buttonRow: {
    alignSelf: "flex-end",
  },
  locationIcon: {
    padding: 8,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  radioContainer: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 8,
  },
  locationContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 4,
    justifyContent: "space-between",
  },
});
