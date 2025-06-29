# 🛡️ GUARDRIVE MCP - CLI Independente

CLI independente para os servidores GUARDRIVE MCP (MODEL CONTEXT PROTOCOL), permitindo acesso às funcionalidades dos MCP Servers de forma independente de plataforma.

## 📋 Visão Geral

Esta ferramenta CLI proporciona acesso a todas as funcionalidades do GUARDRIVE MCP, incluindo:

- 🚀 **DevOps Orchestrator** - Automação de sessões de desenvolvimento, git ops e quality gates
- 📊 **System Monitor** - Coleta e análise de métricas do sistema
- 🔧 **Ferramentas Adicionais** - Recursos para apoio ao desenvolvimento

A grande vantagem é a independência de plataforma, permitindo o uso em qualquer terminal ou ambiente de desenvolvimento.

## ⚙️ Instalação

### Via NPM (recomendado)

```bash
# Instalação global
npm install -g guardrive-mcp

# Verificar instalação
guardrive-mcp --version
```

### Via Binários Pré-compilados

Baixe os binários da [página de releases](https://github.com/GUARDRIVE-CORE/guardrive-mcp/releases) e adicione ao PATH do sistema.

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/GUARDRIVE-CORE/guardrive-mcp.git
cd guardrive-mcp

# Instale dependências
npm install

# Execute localmente
npm start
```

## 🚀 Uso

### Configuração Inicial

```bash
# Configurar a CLI
guardrive-mcp configure
```

### Comandos Principais

```bash
# Iniciar sessão de desenvolvimento
guardrive-mcp start-session

# Coletar métricas do sistema
guardrive-mcp system-metrics

# Salvar métricas em arquivo
guardrive-mcp system-metrics --save

# Criar branch para nova feature
guardrive-mcp create-branch "nome-da-feature"

# Fazer commit com conventional commits
guardrive-mcp commit "mensagem do commit"

# Finalizar sessão de desenvolvimento
guardrive-mcp end-session
```

### Ajuda

```bash
# Ver todos os comandos disponíveis
guardrive-mcp --help

# Ajuda para um comando específico
guardrive-mcp <comando> --help
```

## 🔧 Compatibilidade

- ✅ **Windows** - 10/11
- ✅ **Linux** - Ubuntu, Debian, Fedora, etc.
- ✅ **macOS** - Intel e Apple Silicon
- ✅ **Terminais** - CMD, PowerShell, Bash, Zsh, etc.
- ✅ **IDEs** - VS Code, IntelliJ, etc. (via terminal integrado)

## 📚 Documentação

Para documentação completa, visite: [link-para-documentacao](#)

## 🛠️ Desenvolvimento

### Requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0

### Scripts

```bash
# Iniciar em modo desenvolvimento
npm start

# Executar testes
npm test

# Executar linting
npm run lint

# Compilar binários
npm run build
```

## 📄 Licença

MIT © GUARDRIVE-CORE

---

**🛡️ GUARDRIVE MCP CLI** - Parte do ecossistema GUARDRIVE para desenvolvimento de alta produtividade.

