# GUARDRIVE MCP - Universal Model Context Protocol Servers

![GUARDRIVE MCP](https://img.shields.io/badge/MCP-2024--11--05-blue)
![Platform](https://img.shields.io/badge/platform-universal-green)
![License](https://img.shields.io/badge/license-MIT-blue)

> **🛡️ GUARDRIVE Intelligent Development Ecosystem**  
> Universal MCP servers specifically designed for GUARDRIVE platform development, compatible with any IDE or terminal supporting the Model Context Protocol.

## 🌟 What is GUARDRIVE MCP?

GUARDRIVE MCP is a specialized ecosystem of **Model Context Protocol (MCP) servers** designed specifically for GUARDRIVE platform development. These servers provide intelligent automation for blockchain, ESG tokenization, and multi-language development workflows. Unlike traditional IDE-specific extensions, MCP servers work universally across any client that supports the protocol.

### 🎯 **GUARDRIVE-First, Universal Compatibility**
Optimized for GUARDRIVE development workflows, compatible everywhere - from Warp Terminal to VS Code, Cursor to Claude Desktop.

## 🚀 Quick Start

### Install from GUARDRIVE Repository (Recommended)
```bash
git clone https://github.com/GUARDRIVE-CORE/GUARDRIVE.git
cd GUARDRIVE
npm run setup:mcp
```

### Install via PowerShell (Windows)
```powershell
iwr -useb install.guardrive.dev/mcp.ps1 | iex
```

### Manual Installation
```bash
git clone https://github.com/GUARDRIVE-CORE/GUARDRIVE_MCP.git
cd GUARDRIVE_MCP
npm install
npm run setup:all
```

## 🛠️ Available MCP Servers

### 🔧 **guardrive-devops**
*DevOps automation and CI/CD orchestration*

**Tools Available:**
- `start_dev_session` - Initialize development environment
- `end_dev_session` - Clean shutdown with proper commits
- `create_feature_branch` - Git flow automation
- `smart_commit` - Conventional commit automation
- `quality_gate` - Code quality validation
- `prepare_pr` - Pull request preparation
- `fix_code_style` - Automatic code formatting

```json
{
  "command": "node",
  "args": ["path/to/guardrive-devops/index.js"]
}
```

### 📊 **guardrive-monitor**
*System monitoring and performance metrics*

**Tools Available:**
- `get_system_metrics` - Real-time system stats
- `save_metrics_to_file` - Persistent metrics logging
- `get_system_health_report` - Comprehensive health check

```json
{
  "command": "node", 
  "args": ["path/to/guardrive-monitor/index.js"]
}
```

### 🎨 **guardrive-custom**
*Flexible bridge with CLI integration*

**Tools Available:**
- Custom tool orchestration
- CLI command bridging
- Workflow automation

```json
{
  "command": "node",
  "args": ["path/to/guardrive-custom/warp-bridge.js"]
}
```

## 🔌 Supported Clients

### ✅ **Currently Tested**
- **[Warp Terminal](https://warp.dev)** - AI-first terminal
- **[Claude Desktop](https://claude.ai)** - Anthropic's desktop client
- **Custom CLI** - Standalone implementation

### 🔄 **In Development**
- **VS Code** (via MCP extension)
- **Cursor** - AI-powered IDE
- **Zed** - Collaborative editor
- **JetBrains IDEs** (IntelliJ, PyCharm, WebStorm)

### 🚀 **Planned**
- **Neovim** (via MCP plugin)
- **GitHub Copilot Chat**
- **Replit** - Online IDE
- **AI Agents** (AutoGPT, LangChain)

## 📋 Configuration Examples

### Warp Terminal
Add to your Warp MCP settings:

```json
{
  "mcpServers": {
    "guardrive-devops": {
      "command": "node",
      "args": ["./node_modules/@guardrive/mcp-servers/devops/index.js"]
    },
    "guardrive-monitor": {
      "command": "node", 
      "args": ["./node_modules/@guardrive/mcp-servers/monitor/index.js"]
    }
  }
}
```

### Claude Desktop
Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "guardrive-devops": {
      "command": "node",
      "args": ["C:\\tools\\guardrive-mcp\\devops\\index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### VS Code (Extension)
Install the GUARDRIVE MCP extension from the marketplace:

```bash
code --install-extension guardrive.mcp-servers
```

## 🏗️ Architecture

```
GUARDRIVE MCP Ecosystem
├── 📦 servers/
│   ├── guardrive-devops/      # DevOps automation
│   ├── guardrive-monitor/     # System monitoring  
│   ├── guardrive-security/    # Security scanning (planned)
│   ├── guardrive-database/    # Database ops (planned)
│   └── guardrive-cloud/       # Cloud integration (planned)
├── 🔌 adapters/
│   ├── warp/                  # Warp Terminal adapter
│   ├── vscode/                # VS Code extension
│   ├── cursor/                # Cursor IDE adapter
│   └── universal/             # Generic MCP client
├── 🛠️ tools/
│   ├── mcp-inspector/         # Debug connections
│   ├── server-generator/      # Create new servers
│   └── client-tester/         # Test implementations
└── 📚 sdk/
    ├── javascript/            # JS/TS SDK
    ├── python/                # Python SDK (planned)
    └── go/                    # Go SDK (planned)
```

## 🌍 Cross-Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | ✅ | Full PowerShell support |
| macOS | ✅ | Tested on Intel & Apple Silicon |
| Linux | ✅ | Ubuntu, Debian, Arch tested |
| Web | 🔄 | Via WebSocket transport |

## 🔥 Features

### 🎯 **Universal Compatibility**
- Works with any MCP-compatible client
- No vendor lock-in
- Future-proof architecture

### ⚡ **Performance Optimized**
- Lightweight servers (~2MB each)
- Fast startup (<100ms)
- Minimal resource usage

### 🔒 **Enterprise Ready**
- Security-first design
- Audit logging
- Compliance tools

### 🎨 **Developer Experience**
- Rich TypeScript definitions
- Comprehensive documentation
- Interactive examples

## 🚦 Getting Started Guide

### 1. Choose Your Client
Pick any MCP-compatible IDE or tool:
- Warp Terminal (easiest setup)
- VS Code (most features)
- Claude Desktop (AI-focused)

### 2. Install GUARDRIVE MCP
```bash
npm install -g @guardrive/mcp-servers
```

### 3. Configure Your Client
Use our setup wizard:
```bash
guardrive-mcp setup --client=warp
guardrive-mcp setup --client=vscode
guardrive-mcp setup --client=claude
```

### 4. Start Coding
Your MCP servers are now available as tools in your chosen client!

## 📊 Usage Examples

### DevOps Workflow
```typescript
// In any MCP client:
await mcp.callTool('start_dev_session', {
  project: './my-project'
});

await mcp.callTool('create_feature_branch', {
  name: 'user-authentication',
  type: 'feature'
});

// Make your changes...

await mcp.callTool('smart_commit', {
  type: 'feat',
  description: 'add user authentication system',
  scope: 'auth'
});

await mcp.callTool('end_dev_session', {
  auto_commit: true
});
```

### System Monitoring
```typescript
const metrics = await mcp.callTool('get_system_metrics');
console.log(`CPU: ${metrics.cpu}%, RAM: ${metrics.ram}GB free`);

await mcp.callTool('save_metrics_to_file', {
  format: 'csv',
  interval: '5m'
});
```

## 🤝 Contributing

We welcome contributions! Check our [Contributing Guide](CONTRIBUTING.md).

### Development Setup
```bash
git clone https://github.com/GUARDRIVE-CORE/GUARDRIVE_MCP.git
cd GUARDRIVE_MCP
npm install
npm run dev
```

### Creating New Servers
```bash
npm run create-server my-custom-server
```

## 📚 Documentation

- [📖 Full Documentation](https://docs.guardrive.dev/mcp)
- [🚀 Quick Start Guide](https://docs.guardrive.dev/mcp/quick-start)
- [🔧 Server Development](https://docs.guardrive.dev/mcp/server-dev)
- [🔌 Client Integration](https://docs.guardrive.dev/mcp/client-integration)
- [❓ FAQ](https://docs.guardrive.dev/mcp/faq)

## 🗺️ Roadmap

### 2025 Q1 - Foundation ✅
- [x] Core devops & monitor servers
- [x] Warp Terminal integration
- [x] Basic documentation

### 2025 Q2 - Expansion
- [ ] VS Code extension
- [ ] Cursor IDE integration
- [ ] Python & Go SDKs
- [ ] Security server

### 2025 Q3 - Enterprise
- [ ] Database server
- [ ] Cloud providers integration
- [ ] Advanced auth & compliance
- [ ] Performance optimizations

### 2025 Q4 - AI Native
- [ ] AI agents integration
- [ ] Real-time collaboration
- [ ] Advanced streaming
- [ ] Custom AI assistants

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- **Website**: [guardrive.dev](https://guardrive.dev)
- **Documentation**: [docs.guardrive.dev/mcp](https://docs.guardrive.dev/mcp)
- **GitHub**: [GUARDRIVE-CORE/GUARDRIVE_MCP](https://github.com/GUARDRIVE-CORE/GUARDRIVE_MCP)
- **npm**: [@guardrive/mcp-servers](https://www.npmjs.com/package/@guardrive/mcp-servers)
- **Discord**: [Join our community](https://discord.gg/guardrive)

---

**🌟 Star us on GitHub if GUARDRIVE MCP helps your development workflow!**

*Built with ❤️ by the GUARDRIVE team*

