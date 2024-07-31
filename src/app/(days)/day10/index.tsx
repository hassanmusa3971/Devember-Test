import { View, Button } from 'react-native'
import { Link, Stack } from 'expo-router'
import MarkDownDisplay from '@/components/day3/MarkDownDisplay'


const description =  `
# Biometrics
Use FaceID and Fingerprint to unlock the next screen
`
const DayDetailScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{title: 'Day 10: Biometrics'}} />
      <MarkDownDisplay>{description}</MarkDownDisplay>
      <Link href="/day10/protected" asChild>
      <Button title='Go to protected screen' />
      </Link>
    </View>
  )
}

export default DayDetailScreen