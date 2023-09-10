import { View, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Logo } from "./Logo";
import { Theme } from "../theme";
import { BUY_ME_A_COFFEE_URL } from "../constants";

export const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Logo />
      <TouchableOpacity
        style={{
          paddingVertical: 8,
        }}
        onPress={() => WebBrowser.openBrowserAsync(BUY_ME_A_COFFEE_URL)}
      >
        <Text
          style={{
            color: Theme.colors.contrast,
            fontFamily: Theme.fonts.bold,
            fontSize: 12,
          }}
        >
          Buy me a coffee {">"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
