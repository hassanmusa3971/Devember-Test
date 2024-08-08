import { Link, Slot } from "expo-router";
import { useEffect } from "react";
import { Text, View, Platform, Alert } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useBiometrics } from "@/components/day10/BiometricsProvider";

const BiometricProtected = () => {
  const{ isUnlock, authencate } = useBiometrics()
 

  useEffect(() => {
    if(!isUnlock){
    authencate();
    }
  }, []);
  if (!isUnlock) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'white' }}>
        {Platform.OS === "android" ? (
          <Text style={{ fontFamily: "Inter", fontSize: 20, marginBottom: 20 }}>
            Use Fingerprint to unlock
          </Text>
        ) : (
          <Text style={{ fontFamily: "Inter", fontSize: 20, marginBottom: 20 }}>
            Use FaceId to unlock
          </Text>
        )}
        <FontAwesome5
          name="fingerprint"
          onPress={authencate}
          size={75}
          color="gray"
        />
        <Link href={'/day10/protected/second'}>Prev page</Link>
      </View>
    );
  }
  return <Slot />;
};

export default BiometricProtected;
