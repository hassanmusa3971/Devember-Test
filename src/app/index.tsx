import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import DayListItem from '../components/core/DayListItem';


const days = [...Array(24)].map((_,index) => index + 1)
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
      data={days}
      contentContainerStyle={styles.content}
      numColumns={2}
      columnWrapperStyle={styles.column}
      renderItem={({item}) => <DayListItem day={item} />}
       />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    gap: 10,
    padding: 10,
  },
  column:{
    gap: 10,
  }
});
