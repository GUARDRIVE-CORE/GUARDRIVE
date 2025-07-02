# Documentação Técnica das Interfaces GuardDrive FleetShield

## Visão Geral

Este documento apresenta a documentação técnica completa das interfaces desenvolvidas para o sistema GuardDrive FleetShield, incluindo a landing page e o dashboard de gestão.

## 1. Landing Page (guardrive-landing)

### 1.1 Arquitetura Técnica

**Framework:** React 18 com TypeScript  
**Build Tool:** Vite  
**Styling:** Tailwind CSS  
**Ícones:** Lucide React  
**Localização:** `/home/ubuntu/GuardDrive/guardrive-landing/`  
**URL Local:** http://localhost:5173/

### 1.2 Estrutura de Componentes

#### Header Component

- **Funcionalidade:** Navegação principal fixa
- **Elementos:** Logo, menu de navegação, botões de ação (Login, Demonstração)
- **Responsividade:** Menu colapsável em dispositivos móveis

#### HeroSection Component

- **Funcionalidade:** Seção principal de apresentação
- **Elementos:**
  - Título principal com gradiente
  - Descrição do produto
  - Botões de call-to-action
  - Métricas em tempo real (CO₂ evitado, tokens gerados, frotas ativas)
  - Dashboard ESG mockup animado

#### FeaturesSection Component

- **Funcionalidade:** Apresentação dos recursos principais
- **Grid:** 6 cards de recursos (3x2 em desktop)
- **Recursos destacados:**
  - Segurança Verificável
  - Sustentabilidade ESG
  - Tokenização Blockchain
  - Gestão de Frotas
  - Analytics Avançado
  - Segurança Máxima

#### HowItWorksSection Component

- **Funcionalidade:** Explicação do processo em 3 etapas
- **Etapas:**
  1. Instalação (QR Code)
  2. Monitoramento (Coleta automática)
  3. Tokenização (Conversão ESG)

#### BenefitsSection Component

- **Funcionalidade:** Benefícios comprovados
- **Background:** Gradiente azul
- **Benefícios:**
  - Redução de Custos (30%)
  - Certificações ESG
  - Impacto Global
  - Engajamento

#### PricingSection Component

- **Funcionalidade:** Planos e preços
- **Planos:**
  - Starter: R$ 99/mês (até 10 veículos)
  - Professional: R$ 299/mês (até 100 veículos) - Mais Popular
  - Enterprise: Customizado (veículos ilimitados)

#### TestimonialsSection Component

- **Funcionalidade:** Depoimentos de clientes
- **Elementos:** 3 cards com avaliações 5 estrelas

#### ContactSection Component

- **Funcionalidade:** Formulário de contato e demonstração
- **Background:** Gradiente verde
- **Elementos:**
  - Informações de contato
  - Formulário de demonstração
  - Campos: Nome, Email, Empresa, Tamanho da frota

#### Footer Component

- **Funcionalidade:** Links institucionais e informações
- **Seções:** Produto, Empresa, Legal
- **Copyright:** 2025 GuardDrive FleetShield

### 1.3 Características Técnicas

#### Design System

- **Cores Primárias:**
  - Verde: #00D4AA (primary-500)
  - Azul: #1E3A8A (secondary-500)
  - Laranja: #F59E0B (accent-500)
- **Tipografia:** Inter font family
- **Animações:** CSS keyframes customizadas
- **Responsividade:** Mobile-first approach

#### Performance

- **Otimizações:** Lazy loading, code splitting
- **SEO:** Meta tags otimizadas, structured data
- **Acessibilidade:** ARIA labels, contraste adequado

## 2. Dashboard (guardrive-dashboard)

### 2.1 Arquitetura Técnica

**Framework:** React 18 com TypeScript  
**Build Tool:** Vite  
**Styling:** Tailwind CSS + CSS customizado  
**Charts:** Recharts  
**Ícones:** Lucide React  
**Localização:** `/home/ubuntu/GuardDrive/guardrive-dashboard/`  
**URL Local:** http://localhost:5174/

### 2.2 Layout Principal

#### Dashboard Layout

- **Grid System:** CSS Grid com áreas nomeadas
- **Estrutura:**
  ```
  sidebar | header
  sidebar | main
  ```
- **Responsividade:** Sidebar colapsável em mobile

#### Sidebar Navigation

- **Seções:**
  - Dashboard (visão geral)
  - Gestão de Frota
  - ESG & Tokens
  - Analytics
  - Dispositivos
  - Relatórios
  - Usuários
  - Configurações
- **Status ESG:** Indicador de nível A+ no rodapé

#### Header

- **Elementos:**
  - Logo e título
  - Barra de busca global
  - Notificações (badge com contador)
  - Perfil do usuário

### 2.3 Componentes Principais

#### MetricCard Component

- **Funcionalidade:** Exibição de métricas principais
- **Elementos:**
  - Título da métrica
  - Valor principal
  - Unidade
  - Tendência (up/down/stable)
  - Ícone colorido
- **Variações de cor:** teal, orange, blue, green, red

#### VehicleStatus Component

- **Funcionalidade:** Status individual de veículos
- **Informações:**
  - Placa e modelo
  - Status (online/offline/warning/maintenance)
  - Localização atual
  - CO₂ evitado
  - Tokens gerados
  - Eficiência
  - Última atualização

#### Charts Integration

- **Biblioteca:** Recharts
- **Tipos implementados:**
  - AreaChart (Emissões vs Compensação)
  - PieChart (Distribuição de Tokens)
  - LineChart (Performance da Frota)
  - BarChart (Veículos Ativos)

### 2.4 Seções Funcionais

#### Dashboard Overview

- **Métricas principais:**
  - CO₂ Total Evitado: 2.4 toneladas (+12%)
  - Tokens ESG Gerados: 1,247 (+8%)
  - Dispositivos Ativos: 156/160 (97.5%)
  - Eficiência Média: 92% (+3%)

#### Fleet Management

- **Funcionalidades:**
  - Tabela completa de veículos
  - Filtros e busca
  - Ações por veículo (visualizar, configurar)
  - Status em tempo real

#### ESG & Tokens

- **Funcionalidades:**
  - Score ESG geral (A+)
  - Tokens disponíveis (1,247 GDT)
  - Valor estimado (R$ 623)
  - Atividades de token
  - Marketplace ESG

### 2.5 Dados Mock

#### Veículos

```javascript
mockVehicleData = [
  {
    plate: "ABC-1234",
    model: "Honda Civic",
    status: "online",
    location: "São Paulo, SP",
  },
  {
    plate: "DEF-5678",
    model: "Toyota Corolla",
    status: "warning",
    location: "Rio de Janeiro, RJ",
  },
  // ... mais veículos
];
```

#### Emissões

```javascript
mockEmissionData = [
  { month: "Jan", emissions: 120, offset: 95, target: 100 },
  // ... dados mensais
];
```

#### Tokens

```javascript
mockTokenData = [
  { name: "Condução Eficiente", value: 45, color: "#00D4AA" },
  { name: "Uso do Cinto", value: 30, color: "#F59E0B" },
  // ... distribuição de tokens
];
```

## 3. Integração e Arquitetura

### 3.1 Estrutura de Arquivos

```
/home/ubuntu/GuardDrive/
├── guardrive-landing/          # Landing Page
│   ├── src/
│   │   ├── App.tsx            # Componente principal
│   │   ├── App.css            # Estilos customizados
│   │   └── assets/            # Assets estáticos
│   ├── index.html             # HTML principal
│   └── package.json           # Dependências
├── guardrive-dashboard/        # Dashboard
│   ├── src/
│   │   ├── App.tsx            # Dashboard principal
│   │   ├── App.css            # Estilos do dashboard
│   │   └── components/        # Componentes UI
│   ├── index.html             # HTML principal
│   └── package.json           # Dependências
└── interfaces/                # Documentação
    ├── pesquisa_melhores_praticas_uxui.md
    ├── arquitetura_integracao.md
    ├── wireframes_prototipos.md
    └── documentacao_tecnica_interfaces.md
```

### 3.2 Tecnologias Utilizadas

#### Frontend Stack

- **React 18:** Framework principal
- **TypeScript:** Tipagem estática
- **Vite:** Build tool e dev server
- **Tailwind CSS:** Framework CSS
- **Lucide React:** Biblioteca de ícones
- **Recharts:** Biblioteca de gráficos

#### Ferramentas de Desenvolvimento

- **ESLint:** Linting de código
- **PostCSS:** Processamento CSS
- **PNPM:** Gerenciador de pacotes

### 3.3 Padrões de Design

#### Cores do Sistema

```css
:root {
  --primary-500: #00d4aa; /* Verde principal */
  --secondary-500: #1e3a8a; /* Azul secundário */
  --accent-500: #f59e0b; /* Laranja destaque */
  --success: #10b981; /* Verde sucesso */
  --warning: #f59e0b; /* Laranja aviso */
  --error: #ef4444; /* Vermelho erro */
}
```

#### Componentes Reutilizáveis

- **Buttons:** btn-primary, btn-secondary, btn-success, btn-warning, btn-danger
- **Cards:** metric-card, chart-card, status-card
- **Status:** status-online, status-offline, status-warning, status-maintenance
- **Navigation:** nav-item, nav-icon

### 3.4 Responsividade

#### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

#### Adaptações Mobile

- Menu hamburger na landing page
- Sidebar colapsável no dashboard
- Grid responsivo para cards
- Tabelas com scroll horizontal

## 4. Funcionalidades Implementadas

### 4.1 Landing Page

✅ **Completo**

- [x] Header com navegação
- [x] Hero section com animações
- [x] Seção de recursos (6 cards)
- [x] Como funciona (3 etapas)
- [x] Benefícios comprovados
- [x] Planos e preços (3 opções)
- [x] Depoimentos de clientes
- [x] Formulário de contato
- [x] Footer institucional
- [x] Design responsivo
- [x] Animações CSS
- [x] SEO otimizado

### 4.2 Dashboard

✅ **Completo**

- [x] Layout com sidebar e header
- [x] Dashboard overview com métricas
- [x] Gráficos interativos (Recharts)
- [x] Gestão de frota (tabela)
- [x] Seção ESG & Tokens
- [x] Status de veículos em tempo real
- [x] Navegação entre seções
- [x] Design responsivo
- [x] Tema claro/escuro preparado
- [x] Dados mock realistas

### 4.3 Funcionalidades Pendentes

🔄 **Em desenvolvimento**

- [ ] Seção Analytics completa
- [ ] Gestão de Dispositivos
- [ ] Relatórios avançados
- [ ] Gestão de Usuários
- [ ] Configurações do sistema
- [ ] Integração com APIs reais
- [ ] Autenticação e autorização
- [ ] Notificações em tempo real

## 5. Próximos Passos

### 5.1 Integração Backend

- Desenvolvimento de APIs REST
- Integração com blockchain
- Sistema de autenticação
- WebSocket para dados em tempo real

### 5.2 Funcionalidades Avançadas

- Mapas interativos
- Relatórios PDF
- Exportação de dados
- Configuração de alertas

### 5.3 Deploy e Produção

- Configuração de CI/CD
- Deploy em ambiente de produção
- Monitoramento e logs
- Backup e recuperação

## 6. Conclusão

As interfaces GuardDrive FleetShield foram desenvolvidas seguindo as melhores práticas de UX/UI e desenvolvimento frontend moderno. A landing page oferece uma apresentação profissional do produto, enquanto o dashboard fornece uma interface completa para gestão de frotas com foco em ESG e tokenização.

Ambas as aplicações estão prontas para integração com backend e deploy em produção, oferecendo uma base sólida para o sistema completo GuardDrive FleetShield.

---

**Documentação gerada em:** 08/06/2025  
**Versão:** 1.0  
**Autor:** Sistema de Desenvolvimento GuardDrive
