# AGENTS.md — Diretrizes de Uso de Inteligência Artificial

## Sobre este documento

Este arquivo documenta a utilização de assistentes de Inteligência Artificial durante o desenvolvimento do projeto **Coffee Delivery**, conforme exigido pelos critérios avaliativos da disciplina de SPA.

---

## Ferramenta de IA Utilizada

**Antigravity (powered by Google DeepMind)**  
Interface: IDE Antigravity com agente conversacional  
Modelo: Claude Sonnet (Thinking)

---

## Como o Assistente de IA foi Utilizado

### 1. Planejamento e Arquitetura
- Discussão da estrutura de pastas e organização dos módulos
- Definição das interfaces TypeScript (`Coffee`, `CartItem`, `Order`)
- Decisão sobre `Context API + useReducer` vs bibliotecas externas (Redux, Zustand)
- Planejamento do fluxo de dados: catálogo → carrinho → checkout → confirmação

### 2. Implementação
- Geração da estrutura inicial do projeto (configuração Vite, tsconfig, package.json)
- Implementação do `cartReducer` com tipagem discriminada de actions
- Implementação dos Contexts (`CartContext`, `ThemeContext`) com `useReducer` e `useState`
- Criação dos componentes (`Header`, `CoffeeCard`, `QuantityControl`)
- Criação das páginas (`Home`, `Checkout`, `Success`) com CSS Modules
- Integração do `react-hook-form` com `zodResolver` para validação
- Implementação de Dark Mode via variáveis CSS e atributo `data-theme`
- Implementação de responsividade com media queries e CSS Grid/Flexbox

### 3. Revisão e Qualidade
- Revisão de boas práticas: `export default` vs named exports em componentes
- Verificação de acessibilidade: atributos `aria-label` em botões icon-only
- Revisão de tipos TypeScript (evitar `any`, usar uniões discriminadas)
- Verificação de regras do ESLint (react-hooks, react-refresh)

### 4. Documentação
- Geração dos documentos obrigatórios: PRD_SPEC.md, TECH_SPEC.md, TASKS_SPEC.md
- Revisão e formatação do README.md

### 5. Identidade Visual
- Concepção e geração do logo SVG com conceito visual de xícara com vapor + ícone de entrega
- Criação da ilustração SVG da página de sucesso

---

## Diretrizes Éticas de Uso

| Diretriz | Aplicação neste projeto |
|----------|------------------------|
| **Transparência** | Todo código gerado com IA é identificado por commits e por este documento |
| **Revisão humana** | Nenhum código foi aplicado sem revisão e compreensão do desenvolvedor |
| **Aprendizado ativo** | Cada decisão técnica foi discutida com o assistente para fins de aprendizado |
| **Responsabilidade** | O desenvolvedor é responsável por todo o código entregue |
| **Privacidade** | Nenhuma informação pessoal ou sensível foi compartilhada com a IA |

---

## Exemplos de Interação com a IA

### Exemplo 1 — Arquitetura do Reducer
> **Dev:** "Qual a melhor forma de gerenciar o estado do carrinho: useState, useReducer ou Zustand?"  
> **IA:** Recomendou `useReducer` pelo volume de ações relacionadas ao carrinho e pela previsibilidade das transições de estado, mantendo-se fiel aos requisitos do projeto (sem libs externas de estado).

### Exemplo 2 — Validação com Zod
> **Dev:** "Como integrar Zod com React Hook Form?"  
> **IA:** Demonstrou o uso do `zodResolver` do pacote `@hookform/resolvers`, criação do schema com `z.object()` e inferência de tipos com `z.infer<typeof schema>`.

### Exemplo 3 — Dark Mode
> **Dev:** "Como implementar Dark Mode sem framework CSS?"  
> **IA:** Sugeriu a abordagem de variáveis CSS com seletor `[data-theme="dark"]` aplicado no elemento raiz via JavaScript, combinando com `localStorage` para persistência e `matchMedia` para detecção do sistema.

---

## Registro de Commits com IA

Os commits que contêm código gerado ou revisado com apoio de IA são marcados com o sufixo `[IA]` na mensagem de commit.

Exemplo:
```
feat: implementar CartContext com useReducer e LocalStorage [IA]
feat: implementar validação de formulário com Zod e RHF [IA]
feat: implementar Dark Mode com CSS variables [IA]
docs: gerar documentação obrigatória PRD/TECH/TASKS/AGENTS [IA]
```
