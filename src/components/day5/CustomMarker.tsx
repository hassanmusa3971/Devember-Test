import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps';

// type apartmentProps = {
//       id: string,
//       latitude: number,
//       longitude: number,
//       price: number,
//       title: string,
//       numberOfStars: number,
//       rating: string,
//       image: string,
// }

const CustomMarker = ({ apartment, handlePress }: any) => {
  return (
      <Marker
      onPress={handlePress}
      key={apartment.id}
      coordinate={{
        latitude: apartment.latitude,
        longitude: apartment.longitude
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 5,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 20,
        }}
      >
        <Text style={{ fontFamily: 'InterSemi'}}>${apartment.price}</Text>
      </View>
    </Marker>
  )
}

export default CustomMarker