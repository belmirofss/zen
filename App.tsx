import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { Entry } from "./src/Entry";
import { Theme } from "./src/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.colors.primary,
      }}
      onLayout={onLayoutRootView}
    >
      <Entry />
      <StatusBar hidden />
    </View>
  );
}
