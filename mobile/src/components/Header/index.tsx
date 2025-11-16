import { Text, View } from "react-native";
import { headerStyles } from "./styles";

const { base, titleStyles } = headerStyles();

type Props = {
  title: string;
  className?: string;
};

export function Header({ title, className }: Props) {
  return (
    <View className={base({ class: className })}>
      <Text className={titleStyles()}>{title}</Text>
    </View>
  );
}
