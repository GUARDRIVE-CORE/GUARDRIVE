# 🛡️ GUARDRIVE MCP Servers Collection

**Enterprise-grade MCP Servers para maximizar produtividade e governança no desenvolvimento**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GUARDRIVE](https://img.shields.io/badge/GUARDRIVE-Enterprise-blue.svg)](https://github.com/GUARDRIVE-CORE)

---

## 🚀 Visão Geral

Coletânea de **MCP Servers inteligentes** que automatizam workflows de desenvolvimento, aplicam governança de código e maximizam a produtividade do time através do **Warp Terminal**.

### 🎯 **Missão**
Transformar práticas de desenvolvimento em automação inteligente, garantindo consistência, qualidade e velocidade em todos os projetos.

---

## 📦 MCP Servers Disponíveis

### 🚀 **DevOps Orchestrator** ⭐ *Flagship*

**O MCP Server mais inteligente** - Orquestra todo o workflow de desenvolvimento

**📍 Localização**: `./devops-orchestrator/`

#### 🧠 **Inteligência Integrada**
- **Session Rules** → Checklist completo de início/fim
- **Branching Rules** → Git workflows padronizados  
- **Code Style Rules** → Quality gates automáticos
- **PR Rules** → Templates e reviews estruturados

#### 🔧 **7 Ferramentas Estratégicas**

| Categoria | Ferramenta | Descrição |
|-----------|------------|----------|
| 🌟 **Session** | `start_dev_session` | Checklist completo + verificação ambiente |
| 🌟 **Session** | `end_dev_session` | Auto-commit + limpeza + docs |
| 🌿 **Git Ops** | `create_feature_branch` | Branches seguindo convenções |
| 🌿 **Git Ops** | `smart_commit` | Conventional Commits automático |
| 🌿 **Git Ops** | `prepare_pr` | Templates de PR completos |
| 🛡️ **Quality** | `quality_gate` | Lint + Tests + Security audit |
| 🛡️ **Quality** | `fix_code_style` | Auto-fix prettier/eslint |

#### 💬 **Exemplos de Uso**
```
"Iniciar sessão de desenvolvimento"
"Criar branch para implementar autenticação"
"Fazer commit seguindo conventional commits"
"Verificar qualidade do código"
"Preparar PR para revisão"
"Finalizar sessão de desenvolvimento"
```

---

### 🖥️ **System Monitor**

**Monitoramento inteligente** - Métricas e health checks do sistema

**📍 Localização**: `./system-monitor/`

#### 🎯 **Capacidades**
- 📊 **Métricas em tempo real** (CPU, RAM, Disco)
- 💾 **Logs CSV diários** seguindo Log Policy
- 🏥 **Relatórios de saúde** com recomendações

#### 🔧 **3 Ferramentas Especializadas**
1. `get_system_metrics` - Coleta métricas instantâneas
2. `save_metrics_to_file` - Persistência em CSV
3. `get_system_health_report` - Análise completa + alertas

#### 💬 **Exemplos de Uso**
```
"Verificar métricas do sistema"
"Salvar dados de monitoramento"
"Gerar relatório de saúde completo"
```

---

## ⚡ Quick Start

### **Pré-requisitos**
- Node.js ≥ 18.0.0
- Warp Terminal
- Git ≥ 2.40

### **Instalação**
```bash
# Clonar repositório
git clone <repository-url>
cd mcp-servers

# Instalar DevOps Orchestrator
cd devops-orchestrator
npm install
npm test

# Instalar System Monitor
cd ../system-monitor
npm install
npm test
```

### **Configuração no Warp**

1. **Abrir Settings** → `Ctrl + ,`
2. **MCP Servers** → `+ Add`
3. **Configurar servers**:

#### DevOps Orchestrator
```json
{
  "DevOps Orchestrator": {
    "command": "node",
    "args": ["./devops-orchestrator/index.js"],
    "working_directory": "./mcp-servers/devops-orchestrator"
  }
}
```

#### System Monitor
```json
{
  "System Monitor": {
    "command": "node",
    "args": ["./system-monitor/index.js"],
    "working_directory": "./mcp-servers/system-monitor"
  }
}
```

---

## 🏆 **Recomendações de Uso**

### 🥇 **DevOps Orchestrator** (Prioridade 1)
**Por que usar:**
- ✅ Automatiza workflows completos
- ✅ Aplica todas as regras de governança
- ✅ Reduz tempo de setup/teardown
- ✅ Elimina erros manuais
- ✅ Padroniza qualidade de código

### 🥈 **System Monitor** (Complementar)
**Por que usar:**
- ✅ Visibilidade contínua de performance
- ✅ Dados históricos para análise
- ✅ Alertas proativos
- ✅ Compliance com políticas de log

---

## 🔮 **Roadmap**

### **v1.1 - Integrações**
- [ ] **Backup Orchestrator** - Automação de backup
- [ ] **Security Auditor** - Verificações de segurança
- [ ] **Performance Optimizer** - Otimizações automáticas

### **v1.2 - Enterprise Features**
- [ ] **CI/CD Integration** - Trigger de pipelines
- [ ] **Issue Tracking** - Link com Jira/GitHub Issues
- [ ] **Notifications** - Slack/Teams/Email
- [ ] **Analytics Dashboard** - Métricas de produtividade

### **v2.0 - AI-Powered**
- [ ] **Smart Suggestions** - Recomendações baseadas em contexto
- [ ] **Predictive Analysis** - Antecipação de problemas
- [ ] **Auto-optimization** - Melhorias automáticas de código

---

## 📊 **Status do Projeto**

| Componente | Status | Funcionalidades | Cobertura Regras | Maturidade |
|------------|--------|----------------|------------------|------------|
| DevOps Orchestrator | ✅ **Pronto** | 7 tools | 🟢 **100%** | 🟢 **Produção** |
| System Monitor | ✅ **Pronto** | 3 tools | 🟡 **Parcial** | 🟢 **Produção** |
| Backup Orchestrator | 🔄 **Planejado** | - | - | 🔵 **Roadmap** |
| Security Auditor | 🔄 **Planejado** | - | - | 🔵 **Roadmap** |

---

## 🤝 **Contribuição**

### **Para o Time GUARDRIVE**
1. **Fork** este repositório
2. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
3. **Commit** suas mudanças: `git commit -m 'feat: adicionar nova funcionalidade'`
4. **Push** para a branch: `git push origin feature/nova-funcionalidade`
5. **Abra** um Pull Request

### **Padrões de Commit**
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 📝 **Licença**

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🛡️ **GUARDRIVE**

**Desenvolvido com 💙 pela equipe GUARDRIVE-CORE**

- **Versão**: 1.0.2
- **Data**: 2025-06-26
- **Arquitetura**: Enterprise MCP Servers
- **Stack**: Node.js, MCP Protocol, Warp Terminal
- **Organização**: [GUARDRIVE-CORE](https://github.com/GUARDRIVE-CORE)

---

> *"Protegendo e otimizando seus workflows de desenvolvimento"*

