# Frontend — Plataforma de Educação Financeira

Estrutura em HTML, CSS e JavaScript puro (ES Modules).

## Como rodar
Os componentes são carregados via `fetch`, então é preciso um servidor local na raiz da pasta:

```bash
npx serve .
# ou
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Estrutura
- `public/assets/` — imagens, ícones e fontes
- `src/components/` — header, footer, sidebar, cards
- `src/pages/` — home, conteudos, estudante, professor, administrador
- `src/data/` — dados estáticos (usuários, conteúdos, questionários)
- `src/services/` — acesso ao localStorage
- `src/js/` — main, navegação, autenticação e interações
- `src/styles/` — variáveis, estilos globais, componentes e responsivo
