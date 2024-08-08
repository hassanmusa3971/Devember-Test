import { createContext, PropsWithChildren, useContext, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";


type BiometricsContext = {
      isUnlock: boolean,
      authencate: () => void
}
const BiometricsContext = createContext<BiometricsContext>({
      isUnlock: false,
      authencate: () => {}
})

const BiometricProvider = ({children}: PropsWithChildren) => {
      const [isUnlock, setIsUnlock] = useState(false);

      
  const authencate = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync()
      if(!hasHardware){
        Alert.alert('Not supported')
        return
      }

    const res = await LocalAuthentication.authenticateAsync();
    console.log(res);
    if (res.success) {
      setIsUnlock(true);
    }
  };
      return(
            <BiometricsContext.Provider value={{isUnlock, authencate}}>
                  {children}
            </BiometricsContext.Provider>
      )
}

export default BiometricProvider;
export const useBiometrics = () => useContext(BiometricsContext)