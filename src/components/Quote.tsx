import { View, Text, TouchableOpacity, LayoutChangeEvent } from "react-native";
import { useRef, useState } from "react";
import ViewShot from "react-native-view-shot";
import { Entypo } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import moment from "moment";
import { useQuote } from "../hooks/useQuote";
import { Logo } from "./Logo";
import { Theme } from "../theme";

const QUOTE_FONT_SIZE = 28;

export const Quote = () => {
  const [viewWidth, setViewWidth] = useState(0);
  const { quote, isLoading, isError, nextDate } = useQuote();
  const viewShotRef = useRef<ViewShot>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Whoops! Sharing isn't available on your device!");
      return;
    }

    if (viewShotRef.current?.capture) {
      const uri = await viewShotRef.current.capture();

      const options = {
        mimeType: "image/jpeg",
        dialogTitle: "Share this Quote",
        UTI: "image/jpeg",
      };

      await Sharing.shareAsync(uri, options);
    }
  };

  return (
    <View>
      <Text
        style={{
          textAlign: "right",
          fontFamily: Theme.fonts.regular,
          color: Theme.colors.contrast,
          fontSize: 12,
          marginBottom: 4,
        }}
      >
        Next, {moment(nextDate).calendar().toLowerCase()}
      </Text>
      <ViewShot
        ref={viewShotRef}
        options={{
          format: "jpg",
          quality: 1,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: viewWidth,
              backgroundColor: Theme.colors.primary,
              flexDirection: "column",
              justifyContent: "center",
              padding: 18,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}
            onLayout={onLayout}
          >
            {(!quote || isLoading) && (
              <Text
                style={{
                  color: Theme.colors.contrast,
                  fontFamily: Theme.fonts.bold,
                  fontSize: QUOTE_FONT_SIZE,
                  textAlign: "center",
                }}
              >
                "Loading..."
              </Text>
            )}

            {quote && !isLoading && (
              <>
                <Text
                  style={{
                    color: Theme.colors.contrast,
                    fontFamily: Theme.fonts.bold,
                    fontSize: QUOTE_FONT_SIZE,
                  }}
                >
                  "{quote.q}"
                </Text>
                <Text
                  style={{
                    color: Theme.colors.contrast,
                    fontFamily: Theme.fonts.regular,
                    fontSize: 18,
                  }}
                >
                  - {quote.a}
                </Text>
                <View
                  style={{
                    marginTop: 18,
                    alignItems: "flex-end",
                  }}
                >
                  <Logo size={14} />
                </View>
              </>
            )}

            {isError && !isLoading && (
              <>
                <Text
                  style={{
                    color: Theme.colors.contrast,
                    fontFamily: Theme.fonts.bold,
                    fontSize: 48,
                  }}
                >
                  "Something went wrong. Sorry!"
                </Text>
                <View
                  style={{
                    marginTop: 18,
                    alignItems: "flex-end",
                  }}
                >
                  <Logo size={14} />
                </View>
              </>
            )}
          </View>
        </View>
      </ViewShot>

      <TouchableOpacity
        style={{
          marginTop: 12,
          paddingVertical: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "auto",
          borderBottomColor: Theme.colors.contrast,
          borderBottomWidth: 2,
        }}
        onPress={openShareDialog}
      >
        <Text
          style={{
            color: Theme.colors.contrast,
            fontFamily: Theme.fonts.bold,
            fontSize: 14,
          }}
        >
          Share
        </Text>
        <Entypo name="share" size={24} color={Theme.colors.contrast} />
      </TouchableOpacity>
    </View>
  );
};
