# 🤝 Contributing to GUARDRIVE Platform

Thank you for your interest in contributing! This document contains guidelines for contributing to the project.

📚 **[Contribuindo em Português](docs/CONTRIBUTING-PT.md) | [Portuguese Contributing Guide](docs/CONTRIBUTING-PT.md)**

## 🎀 Quick Start for Contributors

### 1. **Environment Setup**
```bash
# Fork and clone the repository
git clone https://github.com/your-username/GUARDRIVE.git
cd GUARDRIVE

# Install dependencies
npm run setup

# Verify everything is working
npm run test:all
```

### 2. **Create Contribution Branch**
```bash
# Following our Branching Rules
git checkout -b feature/your-new-feature
# or
git checkout -b fix/important-fix
```

## 📝 **Code Standards**

### **Conventional Commits**
We use [Conventional Commits](https://conventionalcommits.org/) for commit messages:

```bash
# Correct examples
git commit -m "feat(devops): add backup tool"
git commit -m "fix(monitor): fix CPU metrics collection"
git commit -m "docs: update README with new examples"
git commit -m "test(orchestrator): add unit tests"
```

#### **Commit Types**
- `feat`: New functionality
- `fix`: Bug fix
- `docs`: Documentation updates
- `style`: Formatting (prettier, eslint)
- `refactor`: Code refactoring
- `test`: Adding or fixing tests
- `chore`: Maintenance (deps, config)

#### **Available Scopes**
- `devops`: DevOps Orchestrator
- `monitor`: System Monitor
- `core`: Core functionality
- `docs`: Documentation
- `ci`: CI/CD and automation

### **Code Style**
Seguimos as **Code Style Rules** da SYMBEON:

```bash
# Antes de fazer commit
npm run lint
npm run test:all
```

## 🔧 **Adicionando um Novo MCP Server**

### 1. **Estrutura de Diretórios**
```
mcp-servers/
├── novo-server/
│   ├── index.js
│   ├── package.json
│   ├── README.md
│   ├── warp-config.json
│   └── CONFIGURACAO.md
```

### 2. **Template Básico**
```javascript
#!/usr/bin/env node

/**
 * Novo MCP Server
 * 
 * Descrição do que este server faz
 * 
 * @author SYMBEON
 * @version 1.0.0
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} = require('@modelcontextprotocol/sdk/types.js');

class NovoMcpServer {
  constructor() {
    this.server = new Server(
      {
        name: 'novo-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupToolHandlers() {
    // Implementar handlers aqui
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('🚀 Novo MCP Server rodando...');
  }
}

const server = new NovoMcpServer();
server.run().catch(console.error);
```

### 3. **Checklist para Novo Server**
- [ ] Implementação do server (`index.js`)
- [ ] Package.json configurado
- [ ] README com documentação
- [ ] Testes unitários
- [ ] Configuração para Warp
- [ ] Guia de setup
- [ ] Atualizar README principal
- [ ] Atualizar CHANGELOG.md

## 📝 **Pull Requests**

### **Template de PR**
```markdown
## 📝 Descrição
Descreva o que esta PR adiciona, modifica ou corrige.

## 🔧 Tipo de Mudança
- [ ] Bug fix (correção que resolve um issue)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (correção ou feature que causa breaking change)
- [ ] Documentação
- [ ] Refatoração

## ✅ Checklist
- [ ] Código segue nossos padrões de estilo
- [ ] Revisei meu próprio código
- [ ] Comentei áreas difíceis de entender
- [ ] Fiz mudanças correspondentes na documentação
- [ ] Minhas mudanças não geram novos warnings
- [ ] Adicionei testes que provam que minha correção é efetiva
- [ ] Testes unitários novos e existentes passam localmente
- [ ] CHANGELOG.md foi atualizado

## 🧪 Testes
Descreva os testes que você executou.

## 👥 Reviewers
@team-symbeon
```

### **Processo de Review**
1. **Abertura da PR**: Usar template acima
2. **Code Review**: Mínimo 1 reviewer da equipe
3. **CI Checks**: Todos os checks devem passar
4. **Merge**: Squash and merge após aprovação

## 📊 **Testes**

### **Executar Testes**
```bash
# Todos os testes
npm run test:all

# Testes específicos
npm run test:devops
npm run test:monitor
```

### **Adicionando Testes**
- Testes unitários em cada package
- Testes de integração para MCP servers
- Mocks para chamadas externas
- Cobertura mínima de 80%

## 🐛 **Reportando Bugs**

### **Template de Issue**
```markdown
## 🐛 Descrição do Bug
Descrição clara e concisa do problema.

## 🔄 Passos para Reproduzir
1. Configurar MCP server...
2. Executar comando...
3. Observar erro...

## ✨ Comportamento Esperado
O que deveria acontecer.

## 📈 Screenshots/Logs
Se aplicável, adicione screenshots ou logs.

## 🖥️ Ambiente
- OS: [Windows/macOS/Linux]
- Node.js: [versão]
- Warp: [versão]
- MCP Server: [qual e versão]
```

## 💬 **Sugestões de Features**

### **Template de Feature Request**
```markdown
## ✨ Descrição da Feature
Descrição clara da funcionalidade desejada.

## 🎯 Problema que Resolve
Qual problema esta feature resolveria?

## 💡 Solução Proposta
Descreva a solução que você gostaria.

## 🤔 Alternativas Consideradas
Outras soluções que você considerou.

## 📝 Contexto Adicional
Qualquer outro contexto sobre a feature.
```

## 🛍️ **Roadmap de Contribuições**

### **🟢 Bom para Iniciantes**
- Melhorar documentação
- Adicionar exemplos de uso
- Corrigir typos
- Adicionar testes

### **🟡 Intermediário**
- Otimizar performance
- Adicionar novas ferramentas
- Melhorar error handling
- Integrações com APIs

### **🔴 Avançado**
- Novos MCP servers
- Arquitetura de plugins
- Features enterprise
- Integrações CI/CD

## 🎯 **Comunicação**

- **Issues**: Para bugs e feature requests
- **Discussions**: Para questões e ideias
- **Email**: contato@symbeon.com

---

## 🚀 **Começando**

1. **Leia** este guia completamente
2. **Fork** o repositório
3. **Configure** seu ambiente local
4. **Escolha** uma issue ou crie uma nova
5. **Desenvolva** seguindo nossos padrões
6. **Teste** suas mudanças
7. **Submeta** uma PR

**Obrigado por contribuir com a SYMBEON!** 💪

---

**Mantido por**: SYMBEON  
**Última atualização**: 2025-06-20

