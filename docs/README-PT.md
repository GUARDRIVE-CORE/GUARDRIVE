# GUARDRIVE - Plataforma Inteligente com Blockchain & ESG

[![Platform](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/GUARDRIVE-CORE/GUARDRIVE)
[![Rust](https://img.shields.io/badge/rust-performance--critical-orange)](https://www.rust-lang.org)
[![Python](https://img.shields.io/badge/python-business--logic-blue)](https://python.org)
[![JavaScript](https://img.shields.io/badge/javascript-frontend--api-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![MCP](https://img.shields.io/badge/mcp-universal-purple)](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **🚀 Sistema veicular inteligente com blockchain, tokenização ESG e ecosystem MCP universal**

📚 **[English Documentation](../README.md) | [Documentação em Inglês](../README.md)**

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
PLATAFORMA GUARDRIVE (Arquitetura Multi-Linguagem)
├── 🔥 Aplicação Core
│   ├── 🦀 rust/                     # Componentes de Alta Performance
│   │   ├── neural-evolution/        # IA & Redes Neurais
│   │   ├── distributed-cache/       # Cache de alta velocidade
│   │   ├── real-time-monitoring/    # Telemetria de baixa latência
│   │   ├── plugin-system/           # Plugins extensíveis
│   │   └── device-firmware/         # Sistemas embarcados
│   ├── 🐍 python/                   # Lógica de Negócio & ML
│   │   ├── blockchain/              # Integração blockchain
│   │   ├── esg/                     # Tokenização ESG
│   │   ├── ai-training/             # Treinamento de modelos ML
│   │   └── data-analysis/           # Analytics
│   ├── 🟨 javascript/               # Frontend & APIs
│   │   ├── web-interface/           # React/Next.js UI
│   │   ├── node-apis/               # APIs Backend
│   │   └── real-time-ui/            # Interfaces WebSocket
│   └── ⛓️ smart-contracts/          # Contratos Solidity
├── 🔌 Ecosystem MCP (GUARDRIVE-MCP)
│   ├── devops-orchestrator/         # Automação DevOps (JS)
│   ├── system-monitor/              # Métricas & saúde (JS + Rust bridge)
│   ├── warp-bridge/                 # Bridge universal (JS)
│   └── rust-performance-server/     # MCP ultra-rápido (Rust) [planejado]
├── 🛠️ SDK Multi-Linguagem
│   ├── 🐍 guardrive-sdk-python/    # SDK Python (oficial)
│   ├── 🦀 guardrive-sdk-rust/      # SDK Rust (alta performance) [planejado]
│   ├── 🟨 guardrive-sdk-js/        # SDK JavaScript [planejado]
│   ├── 🔗 ffi-bindings/            # Bindings cross-language
│   └── 🌐 wasm-modules/            # Builds WebAssembly
└── 📚 Documentação & Exemplos
    ├── tutorials/                   # Guias multi-linguagem
    ├── api-docs/                    # Documentação da API
    ├── rust-examples/               # Exemplos de integração Rust
    └── performance-benchmarks/      # Comparações de performance
```

### 🎯 **Stack Tecnológico por Camada**

| Camada | Tecnologia | Uso Principal | Performance |
|--------|------------|--------------|-------------|
| **🦀 Performance Crítica** | **Rust** | Evolução neural, monitoramento tempo real, cache | **Ultra-Alta** |
| **🐍 Lógica de Negócio** | **Python** | Treinamento IA/ML, cálculos ESG, análise de dados | **Alta** |
| **🟨 Frontend/API** | **JavaScript/TypeScript** | Web UI, APIs Node.js, servidores MCP | **Média** |
| **⛓️ Smart Contracts** | **Solidity** | Blockchain, tokenização, DeFi | **Dependente da chain** |
| **🔗 Integração** | **FFI/WASM** | Bindings cross-language, integração web | **Variável** |

## 🚀 **Início Rápido**

### **1. Desenvolvimento da Plataforma**
```bash
git clone https://github.com/GUARDRIVE-CORE/GUARDRIVE.git
cd GUARDRIVE
npm install
npm run setup
```

### **2. Integração SDK**
```bash
pip install guardrive-sdk
```

```python
from guardrive import GuarDriveClient

async def main():
    async with GuarDriveClient() as client:
        # Monitorar veículo
        data = await client.monitoring.get_vehicle_status("VEH123")
        
        # Predição IA
        prediction = await client.ai.predict_behavior(data)
        
        # Registro blockchain
        tx_hash = await client.blockchain.register_event(prediction)
```

### **3. Ferramentas MCP (Warp/VS Code)**
```bash
npm install -g @guardrive/mcp-servers
guardrive-mcp setup --client=warp
```

## 🛠️ **Funcionalidades & Módulos**

### 🧠 **IA & Machine Learning**
- Predição de comportamento veicular
- Otimização de rotas
- Avaliação de riscos
- Detecção de anomalias

### ⛓️ **Integração Blockchain**
- Log imutável de eventos
- Mint de tokens ESG
- Smart contracts
- Suporte multi-chain

### 🌱 **Conformidade ESG**
- Pontuação ambiental
- Métricas de impacto social
- Indicadores de governança
- Relatórios de sustentabilidade

### 📊 **Monitoramento & Analytics**
- Telemetria em tempo real
- Manutenção preditiva
- Dashboards de performance
- Gerenciamento de alertas

### 🔧 **Automação DevOps (MCP)**
- Gerenciamento de sessões de desenvolvimento
- Automação de fluxo Git
- Quality gates de código
- Orquestração CI/CD

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
- [ ] Pipelines CI/CD consistentes
- [ ] Automação de releases

## 📚 **Documentação**

- **[Platform Docs](docs/)** - Documentação da plataforma
- **[SDK Docs](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK/docs)** - SDK Python
- **[MCP Docs](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP/docs)** - Servidores MCP
- **[Examples](https://github.com/GUARDRIVE-CORE/guardrive-examples)** - Exemplos práticos

## 🤝 **Contribuindo**

1. Fork o repositório apropriado
2. Crie uma feature branch
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

Veja [CONTRIBUTING.md](../CONTRIBUTING.md) para detalhes.

## 📄 **Licença**

Este projeto está licenciado sob a MIT License - veja [LICENSE](../LICENSE) para detalhes.

## 🔗 **Links Importantes**

- **Organização**: [GUARDRIVE-CORE](https://github.com/GUARDRIVE-CORE)
- **Website**: [guardrive.dev](https://guardrive.dev) *(em desenvolvimento)*
- **Documentação**: [docs.guardrive.dev](https://docs.guardrive.dev) *(em desenvolvimento)*
- **Discord**: [Join our community](https://discord.gg/guardrive) *(em desenvolvimento)*

---

**🌟 Desenvolvido com ❤️ pela equipe GUARDRIVE-CORE**

*Última atualização: 2025-06-30 - Consolidação e reorganização do ecosystem*

