# Documentação Técnica - Interfaces Web e Mobile GuardDrive FleetShield

## Visão Geral

Este documento apresenta a documentação técnica completa das interfaces web e mobile desenvolvidas para o sistema GuardDrive FleetShield, incluindo arquitetura, componentes, funcionalidades e instruções de deploy.

## Arquitetura do Sistema

### Estrutura de Projetos

```
/home/ubuntu/GuardDrive/
├── guarddrive-web/          # Aplicação Web (Landing Page + Dashboard)
│   ├── src/
│   │   ├── components/
│   │   │   └── dashboard/   # Componentes do Dashboard
│   │   ├── App.tsx          # Componente principal
│   │   ├── App.css          # Estilos globais
│   │   └── main.tsx         # Entry point
│   ├── index.html           # HTML principal
│   └── package.json         # Dependências
│
└── guarddrive-mobile/       # Aplicação Mobile
    ├── src/
    │   ├── App.tsx          # Aplicativo mobile completo
    │   ├── App.css          # Estilos mobile-first
    │   └── main.tsx         # Entry point
    ├── index.html           # HTML principal
    └── package.json         # Dependências
```

### Stack Tecnológica

**Frontend Framework:**

- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)

**Bibliotecas e Componentes:**

- Lucide React (Ícones)
- shadcn/ui (Componentes UI)
- Recharts (Gráficos - preparado)

**Otimizações:**

- Mobile-first design
- Responsive layout
- Touch-friendly interfaces
- PWA ready

## Aplicação Web (guarddrive-web)

### Funcionalidades Principais

#### 1. Landing Page

- **Hero Section:** Apresentação do produto com CTAs
- **Recursos:** 6 cards destacando funcionalidades principais
- **Como Funciona:** Fluxo em 3 passos
- **Benefícios:** 4 benefícios comprovados
- **Preços:** 3 planos (Starter, Professional, Enterprise)
- **Depoimentos:** Feedback de clientes
- **Contato:** Formulário e informações de contato
- **Footer:** Links organizados e informações da empresa

#### 2. Dashboard Web

- **Sidebar Responsiva:** Navegação principal com 6 seções
- **Header:** Informações do usuário e notificações
- **Métricas Principais:** 4 cards com KPIs importantes
- **Gráfico de Emissões:** Visualização de dados ambientais
- **Atividade Recente:** Feed de eventos em tempo real
- **Ações Rápidas:** 4 botões para tarefas comuns
- **Mapa da Frota:** Visualização geográfica (placeholder)

### Componentes Técnicos

#### Header Component

```typescript
const Header = () => {
  // Navegação principal com menu responsivo
  // Botões de login e acesso ao dashboard
};
```

#### Dashboard Component

```typescript
const Dashboard = () => {
  // Layout principal com sidebar
  // Gerenciamento de estado da sidebar
  // Componentes de métricas e atividades
};
```

#### MetricCard Component

```typescript
const MetricCard = ({ icon, title, value, change, color }) => {
  // Card reutilizável para exibição de métricas
  // Suporte a indicadores de tendência
};
```

### Estilos e Design System

**Paleta de Cores:**

- Primary: #00D4AA (Verde tecnológico)
- Secondary: #1E3A8A (Azul corporativo)
- Accent: #F59E0B (Laranja para destaques)
- Neutral: Escala de cinzas

**Tipografia:**

- Font Family: Inter
- Escalas responsivas para diferentes dispositivos

**Componentes CSS:**

- `.btn-primary`, `.btn-secondary`, `.btn-accent`
- `.card`, `.card-metric`
- `.text-gradient-primary`, `.text-gradient-secondary`
- Animações customizadas

## Aplicação Mobile (guarddrive-mobile)

### Arquitetura Mobile

#### Bottom Navigation

5 abas principais:

1. **Início** - Dashboard resumido
2. **Frota** - Gestão de veículos
3. **ESG** - Métricas ambientais
4. **Wallet** - Tokens e transações
5. **Perfil** - Configurações do usuário

#### Telas e Funcionalidades

##### 1. Tela Início (HomeScreen)

- **Métricas Diárias:** CO₂ evitado e tokens ganhos
- **Status de Veículos:** Lista com indicadores visuais
- **Ações Rápidas:** Scanner QR e visualização de mapa
- **Atividade Recente:** Feed de eventos importantes

##### 2. Tela Frota (FleetScreen)

- **Visão Geral:** Total de veículos, online e alertas
- **Lista de Veículos:** Cards detalhados com:
  - Placa e modelo
  - Status (Online/Offline/Manutenção)
  - Eficiência percentual
  - Localização atual

##### 3. Tela ESG (ESGScreen)

- **Métricas Ambientais:** CO₂ evitado e certificações
- **Impacto Ambiental:** Emissões reduzidas e eficiência
- **Metas ESG:** Barras de progresso para objetivos
- **Certificações:** ISO 14001, GRI Standards

##### 4. Tela Wallet (WalletScreen)

- **Saldo Principal:** Total de tokens com valor estimado
- **Breakdown de Tokens:** Por categoria (Ambientais, Segurança, Eficiência)
- **Transações Recentes:** Histórico com detalhes
- **Ações:** Trocar tokens e ver histórico completo

##### 5. Tela Perfil (ProfileScreen)

- **Informações do Usuário:** Nome, cargo, empresa
- **Estatísticas Pessoais:** Veículos, tokens, dias ativos
- **Configurações:** Menu completo de opções
- **Suporte:** Central de ajuda e contato

### Componentes Mobile

#### BottomNavigation Component

```typescript
const BottomNavigation = ({ activeTab, setActiveTab }) => {
  // Navegação por abas otimizada para mobile
  // Indicadores visuais de aba ativa
};
```

#### MobileHeader Component

```typescript
const MobileHeader = ({ title, showNotifications }) => {
  // Header fixo com título dinâmico
  // Botões de notificação e configurações
};
```

#### MetricCardMobile Component

```typescript
const MetricCardMobile = ({ icon, title, value, change, color, trend }) => {
  // Cards otimizados para telas pequenas
  // Indicadores de tendência visuais
};
```

### Otimizações Mobile

**CSS Mobile-First:**

- Touch-friendly buttons (min-height: 56px)
- Safe area support para dispositivos com notch
- Smooth scrolling otimizado
- Animações performáticas

**Responsividade:**

- Breakpoints otimizados
- Grid systems adaptáveis
- Tipografia escalável

## Integração e Navegação

### Navegação Entre Aplicações

- Landing page possui botões que direcionam para o dashboard
- Transição suave entre interfaces
- Estado compartilhado (preparado para implementação)

### Preparação para Backend

- Estrutura de componentes preparada para APIs
- Estados de loading implementados
- Tratamento de erros planejado

## Instruções de Deploy

### Desenvolvimento Local

#### Aplicação Web

```bash
cd /home/ubuntu/GuardDrive/guarddrive-web
pnpm run dev --host
# Acesso: http://localhost:5173/
```

#### Aplicação Mobile

```bash
cd /home/ubuntu/GuardDrive/guarddrive-mobile
pnpm run dev --host --port 5174
# Acesso: http://localhost:5174/
```

### Build para Produção

#### Web

```bash
cd guarddrive-web
pnpm run build
# Arquivos gerados em: dist/
```

#### Mobile

```bash
cd guarddrive-mobile
pnpm run build
# Arquivos gerados em: dist/
```

### Deploy

#### Usando Manus Service Tools

```bash
# Para aplicação web
cd guarddrive-web
pnpm run build
# Usar service_deploy_frontend com framework: "react"

# Para aplicação mobile
cd guarddrive-mobile
pnpm run build
# Usar service_deploy_frontend com framework: "react"
```

## Próximos Passos

### Fase 4: Integração com Backend

1. **APIs e Conectividade**
   - Integrar com APIs do sistema GuardDrive
   - Implementar autenticação JWT
   - Conectar com blockchain (Hyperledger Besu)

2. **Dados em Tempo Real**
   - WebSocket para dados ao vivo
   - Telemetria dos dispositivos
   - Sistema de alertas

3. **Segurança**
   - Criptografia end-to-end
   - Autenticação multifator
   - Logs de auditoria

### Fase 5: Testes e Otimização

1. **Testes Funcionais**
   - Todos os fluxos de usuário
   - Responsividade
   - Performance

2. **Otimização**
   - Bundle size
   - Lazy loading
   - Cache inteligente

### Fase 6: Entrega Final

1. **Deploy em Produção**
2. **Documentação de Usuário**
3. **Treinamento da Equipe**

## Considerações Técnicas

### Performance

- Lazy loading de componentes
- Otimização de imagens
- Minificação de assets
- Cache strategies

### Acessibilidade

- WCAG 2.1 compliance preparado
- Navegação por teclado
- Screen reader support
- Contraste adequado

### SEO (Web)

- Meta tags otimizadas
- Structured data preparado
- Sitemap generation
- Performance metrics

### PWA (Mobile)

- Service worker preparado
- Manifest configurado
- Offline capabilities planejadas
- Push notifications preparadas

## Conclusão

As interfaces web e mobile do GuardDrive FleetShield foram desenvolvidas com foco em:

1. **Experiência do Usuário:** Interfaces intuitivas e responsivas
2. **Performance:** Otimizações para diferentes dispositivos
3. **Escalabilidade:** Arquitetura preparada para crescimento
4. **Manutenibilidade:** Código bem estruturado e documentado
5. **Integração:** Preparado para backend e blockchain

O sistema está pronto para as próximas fases de integração e deploy em produção.
