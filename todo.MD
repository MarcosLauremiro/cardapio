```markdown
# TODO

## 1. Revisão de Padrões de Código
- [x] **Nomenclatura de Arquivos e Pastas (API)**
  - Verificar se todos os arquivos em `src/controller`, `src/service`, `src/middleware`, `src/models`, `src/routes`, `src/types` seguem PascalCase (UpperCamelCase), por exemplo: `UserController.ts`, `AuthService.ts`.
  - Garantir que os exports e imports reflitam corretamente os nomes dos arquivos.
- [x] **Nomenclatura de Componentes (Frontend Web)**
  - Pastas e arquivos em `src/components` devem seguir o padrão: `OQueÉOndeSeAplicaComponent.tsx` (por exemplo, `UserCardComponent.tsx`, `OrderListComponent.tsx`).
- [ ] **Padrões Tailwind CSS**
  - Usar variáveis (CSS custom properties ou arquivo de tema) para cores em vez de hardcodes.
  - Garantir classes responsivas (`sm:`, `md:`, `lg:`) de forma consistente.
  - Verificar convenções de espaçamento e tipografia (ex.: `px-4`, `py-2`, `text-base`, `font-medium`).
- [ ] **Linting & Format**
  - Configurar ESLint/Prettier com regras compartilhadas (monorepo se aplicável).
  - Adicionar script de `lint` e `format` no `package.json`.
  - Garantir que commits só sejam feitos após checagem de lint e formatação.

---

## 2. Backend (API)

### 2.1. Estrutura e Organização
- [ ] Validar estrutura de pastas:
  - `src/controllers/`  
  - `src/services/`
  - `src/middleware/`
  - `src/models/`
  - `src/routes/`
  - `src/utils/` (helpers, validações, erros)
  - `src/config/` (variáveis de ambiente, conexões)
- [ ] Adicionar documentação interna nos controllers e serviços (JSDoc ou comentários curtos).

### 2.2. Autenticação e Autorização
- [ ] Implementar middleware de autenticação JWT:
  - Verificar se o token é válido e extrair `userId` ou `establishmentId`.
- [ ] Criar middleware de autorização:
  - Verificar permissões (por exemplo, usuário “Estabelecimento” vs. cliente).
- [ ] Rotas protegidas:
  - Garantir que todas as rotas de criação/edição/deleção exijam autenticação.
  - Verificar se o recurso (pedido, categoria, produto) pertence ao estabelecimento autenticado.

### 2.3. Validações e Tratamento de Erros
- [ ] Usar `express-validator` ou similar para checagens básicas (string vazia, formatos, tipos, etc.).
- [ ] Criar classes/handlers de erro personalizados (por exemplo, `HttpError`).
- [ ] Garantir que o `errorHandler` padronize respostas JSON:
  - `{ status: <código>, message: <descrição> }`.
  - Logar erros internos (call stack) em `console.error` ou serviço de log.
- [ ] Tratar erros de banco (duplicidade de chave, referências não encontradas) com mensagens amigáveis.

### 2.4. Banco de Dados (Mongoose/MongoDB)
- [ ] Modelos (`src/models/Category.ts`, `Product.ts`, `Order.ts`, `User.ts`, etc.) com tipos e validações:
  - Campos obrigatórios, tipos, índices (ex.: índice único em `Category` por estabelecimento e nome).
- [ ] Conexão ao MongoDB:
  - Carregar URI via `process.env.MONGODB_URI`.
  - Tratar falhas de conexão no `startup` (ex.: encerrar aplicação se não conectar).
- [ ] Queries otimizadas:
  - Usar `.lean()` onde apropriado para objetos simples.
  - Populações (`populate`) somente quando necessário.
  - Paginação (ex.: `limit`/`skip`) em endpoints que retornam listas grandes.
- [ ] Migrations ou seeders (se necessário) para dados iniciais de teste.

### 2.5. Endpoints da API

#### 2.5.1. Pedidos
- [x] **Verificar existência**: Confirmar se o pedido com `{id}` existe.
- [x] **Transição de status**: Validar se a mudança de status é permitida (`Pendente` → `Em Preparação` → `Pronto` ou `Cancelado`).
- [x] **Cancelamento (cliente)**:
  - Só permitido se status for `Pendente`.
  - Autenticação: Cliente.
- [ ] **Listar pedidos**:
  - Filtros: por status, por data, por estabelecimento.
  - Paginação: `page`, `limit`.
- [ ] **Criar pedido**:
  - Validar campos obrigatórios (produtos, quantidades, clienteId, estabelecimentoId).
  - Cálculo de total.
  - Notificar via WebSocket ao estabelecimento.
- [ ] **Atualizar pedido**:
  - Apenas para estabelecimento (mudar status, itens ou dados de entrega).
- [ ] **Histórico de pedidos**:
  - Endpoint para cliente/ver histórico, para estabelecimento/ver histórico geral.
- [ ] **WebSocket / Notificações em tempo real**:
  - Configurar servidor WSS e eventos para “novo pedido”, “pedido atualizou status”.
  - Mapear `establishmentId` → `WebSocket` clients.

#### 2.5.2. Categorias
- [x] **Listar categorias**:
  - Ordenar alfabeticamente ou por campo de ordenação.
  - Retornar `[{ id, nome, isActive }]`.
- [x] **Criar categoria**:
  - Body: `{ nome }` (lowercase ou normalizar antes de salvar).
  - Autenticação: Estabelecimento.
  - Verificar nome único dentro do estabelecimento (index único).
- [x] **Editar categoria**:
  - Path: `/categories/:id`
  - Body: `{ nome, isActive? }`.
  - Verificar existência e propriedade do estabelecimento.
- [x] **Deletar categoria**:
  - Path: `/categories/:id`
  - Soft delete (marcar `isActive = false`) ou hard delete? (decidir e implementar).
- [ ] **Listar produtos por categoria**:
  - Endpoint separado: `/categories/:id/products`.
  - Validar existência de `categoriaId`.
  - Retornar array de objetos de produto (id, nome, preço, imagemUrl, descrição).
  - Filtros adicionais (ex.: somente ativos).
- [ ] **Gerenciar ordenação**:
  - Incluir campo `orderIndex` ou similar para definir ordem customizada.

#### 2.5.3. Produtos
- [ ] **Listar produtos**:
  - Retornar array: `{ id, nome, descricao, preco, imagemUrl, categoriaId (ou objeto completo) }`.
  - Filtros: nome (regex), faixa de preço, categoria.
  - Ordenação: por nome ou data de criação.
  - Paginação: `page`, `limit`.
- [ ] **Criar produto**:
  - Body: `{ nome, descricao, preco, imagemUrl, categoriaId }`.
  - Autenticação: Estabelecimento.
  - Validar:
    - `nome` não vazio.
    - `preco` número > 0.
    - `categoriaId` existe e pertence ao mesmo estabelecimento.
    - Nome único por categoria (index composto).
- [ ] **Editar produto**:
  - Path: `/products/:id`
  - Body: `{ nome?, descricao?, preco?, imagemUrl?, categoriaId? }`.
  - Validar permissão e existência.
- [ ] **Desativar produto**:
  - Path: `/products/:id/deactivate`
  - Definir `isActive = false`.
- [ ] **Deletar produto** (hard delete ou soft delete).
  - Path: `/products/:id`
  - Verificar existência, autorização e dependências (pedidos abertos referenciando o produto).

### 2.6. Testes (Backend)
- [ ] **Unitários (Jest ou Mocha)**
  - Testar services isolados (lógica de negócio: cálculos, validações).
  - Mocks de repositório/Mongoose para isolar camada de dados.
- [ ] **Integração**
  - Usar banco de teste MongoDB (in-memory ou container via Docker).
  - Testar endpoints principais (categorias, produtos, pedidos).
  - Validar respostas esperadas (códigos HTTP, esquemas de JSON).
- [ ] **Cobertura de Testes**
  - Objetivo mínimo: 70% de cobertura. Relatórios gerados via `jest --coverage`.

### 2.7. Documentação e Versionamento
- [ ] **Swagger / OpenAPI**
  - Configurar docs em `/docs` ou `/api-docs`.
  - Descrever todos os endpoints (parâmetros, responses, erros).
- [ ] **README.md**
  - Instruções de setup local, variáveis de ambiente, rotas principais.
  - Comandos de scripts (start, dev, test, lint).
- [ ] **Versionamento Semântico (SemVer)**
  - Tags no Git: `v1.0.0`, `v1.1.0` etc.
  - Changelog (ex.: `CHANGELOG.md`) documentando alterações.

### 2.8. CI/CD e Deploy
- [ ] Configurar pipeline CI:
  - Checagem de lint, testes unitários e integração em pull requests.
- [ ] **Deploy**
  - Preparar `Dockerfile` para containerizar a API.
  - Configurar integração com Heroku, AWS (Elastic Beanstalk), DigitalOcean ou Railway.app.
  - Variáveis de ambiente seguras no ambiente de produção.
- [ ] **Monitoramento / Logging**
  - Integrar serviço de logs (ex.: Winston, Loggly) para erros críticos.
  - Health check endpoint (`GET /health`) para uptime monitoring.
  - Alertas em caso de falhas (via email ou Slack).

---

## 3. Front-end Web

### 3.1. Estrutura e Configurações Gerais
- [ ] Configurar o projeto (Next.js ou CRA):
  - ESLint e Prettier alinhados com backend (regras unificadas).
  - Configurar TypeScript.
- [ ] Definir arquitetura de pastas:
  - `src/components/`
  - `src/pages/`
  - `src/hooks/`
  - `src/store/` (Redux Toolkit slices, thunks, queries)
  - `src/services/api/` (configuração de Axios ou RTK Query)
  - `src/styles/` (estilos globais, variáveis)
  - `src/utils/` (funções de formatação, validações)

### 3.2. Estado Global (Redux Toolkit)
- [ ] Criar **slices**:
  - `categorySlice` contendo estado `{ list: Category[], loading, error }`
  - `productSlice` com `{ list: Product[], loading, error }`
  - `orderSlice` com `{ list: Order[], currentOrder?, loading, error }`
  - `userSlice` (autenticação, perfil)
- [ ] Configurar **RTK Query** ou **Async Thunks**:
  - Endpoints para `GET`, `POST`, `PUT`, `DELETE` para categorias e produtos.
  - Invalidate tags (`Categories`, `Products`, `Orders`) para refetch automático.
- [ ] Integrar `Provider` do Redux no `_app.tsx` (Next.js) ou `index.tsx` (CRA).

### 3.3. Autenticação (Frontend)
- [ ] Implementar tela de login:
  - Campos: email, senha.
  - Enviar request para `/auth/login`.
  - Salvar token JWT no `localStorage` ou cookie HTTP-only.
- [ ] Rota protegida:
  - Criar HOC ou hook `useAuth` para verificar token antes de renderizar páginas restritas.
  - Redirecionar para login se não autenticado.
- [ ] Logout:
  - Remover token e limpar estado do usuário.
- [ ] Exibir nome/do estabelecimento no cabeçalho após login.

### 3.4. Layout e Componentes Globais
- [ ] **Header**:
  - Logo, link para “Menu”, “Pedidos”, “Perfil” e botão de logout.
- [ ] **Sidebar (se aplicável)**
  - Links de navegação para categorias, produtos, pedidos, histórico.
- [ ] **Footer**:
  - Copyright, contatos, links de ajuda (opcional).
- [ ] **Theme Toggle** (Light/Dark Mode) — opcional.

### 3.5. Páginas e Funcionalidades

#### 3.5.1. Categoria
- [ ] **Lista de Categorias**:
  - Renderizar categorias em ordem crescente (mais recente → mais antiga).
  - Adicionar scrollbar horizontal ou vertical se muitas categorias.
- [ ] **Modal de Criação / Edição**:
  - Formulário com campos: `name` (lowercase), `icon` (URL ou seleção de ícone), `isActive` (checkbox), `establishmentId` (preenchido automaticamente).
  - Validações: `name` não vazio.
  - Reutilizar modal para criação e edição (preecher valores no modo edição).
- [x] **Editar Categoria** (já implementado).
- [x] **Deletar Categoria** (já implementado).
- [ ] **Estado Global (slice)**:
  - `categorySlice` e `categoryApiSlice` (RTK Query) para CRUD.
- [ ] **Feedback ao Usuário**:
  - Toast notifications (sucesso/erro) ao criar, editar e deletar.
- [ ] **Tratamento de Erros**:
  - Exibir mensagens de validação do servidor (ex.: “Nome já existe”).
  
#### 3.5.2. Produto
- [ ] **Lista de Produtos (Menu)**:
  - Renderizar todos os produtos ativos em ordem alfabética ou data.
  - Mostra: imagem, nome, descrição curta, preço formatado (usar função de formatação).
- [ ] **Modal de Criação / Edição de Produto**:
  - Campos: `nome`, `descricao`, `preco`, `imagemUrl` (upload ou URL), `categoriaId` (select dropdown).
  - Validar campos antes de enviar.
  - Reutilizar modal para criação e edição.
- [ ] **Botões de Ação**:
  - “Editar”, “Deletar”, “Desativar” em cada card de produto.
  - Confirmação antes de deletar/desativar (modal ou `window.confirm`).
- [ ] **Estado Global (slice)**:
  - `productSlice` e `productApiSlice` (RTK Query).
- [ ] **Feedback ao Usuário**:
  - Toasts de sucesso/erro.
- [ ] **Validação de Dados**:
  - `preco` > 0.  
  - `nome` não vazio e único (checar no backend).

#### 3.5.3. Pedidos
- [ ] **Lista de Pedidos**:
  - Renderizar pedidos com filtro por status (`Pendente`, `Em Preparação`, `Pronto`, etc.).
  - Botões para “Mudar Status” (apenas estabelecimento).
  - Indicadores visuais (badges) para status.
- [ ] **Detalhes do Pedido (Modal ou Página)**
  - Mostrar itens, quantidades, total, informações do cliente, data de criação.
  - BOTÃO: “Cancelar Pedido” (cliente) ou “Avançar Status” (estabelecimento).
- [ ] **Notificações em Tempo Real**:
  - Integrar WebSocket para receber novos pedidos ou atualizações de status.
  - Exibir badge de nova notificação no ícone de pedidos.
- [ ] **Histórico de Pedidos**:
  - Tabela ou lista paginada.
  - Filtros: Data, Status, Cliente.
- [ ] **Criar Pedido (Tela do Cliente)**:
  - Seleção de itens do menu (produtos), quantidade, observações.
  - Resumo antes de confirmar.
  - Enviar para backend e exibir feedback.

#### 3.5.4. Perfil / Configurações
- [ ] **Tela de Perfil do Estabelecimento / Cliente**:
  - Mostrar dados: nome, e-mail, telefone, endereço.
  - Botão “Editar Perfil” para atualizar informações.
  - Avatar ou logo (upload).
- [ ] **Configurações de Conta**:
  - Alterar senha.
  - Preferências (notificações, tema).

#### 3.5.5. Conexão com iFood (futuro)
- [ ] **Integração com API do iFood**:
  - Configurar autenticação OAuth (se necessário).
  - Sincronizar menu e pedidos com iFood.
  - Endpoints para receber webhooks de pedido do iFood.
- [ ] **Interface de Configuração**:
  - Tela para habilitar/desabilitar integração, inserir credenciais (iFood App Key/Secret).
  - Mostrar status de conexão e logs mínimos.

### 3.6. Testes (Frontend)
- [ ] **Unitários** (Jest + RTL)
  - Testar componentes isolados (renders, props, interações simples).
  - Testar hooks personalizados (ex.: formHook).
- [ ] **Integração / E2E** (Cypress ou Playwright)
  - Rotas principais: login, cadastro de categoria/produto, criação de pedido.
  - Fluxo crítico completo (criar categoria → criar produto → criar pedido → mudar status).
- [ ] **Cobertura mínima**:
  - Objetivo 60% para unitários, 80% para fluxos críticos.

### 3.7. UI / UX
- [ ] **Responsividade**
  - Testar em breakpoints: mobile (`< 640px`), tablet (`640px–1024px`), desktop.
  - Ajustar grids e stacks para diferentes larguras.
- [ ] **Acessibilidade (A11y)**
  - Usar `aria-label`, `alt` em imagens.
  - Verificar contraste de cores (ferramentas automáticas).
  - Navegação por teclado (tabindex).
- [ ] **Design System / Component Library**
  - Se usar Tailwind + UI kit (shadcn/ui), garantir consistência de cores e tipografia.
  - Documentar componentes reutilizáveis (botões, modais, formulários).
- [ ] **Feedback Visual**
  - Spinners/Loaders em requisições.
  - Skeleton screens em listas longas.
  - Toasts ou snackbars personalizados (ex.: react-toastify).

---

## 4. Front-end Mobile (React Native / Expo)

### 4.1. Estrutura Geral
- [ ] Configurar projeto (Expo ou React Native CLI com TypeScript).
- [ ] Pastas recomendadas:
  - `src/components/`
  - `src/screens/`
  - `src/navigation/` (React Navigation)
  - `src/hooks/`
  - `src/store/` (Redux Toolkit)
  - `src/services/api/` (fetch/axios)
  - `src/styles/` (tailwind-rn ou StyleSheet)
  - `src/utils/`

### 4.2. Autenticação
- [ ] **Tela de Login / Cadastro** (Client e Estabelecimento):
  - Input de e-mail, senha.
  - Botão “Entrar” / “Cadastrar” → rotas públicas.
- [ ] **Persistência de Sessão**:
  - Armazenar token JWT em `SecureStore` ou `AsyncStorage`.
  - Verificar token existente ao iniciar app (Splash Screen).
- [ ] **Rota Protegida**:
  - Usar stack navigator para fluxo autenticado vs. não autenticado.

### 4.3. Pedidos
- [ ] **Lista de Pedidos (Cliente)**
  - Mostrar pedidos em status “Pendente”, “Em Produção”, “Pronto”.
  - Modal ou tela de detalhes com itens, total, tempo estimado.
  - Botão “Cancelar Pedido” se status for `Pendente`.
- [ ] **Lista de Pedidos (Estabelecimento)**
  - Similar ao web: filtro por status, ações rápidas (mudar status).
  - Push notifications (via Expo Notifications) para novo pedido ou mudanças de status.
- [ ] **Fluxo de Checkout (Cliente)**
  - Seleção de produtos, resumo do carrinho, pagamento (simulado ou integração futura).
  - Confirmação de pedido.

### 4.4. Produto / Cardápio
- [ ] **Tela de Categorias**
  - Lista scrollable de categorias (ícones e nome).
  - Ao tocar em categoria, navegar para lista de produtos daquela categoria.
- [ ] **Tela de Produtos**
  - Exibir lista de produtos com imagem, nome, preço.
  - Botão “Adicionar ao Carrinho” com seleção de quantidade.
- [ ] **Carrinho de Compras**
  - Lista de itens selecionados, campo de observações.
  - Botão “Finalizar Pedido”.

### 4.5. Perfil / Configurações
- [ ] **Tela de Perfil**
  - Exibir e permitir editar dados do usuário/estabelecimento.
  - Botão “Sair” (limpar token).
- [ ] **Preferências**
  - Notificações (ativas/inativas).
  - Tema (light/dark).

### 4.6. Estado Global (Redux Toolkit)
- [ ] Slices:
  - `authSlice` (token, user, loading, error).
  - `categorySlice` (lista de categorias).
  - `productSlice` (lista de produtos).
  - `cartSlice` (itens do carrinho).
  - `orderSlice` (pedidos do usuário/estabelecimento).
- [ ] Integração com Async Thunks ou RTK Query para chamadas à API.
- [ ] Persistência de parte do store (cart, auth) usando `redux-persist`.

### 4.7. UI / UX e Navegação
- [ ] **React Navigation**:
  - Stack para autenticação (Login, Cadastro).
  - Bottom Tabs ou Drawer para fluxo autenticado (Menu, Pedidos, Perfil).
  - Modals para detalhes de pedido ou confirmação de ação.
- [ ] **Estilos Responsivos**:
  - Ajustar tamanhos, margens para diferentes tamanhos de tela.
  - Usar `Dimensions` ou percentuais em StyleSheet.
- [ ] **Acessibilidade (A11y Mobile)**
  - Usar `accessibilityLabel` e `accessible` em componentes.
  - Garantir bom contraste.
- [ ] **Feedback tátil**:
  - Haptics (vibração leve) em botões de ação importante (ex.: “Finalizar Pedido”).
  - Indicadores de carregamento (ActivityIndicator).

### 4.8. Testes (Mobile)
- [ ] **Unitários** (Jest)
  - Testar reducers, actions, hooks.
  - Testar componentes simples (sem renderização nativa complexa).
- [ ] **E2E** (Detox ou Appium)
  - Fluxo de login → ver categorias → adicionar ao carrinho → finalizar pedido.
  - Fluxo de estabelecimento: login → ver novo pedido → mudar status.

---

## 5. Infraestrutura & DevOps
- [ ] **Ambientes de Configuração**
  - `.env.development`, `.env.staging`, `.env.production`.
  - Garantir que cada ambiente tenha suas chaves/URLs corretas.
- [ ] **Containerização**
  - `Dockerfile` para backend.
  - `docker-compose.yml` para orquestrar MongoDB + API local.
- [ ] **CI/CD**
  - Configurar GitHub Actions, GitLab CI ou Bitbucket Pipelines para:
    - Executar `npm ci`, `npm test`, `npm run lint`.
    - Buildar imagens Docker e enviar para registry (Docker Hub ou registry privado).
    - Deploy automático em staging após merge em `develop`.
    - Deploy em produção após merge em `main`.
- [ ] **Monitoramento & Logs**
  - Backend: Winston ou Bunyan, enviando logs para serviço central (ex.: Loggly, Datadog).
  - Frontend Web: Sentry (capturar erros em produção).
  - Configurar healthchecks (ping endpoint) no Kubernetes ou contêiner de monitoramento.

---

## 6. Qualidade & Segurança
- [ ] **Análise Estática de Código**
  - Executar ESLint, TS type-check em cada PR.
  - Usar SonarCloud ou Coverity para busca de vulnerabilidades.
- [ ] **Auditoria de Dependências**
  - `npm audit fix` regularmente.
  - Revisar CVEs em dependências críticas (Express, Mongoose, etc.).
- [ ] **Políticas de CORS**
  - Configurar CORS apenas nos domínios necessários.
  - Habilitar cabeçalhos seguros e limitar métodos HTTP.
- [ ] **Segurança de Senhas**
  - Armazenar senhas com `bcrypt` (ou `argon2`).
  - Políticas de senha (mínimo de caracteres, complexidade).
- [ ] **Proteção contra Ataques**
  - Rate limiting (ex.: `express-rate-limit`) em endpoints de login.
  - Sanitização de inputs (para evitar NoSQL Injection, XSS).
  - Helmet para cabeçalhos de segurança.
- [ ] **Backup de Dados**
  - Rotinas agendadas para backup do banco (ex.: serviço diário de dump do MongoDB).
  - Testar restauração de backup periodicamente.

---

## 7. Documentação Geral do Projeto
- [ ] **README Principal**
  - Visão geral do sistema (API, Frontend Web, Mobile).
  - Diagrama simples de fluxos (opcional).
  - Como clonar, instalar, rodar localmente.
  - Endpoints principais (links para Swagger).
- [ ] **Wiki ou Confluence (opcional)**
  - Detalhamento de arquitetura (documentos separados para API, Web, Mobile).
  - Guias de contribuição (commit messages, branching strategy).
- [ ] **Changelog**
  - Manter `CHANGELOG.md` com alterações de versão, correções e novos recursos.
- [ ] **Roadmap de Funcionalidades Futuras**
  - Integração com iFood.
  - Dashboard de analytics (vendas, clientes mais frequentes).
  - Módulo de pagamento (Stripe, PayPal, PIX).
  - Multi-idioma (i18n) no frontend.

---

## 8. Testes de Usabilidade e Feedback
- [ ] **Teste de UX**
  - Convidar 2–3 usuários (estabelecimentos e clientes) para testar fluxo de pedidos.
  - Coletar feedback sobre usabilidade do menu, criação de pedidos e interface geral.
- [ ] **Ajustes de Design**
  - Baseado em feedback, corrigir pontos de atrito (ex.: fluxo de checkout longo, botões pequenos).
- [ ] **Versão Beta**
  - Lançar para um grupo restrito de estabelecimentos para testar integração real (iFood, WebSocket).
  - Monitorar performance (tempo de resposta, consumo de dados).

---

### Observações Finais
- Esta lista é um ponto de partida abrangente. Conforme o projeto amadurecer, itens podem ser movidos para um roadmap ou backlog específico.
- Reavalie prioridades semanalmente, marcando tarefas concluídas e ajustando estimates de esforço quando necessário.

```
