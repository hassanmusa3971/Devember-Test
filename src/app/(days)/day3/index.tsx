import { View, Text, Button } from 'react-native'
import { Link, Stack } from 'expo-router'
import MarkDownDisplay from '@/components/day3/MarkDownDisplay'


const description =  `
# Markdown
Integrate Markdown content in **React Native**
`
const DayDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{title: 'Day 3: Markdown'}} />
      <MarkDownDisplay>{description}</MarkDownDisplay>
      <Link href="/day3/editor" asChild>
      <Button title='Go to editor' />
      </Link>
    </View>
  )
}

export default DayDetailScreen