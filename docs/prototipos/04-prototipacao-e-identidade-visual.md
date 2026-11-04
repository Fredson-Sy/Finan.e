# 04 — Prototipação e Identidade Visual

**Projeto:** Plataforma de Educação Financeira
**Etapa:** 4 — Prototipação e identidade visual
**Versão:** 1.0
**Status:** Proposta inicial para validação

---

## 1. Objetivo desta etapa

Definir como a plataforma vai parecer e se comportar antes de programar: identidade, cores, tipografia, componentes, layout das páginas e protótipo navegável das telas principais.

O protótipo em HTML (`prototipo-telas.html`) acompanha este documento. Ele é só para validar o visual: a correção do questionário e o login são simulados e **não** representam a lógica real, que ficará no backend.

## 2. Conceito visual

**Público:** jovens estudantes. **Tom:** claro, direto e sem "cara de banco". Educação financeira costuma ser tratada com verde-dinheiro e gráficos de ações; aqui o ponto de partida é o contrário: a plataforma parece um caderno de estudo bem organizado, com uma cor forte e poucos elementos.

**Elemento de destaque:** a curva dos juros compostos. É o conceito que mais surpreende quem está começando, então a página inicial abre com um simulador simples (valor, taxa, meses) mostrando juros simples × compostos. O resto do site fica discreto para esse elemento ser o que se lembra.

**Nome provisório:** *Prumo* (referência de direção e equilíbrio). É só um nome de trabalho; pode ser trocado sem alterar nada do restante.

## 3. Paleta de cores

| Nome | Hex | Uso |
|---|---|---|
| Índigo | `#272B6A` | Cor principal: títulos, cabeçalho, botões primários |
| Âmbar | `#F2A93B` | Destaque e chamadas principais (texto sobre ele sempre em Índigo) |
| Papel | `#F6F5FB` | Fundo das páginas |
| Branco | `#FFFFFF` | Cartões e formulários |
| Tinta | `#1B1B2F` | Texto de leitura |
| Tinta suave | `#5A5878` | Texto secundário |
| Linha | `#DCDAEA` | Bordas e divisores |
| Acerto | `#1F8A66` | Resposta correta, sucesso |
| Erro | `#C73E4A` | Erros e alertas |

**Regras:** Âmbar nunca é cor de texto sobre fundo claro (contraste insuficiente). Verde e vermelho nunca aparecem sozinhos: sempre acompanham ícone ou texto ("Correta", "Incorreta"), por causa do daltonismo.

## 4. Tipografia

| Função | Fonte | Observação |
|---|---|---|
| Títulos | **Bricolage Grotesque** (600/700) | Personalidade sem perder legibilidade |
| Texto e interface | **Atkinson Hyperlegible** (400/700) | Criada para legibilidade; boa para conteúdo didático |

Ambas são gratuitas (Google Fonts). Fallback: `system-ui, sans-serif`.

| Nível | Tamanho | Uso |
|---|---|---|
| Título de página | 40 px (28 px no celular) | Uma por página |
| Título de seção | 26 px | |
| Subtítulo | 19 px | Nome de cartão, pergunta |
| Texto | 17 px, entrelinha 1,6 | Linhas de até ~70 caracteres |
| Apoio | 14 px | Datas, legendas |

## 5. Tokens de design (CSS)

Estes valores vão direto para `frontend/src/styles/tokens.css`:

```css
:root {
  --indigo: #272B6A;
  --ambar: #F2A93B;
  --papel: #F6F5FB;
  --branco: #FFFFFF;
  --tinta: #1B1B2F;
  --tinta-suave: #5A5878;
  --linha: #DCDAEA;
  --acerto: #1F8A66;
  --erro: #C73E4A;

  --fonte-titulo: "Bricolage Grotesque", system-ui, sans-serif;
  --fonte-texto: "Atkinson Hyperlegible", system-ui, sans-serif;

  --raio-p: 6px;   /* campos, etiquetas */
  --raio-m: 12px;  /* cartões */
  --espaco: 8px;   /* múltiplos de 8 */
}
```

## 6. Componentes

| Componente | Estilo |
|---|---|
| Botão primário | Fundo Âmbar, texto Índigo, negrito, raio 6 px |
| Botão secundário | Contorno Índigo 2 px, fundo transparente |
| Botão de risco | Contorno Erro (excluir, bloquear) — sempre com confirmação |
| Cartão | Fundo branco, borda Linha 1 px, raio 12 px, **sem sombra** |
| Campo de formulário | Rótulo sempre visível acima; borda Linha; foco com contorno Índigo 3 px |
| Menu | Barra Índigo com texto branco; item da página atual sublinhado em Âmbar |
| Etiqueta de status | Texto + cor (Publicado, Rascunho, Ativo, Bloqueado) |
| Nota do questionário | Faixa com número grande e texto ("4 de 5 acertos") |
| Mensagem de erro | Abaixo do campo, diz o que houve e como corrigir |

**Textos da interface:** verbos claros nos botões ("Salvar conteúdo", "Enviar respostas", "Baixar PDF"); mesma palavra para a mesma ação em todo o site; erros sem pedido de desculpa e sem vagueza ("Esse e-mail já está cadastrado. Entre ou recupere a senha.").

## 7. Estrutura de layout

- **Largura máxima do conteúdo:** 1100 px, centralizado; texto de leitura em coluna de ~680 px.
- **Cabeçalho:** logotipo à esquerda, navegação à direita (Início, Conteúdos, Sobre, Entrar). No celular vira menu recolhível.
- **Alinhamento:** texto sempre à esquerda; nada justificado.
- **Áreas logadas:** mesmo cabeçalho + menu lateral no desktop (painel, desempenho, histórico, perfil), que vira barra inferior no celular.
- **Pontos de quebra:** 640 px (celular), 960 px (tablet), acima disso desktop.

## 8. Wireframes das páginas

### PG01 — Página inicial

```
┌──────────────────────────────────────────────┐
│ Prumo        Início Conteúdos Sobre  [Entrar]│
├──────────────────────────────────────────────┤
│ Entenda seu dinheiro   │  ┌────────────────┐ │
│ antes que ele         │  │ Simulador      │ │
│ entenda você.         │  │ valor [____]   │ │
│ [Explorar conteúdos]  │  │ taxa  [____]   │ │
│                        │  │ meses [====o]  │ │
│                        │  │  ╱ curva ╱     │ │
│                        │  └────────────────┘ │
├──────────────────────────────────────────────┤
│ Cinco módulos: [Poupança][Crédito][Juros]... │
├──────────────────────────────────────────────┤
│ Como funciona: leia · baixe o PDF · teste    │
├──────────────────────────────────────────────┤
│ Rodapé                                       │
└──────────────────────────────────────────────┘
```

### PG03 — Lista de conteúdos

```
┌──────────────────────────────────────────────┐
│ Conteúdos                                    │
│ ┌────────┐ ┌────────┐ ┌────────┐             │
│ │Poupança│ │Crédito │ │ Juros  │             │
│ │resumo  │ │resumo  │ │resumo  │             │
│ │PDF · 5 │ │PDF · 5 │ │PDF · 5 │             │
│ └────────┘ └────────┘ └────────┘             │
│ ┌────────┐ ┌────────┐                        │
│ │Inflação│ │Reserva │                        │
│ └────────┘ └────────┘                        │
└──────────────────────────────────────────────┘
```

### PG04 — Conteúdo individual (modelo único para os cinco módulos)

```
┌──────────────────────────────────────────────┐
│ ‹ Conteúdos                                  │
│ Juros                                        │
│ Introdução (coluna de leitura)  │ ┌────────┐ │
│ Tópico 1 ...                    │ │ PDF    │ │
│ Tópico 2 ...                    │ │[Baixar]│ │
│                                 │ └────────┘ │
├──────────────────────────────────────────────┤
│ Questionário                                 │
│ Pergunta 1 de 5                              │
│  ( ) A  ( ) B  ( ) C  ( ) D                  │
│ [Enviar respostas]                           │
│ → Resultado: 4 de 5 acertos                  │
│   Aviso a visitante: "Entre para salvar."    │
└──────────────────────────────────────────────┘
```

### PG08–PG10 — Painel do estudante

```
┌─────────┬────────────────────────────────────┐
│ Painel  │ Olá, Ana                           │
│ Desemp. │ [Respondidos 8] [Média 7,5] [3 mód]│
│ Histór. │ Resultados por módulo (barras)     │
│ Perfil  │ Últimas avaliações (tabela)        │
│ Sair    │ Módulo | Data | Nota               │
└─────────┴────────────────────────────────────┘
```

### PG16 — Criar/editar questionário (professor)

```
┌─────────┬────────────────────────────────────┐
│ Painel  │ Novo questionário                  │
│ Conteú. │ Conteúdo: [Juros ▾]  Título: [___] │
│ Quest.  │ ┌ Pergunta 1 ───────────────────┐  │
│ Sair    │ │ Enunciado [__________________]│  │
│         │ │ (•) A [____]  ( ) B [____]    │  │
│         │ │ ( ) C [____]  ( ) D [____]    │  │
│         │ └───────────────────────────────┘  │
│         │ [+ Adicionar pergunta]             │
│         │ [Salvar rascunho]  [Publicar]      │
└─────────┴────────────────────────────────────┘
```

### Demais páginas

| Página | Base de layout |
|---|---|
| PG02 Sobre | Coluna de leitura única com títulos de seção |
| PG06 / PG07 Cadastros | Formulário centralizado (mesmo modelo do login); o professor tem o campo extra "Chave de autorização" |
| PG11 Meu perfil | Formulário em cartão, ação "Alterar senha" separada |
| PG12 Painel do professor | Mesmo modelo do painel do estudante, com atalhos de criação |
| PG13 / PG15 Gerenciar | Tabela com etiqueta de status e ações por linha |
| PG14 Criar/editar conteúdo | Formulário em cartão (título, resumo, texto, PDF, status) |
| PG17–PG20 Administração | Mesmo modelo de tabela (PG13); busca no topo; bloquear/reativar com confirmação |

Reaproveitar três modelos (formulário, tabela, painel) reduz o trabalho de desenvolvimento: as 20 páginas saem de poucos componentes.

## 9. Acessibilidade e responsividade

- Contraste mínimo de 4,5:1 para texto (conferido para Índigo × Papel e Índigo × Âmbar).
- Foco do teclado sempre visível; todo o questionário utilizável só com teclado.
- Todo campo com `<label>`; erros ligados ao campo (`aria-describedby`).
- Nada de informação só por cor.
- Respeitar `prefers-reduced-motion`.
- Alvos de toque de pelo menos 44 px no celular.
- Sem sombras pesadas e sem animações decorativas: o site precisa ser leve em hospedagem gratuita.

## 10. Protótipo navegável

O arquivo `prototipo-telas.html` abre direto no navegador (precisa de internet só para carregar as fontes). Ele cobre as telas de maior peso: **PG01** inicial, **PG03** conteúdos, **PG04** conteúdo com questionário, **PG05** login, **PG08–PG10** painel do estudante e **PG16** editor de questionário. Use a faixa escura no topo para trocar de tela.

Itens simulados no protótipo: correção do questionário (no sistema real será no backend, sem enviar a resposta certa ao navegador), login e dados do estudante.

Onde guardar: este documento em `docs/` junto aos anteriores e o protótipo em `docs/prototipos/`.

## 11. Decisões desta etapa

- Nome provisório *Prumo*; Índigo + Âmbar sobre fundo Papel.
- Bricolage Grotesque nos títulos e Atkinson Hyperlegible no texto.
- Interface sem sombras, com cartões de borda fina.
- Simulador de juros na página inicial como elemento de destaque.
- Três modelos de layout reaproveitados em todas as áreas (formulário, tabela, painel).
- Acessibilidade tratada como requisito desde o protótipo.

## 12. Pontos a validar

- Aprovação (ou troca) do nome e da paleta.
- Se o simulador de juros entra na primeira versão ou fica como melhoria.
- Logotipo definitivo (hoje só um nome em texto).
- Textos reais dos cinco módulos e dos PDFs.

## 13. Próxima etapa

**Etapa 5 — Arquitetura do sistema:** escolha de tecnologias (frontend, backend, banco, autenticação, armazenamento de PDFs), já conferindo os limites atuais dos planos gratuitos.

---

**Histórico de versão**

| Versão | Data | Descrição |
|---|---|---|
| 1.0 | 30/10/2026 | Primeira versão da identidade visual e do protótipo. |
