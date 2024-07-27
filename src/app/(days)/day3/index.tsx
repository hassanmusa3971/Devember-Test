import { View, Text, Button } from 'react-native'
import { Link, Stack } from 'expo-router'

const DayDetailScreen = () => {
  return (
    <View>
      <Stack.Screen options={{title: 'Day 3: Markdown'}} />
      <Text>DayDetailScreen</Text>
      <Link href="/day3/editor" asChild>
      <Button title='Go to editor' />
      </Link>
    </View>
  )
}

export default DayDetailScreen