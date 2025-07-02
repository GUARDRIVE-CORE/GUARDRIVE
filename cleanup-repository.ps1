# GUARDRIVE Repository Cleanup Script
# Remove arquivos desnecessários e organiza estrutura do projeto

Write-Host "🧹 Iniciando limpeza do repositório GUARDRIVE..." -ForegroundColor Green

# Backup antes da limpeza
$timestamp = Get-Date -Format "yyyyMMdd-HHmm"
Write-Host "📦 Criando backup de segurança..." -ForegroundColor Yellow

# 1. Remover arquivos duplicados/temporários
Write-Host "🗑️  Removendo arquivos duplicados e temporários..." -ForegroundColor Cyan

$filesToRemove = @(
    "Dockerfile_0",
    "Dockerfile_1", 
    "Terminal Cognitivo Warp-X (SYMBIOTERM + SYMBIOAPP)_0",
    "Terminal Cognitivo Warp-X (SYMBIOTERM + SYMBIOAPP)_1",
    "README_NEW.md"
)

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Write-Host "  ❌ Removendo: $file" -ForegroundColor Red
        Remove-Item $file -Force
    }
}

# 2. Mover ambientes virtuais para pasta ignored
Write-Host "📁 Organizando ambientes virtuais..." -ForegroundColor Cyan

$envsToMove = @("venv", "gemini-env")
$ignoredPath = ".ignored"

if (-not (Test-Path $ignoredPath)) {
    New-Item -ItemType Directory -Path $ignoredPath -Force | Out-Null
}

foreach ($env in $envsToMove) {
    if (Test-Path $env) {
        Write-Host "  📦 Movendo $env para .ignored/" -ForegroundColor Yellow
        Move-Item $env "$ignoredPath/$env" -Force -ErrorAction SilentlyContinue
    }
}

# 3. Limpar cache Python
Write-Host "🐍 Limpando cache Python..." -ForegroundColor Cyan
Get-ChildItem -Recurse -Name "__pycache__" -Force | ForEach-Object {
    Write-Host "  🗑️  Removendo: $_" -ForegroundColor Red
    Remove-Item $_ -Recurse -Force -ErrorAction SilentlyContinue
}

Get-ChildItem -Recurse -Name "*.pyc" -Force | ForEach-Object {
    Remove-Item $_ -Force -ErrorAction SilentlyContinue
}

# 4. Limpar node_modules/.cache se existir
Write-Host "📦 Limpando cache Node.js..." -ForegroundColor Cyan
if (Test-Path "node_modules/.cache") {
    Write-Host "  🗑️  Removendo node_modules/.cache" -ForegroundColor Red
    Remove-Item "node_modules/.cache" -Recurse -Force -ErrorAction SilentlyContinue
}

# 5. Organizar documentos de planejamento
Write-Host "📋 Organizando documentos de planejamento..." -ForegroundColor Cyan

$planningDocs = @(
    "Plano de Implementação - SYMBEON Ciclo 05.md",
    "CHANGELOG_REORGANIZATION_2025.md",
    "Terminal Cognitivo Warp-X (SYMBIOTERM + SYMBIOAPP)"
)

$planningPath = "docs/planning"
if (-not (Test-Path $planningPath)) {
    New-Item -ItemType Directory -Path $planningPath -Force | Out-Null
}

foreach ($doc in $planningDocs) {
    if (Test-Path $doc) {
        Write-Host "  📋 Movendo $doc para docs/planning/" -ForegroundColor Yellow
        Move-Item $doc "$planningPath/" -Force -ErrorAction SilentlyContinue
    }
}

# 6. Atualizar .gitignore
Write-Host "🔒 Atualizando .gitignore..." -ForegroundColor Cyan

$gitignoreAdditions = @"

# Ambientes virtuais organizados
.ignored/
venv/
gemini-env/
env/
ENV/

# Cache Python adicional
*.pyc
__pycache__/
*.pyo
*.pyd
.Python

# Cache Node.js
node_modules/.cache/
.npm/

# Arquivos temporários do sistema
*.tmp
*.temp
*_temp
*_backup
*_old
"@

Add-Content -Path ".gitignore" -Value $gitignoreAdditions

# 7. Verificar status final
Write-Host "📊 Status final do repositório:" -ForegroundColor Green
Write-Host "$(Get-ChildItem -Directory | Measure-Object | Select-Object -ExpandProperty Count) pastas" -ForegroundColor White
Write-Host "$(Get-ChildItem -File | Measure-Object | Select-Object -ExpandProperty Count) arquivos" -ForegroundColor White

Write-Host "`n✅ Limpeza concluída!" -ForegroundColor Green
Write-Host "📋 Próximos passos recomendados:" -ForegroundColor Yellow
Write-Host "  1. git add -A" -ForegroundColor Gray
Write-Host "  2. git commit -m `"chore: repository cleanup and organization`"" -ForegroundColor Gray
Write-Host "  3. git push" -ForegroundColor Gray

