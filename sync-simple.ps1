# GUARDRIVE Repository Sync - Simple Version

Write-Host "Sincronizando repositorios GUARDRIVE..." -ForegroundColor Green

# Status atual
Write-Host "Status dos repositorios:" -ForegroundColor Cyan
git log --oneline -1

# Sync para repositorio pessoal
Write-Host "Push para repositorio pessoal (origin)..." -ForegroundColor Yellow
git push origin main

# Sync para repositorio organizacional  
Write-Host "Push para repositorio organizacional (org)..." -ForegroundColor Yellow
git push org main

# Verificar commits
$originCommit = git rev-parse origin/main
$orgCommit = git rev-parse org/main

Write-Host "Verificacao final:" -ForegroundColor Cyan
Write-Host "  Origin: $originCommit" -ForegroundColor Gray
Write-Host "  Org: $orgCommit" -ForegroundColor Gray

if ($originCommit -eq $orgCommit) {
    Write-Host "Repositorios sincronizados com sucesso!" -ForegroundColor Green
} else {
    Write-Host "ATENCAO: Repositorios podem estar dessincronizados" -ForegroundColor Red
}

Write-Host ""
Write-Host "URLs dos repositorios:" -ForegroundColor Yellow
Write-Host "  Personal: https://github.com/NEO-SH1W4/GUARDRIVE" -ForegroundColor White
Write-Host "  Organization: https://github.com/GUARDRIVE-CORE/GUARDRIVE" -ForegroundColor White

