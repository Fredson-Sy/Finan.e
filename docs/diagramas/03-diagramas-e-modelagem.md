# 03 --- Diagramas e Modelagem do Sistema

**Projeto:** Plataforma de Educação Financeira\
**Etapa:** 3 --- Diagramas e modelagem\
**Versão:** 1.0\
**Status:** Modelo inicial consolidado para orientar a arquitetura e o
desenvolvimento

------------------------------------------------------------------------

## 1. Objetivo desta etapa

Representar visualmente o funcionamento da plataforma e organizar sua
estrutura antes da implementação.

Esta etapa contém quatro entregáveis:

1.  Diagrama de casos de uso.
2.  Fluxogramas de navegação e processos.
3.  Diagrama entidade-relacionamento (DER) do banco de dados.
4.  Diagrama de arquitetura e estrutura do sistema.

Os diagramas foram elaborados com Mermaid, que permite manter os
desenhos como texto dentro do VS Code e renderizá-los em ferramentas
compatíveis, como a extensão Mermaid ou o preview de Markdown.

> **Importante:** esta é uma modelagem inicial. A escolha definitiva do
> banco, hospedagem e tecnologias será feita na etapa de arquitetura do
> sistema. Os diagramas poderão ser atualizados caso alguma decisão
> técnica altere o funcionamento.

------------------------------------------------------------------------

# 2. Diagrama de casos de uso

## 2.1 Objetivo

O diagrama de casos de uso mostra quem utiliza a plataforma e quais
ações cada perfil pode executar.

### Atores

-   **Visitante:** acessa a área pública sem criar conta.
-   **Estudante:** possui conta e pode acompanhar seu próprio
    desempenho.
-   **Professor:** possui conta autorizada e administra conteúdos e
    questionários.
-   **Administrador:** gerencia usuários, professores e configurações
    administrativas.
-   **Serviço de e-mail (futuro/opcional):** poderá auxiliar na
    recuperação de senha, caso seja integrado.

### Diagrama

``` mermaid
flowchart LR
    V[Visitante]
    E[Estudante]
    P[Professor]
    A[Administrador]
    EMAIL[Serviço de e-mail]

    subgraph PUBLICO["Área pública"]
        UC1([Visualizar página inicial])
        UC2([Conhecer o projeto])
        UC3([Consultar conteúdos])
        UC4([Visualizar e baixar PDFs])
        UC5([Responder questionários])
        UC6([Visualizar resultado imediato])
        UC7([Cadastrar-se como estudante])
        UC8([Cadastrar-se como professor com chave])
        UC9([Realizar login])
        UC10([Solicitar recuperação de senha])
    end

    subgraph ESTUDANTE["Área do estudante"]
        UC11([Acessar painel])
        UC12([Consultar desempenho])
        UC13([Consultar histórico])
        UC14([Editar dados do perfil])
        UC15([Salvar resultado de questionário])
    end

    subgraph PROFESSOR["Área do professor"]
        UC16([Acessar painel do professor])
        UC17([Criar e editar conteúdos])
        UC18([Adicionar e atualizar PDFs])
        UC19([Criar e editar questionários])
        UC20([Publicar ou desativar conteúdos e questionários])
    end

    subgraph ADMIN["Área administrativa"]
        UC21([Acessar painel administrativo])
        UC22([Consultar e gerenciar usuários])
        UC23([Bloquear ou reativar contas])
        UC24([Gerenciar professores])
        UC25([Alterar chave de autorização])
    end

    V --> UC1
    V --> UC2
    V --> UC3
    V --> UC4
    V --> UC5
    V --> UC6
    V --> UC7
    V --> UC8
    V --> UC9
    V --> UC10

    E --> UC1
    E --> UC3
    E --> UC4
    E --> UC5
    E --> UC6
    E --> UC9
    E --> UC11
    E --> UC12
    E --> UC13
    E --> UC14
    E --> UC15

    P --> UC1
    P --> UC3
    P --> UC4
    P --> UC5
    P --> UC6
    P --> UC9
    P --> UC16
    P --> UC17
    P --> UC18
    P --> UC19
    P --> UC20

    A --> UC1
    A --> UC3
    A --> UC4
    A --> UC9
    A --> UC21
    A --> UC22
    A --> UC23
    A --> UC24
    A --> UC25

    UC10 -.-> EMAIL
```

### Regras associadas aos casos de uso

1.  Visitantes podem consultar conteúdos, baixar PDFs e responder
    questionários.
2.  Visitantes veem a pontuação ao terminar, mas o resultado não é
    armazenado.
3.  Somente estudantes autenticados têm resultados salvos no histórico
    de estudante.
4.  Professores precisam informar a chave de autorização durante o
    cadastro. Depois, entram normalmente com e-mail e senha.
5.  A chave é uma credencial de cadastro, não uma senha de login. Ela
    não precisa ser informada novamente nos próximos acessos.
6.  Professores podem administrar conteúdos e questionários.
7.  Administradores podem gerenciar contas e alterar a chave de
    autorização.
8.  O administrador inicial será criado de forma controlada, sem
    cadastro público.
9.  O backend deverá verificar o perfil e a autorização em cada operação
    restrita. Esconder um botão no frontend não é suficiente para
    proteger uma funcionalidade.

------------------------------------------------------------------------

# 3. Fluxogramas de navegação e processos

## 3.1 Navegação geral

Este fluxo apresenta os caminhos principais entre a área pública e as
áreas autenticadas.

``` mermaid
flowchart TD
    INICIO([Acessar plataforma])
    HOME[Página inicial]
    CONTEUDOS[Lista de conteúdos]
    CONTEUDO[Página do conteúdo]
    QUIZ[Questionário]
    RESULTADO[Resultado imediato]
    LOGIN[Login]
    CADASTRO[Cadastro]
    PAINEL{Qual é o perfil?}
    ESTUDANTE[Painel do estudante]
    PROFESSOR[Painel do professor]
    ADMIN[Painel administrativo]

    INICIO --> HOME
    HOME --> CONTEUDOS
    HOME --> LOGIN
    HOME --> CADASTRO
    CONTEUDOS --> CONTEUDO
    CONTEUDO --> QUIZ
    QUIZ --> RESULTADO
    RESULTADO -->|Visitante| CONTEUDO
    RESULTADO -->|Estudante autenticado| ESTUDANTE
    LOGIN --> PAINEL
    CADASTRO --> LOGIN
    PAINEL -->|Estudante| ESTUDANTE
    PAINEL -->|Professor| PROFESSOR
    PAINEL -->|Administrador| ADMIN
    ESTUDANTE --> CONTEUDOS
    PROFESSOR --> CONTEUDOS
    ADMIN --> CONTEUDOS
```

## 3.2 Processo de cadastro e login

``` mermaid
flowchart TD
    A([Início]) --> B{Já possui conta?}
    B -->|Sim| C[Informar e-mail e senha]
    B -->|Não| D{Tipo de cadastro}
    D -->|Estudante| E[Preencher dados de estudante]
    D -->|Professor| F[Preencher dados e chave de autorização]
    E --> G[Validar dados]
    F --> H[Validar dados e chave]
    G --> I{Dados válidos?}
    H --> J{Chave válida e dados corretos?}
    I -->|Não| K[Exibir mensagem de erro]
    J -->|Não| K
    I -->|Sim| L[Criar conta de estudante]
    J -->|Sim| M[Criar conta de professor]
    L --> C
    M --> C
    K --> D
    C --> N[Validar credenciais]
    N --> O{Credenciais corretas e conta ativa?}
    O -->|Não| P[Informar erro de autenticação]
    O -->|Sim| Q{Identificar perfil}
    Q -->|Estudante| R[Painel do estudante]
    Q -->|Professor| S[Painel do professor]
    Q -->|Administrador| T[Painel administrativo]
    P --> C
```

**Observações:**

-   O cadastro de administrador não será público.
-   A senha deve ser armazenada como hash seguro, nunca em texto puro.
-   A chave de professor deve ser validada no backend.
-   A chave não deve ser enviada ou armazenada em texto aberto no banco.
-   Recomenda-se limitar tentativas de login e de validação da chave.
-   A conta de professor poderá ser criada automaticamente quando a
    chave for válida, conforme a regra definida para o projeto.

## 3.3 Processo de resposta a questionário

``` mermaid
flowchart TD
    A([Abrir conteúdo]) --> B[Selecionar questionário]
    B --> C[Carregar perguntas e alternativas]
    C --> D[Responder perguntas]
    D --> E[Enviar respostas]
    E --> F[Corrigir respostas no backend]
    F --> G[Calcular pontuação]
    G --> H[Exibir resultado]
    H --> I{Usuário é estudante autenticado?}
    I -->|Não| J[Não salvar resultado]
    I -->|Sim| K[Salvar resumo da tentativa]
    K --> L[Disponibilizar no histórico]
    J --> M([Fim])
    L --> M
```

**Regra de armazenamento:** para economizar espaço, a primeira versão
salvará o resumo da tentativa do estudante --- questionário, pontuação,
quantidade de acertos e data. As respostas individuais não serão
armazenadas nesta versão, a menos que uma funcionalidade futura de
revisão detalhada justifique esse armazenamento.

A correção deve ocorrer no backend. O frontend não deve decidir sozinho
quais alternativas estão corretas.

## 3.4 Processo de criação de conteúdo pelo professor

``` mermaid
flowchart TD
    A([Professor faz login]) --> B[Painel do professor]
    B --> C[Gerenciar conteúdos]
    C --> D{Criar ou editar?}
    D -->|Criar| E[Preencher título, resumo e texto]
    D -->|Editar| F[Selecionar conteúdo existente]
    F --> G[Atualizar informações]
    E --> H[Adicionar referência do PDF]
    G --> H
    H --> I[Validar informações e arquivo]
    I --> J{Dados válidos?}
    J -->|Não| K[Exibir erros]
    K --> E
    J -->|Sim| L[Salvar conteúdo]
    L --> M{Publicar agora?}
    M -->|Sim| N[Disponibilizar na área pública]
    M -->|Não| O[Manter como rascunho]
    N --> P([Fim])
    O --> P
```

## 3.5 Processo de criação de questionário

``` mermaid
flowchart TD
    A([Professor acessa painel]) --> B[Gerenciar questionários]
    B --> C[Criar questionário]
    C --> D[Selecionar conteúdo associado]
    D --> E[Definir título e instruções]
    E --> F[Cadastrar perguntas]
    F --> G[Cadastrar alternativas]
    G --> H[Definir alternativa correta]
    H --> I{Adicionar outra pergunta?}
    I -->|Sim| F
    I -->|Não| J[Validar questionário]
    J --> K{Está válido?}
    K -->|Não| L[Corrigir informações]
    L --> F
    K -->|Sim| M[Salvar questionário]
    M --> N{Publicar?}
    N -->|Sim| O[Disponibilizar para os usuários]
    N -->|Não| P[Manter como rascunho]
    O --> Q([Fim])
    P --> Q
```

------------------------------------------------------------------------

# 4. Diagrama entidade-relacionamento do banco de dados

## 4.1 Objetivo

O DER representa como as informações serão organizadas no banco de dados
e como as tabelas se relacionam.

A proposta utiliza um modelo relacional. A estrutura é pequena e evita
armazenar informações que não sejam necessárias ao funcionamento da
plataforma.

## 4.2 Entidades principais

### USUARIOS

Armazena os dados essenciais das contas.

  Campo        Tipo conceitual    Regra
  ------------ ------------------ ---------------------------------------
  id           Inteiro ou UUID    Chave primária
  nome         Texto              Obrigatório
  email        Texto              Obrigatório e único
  senha_hash   Texto              Obrigatório
  perfil       Texto/enumeração   estudante, professor ou administrador
  status       Texto/enumeração   ativo ou bloqueado
  criado_em    Data/hora          Data de criação

Não armazenar senha em texto puro. O perfil de visitante não precisa de
registro na tabela.

### CONTEUDOS

Armazena os módulos educativos.

  Campo           Tipo conceitual    Regra
  --------------- ------------------ ---------------------------------
  id              Inteiro ou UUID    Chave primária
  titulo          Texto              Obrigatório
  resumo          Texto              Opcional
  corpo           Texto longo        Conteúdo educativo
  pdf_url         Texto              Referência ao arquivo externo
  status          Texto/enumeração   rascunho ou publicado
  criado_por      Inteiro ou UUID    Chave estrangeira para usuários
  criado_em       Data/hora          Data de criação
  atualizado_em   Data/hora          Última atualização

Os PDFs não serão armazenados como binários nessa tabela. O banco guarda
apenas a referência/localização do arquivo.

### QUESTIONARIOS

Armazena os questionários associados aos conteúdos.

  Campo         Tipo conceitual    Regra
  ------------- ------------------ ----------------------------------
  id            Inteiro ou UUID    Chave primária
  conteudo_id   Inteiro ou UUID    Chave estrangeira para conteúdos
  titulo        Texto              Obrigatório
  instrucoes    Texto              Opcional
  status        Texto/enumeração   rascunho ou publicado
  criado_por    Inteiro ou UUID    Chave estrangeira para usuários
  criado_em     Data/hora          Data de criação

### PERGUNTAS

Armazena as perguntas de cada questionário.

  Campo             Tipo conceitual   Regra
  ----------------- ----------------- -----------------------
  id                Inteiro ou UUID   Chave primária
  questionario_id   Inteiro ou UUID   Chave estrangeira
  enunciado         Texto             Obrigatório
  ordem             Inteiro           Ordem de exibição
  pontos            Número            Pontuação da pergunta

### ALTERNATIVAS

Armazena as opções de resposta.

  Campo         Tipo conceitual   Regra
  ------------- ----------------- ------------------------------
  id            Inteiro ou UUID   Chave primária
  pergunta_id   Inteiro ou UUID   Chave estrangeira
  texto         Texto             Obrigatório
  correta       Booleano          Indica a alternativa correta

A indicação da alternativa correta deve ser consultada somente pelo
backend durante a correção. O frontend não deve receber a resposta
correta antes do envio.

### TENTATIVAS

Armazena o resumo das avaliações feitas por estudantes autenticados.

  -----------------------------------------------------------------------
  Campo                   Tipo conceitual         Regra
  ----------------------- ----------------------- -----------------------
  id                      Inteiro ou UUID         Chave primária

  estudante_id            Inteiro ou UUID         Chave estrangeira para
                                                  usuários

  questionario_id         Inteiro ou UUID         Chave estrangeira para
                                                  questionários

  acertos                 Inteiro                 Quantidade de respostas
                                                  corretas

  total_perguntas         Inteiro                 Quantidade de perguntas
                                                  corrigidas

  pontuacao               Número                  Pontuação final

  concluido_em            Data/hora               Data e hora da
                                                  conclusão
  -----------------------------------------------------------------------

Não será criada tentativa para visitante. A tabela guarda somente o
resumo necessário ao histórico e ao desempenho.

### CHAVES_PROFESSOR

Armazena a configuração da chave de autorização para cadastro de
professores.

  Campo            Tipo conceitual   Regra
  ---------------- ----------------- ---------------------------------------
  id               Inteiro ou UUID   Chave primária
  chave_hash       Texto             Hash da chave, nunca o valor original
  ativa            Booleano          Indica se a chave está ativa
  atualizada_por   Inteiro ou UUID   Administrador responsável
  atualizada_em    Data/hora         Última alteração

A chave será solicitada somente no cadastro. Após a criação da conta, o
professor utilizará e-mail e senha. A chave poderá ser compartilhada com
os professores autorizados e permanecer válida até ser alterada pelo
administrador. Ela não será consumida no primeiro cadastro.

**Proteção adicional:** como a chave pode ser compartilhada, ela deve
ser suficientemente forte, ter limite de tentativas e poder ser
rotacionada. Para um projeto real, convites individuais ou códigos de
uso único seriam mais seguros, mas não são obrigatórios para a primeira
versão acadêmica.

## 4.3 Diagrama ER

``` mermaid
erDiagram
    USUARIOS ||--o{ CONTEUDOS : cria
    USUARIOS ||--o{ QUESTIONARIOS : cria
    CONTEUDOS ||--o{ QUESTIONARIOS : possui
    QUESTIONARIOS ||--|{ PERGUNTAS : contem
    PERGUNTAS ||--|{ ALTERNATIVAS : possui
    USUARIOS ||--o{ TENTATIVAS : realiza
    QUESTIONARIOS ||--o{ TENTATIVAS : recebe
    USUARIOS ||--o{ CHAVES_PROFESSOR : atualiza

    USUARIOS {
        id id PK
        nome texto
        email texto UK
        senha_hash texto
        perfil texto
        status texto
        criado_em datetime
    }

    CONTEUDOS {
        id id PK
        titulo texto
        resumo texto
        corpo texto
        pdf_url texto
        status texto
        criado_por id FK
        criado_em datetime
        atualizado_em datetime
    }

    QUESTIONARIOS {
        id id PK
        conteudo_id id FK
        titulo texto
        instrucoes texto
        status texto
        criado_por id FK
        criado_em datetime
    }

    PERGUNTAS {
        id id PK
        questionario_id id FK
        enunciado texto
        ordem inteiro
        pontos decimal
    }

    ALTERNATIVAS {
        id id PK
        pergunta_id id FK
        texto texto
        correta boolean
    }

    TENTATIVAS {
        id id PK
        estudante_id id FK
        questionario_id id FK
        acertos inteiro
        total_perguntas inteiro
        pontuacao decimal
        concluido_em datetime
    }

    CHAVES_PROFESSOR {
        id id PK
        chave_hash texto
        ativa boolean
        atualizada_por id FK
        atualizada_em datetime
    }
```

## 4.4 Relacionamentos

-   Um usuário professor pode criar vários conteúdos.
-   Um conteúdo pode possuir vários questionários.
-   Um questionário possui várias perguntas.
-   Uma pergunta possui várias alternativas.
-   Um estudante pode realizar várias tentativas.
-   Um questionário pode receber várias tentativas.
-   Um administrador pode atualizar a configuração da chave de
    professor.

## 4.5 Regras de integridade e economia

1.  O e-mail de usuário deve ser único.
2.  Cada pergunta deve pertencer a um questionário.
3.  Cada alternativa deve pertencer a uma pergunta.
4.  Cada questionário deve estar associado a um conteúdo.
5.  Cada tentativa deve pertencer a um estudante autenticado.
6.  O backend deve validar que o usuário que está criando conteúdo ou
    questionário possui perfil autorizado.
7.  Exclusões devem respeitar os relacionamentos. Não apagar em cascata
    históricos importantes sem uma regra explícita.
8.  Índices devem ser criados principalmente para e-mail, chaves
    estrangeiras e campos usados em buscas frequentes.
9.  PDFs e imagens ficam fora do banco de dados.
10. Não armazenar tentativas de visitantes.
11. Não armazenar respostas individuais na primeira versão, apenas o
    resumo da tentativa.

**Decisão de escopo:** a primeira versão não terá relatórios de
desempenho por turma nem revisão detalhada de cada resposta. Caso essas
funções sejam adicionadas, a modelagem poderá ganhar tabelas
específicas.

------------------------------------------------------------------------

# 5. Diagrama de arquitetura e estrutura do sistema

## 5.1 Objetivo

Representar como as partes do sistema se comunicam: navegador, frontend,
backend, banco de dados e armazenamento de arquivos.

A arquitetura será separada em frontend e backend. Isso permite que a
interface seja desenvolvida independentemente das regras de negócio e
dos dados.

## 5.2 Diagrama de arquitetura lógica

``` mermaid
flowchart TD
    USER[Usuário]
    BROWSER[Navegador]

    subgraph FRONT["Frontend — Interface"]
        PAGES[Páginas e componentes]
        AUTH_UI[Telas de autenticação]
        STUDENT_UI[Área do estudante]
        TEACHER_UI[Área do professor]
        ADMIN_UI[Área administrativa]
    end

    subgraph BACK["Backend — API e regras de negócio"]
        API[Rotas da API]
        AUTH[Autenticação e autorização]
        CONTENT[Serviço de conteúdos]
        QUIZ[Serviço de questionários e correção]
        HISTORY[Serviço de histórico]
        ADMIN_SERVICE[Serviço administrativo]
    end

    DB[(Banco de dados relacional)]
    FILES[(Armazenamento de PDFs)]
    EMAIL[Serviço de e-mail opcional]

    USER --> BROWSER
    BROWSER --> PAGES
    PAGES --> AUTH_UI
    PAGES --> STUDENT_UI
    PAGES --> TEACHER_UI
    PAGES --> ADMIN_UI

    PAGES -->|Requisições HTTP/HTTPS| API
    AUTH_UI --> API
    STUDENT_UI --> API
    TEACHER_UI --> API
    ADMIN_UI --> API

    API --> AUTH
    API --> CONTENT
    API --> QUIZ
    API --> HISTORY
    API --> ADMIN_SERVICE

    AUTH --> DB
    CONTENT --> DB
    QUIZ --> DB
    HISTORY --> DB
    ADMIN_SERVICE --> DB
    CONTENT --> FILES
    AUTH -.-> EMAIL
```

## 5.3 Responsabilidades de cada parte

### Frontend

Responsável por: - Exibir as páginas e componentes. - Apresentar
conteúdos e PDFs. - Receber dados de formulários. - Exibir questionários
e resultados. - Apresentar painéis conforme o perfil. - Enviar
requisições ao backend.

O frontend não deve guardar senhas, chaves secretas ou regras de
autorização como fonte confiável.

### Backend

Responsável por: - Validar dados recebidos. - Realizar cadastro e
login. - Gerenciar sessões ou tokens de autenticação. - Verificar
permissões dos perfis. - Criar e editar conteúdos e questionários. -
Corrigir respostas dos questionários. - Salvar resultados de
estudantes. - Consultar e gerenciar usuários. - Proteger operações
administrativas.

### Banco de dados

Responsável por armazenar: - Contas e perfis. - Conteúdos e referências
dos PDFs. - Questionários, perguntas e alternativas. - Resultados dos
estudantes. - Configuração protegida da chave de autorização.

### Armazenamento de arquivos

Responsável por guardar PDFs e, se necessário, imagens. O banco armazena
apenas o caminho ou endereço do arquivo.

### Serviço de e-mail (opcional)

Poderá ser utilizado para recuperação de senha e mensagens automáticas,
caso a solução escolhida ofereça um plano gratuito adequado.

------------------------------------------------------------------------

# 6. Estrutura inicial de pastas

A estrutura abaixo é uma proposta para organizar o código. Os nomes
exatos dependerão das tecnologias escolhidas na Etapa 5.

``` text
projeto-educacao-financeira/
│
├── docs/
│   ├── 01-levantamento-de-requisitos.md
│   ├── 02-mapeamento-das-paginas-e-funcionalidades.md
│   └── 03-diagramas-e-modelagem.md
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       │   ├── public/
│       │   ├── student/
│       │   ├── teacher/
│       │   └── admin/
│       ├── layouts/
│       ├── services/
│       ├── hooks/
│       ├── routes/
│       └── styles/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── routes/
│       ├── services/
│       ├── repositories/
│       ├── validators/
│       └── database/
│           ├── migrations/
│           └── seeds/
│
├── .gitignore
└── README.md
```

**Observação:** essa estrutura é apenas uma referência de organização.
Não significa que precisamos criar todas essas pastas agora. A
arquitetura definitiva será aprovada na Etapa 5.

------------------------------------------------------------------------

# 7. Decisões técnicas preliminares

  Assunto                 Diretriz inicial
  ----------------------- ------------------------------------------------------
  Tipo de banco           Relacional
  Dados de autenticação   Conta, perfil, status e hash da senha
  PDFs                    Armazenamento externo ao banco
  Resultados              Salvar somente tentativas de estudantes autenticados
  Visitantes              Não criar registros de usuário ou tentativa
  Questionários           Associados a conteúdos
  Correção                Realizada no backend
  Permissões              Validadas no backend em cada operação protegida
  Administrador           Conta criada de forma controlada
  Professor               Cadastro com chave de autorização
  Hospedagem              Priorizar planos gratuitos, após verificar limites

Não foi escolhido ainda um fornecedor específico de banco de dados,
hospedagem ou armazenamento. Essa escolha ficará para as etapas de
arquitetura e infraestrutura.

------------------------------------------------------------------------

# 8. Checklist de conclusão da Etapa 3

-   [x] Diagrama de casos de uso.
-   [x] Fluxograma de navegação geral.
-   [x] Fluxograma de cadastro e login.
-   [x] Fluxograma de resposta a questionário.
-   [x] Fluxograma de criação de conteúdo.
-   [x] Fluxograma de criação de questionário.
-   [x] Identificação das entidades do banco.
-   [x] Diagrama entidade-relacionamento.
-   [x] Definição dos principais relacionamentos.
-   [x] Diagrama de arquitetura lógica.
-   [x] Proposta inicial de estrutura de pastas.
-   [x] Diretrizes para reduzir armazenamento.

------------------------------------------------------------------------

# 9. Pontos que serão aprofundados nas próximas etapas

1.  Escolher as tecnologias de frontend e backend.
2.  Escolher o banco de dados gratuito e conferir seus limites atuais.
3.  Definir hospedagem e armazenamento de PDFs.
4.  Definir o mecanismo de autenticação.
5.  Detalhar a implementação da chave de autorização.
6.  Definir os limites de upload de arquivos.
7.  Criar o protótipo visual das páginas.

------------------------------------------------------------------------

# 10. Próxima etapa

A próxima etapa é a **Etapa 4 --- Prototipação e identidade visual**.

Nela vamos definir: - Identidade visual da plataforma. - Paleta de
cores. - Tipografia. - Estilo de botões, cartões, menus e formulários. -
Layout das páginas. - Protótipos das principais telas.

Depois disso, avançaremos para a arquitetura técnica e escolha das
tecnologias.

------------------------------------------------------------------------

**Histórico de versão**

  -----------------------------------------------------------------------
  Versão                  Data                    Descrição
  ----------------------- ----------------------- -----------------------
  1.0                     30/10/2026              Primeira versão dos
                                                  diagramas e da
                                                  modelagem do sistema.

  -----------------------------------------------------------------------
