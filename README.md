<div align="center">

<img src="public/logo.svg" alt="Coffee Delivery Logo" width="80" />

# ☕ Coffee Delivery

**E-commerce de cafeteria fictícia — Projeto Final SPA**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[🌐 Demo ao vivo](#) · [📋 Figma](https://www.figma.com/design/yGPNTA0Yczb183EikXGIiA/) · [📄 Documentação](#documentação)

</div>

---

## 📋 Sobre o Projeto

O **Coffee Delivery** é uma aplicação web de e-commerce para uma cafeteria fictícia, desenvolvida como projeto final da disciplina de **Single Page Application (SPA)**. A aplicação permite ao usuário navegar pelo catálogo de cafés, gerenciar um carrinho de compras, informar endereço e forma de pagamento e finalizar um pedido com confirmação visual.

---

## ✨ Funcionalidades

- 🛒 **Catálogo de cafés** — 14 tipos com nome, descrição, tags e preço
- ➕ **Carrinho de compras** — adicionar, remover e ajustar quantidades
- 💾 **Persistência** — carrinho salvo no `localStorage`
- 📋 **Checkout** — formulário de endereço e seleção de pagamento
- ✅ **Validação** — React Hook Form + Zod com mensagens de erro
- 🎉 **Confirmação** — página de sucesso com detalhes do pedido
- 🌙 **Dark Mode** — alternância Light/Dark com persistência
- 📱 **Responsivo** — mobile, tablet e desktop

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| React 18 | UI Library |
| TypeScript 5 | Tipagem estática |
| Vite 5 | Build tool |
| React Router DOM 6 | Roteamento SPA |
| React Hook Form 7 | Formulários |
| Zod 3 | Validação de schema |
| Context API + useReducer | Gerenciamento de estado |
| CSS Modules | Estilização com escopo |
| @phosphor-icons/react | Ícones |

---

## 🚀 Rodando o projeto

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/coffee-delivery.git

# Entre na pasta
cd coffee-delivery

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

### Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Análise estática (ESLint) |

---

## 📁 Estrutura do Projeto

```
coffee-delivery/
├── public/                   # Assets estáticos
│   ├── logo.svg              # Logo (criada com IA)
│   └── images/coffees/       # Imagens dos cafés
├── src/
│   ├── contexts/             # CartContext + ThemeContext
│   ├── reducers/             # cartReducer (useReducer)
│   ├── types/                # Interfaces TypeScript
│   ├── data/                 # Dados dos cafés
│   ├── layouts/              # DefaultLayout
│   ├── pages/                # Home, Checkout, Success
│   ├── components/           # Header, CoffeeCard, QuantityControl
│   ├── utils/                # formatCurrency
│   └── styles/               # global.css (variáveis + reset)
├── PRD_SPEC.md               # Requisitos do produto
├── TECH_SPEC.md              # Especificação técnica
├── TASKS_SPEC.md             # Planejamento de tarefas
└── AGENTS.md                 # Diretrizes de uso de IA
```

---

## 📄 Documentação

| Documento | Descrição |
|-----------|-----------|
| [PRD_SPEC.md](PRD_SPEC.md) | Requisitos funcionais, não funcionais e critérios de aceite |
| [TECH_SPEC.md](TECH_SPEC.md) | Arquitetura, componentes e estratégia de testes |
| [TASKS_SPEC.md](TASKS_SPEC.md) | Planejamento e acompanhamento de tarefas |
| [AGENTS.md](AGENTS.md) | Uso de IA no desenvolvimento |

---

## 🤖 IA no Desenvolvimento

Este projeto foi desenvolvido com apoio do assistente **Antigravity (Google DeepMind)** nas fases de planejamento, implementação, revisão e documentação. Consulte o [AGENTS.md](AGENTS.md) para detalhes sobre como a IA foi utilizada de forma responsável e transparente.

---

## 📱 Screenshots

> _Screenshots serão adicionadas após o deploy_

| Home (Light) | Home (Dark) |
|:---:|:---:|
| ![Home Light](#) | ![Home Dark](#) |

| Checkout | Confirmação |
|:---:|:---:|
| ![Checkout](#) | ![Success](#) |

---

## 👨‍💻 Desenvolvido por

Projeto acadêmico — Disciplina de Single Page Application (SPA)  
Curso de Desenvolvimento Web — 2026

---

<div align="center">
  <sub>Feito com ☕ e muito TypeScript</sub>
</div>
