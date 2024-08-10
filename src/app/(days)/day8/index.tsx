import { View, Button } from 'react-native'
import { Link, Stack } from 'expo-router'
import MarkDownDisplay from '@/components/day3/MarkDownDisplay'


const description =  `
# Weather app
Fetch weather data and display it
`
const DayDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{title: 'Day 8: Weather app'}} />
      <MarkDownDisplay>{description}</MarkDownDisplay>
      <Link href="/day8/weather" asChild>
      <Button title='Go to weather' />
      </Link>
    </View>
  )
}

export default DayDetailScreen