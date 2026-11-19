# TECH SPEC — Coffee Delivery

> Especificação Técnica da Arquitetura

## 1. Stack Tecnológica

| Tecnologia | Versão | Função |
|------------|--------|--------|
| React | 18.3 | UI Library |
| TypeScript | 5.4 | Tipagem estática |
| Vite | 5.2 | Build tool e dev server |
| React Router DOM | 6.23 | Roteamento SPA |
| React Hook Form | 7.51 | Gerenciamento de formulários |
| Zod | 3.23 | Validação de schema |
| @phosphor-icons/react | 2.1 | Ícones SVG |
| CSS Modules | — | Estilização com escopo |

---

## 2. Arquitetura da Aplicação

```
src/
├── App.tsx                    # Roteamento principal
├── main.tsx                   # Entry point, Providers
├── contexts/
│   ├── CartContext.tsx         # Estado global do carrinho
│   └── ThemeContext.tsx        # Estado do tema (light/dark)
├── reducers/
│   └── cartReducer.ts          # Lógica de redução do carrinho
├── types/
│   └── coffee.ts               # Interfaces TypeScript
├── data/
│   └── coffees.ts              # Dados estáticos dos cafés
├── layouts/
│   └── DefaultLayout/          # Layout com Header + Outlet
├── pages/
│   ├── Home/                   # Catálogo + Hero
│   ├── Checkout/               # Formulário + Resumo
│   └── Success/                # Confirmação do pedido
├── components/
│   ├── Header/                 # Navegação + Carrinho + Tema
│   ├── CoffeeCard/             # Card individual de café
│   └── QuantityControl/        # Seletor de quantidade reutilizável
├── utils/
│   └── formatCurrency.ts       # Formatar valores monetários
└── styles/
    └── global.css              # Variáveis CSS + Reset
```

---

## 3. Gerenciamento de Estado

### CartContext + useReducer

O estado global do carrinho é gerenciado com `useReducer` dentro de `CartContext`:

```typescript
type CartAction =
  | { type: 'ADD_TO_CART';    payload: { coffee: Coffee; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY';  payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'CHECKOUT';       payload: { order: Order } }
```

**Persistência:** `useEffect` sincroniza `cartItems` e `lastOrder` no `localStorage` a cada mudança.

**Inicialização lazy:** o `useReducer` usa a função inicializadora para hidratar o estado a partir do `localStorage` na primeira renderização.

### ThemeContext

Gerencia o tema (`'light' | 'dark'`) com `useState`. O tema é aplicado via atributo `data-theme` no `<html>` e persistido no `localStorage`. Na primeira visita, respeita `prefers-color-scheme`.

---

## 4. Roteamento

```
/           → Home (catálogo + hero)
/checkout   → Checkout (formulário + resumo)
/success    → Confirmação do pedido
```

Todas as rotas compartilham o `DefaultLayout` que renderiza o `Header` fixo.

Guarda de rota: a página `/success` redireciona para `/` se `lastOrder` estiver nulo.

---

## 5. Componentes Reutilizáveis

### `<QuantityControl />`
- Props: `quantity`, `onIncrease`, `onDecrease`, `min`, `max`, `size`
- Usado em: `CoffeeCard` (catálogo) e `Checkout` (carrinho)

### `<CoffeeCard />`
- Exibe informações do café e integra `QuantityControl`
- Chama `addToCart` do `CartContext` ao clicar no botão

### `<Header />`
- Lê `cartCount` do `CartContext`
- Lê e alterna `theme` do `ThemeContext`

---

## 6. Validação de Formulário

```typescript
const checkoutSchema = z.object({
  cep:          z.string().min(8),
  street:       z.string().min(3),
  number:       z.string().min(1),
  complement:   z.string().optional(),
  neighborhood: z.string().min(2),
  city:         z.string().min(2),
  state:        z.string().length(2),
  payment:      z.enum(['credit', 'debit', 'cash']),
})
```

O resolver Zod é passado ao `useForm`, que fornece `register`, `handleSubmit` e `formState.errors`.

---

## 7. Temas com CSS Variables

As variáveis CSS são definidas em `:root` (tema claro) e sobrescritas em `[data-theme="dark"]`.  
O `ThemeProvider` aplica o atributo no elemento `<html>`:

```typescript
document.documentElement.setAttribute('data-theme', theme)
```

---

## 8. Estratégia de Testes

| Tipo | Ferramenta | Cobertura alvo |
|------|------------|----------------|
| Testes manuais | Navegador | Fluxo completo end-to-end |
| Validação de tipos | TypeScript strict | 100% do código-fonte |
| Validação de formulário | Zod + RHF | Todos os campos do checkout |
| Verificação de responsividade | DevTools + breakpoints | 320px, 768px, 1024px, 1440px |
| Dark Mode | Atributo data-theme | Todos os componentes |
