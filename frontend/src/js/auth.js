import { usuarios } from "../data/usuarios.js";
import { storage } from "../services/storage.js";

export function login(email, senha) {
  const user = usuarios.find(u => u.email === email && u.senha === senha);
  if (user) storage.set("usuarioLogado", user);
  return user || null;
}
export function logout() { storage.remove("usuarioLogado"); }
export function usuarioAtual() { return storage.get("usuarioLogado"); }
