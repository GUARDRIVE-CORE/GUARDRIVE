# Wireframes e Protótipos - GuardDrive FleetShield

## Estrutura de Navegação

### Aplicação Web - Hierarquia de Páginas

```
GuardDrive FleetShield Web
├── Landing Page
│   ├── Hero Section
│   ├── Features Overview
│   ├── ESG Benefits
│   ├── Pricing
│   └── Contact/Demo
├── Authentication
│   ├── Login
│   ├── Register
│   └── Password Reset
├── Dashboard Principal
│   ├── Overview Metrics
│   ├── Quick Actions
│   ├── Recent Activity
│   └── Alerts Panel
├── Gestão de Frota
│   ├── Lista de Veículos
│   ├── Detalhes do Veículo
│   ├── Mapa da Frota
│   └── Configurações
├── ESG & Tokenização
│   ├── Métricas Ambientais
│   ├── Wallet de Tokens
│   ├── Marketplace
│   └── Certificações
├── Relatórios
│   ├── Dashboard Analítico
│   ├── Relatórios Customizados
│   ├── Exportação
│   └── Auditoria
└── Administração
    ├── Usuários
    ├── Permissões
    ├── Configurações
    └── Suporte
```

### Aplicação Mobile - Estrutura de Navegação

```
GuardDrive Mobile
├── Tab Navigation (Bottom)
│   ├── Dashboard
│   ├── Frota
│   ├── ESG
│   ├── Tokens
│   └── Perfil
├── Stack Navigation
│   ├── Onboarding
│   ├── Auth Flow
│   ├── Vehicle Details
│   ├── Token Transactions
│   └── Settings
└── Modal Navigation
    ├── QR Scanner
    ├── Device Pairing
    ├── Emergency Actions
    └── Notifications
```

## Wireframes Detalhados

### 1. Landing Page (Web)

```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] GuardDrive FleetShield    [Login] [Demo] [Contato]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│     TRANSFORME SUA FROTA EM UM                             │
│     ECOSSISTEMA SUSTENTÁVEL                                 │
│                                                             │
│     Segurança Veicular + Blockchain + ESG                  │
│     [Solicitar Demonstração] [Ver Vídeo]                   │
│                                                             │
│     [Imagem: Dashboard Preview]                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ BENEFÍCIOS PRINCIPAIS                                       │
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ [Ícone]     │ │ [Ícone]     │ │ [Ícone]     │            │
│ │ Segurança   │ │ Sustenta-   │ │ Tokenização │            │
│ │ Verificável │ │ bilidade    │ │ Blockchain  │            │
│ │             │ │ ESG         │ │             │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
├─────────────────────────────────────────────────────────────┤
│ COMO FUNCIONA                                               │
│                                                             │
│ 1. Instalação → 2. Monitoramento → 3. Tokenização          │
│    [Diagrama do fluxo]                                      │
├─────────────────────────────────────────────────────────────┤
│ MÉTRICAS EM TEMPO REAL                                      │
│                                                             │
│ CO₂ Evitado: 2.4t | Tokens Gerados: 1,247 | Frotas: 23    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ PLANOS E PREÇOS                                             │
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ Starter     │ │ Professional│ │ Enterprise  │            │
│ │ R$ 99/mês   │ │ R$ 299/mês  │ │ Customizado │            │
│ │ Até 10      │ │ Até 100     │ │ Ilimitado   │            │
│ │ veículos    │ │ veículos    │ │             │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
├─────────────────────────────────────────────────────────────┤
│ FOOTER: Links | Contato | Termos | Privacidade             │
└─────────────────────────────────────────────────────────────┘
```

### 2. Dashboard Principal (Web)

```
┌─────────────────────────────────────────────────────────────┐
│ [LOGO] Dashboard    [Notificações] [Perfil] [Configurações] │
├─────────────────────────────────────────────────────────────┤
│ SIDEBAR                    │ CONTEÚDO PRINCIPAL             │
│                           │                                 │
│ ┌─ Dashboard              │ BEM-VINDO, [NOME]               │
│ ├─ Frota                  │                                 │
│ ├─ ESG & Tokens           │ MÉTRICAS PRINCIPAIS             │
│ ├─ Relatórios             │                                 │
│ ├─ Configurações          │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│ └─ Suporte                │ │CO₂  │ │Token│ │Disp.│ │Frota│ │
│                           │ │2.4t │ │1,247│ │156  │ │23   │ │
│                           │ │+12% │ │+8%  │ │●    │ │+2   │ │
│                           │ └─────┘ └─────┘ └─────┘ └─────┘ │
│                           │                                 │
│                           │ GRÁFICO DE EMISSÕES             │
│                           │ ┌─────────────────────────────┐ │
│                           │ │     [Gráfico de Linha]      │ │
│                           │ │                             │ │
│                           │ │ Emissões vs Compensação     │ │
│                           │ └─────────────────────────────┘ │
│                           │                                 │
│                           │ ATIVIDADE RECENTE               │
│                           │ • Token ESG gerado - Veículo A │
│                           │ • Manutenção concluída - B     │
│                           │ • Alerta de segurança - C      │
│                           │                                 │
│                           │ AÇÕES RÁPIDAS                   │
│                           │ [Adicionar Veículo] [Relatório]│
└───────────────────────────┴─────────────────────────────────┘
```

### 3. Gestão de Frota (Web)

```
┌─────────────────────────────────────────────────────────────┐
│ Gestão de Frota                    [Adicionar] [Filtros]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ MAPA DA FROTA                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                    [MAPA INTERATIVO]                    │ │
│ │                                                         │ │
│ │  📍 Veículo A (Ativo)    📍 Veículo B (Manutenção)    │ │
│ │  📍 Veículo C (Rota)     📍 Veículo D (Parado)        │ │
│ │                                                         │ │
│ │  [Controles do Mapa] [Filtros] [Legenda]              │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ LISTA DE VEÍCULOS                                           │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Placa    │ Modelo    │ Status    │ Localização │ Ações  │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ ABC-1234 │ Civic     │ ● Ativo   │ São Paulo   │ [Ver]  │ │
│ │ DEF-5678 │ Corolla   │ ⚠ Alerta  │ Rio de Jan. │ [Ver]  │ │
│ │ GHI-9012 │ HB20      │ 🔧 Manut. │ Oficina     │ [Ver]  │ │
│ │ JKL-3456 │ Onix      │ ● Ativo   │ Brasília    │ [Ver]  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [Paginação: 1 2 3 ... 10]                                  │
└─────────────────────────────────────────────────────────────┘
```

### 4. ESG & Tokenização (Web)

```
┌─────────────────────────────────────────────────────────────┐
│ ESG & Tokenização                  [Conectar Wallet]        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ MÉTRICAS AMBIENTAIS                                         │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │ │
│ │ │ CO₂     │ │ Km      │ │ Efici-  │ │ Score   │        │ │
│ │ │ Evitado │ │ Limpos  │ │ ência   │ │ ESG     │        │ │
│ │ │ 2.4t    │ │ 15,420  │ │ 94%     │ │ A+      │        │ │
│ │ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ WALLET DE TOKENS                                            │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Saldo Atual: 1,247 GDT                                  │ │
│ │                                                         │ │
│ │ Histórico de Transações:                                │ │
│ │ • +50 GDT - Condução eficiente (Hoje)                  │ │
│ │ • +25 GDT - Uso do cinto (Ontem)                       │ │
│ │ • -100 GDT - Troca por benefício (2 dias)              │ │
│ │                                                         │ │
│ │ [Ver Todas] [Transferir] [Trocar]                       │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ MARKETPLACE DE BENEFÍCIOS                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │ │
│ │ │ Desconto│ │ Crédito │ │ Seguro  │ │ Certifi-│        │ │
│ │ │ Combust.│ │ Carbono │ │ Verde   │ │ cação   │        │ │
│ │ │ 100 GDT │ │ 500 GDT │ │ 200 GDT │ │ 1000 GDT│        │ │
│ │ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 5. Mobile App - Dashboard

```
┌─────────────────────────┐
│ ☰ GuardDrive      🔔 ⚙️ │
├─────────────────────────┤
│                         │
│ Olá, João! 👋           │
│                         │
│ RESUMO HOJE             │
│ ┌─────────┬─────────────┐│
│ │ CO₂     │ Tokens      ││
│ │ 0.2t    │ +15 GDT     ││
│ │ evitado │ ganhos      ││
│ └─────────┴─────────────┘│
│                         │
│ MINHA FROTA             │
│ ┌─────────────────────┐ │
│ │ 🚗 Civic - ABC1234  │ │
│ │ ● Ativo - São Paulo │ │
│ │ Score ESG: A+       │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ 🚙 HB20 - DEF5678   │ │
│ │ ⚠️ Alerta - Oficina  │ │
│ │ Score ESG: B        │ │
│ └─────────────────────┘ │
│                         │
│ AÇÕES RÁPIDAS           │
│ [📱 Escanear QR]        │
│ [📊 Ver Relatório]      │
│                         │
├─────────────────────────┤
│ 🏠 📊 🌱 🪙 👤         │
└─────────────────────────┘
```

### 6. Mobile App - Detalhes do Veículo

```
┌─────────────────────────┐
│ ← Civic ABC-1234    ⋮   │
├─────────────────────────┤
│                         │
│ STATUS ATUAL            │
│ ┌─────────────────────┐ │
│ │ ● ATIVO             │ │
│ │ 📍 Av. Paulista, SP │ │
│ │ 🕐 Última atualização│ │
│ │    há 2 minutos     │ │
│ └─────────────────────┘ │
│                         │
│ MÉTRICAS ESG            │
│ ┌─────────────────────┐ │
│ │ CO₂ Hoje: 0.2t      │ │
│ │ Km Limpos: 45km     │ │
│ │ Eficiência: 94%     │ │
│ │ Score: A+           │ │
│ └─────────────────────┘ │
│                         │
│ DISPOSITIVO SELFBELT    │
│ ┌─────────────────────┐ │
│ │ ✅ Conectado        │ │
│ │ 🔋 Bateria: 85%     │ │
│ │ 📡 Sinal: Forte     │ │
│ │ 🛡️ Segurança: OK    │ │
│ └─────────────────────┘ │
│                         │
│ TOKENS GANHOS           │
│ ┌─────────────────────┐ │
│ │ Hoje: +15 GDT       │ │
│ │ Semana: +87 GDT     │ │
│ │ Mês: +342 GDT       │ │
│ └─────────────────────┘ │
│                         │
│ [📊 Ver Histórico]      │
│ [⚙️ Configurações]      │
│                         │
├─────────────────────────┤
│ 🏠 📊 🌱 🪙 👤         │
└─────────────────────────┘
```

### 7. Mobile App - Wallet de Tokens

```
┌─────────────────────────┐
│ ← Meus Tokens       ⋮   │
├─────────────────────────┤
│                         │
│ SALDO ATUAL             │
│ ┌─────────────────────┐ │
│ │     1,247 GDT       │ │
│ │   GuardDrive Token  │ │
│ │                     │ │
│ │ Valor: R$ 623,50    │ │
│ │ (+8% esta semana)   │ │
│ └─────────────────────┘ │
│                         │
│ AÇÕES                   │
│ ┌─────────┬───────────┐ │
│ │ 📤      │ 🔄        │ │
│ │ Enviar  │ Trocar    │ │
│ └─────────┴───────────┘ │
│                         │
│ TRANSAÇÕES RECENTES     │
│ ┌─────────────────────┐ │
│ │ +50 GDT             │ │
│ │ Condução eficiente  │ │
│ │ Hoje, 14:30         │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ +25 GDT             │ │
│ │ Uso do cinto        │ │
│ │ Ontem, 09:15        │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ -100 GDT            │ │
│ │ Desconto combustível│ │
│ │ 2 dias atrás        │ │
│ └─────────────────────┘ │
│                         │
│ [Ver Todas]             │
│                         │
├─────────────────────────┤
│ 🏠 📊 🌱 🪙 👤         │
└─────────────────────────┘
```

## Fluxos de Usuário

### 1. Onboarding - Novo Usuário

```
Início → Bem-vindo → Benefícios → Cadastro → Verificação →
Configuração Inicial → Primeiro Veículo → Tutorial → Dashboard
```

**Detalhamento:**

1. **Tela de Boas-vindas**: Apresentação do GuardDrive
2. **Benefícios**: Explicação dos valores ESG e tokenização
3. **Cadastro**: Dados pessoais e da empresa
4. **Verificação**: Email e telefone
5. **Configuração**: Preferências e permissões
6. **Primeiro Veículo**: Adição e configuração
7. **Tutorial**: Guia interativo das funcionalidades
8. **Dashboard**: Acesso ao painel principal

### 2. Instalação de Dispositivo

```
Dashboard → Adicionar Veículo → Dados do Veículo →
Solicitar Instalação → Agendamento → Confirmação →
Ativação → Teste → Conclusão
```

**Detalhamento:**

1. **Adicionar Veículo**: Formulário com dados do veículo
2. **Solicitar Instalação**: Escolha de local e data
3. **Agendamento**: Confirmação com técnico
4. **Ativação**: QR Code e pareamento
5. **Teste**: Verificação de funcionamento
6. **Conclusão**: Veículo ativo no sistema

### 3. Geração de Tokens ESG

```
Condução → Coleta de Dados → Análise IA → Cálculo de Score →
Validação Blockchain → Geração de Tokens → Notificação →
Atualização Wallet
```

**Detalhamento:**

1. **Condução**: Uso normal do veículo
2. **Coleta**: Sensores capturam dados em tempo real
3. **Análise**: IA processa métricas de sustentabilidade
4. **Cálculo**: Score ESG baseado em comportamento
5. **Validação**: Registro na blockchain
6. **Geração**: Criação automática de tokens
7. **Notificação**: Usuário é informado
8. **Atualização**: Saldo refletido na wallet

### 4. Troca de Tokens por Benefícios

```
Wallet → Marketplace → Escolha de Benefício →
Verificação de Saldo → Confirmação → Transação Blockchain →
Geração de Voucher → Notificação
```

**Detalhamento:**

1. **Marketplace**: Catálogo de benefícios disponíveis
2. **Escolha**: Seleção do benefício desejado
3. **Verificação**: Confirmação de saldo suficiente
4. **Transação**: Queima de tokens na blockchain
5. **Voucher**: Geração de código/cupom
6. **Notificação**: Confirmação e instruções de uso

## Responsividade e Adaptações

### Breakpoints Principais

```css
/* Mobile First */
.container {
  /* Mobile: 320px - 768px */
  padding: 1rem;

  /* Tablet: 768px - 1024px */
  @media (min-width: 768px) {
    padding: 2rem;
    display: grid;
    grid-template-columns: 250px 1fr;
  }

  /* Desktop: 1024px+ */
  @media (min-width: 1024px) {
    padding: 3rem;
    grid-template-columns: 300px 1fr;
  }

  /* Large Desktop: 1440px+ */
  @media (min-width: 1440px) {
    max-width: 1400px;

(Content truncated due to size limit. Use line ranges to read in chunks)
```
