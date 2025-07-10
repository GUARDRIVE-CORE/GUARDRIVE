# GUARDRIVE Repository Sync Script
# Sincroniza todos os repositórios GUARDRIVE

Write-Host "=== GUARDRIVE Repository Sync ===" -ForegroundColor Cyan
Write-Host "Sincronizando repositórios entre diferentes locais..." -ForegroundColor Yellow

# Configuração
$mainRepo = "C:\Users\João\Desktop\PROJETOS\GUARDRIVE"
$orgRepo = "C:\Users\João\Desktop\PROJETOS\GUARDRIVE-ORG\GUARDRIVE"
$pendriveRepo = "E:\GUARDRIVE-CORE\GUARDRIVE"

# Função para verificar e sincronizar
function Sync-Repository {
    param(
        [string]$source,
        [string]$target,
        [string]$name
    )
    
    Write-Host "`nSincronizando $name..." -ForegroundColor Green
    
    if (Test-Path $target) {
        Push-Location $target
        
        # Fetch últimas mudanças
        Write-Host "  Buscando atualizações..." -ForegroundColor Gray
        git fetch --all
        
        # Verificar status
        $status = git status --porcelain
        if ($status) {
            Write-Host "  ⚠️  Mudanças não commitadas em $name" -ForegroundColor Yellow
            git status --short
        }
        
        # Pull se não houver conflitos
        $currentBranch = git branch --show-current
        Write-Host "  Branch atual: $currentBranch" -ForegroundColor Gray
        
        # Tentar pull
        $pullResult = git pull origin $currentBranch 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Sincronizado com sucesso" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Erro ao sincronizar: $pullResult" -ForegroundColor Red
        }
        
        Pop-Location
    } else {
        Write-Host "  ⚠️  Diretório não encontrado: $target" -ForegroundColor Yellow
    }
}

# Sincronizar repositório principal primeiro
Write-Host "`n1. Atualizando repositório principal..." -ForegroundColor Cyan
Push-Location $mainRepo
git add .
$hasChanges = git status --porcelain
if ($hasChanges) {
    Write-Host "  Commitando mudanças locais..." -ForegroundColor Yellow
    git commit -m "chore: auto-save before sync"
}
git pull origin main
Pop-Location

# Sincronizar outros repositórios
Sync-Repository -source $mainRepo -target $orgRepo -name "GUARDRIVE-ORG"
Sync-Repository -source $mainRepo -target $pendriveRepo -name "GUARDRIVE-CORE (Pendrive)"

# Relatório final
Write-Host "`n=== Relatório de Sincronização ===" -ForegroundColor Cyan
Write-Host "Principal: " -NoNewline
Push-Location $mainRepo
git log --oneline -1
Pop-Location

if (Test-Path $orgRepo) {
    Write-Host "ORG: " -NoNewline
    Push-Location $orgRepo
    git log --oneline -1
    Pop-Location
}

if (Test-Path $pendriveRepo) {
    Write-Host "Pendrive: " -NoNewline
    Push-Location $pendriveRepo
    git log --oneline -1
    Pop-Location
}

Write-Host "`n✅ Sincronização concluída!" -ForegroundColor Green
