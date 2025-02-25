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
import React, { memo, useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { recentLocationsList } from "@/constants";
import { getCachedLocation, getCurrentLocation } from "@/app/modules";

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
          { backgroundColor: colors.accent100 },
        ]}
        onPress={onCurrentLocationPress}
      >
        <View style={{ backgroundColor: "transparent" }} row>
          <Icon name="location" style={{ marginHorizontal: 12 }} />
          <View style={{ backgroundColor: "transparent" }}>
            <Text status="accent" typography="b2">
              {location.city}
            </Text>
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
        value={true}
        // disabled
        label={errorMsg || "Phone location permission"}
      />
      <Spacer height={20} />
      <LocationView />
      <Spacer height={20} />
      <Text typography="h6">Recent locations</Text>
      <Spacer />
      {locations.map((item) => (
        <View key={item.id} row style={{}}>
          <Icon name="location" />
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
      <View row style={{ alignSelf: "flex-end" }}>
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
  radioContainer: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 8,
  },
  locationContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 4,
    // margin: 8,
    flex: 1,
    justifyContent: "space-between",
  },
});
