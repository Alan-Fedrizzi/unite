import axios from "axios";

export const api = axios.create({
  // TODO: rodando local, inserir IP da máquina
  baseURL: "http://******:3333",
});
