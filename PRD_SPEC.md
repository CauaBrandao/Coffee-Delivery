# PRD — Coffee Delivery

> Documento de Requisitos do Produto (Product Requirements Document)

## 1. Visão do Produto

O **Coffee Delivery** é uma aplicação web de e-commerce para uma cafeteria fictícia. Permite ao usuário navegar por um catálogo de cafés, gerenciar um carrinho de compras, informar endereço e forma de pagamento, e finalizar um pedido fictício com confirmação visual.

---

## 2. Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | Exibir catálogo de cafés com nome, descrição, tags, preço e imagem | Alta |
| RF02 | Permitir adicionar café ao carrinho com seleção de quantidade | Alta |
| RF03 | Exibir contador de itens no ícone do carrinho no cabeçalho | Alta |
| RF04 | Permitir visualizar os itens do carrinho na página de checkout | Alta |
| RF05 | Permitir alterar a quantidade de itens diretamente no carrinho | Alta |
| RF06 | Permitir remover itens do carrinho | Alta |
| RF07 | Exibir resumo financeiro: total de itens, taxa de entrega e total final | Alta |
| RF08 | Formulário de endereço com campos: CEP, rua, número, complemento, bairro, cidade, UF | Alta |
| RF09 | Seleção de forma de pagamento: Cartão de Crédito, Débito ou Dinheiro | Alta |
| RF10 | Validar formulário antes de confirmar pedido (React Hook Form + Zod) | Alta |
| RF11 | Exibir página de confirmação com dados da entrega após pedido | Alta |
| RF12 | Persistir itens do carrinho no LocalStorage | Alta |
| RF13 | Alternar entre Dark Mode e Light Mode | Média |
| RF14 | Interface responsiva para mobile, tablet e desktop | Alta |
| RF15 | Logo criada com IA integrada à identidade visual | Média |

---

## 3. Requisitos Não Funcionais

| ID | Descrição |
|----|-----------|
| RNF01 | Desenvolvido em React 18 + TypeScript + Vite |
| RNF02 | Roteamento via React Router DOM v6 |
| RNF03 | Gerenciamento de estado com Context API + useReducer |
| RNF04 | Validação de formulário com React Hook Form + Zod |
| RNF05 | Estilização com CSS Modules + variáveis CSS para temas |
| RNF06 | Ícones via @phosphor-icons/react |
| RNF07 | Fonte tipográfica: Baloo 2 (títulos) e Roboto (corpo) |
| RNF08 | Tempo de carregamento inicial < 3s em conexão 4G |
| RNF09 | Código versionado com Git e publicado no GitHub |
| RNF10 | Publicado em Vercel ou Netlify |

---

## 4. Regras de Negócio

| ID | Regra |
|----|-------|
| RN01 | A taxa de entrega é de R$ 3,50 e só é cobrada quando há itens no carrinho |
| RN02 | A quantidade mínima por item é 1; a máxima é 99 |
| RN03 | Ao adicionar um item já existente, incrementa a quantidade |
| RN04 | O botão "Confirmar Pedido" só funciona com carrinho não-vazio e formulário válido |
| RN05 | Ao finalizar o pedido, o carrinho é zerado e os dados do pedido são preservados em memória/LocalStorage |
| RN06 | Acesso direto a `/success` sem pedido ativo redireciona para `/` |
| RN07 | O tema selecionado é persistido no LocalStorage |
| RN08 | As preferências de tema do sistema operacional são respeitadas na primeira visita |

---

## 5. Critérios de Aceite

### CA01 — Catálogo
- [ ] 14 cafés exibidos com nome, descrição, tags, preço e imagem
- [ ] Tags visuais coloridas por categoria
- [ ] Seletor de quantidade funcional (mín. 1, máx. 99)
- [ ] Botão de adicionar ao carrinho funcional

### CA02 — Carrinho
- [ ] Badge no ícone atualiza em tempo real
- [ ] Itens persistem ao recarregar a página
- [ ] Remover item e alterar quantidade no checkout funcionam

### CA03 — Checkout
- [ ] Formulário valida todos os campos obrigatórios
- [ ] Mensagens de erro descritivas por campo
- [ ] Seleção de pagamento visual e funcional

### CA04 — Confirmação
- [ ] Exibe endereço, forma de pagamento e previsão de entrega
- [ ] Botão de novo pedido retorna ao catálogo

### CA05 — Temas
- [ ] Alternância Light/Dark funcional via botão no header
- [ ] Tema persistido entre sessões

### CA06 — Responsividade
- [ ] Layout funcional em 320px, 768px e 1440px
