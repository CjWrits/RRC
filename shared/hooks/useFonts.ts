import { useFonts as useExpoFonts } from "expo-font";
import { Platform } from "react-native";

import { Devices, Fonts } from "../enums";

const useFonts = () => {
  if (Platform.OS === Devices.WEB) {
    const [fontsLoaded] = useExpoFonts({
      [Fonts.LIGHT]: require("../../assets/fonts/OpenSans-Light.ttf"),
      [Fonts.REGULAR]: require("../../assets/fonts/OpenSans-Regular.ttf"),
      [Fonts.MEDIUM]: require("../../assets/fonts/OpenSans-Medium.ttf"),
      [Fonts.SEMIBOLD]: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
      [Fonts.BOLD]: require("../../assets/fonts/OpenSans-Bold.ttf"),
      [Fonts.EXTRA_BOLD]: require("../../assets/fonts/OpenSans-ExtraBold.ttf"),
    });

    if (!fontsLoaded) return null;
  }
};

export { useFonts };
