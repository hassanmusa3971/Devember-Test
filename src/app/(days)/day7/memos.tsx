import { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  Pressable
} from "react-native";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import Animated, {
      interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import MemoListItem from "@/components/day7/MemoListItem";



export type Memo = {
      uri: string,
      metering: number[]
}

export default function MemosScreen() {
  const [recording, setRecording] = useState<Recording>();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [audioMetering, setAudioMetering] = useState<number[]>([])
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const metering = useSharedValue(-1000)

  async function startRecording() {
    try {
      setAudioMetering([])
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        undefined,
        100
      );
      setRecording(recording);
      console.log("Recording started");
      recording.setOnRecordingStatusUpdate((status) => {
            console.log(status);
            if(status.metering){
                  metering.value = status.metering || -100
                  setAudioMetering((currVal) => [...currVal, status.metering || -100])
            }
      });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    if (uri) {
      setMemos((existingMemos) => [{uri, metering: audioMetering}, ...existingMemos]);
    }
  }

  const animatedRedCircle = useAnimatedStyle(() => ({
    width: withTiming(recording ? "70%" : "100%"),
    borderRadius: withTiming(recording ? 5 : 35)
  }));

  const animatedRecordWave = useAnimatedStyle(() => {
      const size = withTiming(interpolate(metering.value, [-160, -60, 0], [0, 0, -30]), { duration: 100 })
      return{
            top: size,
            bottom: size,
            left: size,
            right: size
      }
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem  memo={item} />}
      />

      <View style={styles.footer}>
        <View>
          <Animated.View style={[styles.recordWave, animatedRecordWave]} />
          <Pressable
            style={styles.recordButton}
            onPress={recording ? stopRecording : startRecording}
          >
            <Animated.View style={[styles.redCircle, animatedRedCircle]} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  footer: {
    backgroundColor: "white",
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  recordButton: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "gray",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  redCircle: {
    backgroundColor: "orangered",
    aspectRatio: 1
  },
  recordWave: {
    backgroundColor: "#FF000055",
    position: "absolute",
    top: -20,
    bottom: -20,
    right: -20,
    left: -20,
    borderRadius: 1000
  }
});
