import { carregarComponente } from "./navigation.js";
import { iniciarInteracoes } from "./interactions.js";

document.addEventListener("DOMContentLoaded", async () => {
  await carregarComponente("#header", "/src/components/header/header.html");
  await carregarComponente("#footer", "/src/components/footer/footer.html");
  iniciarInteracoes();
});
