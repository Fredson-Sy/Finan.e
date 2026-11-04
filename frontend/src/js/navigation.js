export async function carregarComponente(seletor, caminho) {
  const alvo = document.querySelector(seletor);
  if (!alvo) return;
  const res = await fetch(caminho);
  alvo.innerHTML = await res.text();
}
export function irPara(url) { window.location.href = url; }
