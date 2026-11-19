# PRD — Coffee Delivery

> Documento de Requisitos do Produto (Product Requirements Document)

## 1. Visão do Produto

O **Coffee Delivery** é uma aplicação web de e-commerce para uma cafeteria fictícia. Permite ao usuário navegar por um catálogo de cafés especiais, realizar buscas e filtragens avançadas, gerenciar um carrinho de compras, personalizar a identidade visual da aplicação através de múltiplos temas e paletas de cores, preencher endereço com consulta automática de CEP, aplicar cupons de desconto, consultar histórico de pedidos e finalizar um pedido fictício com confirmação visual e notificações Toast.

---

## 2. Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | Exibir catálogo de cafés com nome, descrição, tags, preço e imagem vetorial | Alta |
| RF02 | Permitir adicionar café ao carrinho com seleção de quantidade | Alta |
| RF03 | Exibir contador de itens no ícone do carrinho no cabeçalho em tempo real | Alta |
| RF04 | Permitir visualizar os itens do carrinho na página de checkout | Alta |
| RF05 | Permitir alterar a quantidade de itens diretamente no carrinho | Alta |
| RF06 | Permitir remover itens do carrinho | Alta |
| RF07 | Exibir resumo financeiro: total de itens, taxa de entrega, descontos e total final | Alta |
| RF08 | Formulário de endereço com campos: CEP, rua, número, complemento, bairro, cidade, UF | Alta |
| RF09 | Seleção de forma de pagamento: Cartão de Crédito, Débito ou Dinheiro | Alta |
| RF10 | Validar formulário antes de confirmar pedido (React Hook Form + Zod) | Alta |
| RF11 | Exibir página de confirmação com dados da entrega após pedido | Alta |
| RF12 | Persistir itens do carrinho no LocalStorage | Alta |
| RF13 | Alternar entre Dark Mode e Light Mode | Alta |
| RF14 | Interface responsiva para mobile, tablet e desktop | Alta |
| RF15 | Logo criada com IA integrada à identidade visual | Média |
| RF16 | **[Extra]** Seleção de 5 paletas de cores temáticas (Clássico, Matcha, Berry, Caramelo, Cyber) | Média |
| RF17 | **[Extra]** Barra de pesquisa em tempo real por nome, ingredientes ou tags | Média |
| RF18 | **[Extra]** Chips de filtragem rápida por categorias (Tradicionais, Com Leite, Gelados, etc.) | Média |
| RF19 | **[Extra]** Sistema de Favoritos com persistência no navegador | Média |
| RF20 | **[Extra]** Autocompletar de endereço via CEP consumindo a API ViaCEP | Alta |
| RF21 | **[Extra]** Sistema de Cupons de Desconto (`COFFEE10`, `FRETEGRATIS`, `PRIMEIRACOMPRA`) | Média |
| RF22 | **[Extra]** Histórico de Pedidos anteriores acessível via modal "Meus Pedidos" | Média |
| RF23 | **[Extra]** Notificações visuais Toast animadas com ação rápida | Média |

---

## 3. Requisitos Não Funcionais

| ID | Descrição |
|----|-----------|
| RNF01 | Desenvolvido em React 18 + TypeScript + Vite |
| RNF02 | Roteamento SPA via React Router DOM v6 com proteção de rotas |
| RNF03 | Gerenciamento de estado com Context API + useReducer (sem bibliotecas externas) |
| RNF04 | Validação de formulário com React Hook Form + Zod |
| RNF05 | Estilização com CSS Modules + variáveis CSS (tokens) para múltiplos temas |
| RNF06 | Ícones via @phosphor-icons/react |
| RNF07 | Fontes tipográficas: Baloo 2 (títulos) e Roboto (corpo) |
| RNF08 | Tempo de carregamento inicial rápido (< 1s localmente) |
| RNF09 | Código versionado com Git e publicado no GitHub |
| RNF10 | Publicação em plataforma cloud (Vercel ou Netlify) |

---

## 4. Regras de Negócio

| ID | Regra |
|----|-------|
| RN01 | A taxa de entrega é de R$ 3,50 e só é cobrada quando há itens no carrinho |
| RN02 | A quantidade mínima por item é 1; a máxima é 99 |
| RN03 | Ao adicionar um item já existente, incrementa a quantidade |
| RN04 | O botão "Confirmar Pedido" só funciona com carrinho não-vazio e formulário válido |
| RN05 | Ao finalizar o pedido, o carrinho é zerado e o pedido é arquivado no histórico de pedidos |
| RN06 | Acesso direto a `/success` sem pedido ativo redireciona para `/` |
| RN07 | O tema (Light/Dark) e a paleta de cores selecionada são persistidos no LocalStorage |
| RN08 | As preferências de tema do sistema operacional são respeitadas na primeira visita |
| RN09 | O cupom `COFFEE10` concede 10% de desconto sobre o subtotal dos itens |
| RN10 | O cupom `FRETEGRATIS` zera a taxa de entrega de R$ 3,50 |
| RN11 | Cupons inválidos exibem mensagem explicativa sem alterar o total |
| RN12 | A consulta de CEP é disparada automaticamente ao completar 8 dígitos numéricos válidos |

---

## 5. Critérios de Aceite

### CA01 — Catálogo e Filtros
- [x] 14 cafés exibidos com nome, descrição, tags, preço e imagem vetorial
- [x] Barra de pesquisa filtra cafés instantaneamente por digitação
- [x] Chips de categoria filtram catálogo e exibem quantidade de itens
- [x] Botão de favoritar (coração) funciona e persiste no navegador
- [x] Seletor de quantidade funcional (mín. 1, máx. 99)
- [x] Adicionar ao carrinho exibe notificação Toast com link direto

### CA02 — Carrinho
- [x] Badge no ícone atualiza em tempo real com número de itens
- [x] Itens persistem ao recarregar a página via LocalStorage
- [x] Remover item e alterar quantidade no checkout funcionam com recálculo instantâneo

### CA03 — Checkout, Cupons e ViaCEP
- [x] Digitação do CEP preenche automaticamente rua, bairro, cidade e UF
- [x] Validação com Zod bloqueia envio com campos obrigatórios ausentes
- [x] Campo de cupom aceita `COFFEE10` e `FRETEGRATIS` com desconto visualizado no total
- [x] Seleção de forma de pagamento funcional com destaque visual

### CA04 — Confirmação e Histórico
- [x] Exibe endereço, forma de pagamento, previsão de entrega e itens comprados
- [x] Pedido é arquivado no modal "Meus Pedidos" com data e status
- [x] Botão de novo pedido retorna ao catálogo

### CA05 — Temas e Paletas de Cores
- [x] Alternância Light/Dark funcional com suporte a `prefers-color-scheme`
- [x] 5 paletas de cores customizadas aplicáveis a qualquer momento
- [x] Preferências visuais salvas no LocalStorage

### CA06 — Responsividade
- [x] Layout funcional e adaptado em 390px (Mobile), 768px (Tablet) e 1440px (Desktop)
