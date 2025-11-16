import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { inputStyles } from "./styles";

const { base, field } = inputStyles();

function Input({ children }: { children: ReactNode }) {
  return <View className={base()}>{children}</View>;
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className={field()}
      placeholderTextColor={colors.gray[200]}
      {...rest}
    ></TextInput>
  );
}

// insere o Filed dentro do Input
Input.Field = Field;

export { Input };
