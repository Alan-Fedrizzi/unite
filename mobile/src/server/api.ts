import axios from "axios";

export const api = axios.create({
  // IP da máquina
  // server roda na porta 3333 (server/src/server.ts linha 51)
  baseURL: "http://192.168.1.42:3333",
});

// api.get('http://192.168.1.42:3333/user/4')
// com a baseUrl vira
// api.get('/user/4')
