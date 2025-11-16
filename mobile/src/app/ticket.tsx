import { Button } from "@/components/Button";
import { Credential } from "@/components/Credential";
import { Header } from "@/components/Header";
import { QRCode } from "@/components/Qrcode";
import { useBadgeStore } from "@/store/badge-store";
import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ticketStyles } from "./ticket.styles";
import { Redirect } from "expo-router";
import { MotiView } from "moti";

const {
  base,
  scrollContainer,
  scrollContent,
  header,
  arrow,
  text,
  message,
  remove,
  removeText,
  modal,
  modalClose,
} = ticketStyles();

export default function Ticket() {
  // const [image, setImage] = useState(""); // tipagem implícita
  const [expandedQRCode, setExpandedQRCode] = useState(false);
  const badgeStore = useBadgeStore();

  async function handleSelectImage() {
    // https://app.rocketseat.com.br/classroom/nlw-15-unite-react-native/group/nlw-15-unite-react-native/lesson/desenvolvimento-avancado-e-upload-de-imagens
    // -23:40 mostra como adicionar imagem no emulador
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // MediaTypeOptions is deprecated
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        // setImage(result.assets[0].uri);
        badgeStore.updateAvater(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Foto", "Não foi possível selecionar a imagem.");
    }
  }

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Compartilhar", "Não foi possível compartilhar.");
    }
  }

  // se não tem data, volta par ao início
  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />;
  }

  return (
    <View className={base()}>
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" className={header()} />

      <ScrollView
        className={scrollContainer()}
        contentContainerClassName={scrollContent()}
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={badgeStore.data}
          // image="https://github.com/Alan-Fedrizzi.png"
          // image={image}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setExpandedQRCode(true)}
        />

        <MotiView
          from={{
            translateY: 0
          }}
          animate={{
            translateY: 10
          }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 700
          }}
        >
          <FontAwesome
            className={arrow()}
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            />
        </MotiView>

        <Text className={text()}>Compartilhar credencial</Text>
        <Text className={message()}>
          Moste ao mundo que você vai participar do evento{" "}
          {badgeStore.data.eventTitle}
        </Text>

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity
          activeOpacity={0.7}
          className={remove()}
          onPress={() => badgeStore.remove()}
        >
          <Text className={removeText()}>Remover Ingresso</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={expandedQRCode}
        onRequestClose={() => setExpandedQRCode(false)}
        animationType="slide"
        statusBarTranslucent
      >
        <View className={modal()}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandedQRCode(false)}
          >
            <QRCode value="teste" size={300} />
            <Text className={modalClose()}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
