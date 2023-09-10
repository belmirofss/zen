import { View } from "react-native";
import { Header } from "./components/Header";
import { Quote } from "./components/Quote";
import { Footer } from "./components/Footer";

export const Entry = () => {
  return (
    <View
      style={{
        padding: 18,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Header />
      <Quote />
      <Footer />
    </View>
  );
};
