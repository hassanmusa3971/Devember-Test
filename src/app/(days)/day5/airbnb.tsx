import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import apartments from "../../../../assets/data/day5/apartments.json";
import CustomMarker from "@/components/day5/CustomMarker";
import ApartmentListItem from "./ApartmentListItem";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList
} from "@gorhom/bottom-sheet";

const AirbnbScreen = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [mapRegion, setMapRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })

  const snapPoints = useMemo(() => [52, "50%", "90%"], []);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <MapView
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        style={styles.map}
      >
        {apartments.map((apartment) => (
          <CustomMarker
            apartment={apartment}
            key={apartment.id}
            handlePress={() => setSelectedApartment(apartment)}
          />
        ))}
      </MapView>
      {/* Display selected apartment */}
      {selectedApartment && (
        <ApartmentListItem
          apartment={selectedApartment}
          contentContainerStyle={{
            position: "absolute",
            bottom:
              typeof snapPoints[0] === "number" ? snapPoints[0] + 10 : 100,
            left: 10,
            right: 10
          }}
        />
      )}
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <Text style={styles.listTitle}>Over {apartments?.length} places</Text>
          <BottomSheetFlatList
            data={apartments}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => <ApartmentListItem apartment={item} />}
          />
        </BottomSheetView>
      </BottomSheet>
      <StatusBar style="light" />
    </View>
  );
};

export default AirbnbScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  },
  listTitle: {
    textAlign: "center",
    fontFamily: "InterSemi",
    fontSize: 16,
    marginBottom: 15
  }
});
