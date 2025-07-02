# System Monitor MCP Server

🖥️ **MCP Server para Monitoramento de Sistema**

Este MCP server fornece ferramentas para monitorar métricas do sistema em tempo real, seguindo as regras de monitoramento estabelecidas.

## 📋 Funcionalidades

### 🔧 Ferramentas Disponíveis

1. **`get_system_metrics`** - Coleta métricas atuais do sistema
   - CPU usage (%)
   - RAM livre (GB) 
   - Espaço livre no disco C: (GB)
   - Informações do sistema (plataforma, arquitetura, hostname, uptime)

2. **`save_metrics_to_file`** - Salva métricas em arquivo CSV diário
   - Formato: `health-YYYY-MM-DD.csv`
   - Localização: diretório home do usuário
   - Headers automáticos

3. **`get_system_health_report`** - Gera relatório completo de saúde
   - Análise automática de status (BOM/ATENÇÃO/CRÍTICO)
   - Recomendações baseadas nas métricas
   - Opção de salvar em arquivo

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js ≥ 18.0.0
- Windows (testado no Windows 11)

### Instalação
```bash
npm install
```

### Execução
```bash
npm start
```

### Teste
```bash
npm test
```

## 📊 Métricas Coletadas

Segue as **Regras de Monitoramento** definidas:

| Métrica | Formato | Descrição |
|---------|---------|----------|
| Timestamp | ISO 8601 | Data/hora da coleta |
| CPU Usage | Porcentagem | % de uso total da CPU |
| RAM Livre | GB | Quantidade de RAM disponível |
| Disco C: | GB | Espaço livre no disco principal |

## 🎯 Thresholds de Saúde

### CPU
- **BOM**: < 80%
- **ATENÇÃO**: 80-95%
- **CRÍTICO**: > 95%

### RAM Livre
- **BOM**: > 2 GB
- **ATENÇÃO**: 0.5-2 GB
- **CRÍTICO**: < 0.5 GB

### Disco Livre
- **BOM**: > 10 GB
- **ATENÇÃO**: 2-10 GB
- **CRÍTICO**: < 2 GB

## 📁 Arquivos Gerados

### Métricas CSV
- **Nome**: `health-YYYY-MM-DD.csv`
- **Localização**: `%USERPROFILE%`
- **Retenção**: 90 dias (conforme LOG POLICY)
- **Formato**:
  ```csv
  timestamp,cpu_usage_percent,free_ram_gb,free_disk_c_gb
  2025-06-16T15:30:00.000Z,45,8.5,120.3
  ```

### Relatórios de Saúde
- **Nome**: `system-health-YYYY-MM-DDTHH-MM-SS.txt`
- **Localização**: `%USERPROFILE%`
- **Conteúdo**: Relatório formatado com análise e recomendações

## 🔧 Configuração no Warp

Para adicionar este MCP server ao Warp:

1. Abra as configurações do Warp
2. Vá para "MCP Servers"
3. Clique em "+ Add"
4. Configure:
   - **Nome**: System Monitor
   - **Comando**: `node`
   - **Argumentos**: `["C:\\Users\\laiss\\mcp-servers\\system-monitor\\index.js"]`
   - **Diretório**: `C:\Users\laiss\mcp-servers\system-monitor`

## 📝 Exemplos de Uso

### Coletar Métricas Simples
```
Agent: Vou verificar as métricas atuais do sistema
[Chama get_system_metrics]
```

### Salvar Métricas para Análise
```
Agent: Salvando métricas no arquivo diário
[Chama save_metrics_to_file]
```

### Relatório Completo de Saúde
```
Agent: Gerando relatório completo de saúde do sistema
[Chama get_system_health_report com save_to_file: true]
```

## 🛡️ Segurança

- **Dados Locais**: Todas as métricas são coletadas e armazenadas localmente
- **Sem Rede**: Não faz chamadas de rede externas
- **Permissões**: Apenas leitura de métricas do sistema
- **Logs**: Erros são logados para stderr

## 🔄 Integração com Regras Existentes

Este MCP server segue suas regras estabelecidas:

- ✅ **Monitor Rules**: Coleta métricas definidas (CPU, RAM, Disco)
- ✅ **Log Policy**: Retenção de 90 dias para arquivos CSV
- ✅ **Code Style**: Código limpo com JSDoc
- ✅ **Session Rules**: Integra com ferramentas de saúde do sistema

## 📈 Próximos Passos

1. **Agendamento**: Integrar com Task Scheduler para coleta automática
2. **Alertas**: Adicionar notificações quando métricas críticas
3. **Visualização**: Criar dashboard simples para análise histórica
4. **Extensões**: Adicionar monitoramento de processos específicos

---

**Desenvolvido por**: NEXUS  
**Versão**: 1.0.0  
**Licença**: MIT

