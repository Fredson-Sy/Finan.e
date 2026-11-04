# 02 --- Mapeamento das Páginas e Funcionalidades

**Projeto:** Plataforma de Educação Financeira\
**Etapa:** 2 --- Mapeamento das Páginas e Funcionalidades\
**Versão:** 1.0\
**Status:** Proposta inicial consolidada

------------------------------------------------------------------------

## 1. Objetivo desta etapa

Definir a estrutura de páginas da plataforma, as seções de cada página,
suas funcionalidades, a navegação entre áreas e as diferenças de acesso
entre visitantes, estudantes, professores e administradores.

A estrutura foi pensada para um projeto acadêmico que deve priorizar
ferramentas gratuitas, simplicidade de desenvolvimento, baixo consumo de
armazenamento e facilidade de manutenção.

## 2. Organização geral do site

A plataforma será dividida em quatro áreas:

1.  **Área pública:** acessível sem cadastro, com apresentação do
    projeto, conteúdos, PDFs e questionários.
2.  **Área do estudante:** acessível após login, com painel, desempenho,
    histórico e perfil.
3.  **Área do professor:** acessível após login e validação da chave de
    autorização no cadastro, com ferramentas para administrar conteúdos
    e questionários.
4.  **Área administrativa:** acessível somente ao administrador, com
    gerenciamento de usuários, professores e configurações de acesso.

### 2.1 Mapa resumido

  -----------------------------------------------------------------------
  Área                                Páginas
  ----------------------------------- -----------------------------------
  Pública                             Início, Sobre, Conteúdos, Conteúdo
                                      individual, Login, Cadastro de
                                      estudante, Cadastro de professor

  Estudante                           Painel, Meu desempenho, Histórico
                                      de avaliações, Meu perfil

  Professor                           Painel, Gerenciar conteúdos,
                                      Criar/editar conteúdo, Gerenciar
                                      questionários, Criar/editar
                                      questionário

  Administrador                       Painel administrativo, Gerenciar
                                      usuários, Gerenciar professores,
                                      Configurações de acesso
  -----------------------------------------------------------------------

A página de conteúdo será um modelo reutilizável: os cinco módulos
utilizarão a mesma estrutura, mudando apenas os dados e materiais
apresentados. Não será necessário criar uma página de código diferente
para cada assunto.

------------------------------------------------------------------------

## 3. Área pública

### PG01 --- Página inicial

**Objetivo:** apresentar a plataforma e direcionar o visitante aos
conteúdos.

**Seções e funcionalidades:** - Cabeçalho: logotipo, navegação principal
e acesso ao login. - Apresentação principal: nome, breve descrição e
botão para explorar conteúdos. - Sobre a plataforma: resumo do propósito
educacional. - Módulos em destaque: apresentação dos cinco temas. - Como
funciona: explicação breve sobre conteúdos, PDFs e questionários. -
Rodapé: informações do projeto e links de navegação.

**Ações principais:** abrir um módulo, conhecer o projeto ou entrar na
conta.

### PG02 --- Sobre o projeto

**Objetivo:** explicar a finalidade e a proposta educacional da
plataforma.

**Seções e funcionalidades:** - Apresentação do projeto. - Problema que
o projeto busca ajudar a enfrentar. - Objetivos educacionais. -
Público-alvo. - Descrição de como a plataforma pode ser utilizada.

**Ações principais:** voltar ao início ou acessar os conteúdos.

### PG03 --- Lista de conteúdos

**Objetivo:** apresentar todos os módulos disponíveis.

**Seções e funcionalidades:** - Título e introdução da área. - Lista ou
cartões dos módulos. - Breve descrição de cada tema. - Identificação dos
conteúdos disponíveis. - Acesso à página individual de cada módulo.

**Módulos iniciais:** 1. Poupança. 2. Crédito. 3. Juros. 4. Inflação. 5.
Reserva de emergência.

**Ações principais:** selecionar um módulo e abrir seu conteúdo.

### PG04 --- Página individual do conteúdo

**Objetivo:** reunir a explicação do tema, o material complementar e o
questionário em um único lugar.

**Seções e funcionalidades:** - Título do módulo. - Introdução e
explicação do assunto. - Conteúdo educativo dividido em tópicos. -
Material complementar em PDF. - Botão para visualizar ou baixar o PDF. -
Questionário relacionado ao módulo. - Área para responder às
perguntas. - Resultado apresentado ao finalizar o questionário.

**Regras de acesso:** - Visitantes podem ler o conteúdo, baixar o PDF e
responder ao questionário. - Visitantes recebem o resultado na tela, mas
ele não é salvo no histórico. - Estudantes autenticados podem realizar o
questionário e ter o resultado registrado. - Professores e
administradores podem visualizar os conteúdos públicos. A edição ocorre
em suas áreas restritas.

**Observação:** o questionário pode aparecer dentro da própria página do
conteúdo. Não é necessário criar uma página separada para cada
questionário na área pública.

### PG05 --- Login

**Objetivo:** autenticar usuários cadastrados.

**Seções e funcionalidades:** - Campo de e-mail. - Campo de senha. -
Botão de entrar. - Link para recuperação de senha. - Links para cadastro
de estudante e cadastro de professor. - Mensagens de erro para dados
inválidos.

Após o login, o sistema direcionará o usuário conforme seu perfil: -
Estudante → Painel do estudante. - Professor → Painel do professor. -
Administrador → Painel administrativo.

### PG06 --- Cadastro de estudante

**Objetivo:** permitir que um estudante crie sua conta.

**Seções e funcionalidades:** - Campo de nome. - Campo de e-mail. -
Campo de senha. - Confirmação de senha. - Aceite dos termos e aviso de
privacidade. - Botão para concluir cadastro. - Validação de campos e
aviso caso o e-mail já esteja cadastrado.

Após o cadastro, o estudante poderá entrar na plataforma.

### PG07 --- Cadastro de professor

**Objetivo:** permitir o cadastro de professores com autorização.

**Seções e funcionalidades:** - Campo de nome. - Campo de e-mail. -
Campo de senha. - Confirmação de senha. - Campo da chave de
autorização. - Botão para concluir cadastro. - Mensagens de validação.

**Regra de autorização proposta:** - O administrador define uma chave de
autorização previamente. - A pessoa informa essa chave somente durante o
cadastro. - Se a chave estiver correta, o cadastro é criado com perfil
de professor. - Nos próximos acessos, o professor utiliza apenas e-mail
e senha. - A chave não deve ser exibida publicamente nem armazenada em
texto aberto. - O administrador poderá alterar a chave caso ela seja
compartilhada indevidamente.

A chave será uma configuração única da plataforma, não uma informação
que precise ser repetida no login. Para maior segurança, o sistema
deverá limitar tentativas inválidas e permitir a troca da chave pelo
administrador.

------------------------------------------------------------------------

## 4. Área do estudante

Todas as páginas desta área exigem autenticação.

### PG08 --- Painel do estudante

**Objetivo:** apresentar um resumo da atividade do estudante.

**Seções e funcionalidades:** - Mensagem de boas-vindas. - Atalho para
os conteúdos. - Resumo de questionários respondidos. - Resumo de
pontuação ou desempenho. - Atalho para o histórico. - Atalho para o
perfil.

Os indicadores serão calculados a partir dos resultados já registrados,
evitando armazenar informações duplicadas sem necessidade.

### PG09 --- Meu desempenho

**Objetivo:** permitir que o estudante acompanhe seu próprio desempenho.

**Seções e funcionalidades:** - Quantidade de questionários
respondidos. - Pontuação média, quando houver resultados suficientes. -
Resultados por módulo. - Comparação do desempenho ao longo do tempo, se
houver dados suficientes.

O estudante só poderá consultar seus próprios resultados.

### PG10 --- Histórico de avaliações

**Objetivo:** listar os questionários respondidos pelo estudante.

**Seções e funcionalidades:** - Lista de avaliações realizadas. - Nome
do módulo ou questionário. - Data da tentativa. - Pontuação obtida. -
Acesso aos detalhes do resultado, quando disponível.

Não é necessário armazenar respostas de visitantes não autenticados.
Para estudantes, o sistema deverá guardar apenas os dados necessários
para consultar o resultado e o histórico.

### PG11 --- Meu perfil

**Objetivo:** permitir que o estudante consulte e atualize seus dados
básicos.

**Seções e funcionalidades:** - Nome cadastrado. - E-mail cadastrado. -
Opção para alterar a senha. - Opção para atualizar dados permitidos. -
Opção para sair da conta.

------------------------------------------------------------------------

## 5. Área do professor

Todas as páginas desta área exigem autenticação com perfil de professor.

### PG12 --- Painel do professor

**Objetivo:** oferecer acesso rápido às ferramentas de gerenciamento.

**Seções e funcionalidades:** - Resumo de conteúdos cadastrados. -
Resumo de questionários cadastrados. - Atalho para criar conteúdo. -
Atalho para gerenciar conteúdos. - Atalho para gerenciar
questionários. - Atalho para criar questionário.

### PG13 --- Gerenciar conteúdos

**Objetivo:** listar e administrar os conteúdos educativos.

**Seções e funcionalidades:** - Lista de conteúdos cadastrados. - Título
e situação de cada conteúdo. - Ação para criar novo conteúdo. - Ação
para editar conteúdo existente. - Ação para publicar ou despublicar, se
essa função for habilitada. - Ação para excluir, respeitando as regras
de integridade dos dados.

### PG14 --- Criar/editar conteúdo

**Objetivo:** permitir a criação e manutenção dos módulos educativos.

**Seções e funcionalidades:** - Campo de título. - Campo de resumo ou
introdução. - Campo para o texto educativo. - Área para anexar ou
informar o PDF. - Opção para salvar. - Opção para publicar ou manter
como rascunho, se necessário. - Validação dos campos obrigatórios.

O PDF deverá ser armazenado em serviço de arquivos ou hospedagem
apropriada, e não como conteúdo binário dentro do banco de dados.

### PG15 --- Gerenciar questionários

**Objetivo:** listar e administrar os questionários existentes.

**Seções e funcionalidades:** - Lista de questionários. - Identificação
do módulo associado. - Quantidade de perguntas. - Situação do
questionário. - Ação para criar questionário. - Ação para editar
questionário. - Ação para excluir ou desativar questionário.

### PG16 --- Criar/editar questionário

**Objetivo:** permitir que o professor monte questionários relacionados
aos conteúdos.

**Seções e funcionalidades:** - Seleção do conteúdo associado. - Campo
de título ou instrução. - Cadastro de perguntas. - Cadastro de
alternativas. - Definição da alternativa correta. - Pontuação das
perguntas, caso seja utilizada. - Opção para salvar. - Opção para
publicar ou desativar.

**Regra:** cada questionário deverá estar associado a um conteúdo
educativo. A correção será automática, com apresentação da pontuação ao
final.

------------------------------------------------------------------------

## 6. Área administrativa

Todas as páginas desta área exigem autenticação com perfil de
administrador. Não haverá cadastro público de administrador.

### PG17 --- Painel administrativo

**Objetivo:** apresentar uma visão geral da plataforma e atalhos
administrativos.

**Seções e funcionalidades:** - Resumo da quantidade de estudantes. -
Resumo da quantidade de professores. - Atalhos para gerenciamento de
usuários. - Atalhos para gerenciamento de professores. - Atalho para
configurações de acesso.

Os indicadores devem ser simples e calculados a partir dos registros
existentes.

### PG18 --- Gerenciar usuários

**Objetivo:** permitir que o administrador consulte e gerencie contas.

**Seções e funcionalidades:** - Lista de usuários. - Busca por nome ou
e-mail. - Identificação do tipo de perfil. - Consulta do estado da
conta. - Opção para bloquear ou reativar uma conta. - Opção para
consultar dados básicos da conta.

O administrador não deverá visualizar senhas. As senhas serão
armazenadas somente como hashes.

### PG19 --- Gerenciar professores

**Objetivo:** oferecer controle específico sobre as contas de
professores.

**Seções e funcionalidades:** - Lista de professores cadastrados. -
Busca por nome ou e-mail. - Situação da conta. - Opção para bloquear ou
reativar professor. - Acesso às configurações da chave de autorização.

### PG20 --- Configurações de acesso

**Objetivo:** centralizar configurações administrativas simples.

**Seções e funcionalidades:** - Alterar a chave de autorização de
professores. - Consultar orientações de segurança. - Encerrar sessões,
se esse recurso for implementado. - Consultar informações básicas da
plataforma.

A chave deverá ser armazenada com proteção adequada, preferencialmente
como hash ou segredo de configuração no ambiente do servidor, nunca
exposta no código do frontend.

------------------------------------------------------------------------

## 7. Navegação entre páginas

### 7.1 Fluxo do visitante

1.  Acessa a página inicial.
2.  Abre a lista de conteúdos.
3.  Seleciona um módulo.
4.  Lê o conteúdo e, se desejar, baixa o PDF.
5.  Responde ao questionário.
6.  Visualiza o resultado na tela.
7.  Pode criar uma conta ou entrar para salvar resultados de futuras
    tentativas.

### 7.2 Fluxo do estudante

1.  Acessa o login ou realiza o cadastro.
2.  Entra no painel do estudante.
3.  Acessa os conteúdos.
4.  Responde aos questionários.
5.  Visualiza a pontuação.
6.  Consulta o desempenho e o histórico.
7.  Acessa o perfil ou encerra a sessão.

### 7.3 Fluxo do professor

1.  Acessa o cadastro de professor.
2.  Informa seus dados e a chave de autorização.
3.  O sistema valida a chave e cria a conta.
4.  O professor realiza login.
5.  Acessa o painel do professor.
6.  Cria ou edita conteúdos.
7.  Cadastra ou edita questionários.
8.  Salva as alterações.

### 7.4 Fluxo do administrador

1.  Recebe acesso administrativo criado previamente.
2.  Realiza login.
3.  Acessa o painel administrativo.
4.  Consulta e gerencia usuários e professores.
5.  Altera a chave de autorização, se necessário.
6.  Bloqueia ou reativa contas quando necessário.

------------------------------------------------------------------------

## 8. Matriz de permissões

  Funcionalidade                     Visitante   Estudante   Professor   Administrador
  -------------------------------- ----------- ----------- ----------- ---------------
  Visualizar conteúdos                     Sim         Sim         Sim             Sim
  Baixar PDFs                              Sim         Sim         Sim             Sim
  Responder questionários                  Sim         Sim         Sim             Sim
  Ver resultado imediato                   Sim         Sim         Sim             Sim
  Salvar resultado no histórico            Não         Sim         Não             Não
  Consultar histórico individual           Não     Próprio         Não             Não
  Criar/editar conteúdos                   Não         Não         Sim             Sim
  Gerenciar questionários                  Não         Não         Sim             Sim
  Gerenciar usuários                       Não         Não         Não             Sim
  Gerenciar professores                    Não         Não         Não             Sim
  Alterar chave de autorização             Não         Não         Não             Sim

**Observação:** professores e administradores podem responder aos
questionários como visitantes, mas seus resultados não serão registrados
como histórico de estudante. Caso futuramente seja necessário permitir
que professores acompanhem resultados de turmas, isso deverá ser
definido como uma funcionalidade separada, com regras de privacidade.

------------------------------------------------------------------------

## 9. Diretrizes para economizar armazenamento e manter o projeto gratuito

O projeto deverá priorizar serviços gratuitos e evitar guardar
informações desnecessárias.

### 9.1 Dados essenciais no banco

O banco deverá armazenar somente o necessário, por exemplo:

-   Usuários: identificador, nome, e-mail, hash da senha, perfil e data
    de cadastro.
-   Conteúdos: identificador, título, texto, resumo e referência do
    arquivo PDF.
-   Questionários: identificador, conteúdo associado, título e
    perguntas.
-   Resultados: identificador do estudante, questionário, pontuação e
    data da tentativa.

A estrutura definitiva será planejada na etapa de modelagem do banco de
dados.

### 9.2 O que evitar armazenar

-   Senhas em texto puro.
-   PDFs como arquivos binários dentro do banco.
-   Resultados de visitantes não autenticados.
-   Dados pessoais que não tenham finalidade no projeto.
-   Cópias repetidas de informações que possam ser consultadas por
    relacionamento entre tabelas.
-   Imagens ou arquivos desnecessários.

### 9.3 Estratégias de economia

-   Utilizar um banco de dados gratuito dentro dos limites do plano
    escolhido.
-   Guardar PDFs em armazenamento de arquivos, se houver serviço
    gratuito adequado.
-   Comprimir PDFs e imagens antes de publicar.
-   Limitar o tamanho dos arquivos enviados.
-   Armazenar somente os resultados necessários para o histórico.
-   Evitar salvar cada resposta de visitante.
-   Fazer backups periódicos e verificar os limites do serviço
    escolhido.

**Importante:** gratuito não significa ilimitado. Antes da
implementação, será necessário conferir os limites atuais de
armazenamento, tráfego, quantidade de registros e política de suspensão
do serviço escolhido.

------------------------------------------------------------------------

## 10. Recuperação de senha e segurança

A recuperação de senha será acessada a partir da página de login.

Fluxo previsto: 1. Usuário informa o e-mail cadastrado. 2. Sistema
verifica a existência da conta. 3. Sistema envia um mecanismo seguro de
redefinição, caso exista serviço de e-mail disponível. 4. Usuário define
uma nova senha.

Regras gerais: - Senhas armazenadas com hash seguro. - Acesso às áreas
restritas validado no backend. - Permissões verificadas em cada operação
protegida. - Comunicação HTTPS em produção. - Validação dos dados
recebidos. - Limite de tentativas para login e validação da chave de
professor. - Nenhuma senha ou chave secreta exposta no frontend.

Se o envio de e-mail não puder ser implementado gratuitamente, a
recuperação de senha poderá ficar para uma etapa posterior, sem
armazenar senhas em formato recuperável.

------------------------------------------------------------------------

## 11. Decisões consolidadas nesta etapa

-   A plataforma terá quatro perfis: visitante, estudante, professor e
    administrador.
-   Conteúdos e PDFs serão públicos.
-   Visitantes poderão responder questionários e ver o resultado
    imediato.
-   Apenas estudantes autenticados terão resultados salvos no histórico.
-   Professores poderão criar e editar conteúdos e questionários.
-   O cadastro de professor exigirá uma chave de autorização.
-   Depois do cadastro, o professor utilizará apenas e-mail e senha para
    entrar.
-   O administrador será criado previamente e não terá cadastro público.
-   A página de conteúdo será reutilizável para os cinco módulos.
-   PDFs serão armazenados fora do banco de dados, sempre que possível.
-   O sistema deverá priorizar soluções gratuitas e baixo consumo de
    armazenamento.

## 12. Pontos para etapas futuras

As decisões abaixo não impedem o avanço do projeto, mas deverão ser
detalhadas antes ou durante a implementação:

-   Escolha do banco de dados e do serviço de hospedagem.
-   Definição do limite de tamanho dos PDFs.
-   Quantidade de perguntas por questionário.
-   Possibilidade de refazer questionários.
-   Regra de pontuação e exibição de respostas corretas.
-   Política de retenção e exclusão do histórico.
-   Serviço de envio de e-mails para recuperação de senha.
-   Necessidade de relatórios para professores.
-   Regras de privacidade e adequação à LGPD.

------------------------------------------------------------------------

## 13. Próxima etapa

Com o mapeamento das páginas e funcionalidades definido, a próxima etapa
será a **modelagem do banco de dados**. Nela serão definidas as tabelas,
os campos, os relacionamentos e quais informações realmente precisam ser
armazenadas, mantendo a estrutura simples e econômica.

------------------------------------------------------------------------

**Histórico de versão**

  -----------------------------------------------------------------------
  Versão                  Data                    Descrição
  ----------------------- ----------------------- -----------------------
  1.0                     30/10/2026              Primeira versão do
                                                  mapeamento de páginas e
                                                  funcionalidades.

  -----------------------------------------------------------------------
