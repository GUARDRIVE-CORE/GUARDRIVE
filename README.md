# GUARDRIVE - Intelligent Platform with Blockchain & ESG

[![Platform](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/GUARDRIVE-CORE/GUARDRIVE)
[![Rust](https://img.shields.io/badge/rust-performance--critical-orange)](https://www.rust-lang.org)
[![Python](https://img.shields.io/badge/python-business--logic-blue)](https://python.org)
[![JavaScript](https://img.shields.io/badge/javascript-frontend--api-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![MCP](https://img.shields.io/badge/mcp-universal-purple)](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **🚀 Intelligent vehicle system with blockchain, ESG tokenization and universal MCP ecosystem**

📚 **[Documentação em Português](docs/README-PT.md) | [Portuguese Documentation](docs/README-PT.md)**

## 🌟 **GUARDRIVE-CORE Ecosystem**

The GUARDRIVE-CORE organization maintains an integrated and organized ecosystem:

### 📦 **Main Repositories**

#### 🔥 **[GUARDRIVE](https://github.com/GUARDRIVE-CORE/GUARDRIVE)** (This repository)
- **Description**: Main platform with blockchain & ESG tokenization
- **Function**: Application core, development workspace
- **Technologies**: 🦀 Rust, 🐍 Python, 🟨 JavaScript, ⛓️ Blockchain, 🌱 ESG

#### 🔌 **[GUARDRIVE-MCP](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP)**
- **Description**: Universal Model Context Protocol servers
- **Function**: MCP ecosystem for AI-IDE integration
- **Technologies**: 🟨 JavaScript, Node.js, MCP Protocol (+ 🦀 Rust bridge planned)
- **Clients**: Warp, VS Code, Cursor, Claude Desktop

#### 🐍 **[GUARDRIVE-SDK](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK)** ✅ Official
- **Description**: Official Python SDK for integration
- **Function**: Unified SDK for all integrations
- **Technologies**: 🐍 Python 3.9+, AsyncIO, Pydantic V2 (+ 🦀 Rust FFI)

#### 📚 **[guardrive-examples](https://github.com/GUARDRIVE-CORE/guardrive-examples)**
- **Description**: Examples and guides hub
- **Function**: Practical documentation and tutorials
- **Technologies**: TypeScript, Examples, Guides

### ⚠️ **Deprecated Repositories**

#### ~~GUARDRIVE_SDK~~ → **Migrate to [GUARDRIVE-SDK](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK)**
- **Status**: Deprecated on 2025-06-30
- **Reason**: Consolidation - identical repositories
- **Action**: Use `GUARDRIVE-SDK` (clearer name)

## 🏗️ **Multi-Language Architecture**

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

## 🎯 **Recent Reorganization**

### ✅ **Consolidation Completed (2025-06-30)**

1. **Unified SDKs**
   - `GUARDRIVE_SDK` → Deprecated
   - `GUARDRIVE-SDK` → Official
   - Eliminated duplicates

2. **Clarified Repositories**
   - GUARDRIVE: Main platform
   - GUARDRIVE-MCP: Universal MCP ecosystem
   - guardrive-examples: Examples hub

3. **Consistent Naming**
   - GitHub conventions followed
   - Hyphen for separation
   - Descriptive names

### 📋 **Next Steps**

- [ ] Migrate MCP examples to guardrive-examples
- [ ] Centralized documentation
- [ ] Consistent CI/CD pipelines
- [ ] Release automation

## 📚 **Documentation**

- **[Platform Docs](docs/)** - Platform documentation
- **[SDK Docs](https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK/docs)** - Python SDK
- **[MCP Docs](https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP/docs)** - MCP servers
- **[Examples](https://github.com/GUARDRIVE-CORE/guardrive-examples)** - Practical examples

## 🤝 **Contributing**

1. Fork the appropriate repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 **License**

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## 🔗 **Important Links**

- **Organization**: [GUARDRIVE-CORE](https://github.com/GUARDRIVE-CORE)
- **Website**: [guardrive.dev](https://guardrive.dev) *(under development)*
- **Documentation**: [docs.guardrive.dev](https://docs.guardrive.dev) *(under development)*
- **Discord**: [Join our community](https://discord.gg/guardrive) *(under development)*

---

**🌟 Developed with ❤️ by GUARDRIVE-CORE team**

*Last update: 2025-06-30 - Ecosystem consolidation and reorganization*

