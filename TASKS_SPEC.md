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
- [x] Configurar `tsconfig.json` com path aliases (`@/*`)
- [x] Instalar dependências (react-router-dom, react-hook-form, zod, @phosphor-icons/react)
- [x] Configurar `vite.config.ts` com aliases
- [x] Criar estrutura de pastas (`contexts`, `pages`, `components`, `layouts`, `types`, `data`, `utils`, `styles`)
- [x] Configurar CSS global com variáveis para temas (light/dark)
- [x] Configurar fontes (Baloo 2 + Roboto via Google Fonts)
- [x] Adicionar `.gitignore` adequado

---

## Fase 2 — Tipos e Dados ✅

- [x] Definir interfaces TypeScript (`Coffee`, `CartItem`, `Order`, `PaymentMethod`)
- [x] Criar dados estáticos dos 14 cafés em `data/coffees.ts`
- [x] Criar utilitário `formatCurrency`

---

## Fase 3 — Gerenciamento de Estado ✅

- [x] Implementar `cartReducer` com actions: ADD, REMOVE, UPDATE, CLEAR, CHECKOUT
- [x] Implementar `CartContext` com `useReducer`
- [x] Persistência do carrinho no `localStorage`
- [x] Persistência do último pedido no `localStorage`
- [x] Implementar `ThemeContext` com `useState`
- [x] Persistência de tema no `localStorage`
- [x] Detectar `prefers-color-scheme` na primeira visita

---

## Fase 4 — Roteamento ✅

- [x] Configurar `BrowserRouter` no `main.tsx`
- [x] Definir rotas em `App.tsx`: `/`, `/checkout`, `/success`
- [x] Implementar `DefaultLayout` com `Header` + `<Outlet />`

---

## Fase 5 — Componentes Base ✅

- [x] `Header` com logo, link para home, botão carrinho com badge, botão de tema
- [x] `QuantityControl` reutilizável (tamanhos sm/md, props min/max)
- [x] `CoffeeCard` com imagem, tags, nome, descrição, preço, controle de quantidade e botão adicionar

---

## Fase 6 — Páginas ✅

- [x] **Home**: seção hero com perks + grade de cafés
- [x] **Checkout**: formulário de endereço validado + seleção de pagamento + resumo do carrinho
- [x] **Success**: confirmação do pedido com detalhes do endereço, pagamento e previsão

---

## Fase 7 — Responsividade ✅

- [x] Breakpoints definidos: 1440px (desktop), 1024px (laptop), 768px (tablet), 480px (mobile)
- [x] Header responsivo
- [x] Hero responsivo (layout coluna em mobile)
- [x] Grade de cafés responsiva (auto-fill)
- [x] Formulário de checkout em coluna no mobile
- [x] Página de sucesso responsiva

---

## Fase 8 — Dark Mode ✅

- [x] Variáveis CSS para tema escuro em `[data-theme="dark"]`
- [x] Botão de alternância no Header com ícones Sun/Moon
- [x] Suporte a `prefers-color-scheme`
- [x] Persistência no localStorage

---

## Fase 9 — Assets e Identidade Visual ✅

- [x] Logo criada com apoio de IA (SVG personalizado)
- [x] Ícone do site (favicon SVG)
- [x] Ilustração da página de sucesso (SVG)
- [ ] ⏳ Imagens reais dos cafés (download do protótipo Figma)
- [ ] ⏳ Imagem hero do café (download do protótipo Figma)

---

## Fase 10 — Documentação ✅

- [x] `PRD_SPEC.md` — Requisitos do produto
- [x] `TECH_SPEC.md` — Arquitetura e tecnologias
- [x] `TASKS_SPEC.md` — Este documento
- [x] `AGENTS.md` — Diretrizes de uso de IA
- [ ] ⏳ `README.md` — Finalizar com screenshots reais

---

## Fase 11 — Publicação ⏳

- [ ] Criar repositório público no GitHub
- [ ] Realizar push do código
- [ ] Configurar deploy na Vercel ou Netlify
- [ ] Testar aplicação publicada
- [ ] Adicionar links ao README

---

## Fase 12 — Revisão Final ⏳

- [ ] Testar fluxo completo: home → checkout → success
- [ ] Verificar persistência do carrinho (reload)
- [ ] Verificar Dark Mode em todas as páginas
- [ ] Testar em mobile (320px), tablet (768px) e desktop (1440px)
- [ ] Revisão de código com assistente de IA
- [ ] Capturar screenshots para o README
