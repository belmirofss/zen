import { View } from "react-native";
import {
  BannerAd,
  TestIds,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import { AD_BANNER } from "../constants";

const adUnitId = __DEV__ ? TestIds.BANNER : AD_BANNER;

export const Footer = () => {
  return (
    <View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
