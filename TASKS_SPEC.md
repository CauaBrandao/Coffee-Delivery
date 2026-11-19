# TASKS SPEC — Coffee Delivery

> Planejamento e Acompanhamento das Tarefas de Implementação

## Legenda

| Ícone | Status |
|-------|--------|
| ✅ | Concluído |
| 🔄 | Em andamento |
| ⏳ | Aguardando |

---

## Fase 1 — Configuração do Projeto ✅

- [x] Inicializar projeto com Vite + React + TypeScript
- [x] Configurar `tsconfig.json` com path aliases (`@/*`) e strict mode
- [x] Instalar dependências core (`react-router-dom`, `react-hook-form`, `zod`, `@hookform/resolvers`, `@phosphor-icons/react`)
- [x] Configurar `vite.config.ts` com aliases e base relative
- [x] Criar estrutura de pastas (`contexts`, `pages`, `components`, `layouts`, `types`, `data`, `utils`, `styles`, `reducers`)
- [x] Configurar CSS global com variáveis para temas (Light / Dark)
- [x] Configurar fontes tipográficas (Baloo 2 para títulos e Roboto para corpo via Google Fonts)
- [x] Configurar `.gitignore` completo

---

## Fase 2 — Tipos e Dados ✅

- [x] Definir interfaces TypeScript estritas (`Coffee`, `CartItem`, `Order`, `OrderAddress`, `PaymentMethod`)
- [x] Criar catálogo estático dos 14 cafés em `src/data/coffees.ts`
- [x] Criar utilitário `formatCurrency` com padrão brasileiro (R$ 0,00)

---

## Fase 3 — Gerenciamento de Estado ✅

- [x] Implementar `cartReducer` com actions tipadas: `ADD_TO_CART`, `REMOVE_FROM_CART`, `UPDATE_QUANTITY`, `CLEAR_CART`, `CHECKOUT`
- [x] Implementar `CartContext` com `useReducer`
- [x] Persistência do carrinho no `localStorage` (`coffee-delivery:cart-v1`)
- [x] Persistência do último pedido no `localStorage` (`coffee-delivery:last-order-v1`)
- [x] Implementar `ThemeContext` com `useState` e suporte a Light / Dark
- [x] Persistência da preferência de tema no `localStorage` (`coffee-delivery:theme`)
- [x] Detecção automática de `prefers-color-scheme: dark` do sistema operacional

---

## Fase 4 — Roteamento SPA ✅

- [x] Configurar roteador no `src/main.tsx`
- [x] Definir rotas da aplicação em `src/App.tsx`: `/` (Home), `/checkout` (Checkout), `/success` (Sucesso)
- [x] Implementar `DefaultLayout` com `Header` fixo e `<Outlet />`
- [x] Proteção de rota em `/success`: redireciona para a Home caso não exista pedido finalizado

---

## Fase 5 — Componentes Reutilizáveis ✅

- [x] `Header`: logo com link para home, alternador de tema (ícones Sun/Moon), botão do carrinho com contador/badge
- [x] `QuantityControl`: seletor de quantidade reutilizável (-/+) com suporte a tamanhos `sm` e `md`
- [x] `CoffeeCard`: card individual com imagem do café, tags estilizadas, nome, descrição, preço formatado, controle de quantidade e botão de adicionar

---

## Fase 6 — Páginas da Aplicação ✅

- [x] **Home**:
  - [x] Seção Hero com título, subtítulo e lista de 4 diferenciais com ícones coloridos
  - [x] Ilustração do copo de café no banner Hero
  - [x] Grade responsiva com os 14 cafés do catálogo
- [x] **Checkout**:
  - [x] Formulário de Endereço com 7 campos (CEP, Rua, Número, Complemento, Bairro, Cidade, UF)
  - [x] Validação completa com Zod e React Hook Form com exibição de erros por campo
  - [x] Seleção visual da forma de pagamento (Cartão de Crédito, Débito, Dinheiro)
  - [x] Resumo lateral dos cafés selecionados com controle de quantidade e botão "Remover"
  - [x] Cálculo automático de subtotal, taxa de entrega (R$ 3,50) e total geral
  - [x] Estado de carrinho vazio com mensagem informativa e botão para voltar ao catálogo
- [x] **Success**:
  - [x] Mensagem de confirmação "Uhu! Pedido confirmado"
  - [x] Card com borda gradiente (amarelo e roxo) exibindo endereço, previsão de tempo e pagamento
  - [x] Ilustração do entregador em scooter
  - [x] Botão para iniciar novo pedido

---

## Fase 7 — Responsividade ✅

- [x] Breakpoints implementados: 1440px (Desktop), 1024px (Laptop), 768px (Tablet), 480px / 390px (Mobile)
- [x] Header com layout flexível e espaçamento adaptado
- [x] Seção Hero adaptada para coluna única em telas menores
- [x] Grade de cafés fluida (`repeat(auto-fill, minmax(...))`)
- [x] Formulário de checkout reorganizado em coluna única no mobile
- [x] Resumo do carrinho com scroll e layout verticalizado

---

## Fase 8 — Dark Mode ✅

- [x] Variáveis CSS configuradas em `:root` (Light) e sobrescritas em `[data-theme="dark"]`
- [x] Alternância instantânea via botão no cabeçalho com ícones contextuais
- [x] Suporte automático a `prefers-color-scheme`
- [x] Persistência no `localStorage`

---

## Fase 9 — Assets e Identidade Visual ✅

- [x] Logotipo original criado com apoio de IA (SVG com xícara, vapor e ícone de entrega)
- [x] Favicon (`coffee-icon.svg`) integrado ao `index.html`
- [x] Vetores SVG personalizados para os 14 cafés do catálogo com detalhes individuais (crema, folhas de latte art, canela, cubos de gelo, etc.)
- [x] Ilustração SVG do copo de café com aura no banner Hero
- [x] Ilustração SVG do entregador com scooter na página de confirmação

---

## Fase 10 — Documentação Obrigatória ✅

- [x] `PRD_SPEC.md` — Requisitos do produto, regras de negócio e critérios de aceite
- [x] `TECH_SPEC.md` — Arquitetura de software, stack, estado global e testes
- [x] `TASKS_SPEC.md` — Este documento atualizado
- [x] `AGENTS.md` — Diretrizes éticas e registro das interações com a IA
- [x] `README.md` — Apresentação completa com evidências visuais e instruções de execução

---

## Fase 11 — Captura de Evidências (Screenshots) ✅

- [x] Script automatizado de captura via Chrome Headless
- [x] `home-light.png`: Catálogo completo no tema claro
- [x] `home-dark.png`: Catálogo completo no tema escuro
- [x] `checkout.png`: Carrinho com itens e formulário preenchido
- [x] `success.png`: Página de pedido confirmado
- [x] `mobile.png`: Visualização responsiva em viewport mobile (390px)

---

## Fase 12 — Revisão e Build Final ✅

- [x] Teste de tipagem TypeScript (`tsc`) sem erros
- [x] Build de produção (`vite build`) gerado com sucesso em `dist/`
- [x] Teste de carregamento e navegação entre todas as rotas
- [x] Validação da persistência no `localStorage`
