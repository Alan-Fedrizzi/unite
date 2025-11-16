import { QRCode } from "@/components/Qrcode";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { credentialStyles } from "./styles";
import { BadgeStore } from "@/store/badge-store";
import { MotiView } from "moti";

const {
  base,
  imageStyles,
  container,
  imageBackground,
  textContainer,
  text,
  shadow,
  avatar,
  buttonAvatar,
  name,
  email,
  ampliarButton,
  ampliar,
} = credentialStyles();

type Props = {
  data: BadgeStore;
  image?: string;
  onChangeAvatar?: () => void;
  onExpandQRCode?: () => void;
};

export function Credential({ data, onChangeAvatar, onExpandQRCode }: Props) {
  const { height } = useWindowDimensions();

  return (
    <MotiView
      className={base()}
      from={{
        opacity: 0,
        translateY: -height,
        rotateZ: "50deg",
        rotateY: "30deg",
        rotateX: "30deg",
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        rotateZ: "0deg",
        rotateY: "0deg",
        rotateX: "0deg",
      }}
      transition={{
        type: "spring",
        translateY: { damping: 20, stiffness: 100 },
        rotateZ: { damping: 15, mass: 3, stiffness: 100 },
      }}
    >
      <Image
        className={imageStyles()}
        source={require("@/assets/ticket/band.png")}
      />

      <View className={container()}>
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className={imageBackground()}
        >
          <View className={textContainer()}>
            <Text className={text()}>{data.eventTitle}</Text>
            <Text className={text()}>#{data.id}</Text>
          </View>

          {/* efeito de sombra */}
          <View className={shadow()} />
        </ImageBackground>

        {/* {image ? ( */}
        {data.image ? (
          <TouchableOpacity activeOpacity={0.7} onPress={onChangeAvatar}>
            <Image
              className={avatar()}
              source={{
                uri: data.image,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className={buttonAvatar()}
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className={name()}>{data.name}</Text>
        <Text className={email()}>{data.email}</Text>

        <QRCode value={data.checkInURL} size={120} />

        <TouchableOpacity
          className={ampliarButton()}
          activeOpacity={0.7}
          onPress={onExpandQRCode}
        >
          <Text className={ampliar()}>Ampliar QRCode</Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
