import * as Location from "expo-location";

let currentLocation: any = null;

export function getCachedLocation() {
  return { location: currentLocation, error: "" };
}

export async function getCurrentLocation() {
  if (currentLocation) return { location: currentLocation, error: "" };

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return {
      location: null,
      error: "Please allow location permission from settings.",
    };
  }

  let location = await Location.getCurrentPositionAsync({});

  currentLocation = {
    ...location,
    //   Reverse Geocoding
    city: "Ranchi",
    address: "Hatia, Ranchi",
  };

  return {
    location: currentLocation,
    error: "",
  };
}
