import axios from "axios";

export const api = axios.create({
  // IP da máquina
  // server roda na porta 3333 (server/src/server.ts linha 51)
  // TODO: rodando local, inserir IP da máquina
  baseURL: "http://******:3333",
});

// api.get('http://192.168.1.42:3333/user/4')
// com a baseUrl vira
// api.get('/user/4')
