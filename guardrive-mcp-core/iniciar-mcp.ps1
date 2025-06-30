# Script simplificado para iniciar o MCP GUARDRIVE
# Esse script inicia o servidor MCP e configura o Warp

# Caminho para os arquivos
$SCRIPT_DIR = $PSScriptRoot
$WARP_CONFIG_DIR = "$env:APPDATA\Warp"
$MCP_BRIDGE_PATH = Join-Path $SCRIPT_DIR "warp-bridge.js"
$WARP_CONFIG_PATH = Join-Path $WARP_CONFIG_DIR "mcp_servers.json"

# Criar pasta Warp se não existir
if (-not (Test-Path $WARP_CONFIG_DIR)) {
    New-Item -ItemType Directory -Path $WARP_CONFIG_DIR -Force | Out-Null
}

# Criar a configuração MCP simplificada
$mcp_config = @{
    mcpServers = @{
        "guardrive-mcp" = @{
            command = "node"
            args = @(($MCP_BRIDGE_PATH -replace "\\", "\\"))
            env = @{
                "NODE_ENV" = "production"
            }
        }
    }
}

# Converter para JSON e salvar
$json = ConvertTo-Json -InputObject $mcp_config -Depth 5
Set-Content -Path $WARP_CONFIG_PATH -Value $json -Encoding UTF8
Write-Host "Configuração salva em $WARP_CONFIG_PATH" -ForegroundColor Green

# Iniciar o servidor MCP em segundo plano
Write-Host "Iniciando servidor MCP..." -ForegroundColor Cyan
Start-Process 'pwsh' -ArgumentList "-Command `"node '$MCP_BRIDGE_PATH'`"" -WindowStyle Hidden

Write-Host "Servidor MCP iniciado com sucesso!" -ForegroundColor Green
Write-Host "`nREINICIE O WARP para aplicar as alterações" -ForegroundColor Yellow

