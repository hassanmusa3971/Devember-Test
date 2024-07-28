import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import apartments from "@assets/data/day5/apartments.json";

type ApartmentListItem = {
      apartment: (typeof apartments)[0],
      contentContainerStyle?: ViewStyle,

}
const ApartmentListItem = ({apartment, contentContainerStyle}: ApartmentListItem) => {
  return (
    <View style={[styles.card, contentContainerStyle]}>
      <Image source={{uri: apartment?.image}} style={styles.image} />
      <View style={styles.rightContainer}>
      <Text style={styles.title}>{apartment?.title}</Text>
      <Text style={styles.description}>Stay in this apartment</Text>
      <View style={styles.footer}>
      <Text style={styles.price}>${apartment?.price} night</Text>
      <Text style={styles.rating}>☆{apartment?.rating} {apartment?.numberOfStars}</Text>
      </View>
      </View>
    </View>
  );
};

export default ApartmentListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
      fontFamily: 'InterBold',
      marginBottom: 10,
      fontSize: 16,
  },
  description:{
      color: 'gray',
  },
  price:{
      fontFamily: 'InterBold',
  },
  rating:{

  },
  image: {
      width: 150,
      aspectRatio: 1,
  },
  rightContainer:{
      padding: 10,
      flex: 1,
  },
  footer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 'auto',
  }
});
