import { Text } from "react-native";
import { Theme } from "../theme";

type Props = {
  small?: boolean;
  size?: number;
};

export const Logo = ({ small = false, size = 24 }: Props) => {
  return (
    <Text
      style={{
        color: Theme.colors.contrast,
        fontFamily: Theme.fonts.bold,
        fontSize: size,
      }}
    >
      {small ? '"' : '"Zen"'}
    </Text>
  );
};
