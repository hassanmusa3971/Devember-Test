import { View, Text, Button } from 'react-native'
import { Link, Stack } from 'expo-router'
import MarkDownDisplay from '@/components/day3/MarkDownDisplay'


const description =  `
# AirBNB Maps
`
const DayDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{title: 'Day 5: Maps'}} />
      <MarkDownDisplay>{description}</MarkDownDisplay>
      <Link href="/day5/airbnb" asChild>
      <Button title='Go to AirBNB Map' />
      </Link>
    </View>
  )
}

export default DayDetailScreen