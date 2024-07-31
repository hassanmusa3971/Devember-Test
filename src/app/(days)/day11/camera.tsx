import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Image,
  Button
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stack, useFocusEffect } from "expo-router";
import {
  useCameraPermission,
  useMicrophonePermission,
  useCameraDevice,
  Camera,
  PhotoFile,
  TakePhotoOptions,
  VideoFile,
  useCodeScanner
} from "react-native-vision-camera";
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const CameraScreen = () => {
  const device = useCameraDevice("back", {
    physicalDevices: [
      "ultra-wide-angle-camera"
      // 'wide-angle-camera',
      // 'telephoto-camera'
    ]
  });
  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log("code result: ", codes[0])
    }
  });
  const { hasPermission, requestPermission } = useCameraPermission();
  const {
    hasPermission: microphonePermission,
    requestPermission: requestMicrophonePermission
  } = useMicrophonePermission();
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraVideo, setCameraVideo] = useState<VideoFile>();
  const [cameraPhoto, setCameraPhoto] = useState<PhotoFile>();
  const [mode, setMode] = useState("camera");
  const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off");
  const camera = useRef<Camera>(null);

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    if (!microphonePermission) {
      requestMicrophonePermission();
    }
  }, [hasPermission, microphonePermission]);

  const onTakePicturePress = async () => {
    if (isRecording) {
      camera.current?.stopRecording();
      return;
    }
    const photo = await camera.current?.takePhoto({
      flash
    });
    setCameraPhoto(photo);
  };

  const onStartRecording = async () => {
    if (!camera.current) {
      return;
    }
    setIsRecording(true);
    camera.current?.startRecording({
      flash: flash === "off" ? "on" : "off",
      onRecordingFinished: (video) => {
        setCameraVideo(video);
        setIsRecording(false);
        console.log(video);
      },
      onRecordingError: (error) => {
        setIsRecording(false);
        console.error(error);
      }
    });
    console.warn("Recording video");
  };

  const uploadPhoto = async () => {
    if (!cameraPhoto) {
      return;
    }
    const result = await fetch(`file://${cameraPhoto?.path}`);
    const data = await result.blob();
    console.log(data);
  };

  if (!hasPermission || !microphonePermission) {
    return <ActivityIndicator />;
  }
  if (!device) {
    return <Text>Camere device not fount</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      {
        mode === 'qr' ? (
          <Camera
          device={device}
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          isActive={mode === "qr" && isActive && !cameraPhoto && !cameraVideo}
        />
        ):(
          <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive && !cameraPhoto && !cameraVideo && mode === "camera"}
        photo
        video
        audio
      />
        )
      }
      {cameraPhoto ? (
        <>
          <Image
            source={{ uri: "file://" + cameraPhoto.path }}
            style={StyleSheet.absoluteFill}
          />
          <FontAwesome5
            onPress={() => setCameraPhoto(undefined)}
            name="arrow-left"
            size={25}
            color="white"
            style={{
              position: "absolute",
              top: 50,
              left: 30
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              paddingBottom: 5,
              backgroundColor: "rgba(0, 0, 0,0.40)"
            }}
          >
            <Button title="Upload" onPress={uploadPhoto} />
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              position: "absolute",
              right: 10,
              top: 50,
              padding: 10,
              borderRadius: 5,
              backgroundColor: "rgba(0, 0, 0,0.40)",
              gap: 30
            }}
          >
            <Ionicons
              name={flash === "off" ? "flash-off-outline" : "flash-outline"}
              onPress={() =>
                setFlash((currentValue) =>
                  currentValue === "off" ? "on" : "off"
                )
              }
              size={24}
              color="white"
            />
            <Ionicons
              name={mode === "camera" ? "qr-code-sharp" : "camera"}
              onPress={() => setMode(mode === "qr" ? "camera" : "qr")}
              size={30}
              color="white"
            />
          </View>
          <Pressable
            onPress={onTakePicturePress}
            onLongPress={onStartRecording}
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 10,
              width: 75,
              height: 75,
              backgroundColor: isRecording ? "red" : "white",
              borderRadius: 75
            }}
          />
        </>
      )}
    </View>
  );
};

export default CameraScreen;
