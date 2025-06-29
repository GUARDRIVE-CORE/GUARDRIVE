# Script simplificado para configuracao do GUARDRIVE MCP

# Definir constantes
$GUARDRIVE_ROOT = $PSScriptRoot
$MCP_CORE_PATH = Join-Path $GUARDRIVE_ROOT "guardrive-mcp-core"
$WARP_CONFIG_PATH = "$env:APPDATA\Warp"
$WARP_MCP_CONFIG = Join-Path $WARP_CONFIG_PATH "mcp_servers.json"
$LOCAL_WARP_CONFIG = Join-Path $GUARDRIVE_ROOT "guardrive-mcp-warp.json"

# Cabecalho
Write-Host ""
Write-Host "=========================================="  -ForegroundColor Cyan
Write-Host "=  GUARDRIVE MCP - CONFIGURACAO         ="  -ForegroundColor Cyan
Write-Host "=========================================="  -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Host "Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js nao encontrado. Por favor, instale o Node.js (v14+)" -ForegroundColor Red
    exit 1
}

# Verificar pasta MCP Core
if (Test-Path $MCP_CORE_PATH) {
    Write-Host "MCP Core encontrado" -ForegroundColor Green
} else {
    Write-Host "MCP Core nao encontrado em: $MCP_CORE_PATH" -ForegroundColor Red
    exit 1
}

# 1. Configurar MCP Independente
Write-Host ""
Write-Host "1. Configurando MCP Independente" -ForegroundColor Cyan
Write-Host ""

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
Set-Location $MCP_CORE_PATH
npm install --silent

# Definir caminhos
$cliJs = Join-Path $MCP_CORE_PATH "cli.js"
$warpBridgeJs = Join-Path $MCP_CORE_PATH "warp-bridge.js"

# Criar diretorio bin
$binDir = Join-Path $GUARDRIVE_ROOT "bin"
if (-not (Test-Path $binDir)) {
    New-Item -ItemType Directory -Path $binDir | Out-Null
    Write-Host "Diretorio bin criado" -ForegroundColor Green
}

# Criar script batch para CLI
$cliLink = Join-Path $binDir "guardrive-mcp.cmd"
$batchContent = "@echo off`r`nnode `"$cliJs`" %*"
[System.IO.File]::WriteAllText($cliLink, $batchContent)

Write-Host "CLI disponivel em: $cliLink" -ForegroundColor Green

# 2. Configurar integracao com Warp
Write-Host ""
Write-Host "2. Configurando Integracao com Warp" -ForegroundColor Cyan
Write-Host ""

# Criar diretorio Warp se nao existir
if (-not (Test-Path $WARP_CONFIG_PATH)) {
    New-Item -ItemType Directory -Path $WARP_CONFIG_PATH | Out-Null
    Write-Host "Diretorio de configuracao do Warp criado" -ForegroundColor Green
}

# Copiar configuracao do MCP para o Warp
Copy-Item -Path $LOCAL_WARP_CONFIG -Destination $WARP_MCP_CONFIG -Force
Write-Host "Configuracao do MCP copiada para o Warp: $WARP_MCP_CONFIG" -ForegroundColor Green

# Ajustar caminhos na configuracao do Warp
$warpConfigText = Get-Content $WARP_MCP_CONFIG -Raw 
$warpConfigText = $warpConfigText.Replace("./guardrive-mcp-core/warp-bridge.js", $warpBridgeJs.Replace("\", "\\"))
$warpConfigText = $warpConfigText.Replace("./devops-orchestrator/index.js", (Join-Path $GUARDRIVE_ROOT "devops-orchestrator\index.js").Replace("\", "\\"))
$warpConfigText = $warpConfigText.Replace("./system-monitor/index.js", (Join-Path $GUARDRIVE_ROOT "system-monitor\index.js").Replace("\", "\\"))
Set-Content -Path $WARP_MCP_CONFIG -Value $warpConfigText

Write-Host "Caminhos ajustados na configuracao do Warp" -ForegroundColor Green

# 3. Verificar instalacao
Write-Host ""
Write-Host "3. Verificando Instalacao" -ForegroundColor Cyan
Write-Host ""

# Testar CLI
try {
    Write-Host "Testando CLI independente..." -ForegroundColor Yellow
    $output = & node "$cliJs" --version
    Write-Host "CLI funcionando: $output" -ForegroundColor Green
} catch {
    Write-Host "Teste da CLI falhou. Erro: $_" -ForegroundColor Yellow
}

# Testar bridge do Warp
try {
    Write-Host "Verificando bridge do Warp..." -ForegroundColor Yellow
    if (Test-Path $warpBridgeJs) {
        Write-Host "Bridge do Warp encontrado" -ForegroundColor Green
    } else {
        Write-Host "Bridge do Warp nao encontrado" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Verificacao do bridge falhou. Erro: $_" -ForegroundColor Yellow
}

# 4. Instrucoes finais
Write-Host ""
Write-Host "4. Configuracao Concluida" -ForegroundColor Cyan
Write-Host ""

Write-Host "Configuracao do GUARDRIVE MCP concluida com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Como usar:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   MCP Independente:" -ForegroundColor Yellow
Write-Host "   - Via script: .\bin\guardrive-mcp.cmd COMANDO" -ForegroundColor White
Write-Host "   - Exemplo: .\bin\guardrive-mcp.cmd start-session" -ForegroundColor White
Write-Host ""
Write-Host "   Via Warp Terminal:" -ForegroundColor Yellow
Write-Host "   - Abra o Warp e use comandos como:" -ForegroundColor White
Write-Host "     - 'Iniciar sessao de desenvolvimento'" -ForegroundColor White
Write-Host "     - 'Verificar metricas do sistema'" -ForegroundColor White
Write-Host ""
Write-Host "Para atualizar a configuracao no futuro, execute este script novamente." -ForegroundColor Magenta
Write-Host ""

# Retornar ao diretorio original
Set-Location $GUARDRIVE_ROOT

