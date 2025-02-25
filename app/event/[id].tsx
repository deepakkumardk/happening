import React, { useState } from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import {
  Text,
  Icon,
  Button,
  Card,
  Chip,
  SegmentedButton,
  Checkbox,
} from "@react-native-blossom-ui/components";
import { eventDetailData } from "@/constants";

export default function EventDetailsScreen() {
  const [event, setEvent] = useState(eventDetailData);
  const [selectedSlot, setSelectedSlot] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={event.image}
          style={styles.eventImage}
        />
        <Icon
          name="arrow-left"
          size={24}
          color="black"
          style={styles.backIcon}
        />
        <Icon name="share" size={24} color="black" style={styles.shareIcon} />
      </View>

      <ScrollView style={styles.content}>
        <SegmentedButton
          data={[
            { title: "About", withCheckIcon: false },
            { title: "Crew", withCheckIcon: false },
          ]}
          withVerticalDivider
        />

        <View style={styles.card}>
          {/* <Card.Cover source={require('./assets/ar_rahman_show.png')} style={styles.cardCover} /> */}
          <Card.Content>
            <Text typography="h5" style={styles.title}>
              {event.title}
            </Text>
            <View style={styles.row}>
              <Icon name="heart" size={16} status="primary" />
              <Text typography="l2" status="primary" style={styles.iconText}>
                {event.interested_count} interested
              </Text>
              <Button
                size="small"
                mode="tinted"
                title="Teaser"
                style={styles.teaser}
              />
              <Chip
                title="Fast filling"
                status="warning"
                mode="plain"
                style={styles.badge}
              />

              <Checkbox
                checkedIcon={<Icon name="heart" color="red" />}
                uncheckedIcon={<Icon name="heart-outline" />}
              />
            </View>

            <View style={styles.row}>
              <Icon name="clock" size={16} />
              <Text typography="l2" style={styles.iconText}>
                {event.duration}
              </Text>

              <Icon name="user" size={16} style={styles.iconSpacing} />
              <Text typography="l2" style={styles.iconText}>
                {event.age_restriction}
              </Text>

              <Icon name="music" size={16} style={styles.iconSpacing} />
              <Text typography="l2" style={styles.iconText}>
                {event.genres.join(", ")}
              </Text>
            </View>

            <View style={styles.row}>
              <Icon name="globe" size={16} />
              <Text typography="l2" style={styles.iconText}>
                {event.languages.join(", ")}
              </Text>
            </View>

            <View style={styles.row}>
              <Icon name="calendar" size={16} />
              <Text typography="l2" style={styles.iconText}>
                {event.date}
              </Text>
            </View>

            <Text typography="l2" style={styles.priceText}>
              Price:{" "}
              <Text typography="l1">
                ₹{event.price_range.min} - ₹{event.price_range.max}
              </Text>
            </Text>

            <View style={styles.locationRow}>
              <Icon name="map-pin" size={16} />
              <Text typography="l1" style={styles.locationText}>
                {event.location.venue}
              </Text>
              <Icon name="info" size={16} style={styles.infoIcon} />
            </View>

            {event.time_slots.map((item) => (
              <View key={item.time} style={styles.row}>
                <Button
                  size="small"
                  mode="outlined"
                  // @ts-ignore
                  status={selectedSlot ? "primary" : null}
                  onPress={() => setSelectedSlot(item.time)}
                >
                  {item.time}
                </Button>
                <Text typography="l2" status="error" style={styles.warningText}>
                  {item.seats_left} Seats Left
                </Text>
              </View>
            ))}

            <View style={styles.row}>
              <Icon name="parking-circle" size={16} />
              <Icon name="cutlery" size={16} style={styles.iconSpacing} />
              <Icon name="map" size={16} style={styles.iconSpacing} />
              <Text
                typography="l2"
                status="primary"
                style={styles.facilityText}
              >
                {event.facilities.nearby_distance} nearby
              </Text>
            </View>

            <Text typography="h6" style={styles.sectionTitle}>
              Policies & Rules
            </Text>

            {event.policies.map((item) => (
              <Text key={item} typography="l2">
                {"   "}• {item}
              </Text>
            ))}

            <Text typography="h6" style={styles.sectionTitle}>
              Offers for you
            </Text>

            {event.offers.map((item) => (
              <Text key={item} typography="l2">
                {"   "}• {item}
              </Text>
            ))}
          </Card.Content>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {selectedSlot ? null : (
          <Text typography="l2" style={{ marginEnd: 20 }}>
            Select Time Slot to Proceed
          </Text>
        )}
        <Button size="small" status="primary" disabled>
          Proceed
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 15,
  },
  shareIcon: {
    position: "absolute",
    top: 20,
    right: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    marginTop: 16,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardCover: {
    height: 200,
  },
  title: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconText: {
    marginLeft: 4,
  },
  teaser: {
    borderRadius: 4,
    marginLeft: 8,
  },
  badge: {
    marginLeft: 8,
  },
  iconSpacing: {
    marginLeft: 16,
  },
  priceText: {
    marginTop: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  locationText: {
    marginLeft: 4,
  },
  infoIcon: {
    marginLeft: 6,
  },
  warningText: {
    marginLeft: 8,
  },
  facilityText: {
    marginLeft: 4,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  footer: {
    padding: 16,
    marginBottom: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
});
