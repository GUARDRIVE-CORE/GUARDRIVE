# Script para configurar MCP Servers no Warp Terminal
# Compatível com GUARDRIVE-workdir conforme documentação MCP

# Definir caminhos
$projectPath = $PSScriptRoot
$mcp_config_path = "$env:APPDATA\Warp\mcp_servers.json"

# Mensagem de início
Write-Host "🚀 Configurando MCP Servers para GUARDRIVE..." -ForegroundColor Cyan
Write-Host ("=" * 60)

# Verificar se o diretório Warp existe
if (-not (Test-Path "$env:APPDATA\Warp")) {
    New-Item -Path "$env:APPDATA\Warp" -ItemType Directory -Force | Out-Null
    Write-Host "✅ Diretório Warp criado" -ForegroundColor Green
} else {
    Write-Host "✅ Diretório Warp encontrado" -ForegroundColor Green
}

# Criar configuração MCP
$mcp_config = @{
    "mcpServers" = @{
        "guardrive-devops" = @{
            "command" = "node"
            "args" = @("$projectPath\mcp\guardrive-devops\index.js")
            "env" = @{
                "NODE_ENV" = "production"
            }
        }
        "guardrive-monitor" = @{
            "command" = "node"
            "args" = @("$projectPath\mcp\guardrive-monitor\index.js")
            "env" = @{
                "NODE_ENV" = "production"
            }
        }
    }
}

# Converter para JSON e salvar
$mcp_config_json = $mcp_config | ConvertTo-Json -Depth 4
$mcp_config_json | Out-File -FilePath $mcp_config_path -Encoding utf8

Write-Host "`n✅ Configuração MCP salva em: $mcp_config_path" -ForegroundColor Green
Write-Host "🔧 Detalhes:" -ForegroundColor Yellow
Write-Host "   - DevOps Orchestrator: $projectPath\mcp\guardrive-devops\index.js"
Write-Host "   - System Monitor: $projectPath\mcp\guardrive-monitor\index.js"

Write-Host "`n🎯 MCP Servers configurados com sucesso!" -ForegroundColor Cyan
Write-Host "   Abra o Warp Terminal e use os comandos:" -ForegroundColor White
Write-Host "   • 'Iniciar sessão de desenvolvimento'" -ForegroundColor Green
Write-Host "   • 'Verificar métricas do sistema'" -ForegroundColor Green
Write-Host "   • ... e outros comandos descritos na documentação" -ForegroundColor Green

Write-Host "`n📋 Documentação: $projectPath\MCP-DEVELOPMENT-GUIDE.md" -ForegroundColor Magenta

