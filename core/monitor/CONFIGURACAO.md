# 🔧 Configuração do System Monitor MCP Server

## 🚀 Passos Rápidos para Ativar no Warp

### 1. Verificar Instalação
Certifique-se de que o MCP server está funcionando:
```bash
cd C:\Users\laiss\mcp-servers\system-monitor
npm test
```

### 2. Adicionar ao Warp

1. **Abrir Configurações do Warp**
   - Pressione `Ctrl + ,` ou vá em Settings

2. **Navegar para MCP Servers**
   - No menu lateral, clique em "MCP Servers"

3. **Adicionar Novo Server**
   - Clique no botão "+ Add"

4. **Configurar o Server**
   ```json
   {
     "name": "System Monitor",
     "command": "node",
     "args": ["C:\\Users\\laiss\\mcp-servers\\system-monitor\\index.js"],
     "cwd": "C:\\Users\\laiss\\mcp-servers\\system-monitor"
   }
   ```

5. **Salvar e Reiniciar**
   - Clique em "Save"
   - Reinicie o Warp se necessário

### 3. Testar Funcionalidade

Após configurar, teste as seguintes frases no Agent:

- `"Verificar métricas do sistema"`
- `"Salvar dados de monitoramento"`
- `"Gerar relatório de saúde do sistema"`
- `"Como está o desempenho do computador?"`

## 🔍 Troubleshooting

### Problema: MCP Server não aparece
- Verificar se o caminho está correto
- Confirmar que o Node.js está no PATH
- Reiniciar o Warp completamente

### Problema: Erros de execução
- Verificar logs do MCP server:
  ```bash
  node C:\Users\laiss\mcp-servers\system-monitor\index.js
  ```
- Confirmar permissões de escrita no diretório home

### Problema: Métricas incorretas
- No Windows: verificar se o WMI está funcionando
- Testar manualmente:
  ```cmd
  wmic logicaldisk where size!="" get size,freespace,caption
  ```

## 📁 Arquivos Gerados

O MCP server criará automaticamente:

- **Métricas diárias**: `%USERPROFILE%\health-YYYY-MM-DD.csv`
- **Relatórios**: `%USERPROFILE%\system-health-*.txt`

## ⚙️ Personalizações Avançadas

### Alterar Thresholds de Saúde
Edite o arquivo `index.js`, linhas 298-302:
```javascript
const healthStatus = {
  cpu: metrics.cpu_usage_percent < 80 ? 'BOM' : metrics.cpu_usage_percent < 95 ? 'ATENÇÃO' : 'CRÍTICO',
  ram: metrics.free_ram_gb > 2 ? 'BOM' : metrics.free_ram_gb > 0.5 ? 'ATENÇÃO' : 'CRÍTICO',
  disk: metrics.free_disk_c_gb > 10 ? 'BOM' : metrics.free_disk_c_gb > 2 ? 'ATENÇÃO' : 'CRÍTICO'
};
```

### Adicionar Mais Métricas
Pode estender a classe `SystemMonitor` para incluir:
- Temperatura da CPU
- Uso de rede
- Processos em execução
- Métricas de GPU

## 🔄 Agendamento Automático

Para coleta automática a cada 30 min (seguindo suas regras):

### Criar Script PowerShell
```powershell
# C:\Users\laiss\scripts\collect-metrics.ps1
cd "C:\Users\laiss\mcp-servers\system-monitor"
node -e "const fs = require('fs'); const { SystemMonitor } = require('./index.js'); SystemMonitor.collectMetrics().then(m => SystemMonitor.saveMetricsToFile(m));"
```

### Configurar Task Scheduler
```cmd
schtasks /create /tn "System Monitor" /tr "powershell.exe -File C:\Users\laiss\scripts\collect-metrics.ps1" /sc minute /mo 30
```

---

✅ **Pronto!** Seu MCP server de monitoramento está configurado e segue todas as suas regras estabelecidas.

