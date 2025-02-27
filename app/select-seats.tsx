import { ScrollView, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

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

import { eventDetailData } from "@/constants";
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
              style={{
                alignSelf: "center",
                backgroundColor: colors.bgLight300,
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text typography="h6">Select Seats.</Text>
            </View>
            <Spacer height={30} style={{ backgroundColor: "transparent" }} />

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
                {/* <Text style={styles.text}>Sign in with Facebook</Text> */}
                {/* <View
                key={item.id}
                style={[
                  {
                    alignItems: "center",
                    backgroundColor: "transparent",
                    // backgroundColor: item.color,
                    marginBottom: 2,
                    padding: 10 + 10 * index,
                  },
                  index === data.seat_classes.length - 1 && {
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  },
                ]}
              > */}
                <Text style={{ color: colors.text900 }}>
                  {item.name} ₹ {item.price}
                </Text>
                {/* </View> */}
              </LinearGradient>
            ))}
          </Card>
          <Text style={{ alignSelf: "center" }}>Seats Layout</Text>

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
                <View row style={{ alignItems: "center" }}>
                  <Icon
                    family="MaterialCommunityIcons"
                    name="ticket-confirmation"
                    color={item.color}
                  />
                  <Text style={{ marginLeft: 6 }}>
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
            <Text typography="h5" status="accent" style={{ marginBottom: 8 }}>
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
