import { View, Button } from 'react-native'
import { Link, Stack } from 'expo-router'
import MarkDownDisplay from '@/components/day3/MarkDownDisplay'


const description =  `
# Push Notifications
Send and Received Push Notification
`
const DayDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{title: 'Day 14: Notifications'}} />
      <MarkDownDisplay>{description}</MarkDownDisplay>
      {/* <Link href="/day11/camera" asChild>
      <Button title='Go to camera' />
      </Link> */}
    </View>
  )
}

export default DayDetailScreen