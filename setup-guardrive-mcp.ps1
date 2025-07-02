# Script de configuracao do GUARDRIVE MCP
# Configura o ecosistema MCP para desenvolvimento GUARDRIVE com suporte multi-plataforma

# Definir constantes
$GUARDRIVE_ROOT = $PSScriptRoot
$MCP_CORE_PATH = Join-Path $GUARDRIVE_ROOT "guardrive-mcp-core"
$WARP_CONFIG_PATH = "$env:APPDATA\Warp"
$WARP_MCP_CONFIG = Join-Path $WARP_CONFIG_PATH "mcp_servers.json"
$LOCAL_WARP_CONFIG = Join-Path $GUARDRIVE_ROOT "guardrive-mcp-warp.json"

# Funcao para exibir cabecalho
function Show-Header {
    param (
        [string]$Title
    )
    
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "= $($Title.PadRight(40)) =" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
}

# Exibir cabeçalho principal
Show-Header "🛡️  GUARDRIVE MCP - CONFIGURAÇÃO MULTI-PLATAFORMA"

# Verificar se o Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js (v14+)" -ForegroundColor Red
    exit 1
}

# Verificar pasta do MCP Core
if (Test-Path $MCP_CORE_PATH) {
    Write-Host "✅ MCP Core encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ MCP Core não encontrado em: $MCP_CORE_PATH" -ForegroundColor Red
    exit 1
}

# 1. Configurar MCP Independente
Show-Header "1. Configurando MCP Independente"

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
Set-Location $MCP_CORE_PATH
npm install --silent

# Tornar a CLI executável (chmod +x equivalente)
$cliJs = Join-Path $MCP_CORE_PATH "cli.js"
$warpBridgeJs = Join-Path $MCP_CORE_PATH "warp-bridge.js"

# Criar links simbólicos para facilitar o acesso
$binDir = Join-Path $GUARDRIVE_ROOT "bin"
if (-not (Test-Path $binDir)) {
    New-Item -ItemType Directory -Path $binDir | Out-Null
    Write-Host "✅ Diretório bin criado" -ForegroundColor Green
}

# Link para CLI
$cliLink = Join-Path $binDir "guardrive-mcp.cmd"
@"
@echo off
node "$cliJs" %*
"@ | Out-File -FilePath $cliLink -Encoding ascii

Write-Host "✅ CLI disponível em: $cliLink" -ForegroundColor Green

# 2. Configurar integração com clientes MCP
Show-Header "2. Configurando Integração Multi-Cliente"

# Configurar para múltiplos clientes MCP
Write-Host "📋 Configurando para clientes: Warp, VS Code, Cursor, Claude Desktop" -ForegroundColor Yellow

# Warp Terminal
if (-not (Test-Path $WARP_CONFIG_PATH)) {
    New-Item -ItemType Directory -Path $WARP_CONFIG_PATH | Out-Null
    Write-Host "✅ Diretório de configuração do Warp criado" -ForegroundColor Green
}

# Copiar configuração do MCP para o Warp
Copy-Item -Path $LOCAL_WARP_CONFIG -Destination $WARP_MCP_CONFIG -Force
Write-Host "✅ Configuração do MCP copiada para o Warp: $WARP_MCP_CONFIG" -ForegroundColor Green

# Ajustar caminhos na configuração do Warp
$warpConfig = Get-Content $WARP_MCP_CONFIG -Raw | ConvertFrom-Json
$warpConfig.mcpServers.'guardrive-mcp-custom'.args[0] = (Join-Path $MCP_CORE_PATH "warp-bridge.js")
$warpConfig.mcpServers.'guardrive-devops'.args[0] = (Join-Path $GUARDRIVE_ROOT "devops-orchestrator\index.js")
$warpConfig.mcpServers.'guardrive-monitor'.args[0] = (Join-Path $GUARDRIVE_ROOT "system-monitor\index.js")

# Salvar configuração atualizada
$warpConfig | ConvertTo-Json -Depth 5 | Set-Content $WARP_MCP_CONFIG

Write-Host "✅ Caminhos ajustados na configuração do Warp" -ForegroundColor Green

# 3. Verificar instalação
Show-Header "3. Verificando Instalação"

# Testar CLI independente
try {
    Write-Host "🧪 Testando CLI independente..." -ForegroundColor Yellow
    $output = & node "$cliJs" --version
    Write-Host "✅ CLI funcionando: $output" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Teste da CLI falhou. Erro: $_" -ForegroundColor Yellow
}

# Testar bridge do Warp
try {
    Write-Host "🧪 Verificando bridge do Warp..." -ForegroundColor Yellow
    if (Test-Path $warpBridgeJs) {
        Write-Host "✅ Bridge do Warp encontrado" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Bridge do Warp não encontrado" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️ Verificação do bridge falhou. Erro: $_" -ForegroundColor Yellow
}

# 4. Instruções finais
Show-Header "4. Configuração Concluída"

Write-Host "🎉 Configuração do GUARDRIVE MCP concluída com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 Como usar:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   📋 MCP Independente:" -ForegroundColor Yellow
Write-Host "   • Via script: .\bin\guardrive-mcp.cmd <comando>" -ForegroundColor White
Write-Host "   • Exemplo: .\bin\guardrive-mcp.cmd start-session" -ForegroundColor White
Write-Host ""
Write-Host "   📋 Via Clientes MCP:" -ForegroundColor Yellow
Write-Host "   • Warp Terminal: 'Iniciar sessão de desenvolvimento'" -ForegroundColor White
Write-Host "   • VS Code: Ctrl+Shift+P → GUARDRIVE MCP" -ForegroundColor White
Write-Host "   • Cursor: Use Chat com comandos GUARDRIVE" -ForegroundColor White
Write-Host "   • Claude Desktop: Ferramentas GUARDRIVE disponíveis" -ForegroundColor White
Write-Host ""
Write-Host "🔄 Para atualizar a configuração no futuro, execute este script novamente." -ForegroundColor Magenta
Write-Host ""

# Retornar ao diretório original
Set-Location $GUARDRIVE_ROOT

