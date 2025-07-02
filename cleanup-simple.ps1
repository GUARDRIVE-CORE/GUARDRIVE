# GUARDRIVE Repository Cleanup Script
# Remove arquivos desnecessarios e organiza estrutura do projeto

Write-Host "Iniciando limpeza do repositorio GUARDRIVE..." -ForegroundColor Green

# 1. Remover arquivos duplicados/temporarios
Write-Host "Removendo arquivos duplicados e temporarios..." -ForegroundColor Cyan

$filesToRemove = @(
    "Dockerfile_0",
    "Dockerfile_1", 
    "Terminal Cognitivo Warp-X (SYMBIOTERM + SYMBIOAPP)_0",
    "Terminal Cognitivo Warp-X (SYMBIOTERM + SYMBIOAPP)_1",
    "README_NEW.md"
)

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Write-Host "  Removendo: $file" -ForegroundColor Red
        Remove-Item $file -Force
    }
}

# 2. Mover ambientes virtuais para pasta ignored
Write-Host "Organizando ambientes virtuais..." -ForegroundColor Cyan

$envsToMove = @("venv", "gemini-env")
$ignoredPath = ".ignored"

if (-not (Test-Path $ignoredPath)) {
    New-Item -ItemType Directory -Path $ignoredPath -Force | Out-Null
}

foreach ($env in $envsToMove) {
    if (Test-Path $env) {
        Write-Host "  Movendo $env para .ignored/" -ForegroundColor Yellow
        Move-Item $env "$ignoredPath/$env" -Force -ErrorAction SilentlyContinue
    }
}

# 3. Limpar cache Python
Write-Host "Limpando cache Python..." -ForegroundColor Cyan
Get-ChildItem -Recurse -Name "__pycache__" -Force -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "  Removendo: $_" -ForegroundColor Red
    Remove-Item $_ -Recurse -Force -ErrorAction SilentlyContinue
}

Get-ChildItem -Recurse -Name "*.pyc" -Force -ErrorAction SilentlyContinue | ForEach-Object {
    Remove-Item $_ -Force -ErrorAction SilentlyContinue
}

# 4. Limpar node_modules/.cache se existir
Write-Host "Limpando cache Node.js..." -ForegroundColor Cyan
if (Test-Path "node_modules/.cache") {
    Write-Host "  Removendo node_modules/.cache" -ForegroundColor Red
    Remove-Item "node_modules/.cache" -Recurse -Force -ErrorAction SilentlyContinue
}

# 5. Organizar documentos de planejamento
Write-Host "Organizando documentos de planejamento..." -ForegroundColor Cyan

$planningDocs = @(
    "Plano de Implementacao - SYMBEON Ciclo 05.md",
    "CHANGELOG_REORGANIZATION_2025.md",
    "Terminal Cognitivo Warp-X (SYMBIOTERM + SYMBIOAPP)"
)

$planningPath = "docs/planning"
if (-not (Test-Path $planningPath)) {
    New-Item -ItemType Directory -Path $planningPath -Force | Out-Null
}

foreach ($doc in $planningDocs) {
    if (Test-Path $doc) {
        Write-Host "  Movendo $doc para docs/planning/" -ForegroundColor Yellow
        Move-Item $doc "$planningPath/" -Force -ErrorAction SilentlyContinue
    }
}

# 6. Atualizar .gitignore
Write-Host "Atualizando .gitignore..." -ForegroundColor Cyan

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

# Arquivos temporarios do sistema
*.tmp
*.temp
*_temp
*_backup
*_old
"@

Add-Content -Path ".gitignore" -Value $gitignoreAdditions

# 7. Verificar status final
Write-Host "Status final do repositorio:" -ForegroundColor Green
$dirCount = (Get-ChildItem -Directory | Measure-Object).Count
$fileCount = (Get-ChildItem -File | Measure-Object).Count
Write-Host "$dirCount pastas" -ForegroundColor White
Write-Host "$fileCount arquivos" -ForegroundColor White

Write-Host ""
Write-Host "Limpeza concluida!" -ForegroundColor Green
Write-Host "Proximos passos recomendados:" -ForegroundColor Yellow
Write-Host "  1. git add -A" -ForegroundColor Gray
Write-Host "  2. git commit -m `"chore: repository cleanup and organization`"" -ForegroundColor Gray
Write-Host "  3. git push" -ForegroundColor Gray

