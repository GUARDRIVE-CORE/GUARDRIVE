# Script para configuração simplificada do MCP no Warp
# Este script configura os servidores MCP no Warp de forma simples e direta

# Caminho para o arquivo de configuração do Warp
$WARP_CONFIG_PATH = "$env:APPDATA\Warp"
$WARP_MCP_CONFIG = "$WARP_CONFIG_PATH\mcp_servers.json"

# Caminhos absolutos para os servidores MCP
$PROJECT_PATH = $PSScriptRoot
$MCP_BRIDGE_PATH = Join-Path $PROJECT_PATH "guardrive-mcp-core\warp-bridge.js"
$DEVOPS_PATH = Join-Path $PROJECT_PATH "devops-orchestrator\index.js"
$MONITOR_PATH = Join-Path $PROJECT_PATH "system-monitor\index.js"

# Verificar se os arquivos existem
Write-Host "Verificando arquivos..." -ForegroundColor Cyan
$allFilesExist = $true

if (-not (Test-Path $MCP_BRIDGE_PATH)) {
    Write-Host "ERRO: MCP Bridge não encontrado em $MCP_BRIDGE_PATH" -ForegroundColor Red
    $allFilesExist = $false
}

if (-not (Test-Path $DEVOPS_PATH)) {
    Write-Host "ERRO: DevOps Orchestrator não encontrado em $DEVOPS_PATH" -ForegroundColor Red
    $allFilesExist = $false
}

if (-not (Test-Path $MONITOR_PATH)) {
    Write-Host "ERRO: System Monitor não encontrado em $MONITOR_PATH" -ForegroundColor Red
    $allFilesExist = $false
}

if (-not $allFilesExist) {
    Write-Host "Um ou mais arquivos necessários não foram encontrados. Abortando." -ForegroundColor Red
    exit 1
}

# Criar diretório Warp se não existir
if (-not (Test-Path $WARP_CONFIG_PATH)) {
    New-Item -ItemType Directory -Path $WARP_CONFIG_PATH -Force | Out-Null
    Write-Host "Diretório Warp criado em $WARP_CONFIG_PATH" -ForegroundColor Green
}

# Criar configuração JSON
$mcp_config = @{
    mcpServers = @{
        'guardrive-mcp-custom' = @{
            command = 'node'
            args = @($MCP_BRIDGE_PATH)
            env = @{
                'NODE_ENV' = 'production'
                'GUARDRIVE_MCP_MODE' = 'bridge'
            }
        }
        'guardrive-devops' = @{
            command = 'node'
            args = @($DEVOPS_PATH)
            env = @{
                'NODE_ENV' = 'production'
            }
        }
        'guardrive-monitor' = @{
            command = 'node'
            args = @($MONITOR_PATH)
            env = @{
                'NODE_ENV' = 'production'
            }
        }
    }
}

# Converter para JSON e salvar
$mcp_config_json = ConvertTo-Json -InputObject $mcp_config -Depth 5
Set-Content -Path $WARP_MCP_CONFIG -Value $mcp_config_json -Encoding UTF8
Write-Host "Configuração MCP salva em $WARP_MCP_CONFIG" -ForegroundColor Green

# Exibir instruções para reiniciar o Warp
Write-Host "`nCONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host "Para aplicar as mudanças:" -ForegroundColor Cyan
Write-Host "1. Feche o Warp Terminal (se estiver aberto)" -ForegroundColor White
Write-Host "2. Reabra o Warp Terminal" -ForegroundColor White
Write-Host "3. Verifique se os servidores MCP estão disponíveis na interface" -ForegroundColor White

# Oferecer opção para iniciar servidores
$startServers = Read-Host "Deseja iniciar os servidores MCP agora? (S/N)"
if ($startServers -eq "S" -or $startServers -eq "s") {
    Write-Host "Iniciando servidores MCP..." -ForegroundColor Cyan
    
    # Iniciar MCP Bridge
    Start-Process 'pwsh' -ArgumentList "-Command `"node '$MCP_BRIDGE_PATH'`"" -WindowStyle Hidden
    Write-Host "MCP Bridge iniciado" -ForegroundColor Green
    
    # Iniciar DevOps Orchestrator
    Start-Process 'pwsh' -ArgumentList "-Command `"node '$DEVOPS_PATH'`"" -WindowStyle Hidden
    Write-Host "DevOps Orchestrator iniciado" -ForegroundColor Green
    
    # Iniciar System Monitor
    Start-Process 'pwsh' -ArgumentList "-Command `"node '$MONITOR_PATH'`"" -WindowStyle Hidden
    Write-Host "System Monitor iniciado" -ForegroundColor Green
    
    Write-Host "`nTodos os servidores MCP foram iniciados!" -ForegroundColor Green
}

