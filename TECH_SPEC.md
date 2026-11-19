# TECH SPEC — Coffee Delivery

> Especificação Técnica da Arquitetura

## 1. Stack Tecnológica

| Tecnologia | Versão | Função |
|------------|--------|--------|
| React | 18.3 | UI Library (Functional Components + Hooks) |
| TypeScript | 5.4 | Tipagem estática rigorosa em strict mode |
| Vite | 5.4 | Build tool, HMR e dev server de alta performance |
| React Router DOM | 6.23 | Roteamento SPA declarativo com proteção de rotas |
| React Hook Form | 7.51 | Controle performático de formulários sem re-renders |
| Zod | 3.23 | Validação de schema com inferência estática de tipos |
| @hookform/resolvers | 3.3 | Integração nativa entre Zod e React Hook Form |
| @phosphor-icons/react | 2.1 | Ícones SVG semânticos |
| CSS Modules | Nativo | Estilização com escopo isolado por componente |
| ViaCEP REST API | Externa | Consulta assíncrona de logradouro via CEP brasileiro |

---

## 2. Arquitetura da Aplicação

```
src/
├── App.tsx                     # Definição e proteção das rotas principais
├── main.tsx                    # Entry point e hierarquia de Providers
├── contexts/
│   ├── CartContext.tsx         # Carrinho, cupons, favoritos e histórico de pedidos
│   ├── ThemeContext.tsx        # Modo Light/Dark e 5 paletas de cores dinâmicas
│   └── ToastContext.tsx        # Sistema de notificações Toast animadas
├── reducers/
│   └── cartReducer.ts          # Redutor de estado do carrinho (ações tipadas)
├── types/
│   └── coffee.ts               # Interfaces TypeScript centrais
├── data/
│   └── coffees.ts              # Catálogo estático dos 14 tipos de cafés
├── layouts/
│   └── DefaultLayout/          # Layout compartilhado com Header fixo e Outlet
├── pages/
│   ├── Home/                   # Hero banner, busca instantânea, chips de filtro e catálogo
│   ├── Checkout/               # Formulário ViaCEP, seleção de pagamento, cupom e resumo
│   └── Success/                # Confirmação do pedido com detalhes e resumo de itens
├── components/
│   ├── Header/                 # Topbar fixa com logo, seletor de tema, pedidos e carrinho
│   ├── CoffeeCard/             # Card individual com botão favoritar, quantidade e adicionar
│   ├── OrdersModal/            # Modal de histórico dos pedidos anteriores
│   ├── QuantityControl/        # Controle numérico reutilizável (-/+)
│   └── ThemeSelector/          # Popover de escolha de temas e paletas de cores
├── utils/
│   └── formatCurrency.ts        # Formatação monetária BRL (R$ 0,00)
└── styles/
    └── global.css              # Tokens CSS, variáveis dos temas e reset
```

---

## 3. Gerenciamento de Estado Global

A aplicação adota a **Context API nativa do React** combinada com `useReducer` e `useState`, sem bibliotecas externas pesadas, cumprindo estritamente os requisitos acadêmicos da disciplina.

### CartContext + useReducer
Gerencia as operações do carrinho com fluxo unidirecional e ações discriminadas:

```typescript
type CartAction =
  | { type: 'ADD_TO_CART';    payload: { coffee: Coffee; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY';  payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'CHECKOUT';       payload: { order: Order } }
```

**Funcionalidades avançadas integradas ao CartContext:**
- **Persistência dupla**: Sincronização automática em `localStorage` para itens (`coffee-delivery:cart-v1`), último pedido (`coffee-delivery:last-order-v1`), histórico (`coffee-delivery:orders-history-v1`) e favoritos (`coffee-delivery:favorites-v1`).
- **Engine de Cupons**: Cálculo em tempo real de descontos percentuais (`COFFEE10` = -10%), frete grátis (`FRETEGRATIS` = -R$ 3,50) e valores fixos (`PRIMEIRACOMPRA` = -R$ 5,00).

### ThemeContext (Sistema Multi-Temas)
Controla o modo de exibição (`'light' | 'dark'`) e a paleta de cores ativa:
- `classic`: Ouro / Amarelo + Roxo
- `matcha`: Verde Esmeralda + Menta
- `berry`: Rosa Rubi + Coral
- `caramel`: Âmbar Caramelo + Mocha
- `cyber`: Ciano Elétrico + Violeta Neon

O tema é injetado diretamente no elemento raiz (`<html data-theme="..." data-palette="...">`), propagando as variáveis CSS correspondentes para todos os componentes.

### ToastContext
Provê a função `showToast(text, actionLabel?, onAction?)` em qualquer parte da árvore de componentes, exibindo alertas não-bloqueantes com temporizador automático de 3,5 segundos.

---

## 4. Integração com API Externa (ViaCEP)

No checkout, um `useEffect` monitora o campo `cep`. Ao atingir 8 caracteres numéricos, dispara uma requisição `fetch` assíncrona para a API pública ViaCEP:

```typescript
fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
  .then(res => res.json())
  .then(data => {
    if (!data.erro) {
      setValue('street', data.logradouro)
      setValue('neighborhood', data.bairro)
      setValue('city', data.localidade)
      setValue('state', data.uf)
    }
  })
```

A interface exibe um indicador de carregamento (`Spinner`) e notificação Toast de confirmação.

---

## 5. Roteamento e Proteção de Rotas

```
/           → Home (Hero, Busca, Filtros, Catálogo)
/checkout   → Checkout (Formulário ViaCEP, Pagamento, Cupom, Resumo)
/success    → Confirmação do Pedido (Guarda de rota ativa)
```

**Guarda de rota:** A página `/success` valida a existência de `lastOrder`. Caso nulo, redireciona o usuário imediatamente para a rota raiz `/`.

---

## 6. Validação de Formulário com Zod

```typescript
const checkoutSchema = z.object({
  cep:          z.string().min(8, 'CEP inválido').max(9),
  street:       z.string().min(3, 'Rua obrigatória'),
  number:       z.string().min(1, 'Número obrigatório'),
  complement:   z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro obrigatório'),
  city:         z.string().min(2, 'Cidade obrigatória'),
  state:        z.string().length(2, 'UF inválida'),
  payment:      z.enum(['credit', 'debit', 'cash']),
})
```

---

## 7. Estratégia de Testes

| Camada | Ferramenta | Escopo de Teste |
|--------|------------|-----------------|
| Tipagem Estática | TypeScript `tsc --noEmit` | Validação estrita de contratos e props |
| Compilação e Bundling | Vite Build | Resolução de módulos e minificação de CSS/JS |
| Formulários e Schemas | Zod + React Hook Form | Validação de formatos e mensagens de erro |
| Responsividade | Viewports 390px, 768px, 1440px | Verificação de grids flexíveis e quebras de linha |
| Persistência | LocalStorage API | Hidratação e restauração de dados entre sessões |
| Captura de Evidências | Chrome Headless | Geração de screenshots comparativos de todos os temas |
