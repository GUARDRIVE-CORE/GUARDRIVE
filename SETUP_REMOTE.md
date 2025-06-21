# 🔗 Setup do Repositório Remoto

## 🚀 Conectar ao GitHub/GitLab

### **Opção 1: GitHub (Recomendado)**

1. **Criar repositório no GitHub**:
   - Acesse https://github.com/new
   - Repository name: `mcp-servers`
   - Description: `Enterprise-grade MCP Servers collection for maximizing productivity and governance`
   - Visibility: `Private` (para SYMBEON) ou `Public`
   - **NÃO** marque "Add README" (já temos)

2. **Conectar repositório local**:
   ```bash
   git remote add origin https://github.com/SYMBEON/mcp-servers.git
   git branch -M main
   git push -u origin main
   git push origin v1.0.0
   ```

### **Opção 2: GitLab**

1. **Criar projeto no GitLab**:
   - Acesse https://gitlab.com/projects/new
   - Project name: `mcp-servers`
   - Description: `Enterprise-grade MCP Servers collection`
   - Visibility: `Private` ou `Public`

2. **Conectar repositório local**:
   ```bash
   git remote add origin https://gitlab.com/SYMBEON/mcp-servers.git
   git branch -M main
   git push -u origin main
   git push origin v1.0.0
   ```

### **Opção 3: Azure DevOps**

1. **Criar repositório no Azure DevOps**
2. **Conectar**:
   ```bash
   git remote add origin https://dev.azure.com/SYMBEON/mcp-servers/_git/mcp-servers
   git branch -M main
   git push -u origin main
   git push origin v1.0.0
   ```

---

## 📋 **Checklist Pós-Setup**

### **No Repositório Remoto**
- [ ] Configurar branch protection (main)
- [ ] Adicionar topics/tags: `mcp`, `warp`, `devops`, `automation`
- [ ] Configurar GitHub Pages (se público)
- [ ] Adicionar colaboradores da equipe SYMBEON
- [ ] Configurar webhooks (se necessário)

### **Para o Time**
- [ ] Compartilhar URL do repositório
- [ ] Documentar processo de clone e setup
- [ ] Criar issues para roadmap v1.1
- [ ] Setup de CI/CD (se necessário)

---

## 👥 **Instruções para o Time**

### **Clone e Setup**
```bash
# Clonar repositório
git clone https://github.com/SYMBEON/mcp-servers.git
cd mcp-servers

# Setup completo
npm run setup

# Verificar se tudo funciona
npm run test:all
```

### **Configurar no Warp**

1. **DevOps Orchestrator** (Prioridade 1):
```json
{
  "DevOps Orchestrator": {
    "command": "node",
    "args": ["./devops-orchestrator/index.js"],
    "working_directory": "./mcp-servers/devops-orchestrator"
  }
}
```

2. **System Monitor** (Complementar):
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

## 🔄 **Fluxo de Desenvolvimento**

### **Para Novos Features**
```bash
# Criar branch
git checkout -b feature/nova-funcionalidade

# Desenvolver...

# Commit seguindo Conventional Commits
git commit -m "feat(devops): adicionar nova ferramenta"

# Push e PR
git push origin feature/nova-funcionalidade
```

### **Para Releases**
```bash
# Atualizar versão
npm version minor  # ou major/patch

# Atualizar CHANGELOG.md

# Commit e tag
git commit -m "chore: release v1.1.0"
git tag -a v1.1.0 -m "Release v1.1.0"

# Push
git push origin main
git push origin v1.1.0
```

---

## 🎯 **Próximos Passos**

1. **Setup do repositório remoto**
2. **Compartilhar com o time**
3. **Configurar no Warp de cada dev**
4. **Começar desenvolvimento v1.1**

---

**Setup realizado em**: 2025-06-20  
**Por**: SYMBEON Development Team

