import { View, Text, StyleSheet } from "react-native";
import React from "react";

type DayListItem = {
 day: number
}
const DayListItem = ({ day } : DayListItem) => {
  return (
    <View style={styles.box}> 
      <Text style={styles.text}>{day}</Text>
    </View>
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
