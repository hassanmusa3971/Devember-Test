import { View, Text } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const SecondScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
      }}
    >
      <Text style={{ fontFamily: "Inter", fontSize: 20, marginBottom: 20 }}>
        More protected Info
      </Text>

      <FontAwesome5 name="fingerprint" size={75} color="gray" />
    </View>
  );
};

export default SecondScreen;
