import { ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";

import {
  Button,
  Card,
  Divider,
  Icon,
  Spacer,
  Text,
  useBlossomTheme,
  View,
} from "@react-native-blossom-ui/components";
import { LinearGradient } from "expo-linear-gradient";

import React, { useMemo, useState } from "react";
import { selectSeatsData } from "@/constants";
import { Counter } from "@/components";

export default function SelectSeatsScreen() {
  const { colors } = useBlossomTheme();

  const [data, setData] = useState(selectSeatsData);
  const [selectedSeats, setSelectedSeats] = useState<any[]>(data.seat_classes);
  console.log("SelectSeatsScreen -> selectedSeats", selectedSeats);

  const sumAmount = useMemo(() => {
    return selectedSeats.reduce(
      (acc, curr) => acc + curr.seats * curr.price,
      0
    );
  }, [selectedSeats]);

  return (
    <>
      <Stack.Screen options={{ title: "Select Seats" }} />
      <View style={styles.container}>
        <ScrollView>
          <Card
            style={[
              styles.card,
              { backgroundColor: colors.backgroundTransparent100 },
            ]}
          >
            <View
              style={[
                styles.seatTitleTop,
                {
                  backgroundColor: colors.bgLight300,
                },
              ]}
            >
              <Text typography="h6">Select Seats.</Text>
            </View>
            <Spacer height={30} style={styles.spacer} />

            {data.seat_classes.map((item, index) => (
              <LinearGradient
                key={item.id}
                colors={[item.start_color, item.end_color]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  {
                    marginBottom: 2,
                    alignItems: "center",
                    padding: 10 + 10 * index,
                  },
                  index === data.seat_classes.length - 1 && {
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  },
                ]}
              >
                <Text style={{ color: colors.text900 }}>
                  {item.name} ₹ {item.price}
                </Text>
              </LinearGradient>
            ))}
          </Card>
          <Text style={styles.center}>Seats Layout</Text>

          <Spacer height={28} />
          <Divider color={colors.accent300} />

          {data.seat_classes.map((item, index) => (
            <>
              <View
                key={"Row" + item.id}
                row
                style={[
                  styles.classPriceRow,
                  index === data.seat_classes.length - 1 && styles.borderRadius,
                ]}
              >
                <View row style={styles.center}>
                  <Icon
                    family="MaterialCommunityIcons"
                    name="ticket-confirmation"
                    color={item.color}
                  />
                  <Text style={styles.seatsLeftText}>
                    {item.name} ₹ {item.price}
                    <Text style={{ color: colors.warning600 }}>
                      {"  "}
                      {item.seats_left} Seats Left
                    </Text>
                  </Text>
                </View>
                <Counter
                  count={
                    selectedSeats.find((seat) => seat.id === item.id)?.seats
                  }
                  onPlus={() =>
                    setSelectedSeats((prev) =>
                      prev.map((seatItem) =>
                        seatItem.id === item.id
                          ? { ...item, seats: seatItem.seats + 1 }
                          : seatItem
                      )
                    )
                  }
                  onMinus={() =>
                    setSelectedSeats((prev) =>
                      prev.map((seatItem) =>
                        seatItem.id === item.id
                          ? { ...item, seats: seatItem.seats - 1 }
                          : seatItem
                      )
                    )
                  }
                />
              </View>
              <Divider color={colors.accent300} />
            </>
          ))}
        </ScrollView>

        <Divider />
        <View row style={styles.bottomContainer}>
          <View>
            <Text typography="h5" status="accent" style={styles.sumText}>
              ₹{sumAmount}
              <Text>
                {" "}
                for {selectedSeats.reduce(
                  (acc, curr) => acc + curr.seats,
                  0
                )}{" "}
                seats
              </Text>
            </Text>
            <Text>₹{data.summary.tax_fees} tax & fees</Text>
          </View>
          <Button status="accent" size="small" style={styles.payButton}>
            Pay Now
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sumText: {
    marginBottom: 8,
  },
  seatsLeftText: {
    marginLeft: 6,
  },
  center: {
    alignSelf: "center",
  },
  seatTitleTop: {
    alignSelf: "center",
    padding: 8,
    borderRadius: 6,
  },
  spacer: {
    backgroundColor: "transparent",
  },
  borderRadius: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  classPriceRow: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 16,
  },
  bottomContainer: {
    justifyContent: "space-between",
    padding: 24,
    paddingTop: 12,
  },
  payButton: {
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
});
