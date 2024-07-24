import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

type DayListItem = {
 day: number
}
const DayListItem = ({ day } : DayListItem) => {
  return (
    <Link href={`/day${day}`} asChild>
    <Pressable style={styles.box}> 
      <Text style={styles.text}>{day}</Text>
    </Pressable>
    </Link>
  );
};

export default DayListItem;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#F9EDE3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#9b4521",
    borderRadius: 20
  },
  text: {
    color: "#9b4521",
    fontSize: 75,
    fontFamily: "AmaticBold",
  }
});
