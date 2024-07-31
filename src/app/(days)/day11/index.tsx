import { View, Button } from 'react-native'
import { Link, Stack } from 'expo-router'
import MarkDownDisplay from '@/components/day3/MarkDownDisplay'


const description =  `
# Camera app
Take photos and record videos with React Native Vision Camera
`
const DayDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{title: 'Day 11: Camera'}} />
      <MarkDownDisplay>{description}</MarkDownDisplay>
      <Link href="/day11/camera" asChild>
      <Button title='Go to camera' />
      </Link>
    </View>
  )
}

export default DayDetailScreen