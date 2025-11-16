import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";
import { colors } from "@/styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Alert, Image, StatusBar, View } from "react-native";
import { homeStyles } from "./styles";

const { base, image, inputContainer, link } = homeStyles();

// para expo route entender que é a rota inicial, exportar como default (nome do arquivo já é index, que ele procura)
export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const badgeStore = useBadgeStore();

  console.log("dados:", badgeStore.data);

  async function handleAccessCredentials() {
    try {
      if (!code.trim()) {
        return Alert.alert("Ingresso", "Informe o código do ingresso.");
      }

      setIsLoading(true);

      const { data } = await api.get(`/attendees/${code}/badge`);
      // dentro de data:
      //   badge: z.object({
      //   name: z.string(),
      //   email: z.string().email(),
      //   eventTitle: z.string(),
      //   checkInURL: z.string().url(),
      // console.log(data.badge);
      // armazenar essas infos. vamos usar async storage, salvar no dispositivo
      // vamos usar https://zustand-demo.pmnd.rs/ para armazenar estado global da aplicação
      badgeStore.save(data.badge);
    } catch (error) {
      console.log(error);
      // se deu certo, o usuário vai ser redirecionado, por isso não precisa ser no finally o loagind false
      setIsLoading(false);
      Alert.alert("Ingresso", "Ingresso não encontrado.");
    }
  }

  // se já tem data, ou se muda o data, redireciona
  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />;
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
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Código do ingresso"
            // onChangeText={(value) => setCode(value)}
            onChangeText={setCode}
          />
        </Input>

        <Button
          title="Acessar credencial"
          // onPress={() => handleAccessCredentials()}
          onPress={handleAccessCredentials}
          isLoading={isLoading}
        />
        {/* <Button title="Cadastrar" isLoading /> */}

        <Link href="/register" className={link()}>
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}

// cd server
// npm run dev
// npx prisma studio

// cd mobile
// npm start
