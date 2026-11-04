# 01 --- Levantamento de Requisitos

## Plataforma de Educação Financeira

**Documento:** 01-levantamento-de-requisitos.md\
**Versão:** 1.0\
**Status:** Concluído --- versão inicial\
**Tipo de sistema:** Plataforma web educacional\
**Área:** Educação financeira\
**Público-alvo:** Jovens estudantes de uma instituição de ensino

------------------------------------------------------------------------

## 1. Apresentação do projeto

O projeto consiste no desenvolvimento de uma plataforma web educacional
voltada ao ensino de conceitos fundamentais de educação financeira para
jovens estudantes.

A plataforma disponibilizará conteúdos explicativos, materiais
complementares em PDF e questionários interativos. Os estudantes poderão
consultar os materiais e testar seus conhecimentos, enquanto professores
poderão gerenciar os conteúdos e avaliações.

Este documento registra as definições iniciais do projeto e servirá como
referência para as próximas etapas de planejamento e desenvolvimento.

## 2. Objetivo geral

Desenvolver uma plataforma web que facilite o aprendizado de educação
financeira entre jovens, apresentando conceitos de maneira acessível e
didática, oferecendo materiais complementares e permitindo que os
estudantes avaliem e acompanhem seu próprio desempenho.

## 3. Problema identificado

Muitos jovens chegam à vida adulta sem conhecimentos básicos sobre
educação financeira, apresentando dificuldades para compreender
conceitos como juros, crédito, inflação e planejamento financeiro.

O projeto busca reduzir essa lacuna por meio de uma plataforma digital
educativa, com conteúdos acessíveis, materiais complementares e
questionários que auxiliem na fixação do conhecimento.

## 4. Público-alvo e perfis de usuários

A plataforma terá quatro perfis de acesso:

### 4.1. Visitante

-   Acessar a página pública da plataforma.
-   Visualizar os conteúdos educacionais.
-   Consultar e baixar materiais em PDF.
-   Conhecer a proposta do projeto.

### 4.2. Estudante

-   Criar uma conta e realizar login.
-   Acessar os conteúdos educacionais.
-   Consultar e baixar materiais em PDF.
-   Responder aos questionários.
-   Visualizar a pontuação das avaliações.
-   Consultar o histórico e acompanhar seu desempenho.

### 4.3. Professor

-   Realizar cadastro e login.
-   Cadastrar novos conteúdos.
-   Editar e atualizar conteúdos existentes.
-   Adicionar e atualizar materiais em PDF.
-   Criar e editar questionários.
-   Gerenciar os materiais educacionais conforme suas permissões.

### 4.4. Administrador

-   Acessar a área administrativa.
-   Gerenciar usuários e professores.
-   Administrar permissões de acesso.
-   Gerenciar o funcionamento geral da plataforma.

**Observação:** o perfil de administrador foi definido como parte da
proposta inicial. Os detalhes de suas permissões serão especificados
durante o mapeamento das páginas e funcionalidades.

## 5. Conteúdos educacionais

A versão inicial da plataforma contará com cinco módulos:

  -----------------------------------------------------------------------
  ID                      Módulo                  Conteúdo previsto
  ----------------------- ----------------------- -----------------------
  MOD01                   Poupança                Funcionamento,
                                                  rendimentos, finalidade
                                                  e limitações da
                                                  poupança.

  MOD02                   Crédito                 Cartão de crédito,
                                                  empréstimos,
                                                  endividamento e uso
                                                  consciente do crédito.

  MOD03                   Juros                   Conceitos de juros
                                                  simples e compostos e
                                                  seus efeitos no
                                                  cotidiano.

  MOD04                   Inflação                Aumento dos preços e
                                                  impacto no poder de
                                                  compra.

  MOD05                   Reserva de emergência   Importância,
                                                  planejamento e formação
                                                  de uma reserva
                                                  financeira.
  -----------------------------------------------------------------------

### 5.1. Estrutura padrão dos módulos

Cada módulo deverá apresentar:

1.  **Introdução:** breve explicação sobre o assunto.
2.  **Material complementar:** documento em PDF para aprofundamento.
3.  **Download:** opção para baixar o material disponibilizado.
4.  **Questionário:** avaliação interativa sobre o conteúdo.
5.  **Resultado:** apresentação da pontuação após a conclusão do
    questionário.

## 6. Requisitos funcionais

Os requisitos funcionais descrevem as ações e funcionalidades que o
sistema deverá oferecer.

  -----------------------------------------------------------------------
  ID                                  Requisito
  ----------------------------------- -----------------------------------
  RF01                                O sistema deve disponibilizar
                                      conteúdos de educação financeira.

  RF02                                O sistema deve apresentar uma
                                      introdução para cada conteúdo.

  RF03                                O sistema deve disponibilizar
                                      materiais complementares em PDF.

  RF04                                O sistema deve permitir o download
                                      dos materiais em PDF.

  RF05                                O sistema deve disponibilizar
                                      questionários associados aos
                                      conteúdos.

  RF06                                O sistema deve permitir que
                                      estudantes respondam aos
                                      questionários.

  RF07                                O sistema deve apresentar os
                                      resultados das avaliações.

  RF08                                O sistema deve permitir o cadastro
                                      e a autenticação de estudantes.

  RF09                                O sistema deve permitir o cadastro
                                      e a autenticação de professores.

  RF10                                O sistema deve registrar os
                                      resultados dos questionários.

  RF11                                O sistema deve permitir que
                                      estudantes consultem seu próprio
                                      desempenho.

  RF12                                O sistema deve permitir que
                                      professores gerenciem conteúdos e
                                      materiais.

  RF13                                O sistema deve controlar as
                                      permissões de acordo com o perfil
                                      do usuário.

  RF14                                O sistema deve oferecer recuperação
                                      de senha.

  RF15                                O sistema deve permitir que
                                      professores cadastrem novos
                                      conteúdos.

  RF16                                O sistema deve permitir que
                                      professores criem e editem
                                      questionários.

  RF17                                O sistema deve disponibilizar o
                                      histórico de avaliações dos
                                      estudantes.

  RF18                                O sistema deve impedir alterações
                                      realizadas por usuários sem
                                      autorização.

  RF19                                O sistema deve apresentar a
                                      pontuação ao estudante após a
                                      conclusão de um questionário.
  -----------------------------------------------------------------------

## 7. Requisitos não funcionais

Os requisitos não funcionais descrevem características de qualidade,
segurança e funcionamento esperadas do sistema.

  -----------------------------------------------------------------------
  ID                                  Requisito
  ----------------------------------- -----------------------------------
  RNF01                               A interface deve ser responsiva e
                                      adaptar-se a computadores, tablets
                                      e celulares.

  RNF02                               As senhas devem ser armazenadas
                                      utilizando algoritmo seguro de
                                      hash.

  RNF03                               O sistema deve ser compatível com
                                      navegadores modernos.

  RNF04                               A comunicação deverá utilizar HTTPS
                                      no ambiente de produção.

  RNF05                               A interface deve ser intuitiva e
                                      adequada ao público estudantil.

  RNF06                               O tratamento de dados pessoais deve
                                      observar a Lei Geral de Proteção de
                                      Dados (LGPD).

  RNF07                               O sistema deve possuir mecanismos
                                      de backup do banco de dados.

  RNF08                               O acesso às funcionalidades deve
                                      respeitar as permissões de cada
                                      perfil.
  -----------------------------------------------------------------------

## 8. Regras de negócio

As regras de negócio estabelecem condições que deverão ser respeitadas
pelo funcionamento da plataforma.

  -----------------------------------------------------------------------
  ID                                  Regra
  ----------------------------------- -----------------------------------
  RN01                                Cada usuário cadastrado deverá
                                      possuir uma conta individual.

  RN02                                Estudantes poderão consultar
                                      somente seus próprios resultados e
                                      histórico de desempenho.

  RN03                                Professores poderão alterar
                                      conteúdos e materiais de acordo com
                                      suas permissões.

  RN04                                Cada questionário deverá estar
                                      associado a um conteúdo
                                      educacional.

  RN05                                As respostas dos questionários
                                      deverão ser corrigidas
                                      automaticamente pelo sistema.

  RN06                                Os resultados das avaliações
                                      deverão ser associados ao estudante
                                      que realizou o questionário.

  RN07                                Somente usuários autorizados
                                      poderão acessar áreas e
                                      funcionalidades administrativas.
  -----------------------------------------------------------------------

## 9. Matriz preliminar de permissões

A tabela apresenta as permissões inicialmente previstas para cada
perfil.

  Funcionalidade                     Visitante   Estudante   Professor   Administrador
  --------------------------------- ----------- ----------- ----------- ---------------
  Visualizar conteúdos                  Sim         Sim         Sim           Sim
  Baixar PDFs                           Sim         Sim         Sim           Sim
  Responder questionários               Não         Sim         Não           Não
  Consultar desempenho individual       Não         Sim         Não           Sim
  Editar conteúdos                      Não         Não         Sim           Sim
  Gerenciar questionários               Não         Não         Sim           Sim
  Gerenciar usuários                    Não         Não         Não           Sim
  Gerenciar permissões                  Não         Não         Não           Sim

**Observação:** a matriz é preliminar. Permissões específicas, como a
possibilidade de professores consultarem resultados de turmas, ainda
deverão ser avaliadas.

## 10. Limites do projeto

### 10.1. Funcionalidades incluídas no escopo inicial

-   Plataforma web educacional.
-   Cinco módulos de educação financeira.
-   Conteúdos explicativos.
-   Disponibilização e download de PDFs.
-   Questionários interativos.
-   Cadastro e autenticação de estudantes.
-   Cadastro e autenticação de professores.
-   Registro e consulta do desempenho dos estudantes.
-   Painel de gerenciamento de conteúdos para professores.
-   Área administrativa para gerenciamento geral do sistema.

### 10.2. Funcionalidades fora do escopo inicial

-   Realização de operações bancárias.
-   Integração com contas bancárias.
-   Transferências financeiras.
-   Pagamentos pela plataforma.
-   Aplicativo mobile nativo.
-   Emissão de certificados.
-   Sistema avançado de gamificação.

Essas funcionalidades poderão ser reconsideradas em versões futuras,
caso haja necessidade e disponibilidade de tempo.

## 11. Decisões iniciais do projeto

  Item                            Decisão
  ------------------------------- -------------------------------------------
  Tipo de sistema                 Plataforma web educacional
  Público-alvo                    Jovens estudantes
  Acesso aos conteúdos            Público, sem necessidade de login
  Acesso ao desempenho            Mediante autenticação como estudante
  Cadastro de professores         Previsto
  Perfil de administrador         Previsto, separado do perfil de professor
  Materiais didáticos             Arquivos PDF
  Avaliações                      Questionários interativos
  Quantidade inicial de módulos   Cinco

## 12. Pendências para as próximas etapas

Embora o levantamento inicial esteja concluído, alguns detalhes serão
aprofundados durante o planejamento:

-   Definição detalhada das permissões de cada perfil.
-   Definição do processo de cadastro e aprovação de professores.
-   Definição do funcionamento dos questionários, incluindo quantidade
    de questões, tentativas e critérios de pontuação.
-   Definição de como o desempenho será apresentado ao estudante.
-   Definição de possíveis relatórios para professores e
    administradores.
-   Detalhamento dos requisitos de segurança, acessibilidade e
    desempenho.

Esses pontos não impedem o avanço do projeto, mas deverão ser
considerados antes ou durante a implementação das funcionalidades
correspondentes.

## 13. Próxima etapa

Após a conclusão desta versão inicial do levantamento de requisitos, a
próxima etapa será:

**Etapa 2 --- Mapeamento das Páginas e Funcionalidades**

Nessa etapa serão definidos: 1. Todas as páginas que comporão a
plataforma. 2. As seções presentes em cada página. 3. As funcionalidades
disponíveis em cada seção. 4. A navegação entre as páginas. 5. As
diferenças entre as áreas de visitante, estudante, professor e
administrador.

------------------------------------------------------------------------

## Histórico de versões

  -----------------------------------------------------------------------
  Versão                  Descrição               Status
  ----------------------- ----------------------- -----------------------
  1.0                     Consolidação do         Concluída
                          levantamento inicial de 
                          requisitos.             

  -----------------------------------------------------------------------

O documento contém:
- Objetivo e problema do projeto.
- Público-alvo e perfis de usuários.
- Cinco módulos educacionais.
- 19 requisitos funcionais.
- 8 requisitos não funcionais.
- 7 regras de negócio.
- Matriz de permissões.
- Limites do projeto.
- Decisões e pendências.