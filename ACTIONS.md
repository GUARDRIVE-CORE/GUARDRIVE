# Ações Recomendadas para Atualização Completa do Projeto

## 1. Resolver problemas do Git

### Submodule GUARDRIVE_V1
O diretório GUARDRIVE_V1 está sendo tratado como submodule, mas não está configurado corretamente:

```powershell
# Opção 1: Remover o tracking como submodule e adicionar como diretório normal
git rm --cached GUARDRIVE_V1
git add GUARDRIVE_V1/

# Opção 2: Configurar corretamente como submodule
git config -f .gitmodules submodule.GUARDRIVE_V1.path GUARDRIVE_V1
git config -f .gitmodules submodule.GUARDRIVE_V1.url [URL_DO_REPOSITÓRIO]
git submodule init
git submodule update
```

### Resolver problemas de final de linha
Correção para o arquivo system-monitor/index.js:

```powershell
# Corrigir finais de linha CRLF/LF
git add --renormalize system-monitor/index.js
```

## 2. Adicionar arquivos importantes ao controle de versão

```powershell
# Adicionar o script de configuração MCP para Warp
git add setup-mcp-warp.ps1

# Considerar adicionar o package-lock.json para garantir consistência de dependências
git add package-lock.json
```

## 3. Verificar e atualizar dependências

```powershell
# Verificar se há atualizações de dependências
npm outdated

# Executar testes após qualquer atualização
npm run test:all
```

## 4. Commit das alterações

```powershell
# Fazer commit de todas as alterações com mensagem descritiva
git commit -m "feat: finaliza integração MCP e resolve problemas de configuração"
```

## 5. Push para o repositório remoto

```powershell
# Enviar as alterações para o repositório remoto
git push origin main
```

## 6. Validação final

```powershell
# Verificar se a instalação do MCP funciona corretamente
./setup-mcp-warp.ps1

# Testar integração com o Warp Terminal
# (Abrir o Warp e verificar se os comandos MCP estão disponíveis)
```

Estas ações garantirão que o projeto esteja 100% atualizado, com todos os arquivos necessários sob controle de versão e configurados corretamente.

