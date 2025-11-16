import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { buttonStyles } from "./styles";

const { base, text, spinner } = buttonStyles();

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      className={base({ isLoading })}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className={spinner()} />
      ) : (
        <Text className={text()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
