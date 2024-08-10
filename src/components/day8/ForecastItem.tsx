import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { WeatherForecast } from "@/app/(days)/day8/weather";
import dayjs from "dayjs";

const ForecastItem = ({ item }: { item: WeatherForecast }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{Math.round(item.main.temp)}°</Text>
      <Text style={styles.date}>{dayjs(item.dt * 1000).format('ddd ha')}</Text>
    </View>
  );
};

export default ForecastItem;

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'ghostwhite',
      padding: 10,
      aspectRatio: 3/4,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
  },
  temp:{
      fontFamily: "Inter",
      fontSize: 35,
      color: 'gray',
      marginVertical: 10,
  },
  date:{
      fontFamily: 'Inter',
      color: 'gray',
      fontSize: 16,
  }
});
