# GUARDRIVE - Plataforma Inteligente com Blockchain & ESG

[![Platform](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/GUARDRIVE-CORE/GUARDRIVE)
[![Rust](https://img.shields.io/badge/rust-performance--critical-orange)](https://www.rust-lang.org)
[![Python](https://img.shields.io/badge/python-business--logic-blue)](https://python.org)
[![JavaScript](https://img.shields.io/badge/javascript-frontend--api-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![MCP](https://img.shields.io/badge/mcp-universal-purple)](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **🚀 Sistema veicular inteligente com blockchain, tokenização ESG e ecosystem MCP universal**

## 🌟 **Ecossistema GUARDRIVE-CORE**

A organização GUARDRIVE-CORE mantém um ecossistema integrado e organizado:

### 📦 **Repositórios Principais**

#### 🔥 **[GUARDRIVE](https://github.com/GUARDRIVE-CORE/GUARDRIVE)** (Este repositório)
- **Descrição**: Plataforma principal com blockchain & ESG tokenization
- **Função**: Core da aplicação, workspace de desenvolvimento
- **Tecnologias**: 🦀 Rust, 🐍 Python, 🟨 JavaScript, ⛓️ Blockchain, 🌱 ESG

#### 🔌 **[GUARDRIVE-MCP](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP)**
- **Descrição**: Universal Model Context Protocol servers
- **Função**: Ecosystem MCP para AI-IDE integration
- **Tecnologias**: 🟨 JavaScript, Node.js, MCP Protocol (+ 🦀 Rust bridge planned)
- **Clientes**: Warp, VS Code, Cursor, Claude Desktop

#### 🐍 **[GUARDRIVE-SDK](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK)** ✅ Oficial
- **Descrição**: SDK Python oficial para integração
- **Função**: SDK unificado para todas as integrações
- **Tecnologias**: 🐍 Python 3.9+, AsyncIO, Pydantic V2 (+ 🦀 Rust FFI)

#### 📚 **[guardrive-examples](https://github.com/GUARDRIVE-CORE/guardrive-examples)**
- **Descrição**: Hub de exemplos e guias
- **Função**: Documentação prática e tutorials
- **Tecnologias**: TypeScript, Examples, Guides

### ⚠️ **Repositórios Depreciados**

#### ~~GUARDRIVE_SDK~~ → **Migre para [GUARDRIVE-SDK](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK)**
- **Status**: Depreciado em 2025-06-30
- **Motivo**: Consolidação - repositórios idênticos
- **Ação**: Use `GUARDRIVE-SDK` (nome mais claro)

## 🏗️ **Arquitetura Multi-Linguagem**

```
GUARDRIVE PLATFORM (Multi-Language Architecture)
├── 🔥 Core Application
│   ├── 🦀 rust/                     # High-Performance Components
│   │   ├── neural-evolution/        # AI & Neural Networks
│   │   ├── distributed-cache/       # High-speed caching
│   │   ├── real-time-monitoring/    # Low-latency telemetry
│   │   ├── plugin-system/           # Extensible plugins
│   │   └── device-firmware/         # Embedded systems
│   ├── 🐍 python/                   # Business Logic & ML
│   │   ├── blockchain/              # Blockchain integration
│   │   ├── esg/                     # ESG tokenization
│   │   ├── ai-training/             # ML model training
│   │   └── data-analysis/           # Analytics
│   ├── 🟨 javascript/               # Frontend & APIs
│   │   ├── web-interface/           # React/Next.js UI
│   │   ├── node-apis/               # Backend APIs
│   │   └── real-time-ui/            # WebSocket interfaces
│   └── ⛓️ smart-contracts/          # Solidity contracts
├── 🔌 MCP Ecosystem (GUARDRIVE-MCP)
│   ├── devops-orchestrator/         # DevOps automation (JS)
│   ├── system-monitor/              # Metrics & health (JS + Rust bridge)
│   ├── warp-bridge/                 # Universal bridge (JS)
│   └── rust-performance-server/     # Ultra-fast MCP (Rust) [planned]
├── 🛠️ SDK Multi-Language
│   ├── 🐍 guardrive-sdk-python/    # Python SDK (official)
│   ├── 🦀 guardrive-sdk-rust/      # Rust SDK (high-perf) [planned]
│   ├── 🟨 guardrive-sdk-js/        # JavaScript SDK [planned]
│   ├── 🔗 ffi-bindings/            # Cross-language bindings
│   └── 🌐 wasm-modules/            # WebAssembly builds
└── 📚 Documentation & Examples
    ├── tutorials/                   # Multi-language guides
    ├── api-docs/                    # API documentation
    ├── rust-examples/               # Rust integration examples
    └── performance-benchmarks/      # Language performance comparisons
```

### 🎯 **Technology Stack by Layer**

| Layer | Technology | Primary Use | Performance |
|-------|------------|-------------|-------------|
| **🦀 Performance Critical** | **Rust** | Neural evolution, real-time monitoring, cache | **Ultra-High** |
| **🐍 Business Logic** | **Python** | AI/ML training, ESG calculations, data analysis | **High** |
| **🟨 Frontend/API** | **JavaScript/TypeScript** | Web UI, Node.js APIs, MCP servers | **Medium** |
| **⛓️ Smart Contracts** | **Solidity** | Blockchain, tokenization, DeFi | **Chain-dependent** |
| **🔗 Integration** | **FFI/WASM** | Cross-language bindings, web integration | **Variable** |

## 🚀 **Quick Start**

### **1. Platform Development**
```bash
git clone https://github.com/GUARDRIVE-CORE/GUARDRIVE.git
cd GUARDRIVE
npm install
npm run setup
```

### **2. SDK Integration**
```bash
pip install guardrive-sdk
```

```python
from guardrive import GuarDriveClient

async def main():
    async with GuarDriveClient() as client:
        # Monitor vehicle
        data = await client.monitoring.get_vehicle_status("VEH123")
        
        # AI prediction
        prediction = await client.ai.predict_behavior(data)
        
        # Blockchain registry
        tx_hash = await client.blockchain.register_event(prediction)
```

### **3. MCP Tools (Warp/VS Code)**
```bash
npm install -g @guardrive/mcp-servers
guardrive-mcp setup --client=warp
```

## 🛠️ **Features & Modules**

### 🧠 **AI & Machine Learning**
- Vehicle behavior prediction
- Route optimization
- Risk assessment
- Anomaly detection

### ⛓️ **Blockchain Integration**
- Immutable event logging
- ESG token minting
- Smart contracts
- Multi-chain support

### 🌱 **ESG Compliance**
- Environmental scoring
- Social impact metrics
- Governance indicators
- Sustainability reporting

### 📊 **Monitoring & Analytics**
- Real-time telemetry
- Predictive maintenance
- Performance dashboards
- Alert management

### 🔧 **DevOps Automation (MCP)**
- Development session management
- Git flow automation
- Code quality gates
- CI/CD orchestration

## 🎯 **Reorganização Recente**

### ✅ **Consolidação Realizada (2025-06-30)**

1. **SDKs Unificados**
   - `GUARDRIVE_SDK` → Depreciado
   - `GUARDRIVE-SDK` → Oficial
   - Eliminação de duplicatas

2. **Repositórios Clarificados**
   - GUARDRIVE: Plataforma principal
   - GUARDRIVE-MCP: Ecosystem MCP universal
   - guardrive-examples: Hub de exemplos

3. **Nomenclatura Consistente**
   - Convenções GitHub seguidas
   - Hífen para separação
   - Nomes descritivos

### 📋 **Próximos Passos**

- [ ] Migrar exemplos MCP para guardrive-examples
- [ ] Documentação centralizada
- [ ] CI/CD pipelines consistentes
- [ ] Release automation

## 📚 **Documentação**

- **[Platform Docs](docs/)** - Documentação da plataforma
- **[SDK Docs](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK/docs)** - SDK Python
- **[MCP Docs](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP/docs)** - MCP servers
- **[Examples](https://github.com/GUARDRIVE-CORE/guardrive-examples)** - Exemplos práticos

## 🤝 **Contributing**

1. Fork o repositório apropriado
2. Crie uma feature branch
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

## 📄 **License**

Este projeto está licenciado sob a MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🔗 **Links Importantes**

- **Organização**: [GUARDRIVE-CORE](https://github.com/GUARDRIVE-CORE)
- **Website**: [guardrive.dev](https://guardrive.dev) *(em desenvolvimento)*
- **Documentation**: [docs.guardrive.dev](https://docs.guardrive.dev) *(em desenvolvimento)*
- **Discord**: [Join our community](https://discord.gg/guardrive) *(em desenvolvimento)*

---

**🌟 Desenvolvido com ❤️ pela equipe GUARDRIVE-CORE**

*Última atualização: 2025-06-30 - Consolidação e reorganização do ecosystem*

