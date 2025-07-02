# Documentação Técnica das Interfaces - GuardDrive FleetShield

## Metadados

- **Projeto**: GuardDrive FleetShield
- **Componente**: Interfaces de Usuário (Frontend)
- **Versão**: 1.0
- **Data**: 02/06/2025
- **Status**: Documento Técnico

## 1. Introdução

Este documento descreve a arquitetura, componentes, fluxos e design system das interfaces de usuário do GuardDrive FleetShield. O sistema possui duas interfaces principais:

1. **Interface ESG + Tokenização**: Voltada para usuários finais (motoristas, gestores de sustentabilidade), focada em gamificação, impacto ambiental e gestão de tokens.
2. **Interface de Controle Técnico e Operacional**: Voltada para usuários B2B (gestores de frota, técnicos, administradores), focada em gestão de dispositivos, visualização de dados, configuração e auditoria.

Ambas as interfaces são desenvolvidas como aplicações web responsivas, garantindo acesso em desktops, tablets e dispositivos móveis.

### 1.1. Propósito

- Documentar a arquitetura e tecnologias do frontend
- Descrever os principais componentes e bibliotecas utilizadas
- Detalhar os fluxos de usuário para cada interface
- Apresentar o Design System GuardDrive
- Guiar a integração com o backend e APIs

### 1.2. Público-Alvo

- Desenvolvedores Frontend
- Designers UI/UX
- Equipes de QA
- Arquitetos de Software
- Gestores de Produto

## 2. Arquitetura Frontend

### 2.1. Visão Geral

A arquitetura frontend é baseada em um monorepo utilizando **Nx (Nrwl Extensions)** para gerenciar múltiplas aplicações e bibliotecas compartilhadas. A tecnologia principal é **React** com **TypeScript**.

```
┌─────────────────────────────────────────────────────────┐
│                 Monorepo Nx - GuardDrive UI             │
├──────────────────────────┬──────────────────────────────┤
│          apps/           │            libs/             │
│  ┌─────────────────────┐ │  ┌─────────────────────────┐ │
│  │  interface-esg      │ │  │  ui-components          │ │
│  ├─────────────────────┤ │  ├─────────────────────────┤ │
│  │  interface-tecnica  │ │  │  data-access            │ │
│  └─────────────────────┘ │  ├─────────────────────────┤ │
│                          │  │  utils                  │ │
│                          │  ├─────────────────────────┤ │
│                          │  │  auth                   │ │
│                          │  ├─────────────────────────┤ │
│                          │  │  feature-esg-dashboard  │ │
│                          │  ├─────────────────────────┤ │
│                          │  │  feature-fleet-control│ │
│                          │  └─────────────────────────┘ │
└──────────────────────────┴──────────────────────────────┘
```

### 2.2. Tecnologias Principais

- **Framework**: React 18+ (com Hooks e Context API)
- **Linguagem**: TypeScript 4.8+
- **Gerenciador de Estado**: Zustand (simples e eficiente)
- **Roteamento**: React Router 6+
- **Estilização**: Tailwind CSS 3+ (utility-first) + CSS Modules (para componentes complexos)
- **Componentes UI**: Biblioteca interna (`libs/ui-components`) baseada em Headless UI e Radix UI
- **Formulários**: React Hook Form + Zod (para validação)
- **Requisições HTTP**: Axios (com interceptors para autenticação e erros)
- **Gráficos e Visualizações**: Recharts, Mapbox GL JS
- **Testes**: Jest + React Testing Library (unitários e integração), Cypress (end-to-end)
- **Build Tool**: Vite
- **Monorepo**: Nx

### 2.3. Estrutura de Diretórios (Exemplo: `apps/interface-tecnica`)

```
apps/interface-tecnica/
├── src/
│   ├── app/
│   │   ├── App.tsx             # Componente raiz
│   │   ├── global.css          # Estilos globais
│   │   ├── routes.tsx          # Definição de rotas
│   │   └── store.ts            # Configuração do Zustand
│   ├── assets/                 # Imagens, fontes, etc.
│   ├── components/             # Componentes específicos da aplicação
│   ├── features/               # Módulos funcionais (ex: device-management)
│   │   └── device-management/
│   │       ├── api/            # Funções de API específicas
│   │       ├── components/     # Componentes da feature
│   │       ├── hooks/          # Hooks específicos da feature
│   │       ├── pages/          # Páginas da feature
│   │       ├── store/          # Estado específico da feature
│   │       └── types/          # Tipos específicos da feature
│   ├── hooks/                  # Hooks globais da aplicação
│   ├── pages/                  # Páginas principais (Login, Dashboard, etc.)
│   ├── services/               # Serviços (ex: AuthService, ApiService)
│   ├── types/                  # Tipos globais da aplicação
│   └── utils/                  # Utilitários específicos da aplicação
│   └── main.tsx                # Ponto de entrada da aplicação
├── public/                     # Arquivos estáticos públicos
├── cypress/                    # Testes E2E
├── vite.config.ts              # Configuração do Vite
├── tsconfig.json               # Configuração do TypeScript
└── package.json                # Dependências da aplicação
```

### 2.4. Bibliotecas Compartilhadas (`libs/`)

- **`ui-components`**: Biblioteca de componentes UI reutilizáveis (Botões, Inputs, Modais, Tabelas, etc.) baseada no Design System GuardDrive.
- **`data-access`**: Hooks e funções para interagir com as APIs backend, utilizando Axios e gerenciamento de cache (ex: SWR ou React Query).
- **`utils`**: Funções utilitárias genéricas (formatação de data, validações, etc.).
- **`auth`**: Lógica de autenticação e gerenciamento de sessão (integração com `data-access`).
- **`feature-*`**: Bibliotecas reutilizáveis para funcionalidades específicas compartilhadas entre as interfaces (ex: visualização de mapa, dashboard ESG).

## 3. Componentes e Bibliotecas

### 3.1. Biblioteca `ui-components`

- **Base**: Headless UI, Radix UI (para acessibilidade e funcionalidade base)
- **Estilização**: Tailwind CSS
- **Componentes Principais**: Button, Input, Select, Checkbox, Radio, Modal, Drawer, Table, Card, Tabs, Accordion, Tooltip, Popover, DatePicker, Chart (wrapper para Recharts), Map (wrapper para Mapbox GL JS).
- **Documentação**: Storybook integrado ao monorepo Nx.

### 3.2. Gerenciamento de Estado (`Zustand`)

- **Abordagem**: Stores modulares por feature.
- **Persistência**: Middleware `persist` para dados que precisam ser mantidos (ex: preferências do usuário).
- **DevTools**: Integração com Redux DevTools para depuração.

### 3.3. Requisições HTTP (`Axios`)

- **Instância Centralizada**: Configuração de `baseURL`, `headers` e `timeout`.
- **Interceptors**: Para adicionar token de autenticação, tratar erros 401/403 (refresh token, logout) e logar requisições.
- **Cancelamento**: Implementação de cancelamento de requisições.

### 3.4. Gráficos e Mapas

- **Gráficos**: Recharts (gráficos de linha, barra, pizza, área) com wrappers customizados em `ui-components`.
- **Mapas**: Mapbox GL JS (visualização de frota, mapas de calor, rotas) com componente Map customizado em `ui-components`.

## 4. Fluxos de Usuário

### 4.1. Interface ESG + Tokenização

#### 4.1.1. Fluxo de Onboarding

1. Registro/Login via OAuth (Google, Apple) ou email/senha.
2. Conexão da conta com veículo(s) associado(s) (via ID do dispositivo ou integração com frota).
3. Tutorial interativo sobre funcionalidades (dashboard, desafios, tokens).
4. Configuração inicial de perfil e preferências de notificação.

#### 4.1.2. Fluxo do Dashboard Principal

1. Visualização do score de segurança e impacto ambiental (CO2 evitado).
2. Acompanhamento de progresso em desafios de condução segura/sustentável.
3. Resumo do saldo de tokens ESG e valor estimado.
4. Feed de atividades recentes e conquistas.
5. Acesso rápido a funcionalidades (carteira, desafios, perfil).

#### 4.1.3. Fluxo de Desafios e Gamificação

1. Visualização de desafios ativos (ex: "Dirigir 100km sem freadas bruscas").
2. Acompanhamento de progresso em tempo real.
3. Recebimento de notificações e recompensas (tokens, badges) ao completar desafios.
4. Ranking de usuários (opcional, com privacidade configurável).

#### 4.1.4. Fluxo da Carteira de Tokens

1. Visualização do saldo total e histórico de transações (ganhos, gastos, transferências).
2. Opções para resgatar tokens (descontos em parceiros, doações para ONGs).
3. Transferência de tokens para outros usuários (opcional).
4. Conexão com carteiras externas (ex: MetaMask) para interoperabilidade (futuro).

### 4.2. Interface de Controle Técnico e Operacional

#### 4.2.1. Fluxo de Login e Autenticação

1. Login com email/senha corporativo.
2. Autenticação de Dois Fatores (2FA) obrigatória.
3. Redirecionamento baseado no perfil do usuário (Admin, Gestor, Técnico).

#### 4.2.2. Fluxo de Gestão de Dispositivos

1. Visualização da lista de dispositivos (status, veículo associado, versão firmware).
2. Filtro e busca por ID, status, modelo, etc.
3. Registro de novos dispositivos.
4. Associação/desassociação de dispositivos a veículos.
5. Visualização de detalhes do dispositivo (logs, diagnóstico, histórico).
6. Agendamento de atualizações de firmware (individual ou em lote).
7. Comandos remotos (reiniciar, diagnosticar).

#### 4.2.3. Fluxo de Visualização de Frota

1. Mapa interativo com localização em tempo real dos veículos.
2. Visualização de status de segurança (uso do cinto, alertas) no mapa.
3. Filtro por grupo, status, tipo de veículo.
4. Acesso rápido a detalhes do veículo e histórico de telemetria.
5. Criação de geofences e alertas associados.

#### 4.2.4. Fluxo de Análise de Dados

1. Dashboard com KPIs de segurança da frota (score médio, nº de violações, km seguros).
2. Relatórios customizáveis (por período, grupo, tipo de evento).
3. Gráficos de tendência e comparação.
4. Exportação de dados brutos e relatórios (CSV, PDF).
5. Análise de causa raiz para eventos de segurança críticos.

#### 4.2.5. Fluxo de Configuração e Atualizações

1. Configuração de parâmetros do sistema (limites de velocidade, sensibilidade de sensores).
2. Gerenciamento de regras de alerta e notificações.
3. Configuração de integrações com sistemas externos (APIs, Webhooks).
4. Agendamento de atualizações de software da plataforma.

#### 4.2.6. Fluxo de Auditoria e Blockchain

1. Visualização de logs de eventos registrados na blockchain.
2. Verificação de certificados de segurança.
3. Consulta de histórico de transações de tokens (nível organizacional).
4. Geração de relatórios de auditoria para conformidade.

#### 4.2.7. Fluxo de Gestão de Usuários e Permissões

1. Criação, edição e exclusão de usuários (Admin).
2. Atribuição de perfis (Admin, Gestor, Técnico, Auditor).
3. Configuração de permissões granulares por módulo/funcionalidade (Admin).
4. Visualização de logs de atividade dos usuários.

## 5. Design System GuardDrive

### 5.1. Princípios de Design

- **Clareza e Foco**: Interfaces limpas, com hierarquia visual clara e foco na informação essencial.
- **Consistência**: Padrões visuais e de interação consistentes em ambas as interfaces.
- **Eficiência**: Fluxos otimizados para tarefas comuns, minimizando cliques e esforço.
- **Feedback Imediato**: Respostas visuais claras para ações do usuário.
- **Acessibilidade**: Conformidade com WCAG 2.1 AA (contraste, navegação por teclado, leitores de tela).
- **Responsividade**: Adaptação perfeita a diferentes tamanhos de tela.

### 5.2. Paleta de Cores

- **Primária**: Azul Elétrico GuardDrive (`#007AFF`)
- **Secundária**: Âmbar (`#FF9500`) para alertas e destaques
- **Neutros (Dark Mode)**:
  - Background Principal: Cinza Muito Escuro (`#121212`)
  - Background Secundário: Cinza Escuro (`#1E1E1E`)
  - Bordas/Divisores: Cinza Médio (`#3A3A3C`)
  - Texto Principal: Branco (`#FFFFFF`)
  - Texto Secundário: Cinza Claro (`#8E8E93`)
- **Cores de Status**: Verde (`#34C759`), Vermelho (`#FF3B30`), Amarelo (`#FFCC00`)

### 5.3. Tipografia

- **Fonte Principal**: Inter (sans-serif moderna e legível)
- **Hierarquia**: Uso claro de pesos (Regular, Medium, Semibold, Bold) e tamanhos para títulos, subtítulos e corpo de texto.

### 5.4. Iconografia

- **Estilo**: Ícones lineares, minimalistas e técnicos.
- **Biblioteca**: Conjunto customizado baseado em Heroicons e Phosphor Icons.
- **Uso**: Para navegação, ações, indicadores de status e ilustrações.

### 5.5. Espaçamento e Layout

- **Sistema de Espaçamento**: Baseado em múltiplos de 4px (4, 8, 12, 16, 20, 24, 32, 40, 48, 64).
- **Layout**: Grid responsivo (baseado em Tailwind CSS) para consistência em diferentes telas.
- **Componentes**: Espaçamento interno e externo definidos no Design System.

### 5.6. Documentação do Design System

- **Ferramenta**: Storybook
- **Conteúdo**: Visualização interativa de todos os componentes, diretrizes de uso, exemplos de código, paleta de cores, tipografia, iconografia.
- **Acesso**: Integrado ao monorepo Nx, acessível via comando `nx run ui-components:storybook`.

## 6. Integração com Backend

### 6.1. Comunicação via API

- Todas as interações com o backend são feitas através das APIs REST/GraphQL documentadas separadamente.
- A biblioteca `libs/data-access` encapsula a lógica de comunicação.

### 6.2. Autenticação

- Fluxo de autenticação baseado em JWT (JSON Web Tokens).
- Token de acesso (curta duração) e token de atualização (longa duração).
- Armazenamento seguro dos tokens (HttpOnly cookies ou LocalStorage com medidas de segurança).
- Interceptor Axios para adicionar token de acesso às requisições e tratar refresh token.

### 6.3. Tratamento de Estado e Cache

- Zustand para estado global da UI.
- SWR ou React Query (em `libs/data-access`) para gerenciamento de estado do servidor, cache, revalidação e otimismo.

### 6.4. WebSockets (Opcional)

- Para funcionalidades em tempo real (ex: notificações, atualização de dashboard), pode ser utilizada comunicação via WebSockets.
- Biblioteca recomendada: Socket.IO ou implementação nativa.
- Lógica encapsulada em hooks ou serviços específicos.

## 7. Testes

### 7.1. Testes Unitários e de Integração (Jest + RTL)

- Cobertura de componentes UI, hooks, utils e lógica de estado.
- Mock de chamadas de API e dependências externas.
- Foco em testar o comportamento do ponto de vista do usuário.

### 7.2. Testes End-to-End (Cypress)

- Teste dos principais fluxos de usuário em ambas as interfaces.
- Simulação de interações completas (login, navegação, ações).
- Validação da integração entre frontend e backend (utilizando ambiente de staging ou mocks).

## 8. Deployment

### 8.1. Processo de Build

- Utilização do Vite para build otimizado das aplicações React.
- Geração de arquivos estáticos (HTML, CSS, JS).

### 8.2. Plataforma de Hospedagem

- Recomendação: Vercel, Netlify ou AWS S3 + CloudFront.
- Configuração de CI/CD (GitHub Actions) para build e deploy automáticos a partir do monorepo Nx.

### 8.3. Monitoramento

- Ferramentas de monitoramento de erros frontend (Sentry, Datadog RUM).
- Análise de performance (Lighthouse, WebPageTest).
- Analytics de uso (Google Analytics, Mixpanel).

## 9. Troubleshooting

### 9.1. Debugging

- Utilização das React DevTools e Redux DevTools (para Zustand).
- Inspeção de rede no navegador para analisar requisições API.
- Pontos de interrupção (breakpoints) no código TypeScript.

### 9.2. Problemas Comuns

- **Problemas de Estado**: Verificar stores Zustand, fluxo de dados e re-renderizações.
- **Erros de API**: Analisar logs do interceptor Axios e respostas do backend.
- **Problemas de Roteamento**: Verificar configuração do React Router e guards de rota.
- **Inconsistências Visuais**: Inspecionar CSS (Tailwind, CSS Modules) e hierarquia de componentes.

## 10. Referências

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Nx](https://nx.dev/)
- [Documentação do Zustand](https://github.com/pmndrs/zustand)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do React Router](https://reactrouter.com/)
- [Documentação do React Hook Form](https://react-hook-form.com/)
- [Documentação do Recharts](https://recharts.org/)
- [Documentação do Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Documentação do Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [Design System GuardDrive (Storybook)](http://localhost:4400) (Link local durante desenvolvimento)

---

_Este documento é parte da documentação técnica oficial do GuardDrive FleetShield._
