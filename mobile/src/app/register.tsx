import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";
import { colors } from "@/styles/colors";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, StatusBar, View } from "react-native";
import { homeStyles } from "./styles";

const { base, image, inputContainer, link } = homeStyles();

// para ver o event id
// cd server
// npx prisma studio
// vai abrir uma aba no navegador
// 9e9bd979-9d10-4915-b339-3786b1634f33
const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

// para expo route entender que é a rota inicial, exportar como default (nome do arquivo já é index, que ele procura)
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Inscrição", "Preencha todos os campos.");
      }

      setIsLoading(true);

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      // server\src\routes\register-for-event.ts
      // retorna o attendeeId
      if (registerResponse.data.attendeeId) {
        const badgeResponse = await api.get(
          `/attendees/${registerResponse.data.attendeeId}/badge`
        );

        badgeStore.save(badgeResponse.data.badge);

        Alert.alert("Inscrição", "Inscrição realizada com sucesso.", [
          {
            text: "OK",
            onPress: () => router.push("/ticket"),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      // essa exceção vem da requisição? vem do axios?
      if (axios.isAxiosError(error)) {
        // server\src\routes\register-for-event.ts
        // linha 41
        if (
          String(error.response?.data?.message).includes("already registered")
        ) {
          return Alert.alert("Inscrição", "Este e-mail já cadastrado.");
        }
      }

      Alert.alert("Inscrição", "Não foi possível fazer a inscrição.");
    }
  }

  return (
    <View className={base()}>
      <StatusBar barStyle="light-content" />

      <Image
        source={require("@/assets/logo.png")}
        className={image()}
        resizeMode="contain"
      />

      <View className={inputContainer()}>
        <Input>
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button
          title="Realizar inscrição"
          // onPress={() => handleRegister()}
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <Link href="/" className={link()}>
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
