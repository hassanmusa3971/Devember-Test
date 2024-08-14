import { View, Text, Button } from 'react-native'
import { Link, Stack } from 'expo-router'
import MarkDownDisplay from '@/components/day3/MarkDownDisplay'


const description =  `
# Voice Memos
Work with the Microphone and Audio playback
`
const DayDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{title: 'Day 7: Voice Memos'}} />
      <MarkDownDisplay>{description}</MarkDownDisplay>
      <Link href="/day7/memos" asChild>
      <Button title='Go to Voice Memos' />
      </Link>
    </View>
  )
}

export default DayDetailScreen