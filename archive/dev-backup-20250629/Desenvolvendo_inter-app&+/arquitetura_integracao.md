# Arquitetura de Integração - GuardDrive FleetShield Web & Mobile

## Visão Geral da Arquitetura

### Stack Tecnológico Recomendado

#### Frontend Web

- **Framework**: Next.js 14+ (React 18+)
- **Styling**: Tailwind CSS + Headless UI
- **State Management**: Zustand + React Query
- **Charts**: Recharts + D3.js
- **Maps**: Mapbox GL JS
- **Blockchain**: Web3.js + Ethers.js

#### Mobile App

- **Framework**: React Native + Expo
- **Navigation**: React Navigation 6
- **State**: Redux Toolkit + RTK Query
- **UI Components**: NativeBase + React Native Elements
- **Maps**: React Native Maps
- **Blockchain**: WalletConnect + Mobile Web3

#### Backend Integration

- **API**: RESTful + GraphQL
- **Real-time**: WebSockets + Server-Sent Events
- **Authentication**: JWT + OAuth 2.0
- **Database**: PostgreSQL + Redis Cache
- **Blockchain**: Hyperledger Besu + IPFS

## Estrutura de Diretórios

```
guardrive-frontend/
├── web/                          # Aplicação Web (Next.js)
│   ├── src/
│   │   ├── components/           # Componentes reutilizáveis
│   │   │   ├── ui/              # Componentes base do design system
│   │   │   ├── charts/          # Componentes de gráficos
│   │   │   ├── maps/            # Componentes de mapas
│   │   │   └── blockchain/      # Componentes Web3
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── dashboard/       # Dashboard principal
│   │   │   ├── fleet/           # Gestão de frota
│   │   │   ├── esg/             # Métricas ESG
│   │   │   ├── tokens/          # Tokenização
│   │   │   └── admin/           # Painel administrativo
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # Serviços de API
│   │   ├── store/               # Estado global
│   │   ├── utils/               # Utilitários
│   │   └── types/               # Tipos TypeScript
│   ├── public/                  # Assets estáticos
│   ├── styles/                  # Estilos globais
│   └── config/                  # Configurações
├── mobile/                       # Aplicação Mobile (React Native)
│   ├── src/
│   │   ├── components/          # Componentes mobile
│   │   ├── screens/             # Telas da aplicação
│   │   ├── navigation/          # Configuração de navegação
│   │   ├── services/            # Serviços de API
│   │   ├── store/               # Estado global
│   │   └── utils/               # Utilitários
│   ├── assets/                  # Assets mobile
│   └── config/                  # Configurações mobile
├── shared/                       # Código compartilhado
│   ├── types/                   # Tipos TypeScript compartilhados
│   ├── constants/               # Constantes
│   ├── utils/                   # Utilitários compartilhados
│   └── api/                     # Definições de API
└── docs/                        # Documentação
```

## Componentes Principais

### 1. Design System Base

#### Tokens de Design

```typescript
// design-tokens.ts
export const tokens = {
  colors: {
    primary: {
      50: "#ECFDF5",
      500: "#00D4AA",
      900: "#064E3B",
    },
    secondary: {
      50: "#EFF6FF",
      500: "#1E3A8A",
      900: "#1E3A8A",
    },
    accent: {
      50: "#FFFBEB",
      500: "#F59E0B",
      900: "#92400E",
    },
    neutral: {
      50: "#F9FAFB",
      500: "#6B7280",
      900: "#111827",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  typography: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
  },
};
```

#### Componentes UI Base

```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant: "primary" | "secondary" | "accent" | "ghost";
  size: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

// components/ui/Card.tsx
interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// components/ui/MetricCard.tsx
interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon?: React.ReactNode;
}
```

### 2. Componentes de Dashboard

#### Dashboard Principal

```typescript
// components/dashboard/DashboardOverview.tsx
export const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="CO₂ Evitado"
        value="2.4"
        unit="toneladas"
        trend="up"
        trendValue="+12%"
        icon={<LeafIcon />}
      />
      <MetricCard
        title="Tokens ESG"
        value="1,247"
        unit="tokens"
        trend="up"
        trendValue="+8%"
        icon={<CoinIcon />}
      />
      <MetricCard
        title="Dispositivos Ativos"
        value="156"
        unit="unidades"
        trend="stable"
        icon={<DeviceIcon />}
      />
      <MetricCard
        title="Frotas Certificadas"
        value="23"
        unit="frotas"
        trend="up"
        trendValue="+2"
        icon={<TruckIcon />}
      />
    </div>
  )
}
```

#### Gráficos e Visualizações

```typescript
// components/charts/EmissionChart.tsx
export const EmissionChart = ({ data }: { data: EmissionData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="emissions"
          stroke="#F59E0B"
          name="Emissões"
        />
        <Line
          type="monotone"
          dataKey="offset"
          stroke="#00D4AA"
          name="Compensação"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

### 3. Componentes de Mapa

#### Mapa de Frota

```typescript
// components/maps/FleetMap.tsx
export const FleetMap = ({ vehicles }: { vehicles: Vehicle[] }) => {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -46.6333,
        latitude: -23.5505,
        zoom: 10
      }}
      style={{ width: '100%', height: '400px' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      {vehicles.map(vehicle => (
        <Marker
          key={vehicle.id}
          longitude={vehicle.longitude}
          latitude={vehicle.latitude}
        >
          <VehicleMarker vehicle={vehicle} />
        </Marker>
      ))}
    </Map>
  )
}
```

### 4. Componentes Blockchain

#### Wallet Connection

```typescript
// components/blockchain/WalletConnect.tsx
export const WalletConnect = () => {
  const { connect, disconnect, account, isConnected } = useWallet()

  return (
    <div className="flex items-center space-x-4">
      {isConnected ? (
        <>
          <span className="text-sm text-gray-600">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </span>
          <Button variant="ghost" onClick={disconnect}>
            Desconectar
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={connect}>
          Conectar Carteira
        </Button>
      )}
    </div>
  )
}
```

#### Token Display

```typescript
// components/blockchain/TokenBalance.tsx
export const TokenBalance = ({ address }: { address: string }) => {
  const { data: balance, isLoading } = useTokenBalance(address)

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Tokens ESG</h3>
          <p className="text-sm text-gray-600">Saldo atual</p>
        </div>
        <div className="text-right">
          {isLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <span className="text-2xl font-bold text-primary-600">
              {balance?.formatted}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
```

## Integração com Backend

### 1. Serviços de API

#### API Client Base

```typescript
// services/api.ts
class ApiClient {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);
```

#### Serviços Específicos

```typescript
// services/fleet.ts
export class FleetService {
  static async getVehicles(fleetId: string): Promise<Vehicle[]> {
    return apiClient.request(`/fleets/${fleetId}/vehicles`);
  }

  static async getVehicleMetrics(vehicleId: string): Promise<VehicleMetrics> {
    return apiClient.request(`/vehicles/${vehicleId}/metrics`);
  }

  static async updateVehicleConfig(
    vehicleId: string,
    config: VehicleConfig,
  ): Promise<void> {
    return apiClient.request(`/vehicles/${vehicleId}/config`, {
      method: "PUT",
      body: JSON.stringify(config),
    });
  }
}

// services/esg.ts
export class ESGService {
  static async getEmissionMetrics(
    fleetId: string,
    period: DateRange,
  ): Promise<EmissionMetrics> {
    return apiClient.request(
      `/fleets/${fleetId}/emissions?from=${period.from}&to=${period.to}`,
    );
  }

  static async getTokenBalance(address: string): Promise<TokenBalance> {
    return apiClient.request(`/tokens/balance/${address}`);
  }

  static async mintTokens(
    vehicleId: string,
    amount: number,
  ): Promise<Transaction> {
    return apiClient.request("/tokens/mint", {
      method: "POST",
      body: JSON.stringify({ vehicleId, amount }),
    });
  }
}
```

### 2. Estado Global

#### Store Configuration

```typescript
// store/index.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  user: User | null;
  selectedFleet: Fleet | null;
  theme: "light" | "dark";

  // Actions
  setUser: (user: User | null) => void;
  setSelectedFleet: (fleet: Fleet | null) => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        selectedFleet: null,
        theme: "light",

        setUser: (user) => set({ user }),
        setSelectedFleet: (fleet) => set({ selectedFleet: fleet }),
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "guardrive-store",
        partialize: (state) => ({
          theme: state.theme,
          selectedFleet: state.selectedFleet,
        }),
      },
    ),
  ),
);
```

### 3. Hooks Customizados

#### Data Fetching Hooks

```typescript
// hooks/useVehicles.ts
export const useVehicles = (fleetId?: string) => {
  return useQuery({
    queryKey: ["vehicles", fleetId],
    queryFn: () => (fleetId ? FleetService.getVehicles(fleetId) : null),
    enabled: !!fleetId,
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });
};

// hooks/useRealTimeMetrics.ts
export const useRealTimeMetrics = (vehicleId: string) => {
  const [metrics, setMetrics] = useState<VehicleMetrics | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/vehicles/${vehicleId}/metrics`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);
    };

    return () => ws.close();
  }, [vehicleId]);

  return metrics;
};
```

## Configuração de Desenvolvimento

### 1. Configuração do Projeto Web

#### package.json

```json
{
  "name": "guardrive-web",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.3.0",
    "@headlessui/react": "^1.7.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "recharts": "^2.8.0",
    "mapbox-gl": "^2.15.0",
    "react-map-gl": "^7.1.0",
    "web3": "^4.0.0",
    "ethers": "^6.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

#### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["api.guardrive.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },
};

module.exports = nextConfig;
```

### 2. Configuração do Projeto Mobile

#### package.json (Mobile)

```json
{
  "name": "guardrive-mobile",
  "version": "1.0.0",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "react": "18.2.0",
    "react-native": "0.72.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.1.0",
    "native-base": "^3.4.0",
    "react-native-maps": "^1.7.0",
    "@walletconnect/react-native-dapp": "^1.8.0"
  }
}
```

## Deployment e CI/CD

### 1. Docker Configuration

#### Dockerfile (Web)

```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

### 2. GitHub Actions

#### .github/workflows/deploy.yml

```yaml
name: Deploy GuardDrive Web

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Deploy to production
        run: |
          # Deploy commands here
```

---

**Metadados de Rastreabilidade:**

- Documento: Arquitetura de Integração GuardDrive FleetShield
- Versão: 1.0
- Data: 08/06/2025
- Autor: Sistema de Desenvolvimento GuardDrive
- Integração: Frontend Web + Mobile + Backend
