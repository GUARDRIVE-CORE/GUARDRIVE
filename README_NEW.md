# GUARDRIVE - Plataforma Inteligente com Blockchain & ESG

[![Platform](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/GUARDRIVE-CORE/GUARDRIVE)
[![SDK](https://img.shields.io/badge/sdk-python-blue)](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK)
[![MCP](https://img.shields.io/badge/mcp-universal-orange)](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **🚀 Sistema veicular inteligente com blockchain, tokenização ESG e ecosystem MCP universal**

## 🌟 **Ecossistema GUARDRIVE-CORE**

A organização GUARDRIVE-CORE mantém um ecossistema integrado e organizado:

### 📦 **Repositórios Principais**

#### 🔥 **[GUARDRIVE](https://github.com/GUARDRIVE-CORE/GUARDRIVE)** (Este repositório)
- **Descrição**: Plataforma principal com blockchain & ESG tokenization
- **Função**: Core da aplicação, workspace de desenvolvimento
- **Tecnologias**: JavaScript, Python, Blockchain, ESG

#### 🔌 **[GUARDRIVE-MCP](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP)**
- **Descrição**: Universal Model Context Protocol servers
- **Função**: Ecosystem MCP para AI-IDE integration
- **Tecnologias**: JavaScript, Node.js, MCP Protocol
- **Clientes**: Warp, VS Code, Cursor, Claude Desktop

#### 🐍 **[GUARDRIVE-SDK](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK)** ✅ Oficial
- **Descrição**: SDK Python oficial para integração
- **Função**: SDK unificado para todas as integrações
- **Tecnologias**: Python 3.9+, AsyncIO, Pydantic V2

#### 📚 **[guardrive-examples](https://github.com/GUARDRIVE-CORE/guardrive-examples)**
- **Descrição**: Hub de exemplos e guias
- **Função**: Documentação prática e tutorials
- **Tecnologias**: TypeScript, Examples, Guides

### ⚠️ **Repositórios Depreciados**

#### ~~GUARDRIVE_SDK~~ → **Migre para [GUARDRIVE-SDK](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK)**
- **Status**: Depreciado em 2025-06-30
- **Motivo**: Consolidação - repositórios idênticos
- **Ação**: Use `GUARDRIVE-SDK` (nome mais claro)

## 🏗️ **Arquitetura do Projeto**

```
GUARDRIVE PLATFORM
├── 🔥 Core Application
│   ├── blockchain/          # Blockchain integration
│   ├── esg/                 # ESG tokenization
│   ├── ai/                  # AI/ML modules
│   └── monitoring/          # System monitoring
├── 🔌 MCP Ecosystem (GUARDRIVE-MCP)
│   ├── devops-orchestrator/ # DevOps automation
│   ├── system-monitor/      # Metrics & health
│   └── warp-bridge/         # Universal bridge
├── 🐍 SDK Integration (GUARDRIVE-SDK)
│   ├── python/              # Python SDK
│   ├── javascript/          # JS SDK (planned)
│   └── examples/            # Integration examples
└── 📚 Documentation & Examples
    ├── tutorials/           # How-to guides  
    ├── api-docs/            # API documentation
    └── integrations/        # Integration guides
```

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

