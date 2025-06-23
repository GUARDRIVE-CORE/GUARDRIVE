# Script Direto para GitHub Release
Write-Host "=== CONFIGURACAO DIRETA GITHUB RELEASE ===" -ForegroundColor Yellow

# Verificar informacoes do repositorio
$latestTag = git describe --tags --abbrev=0
$repoUrl = git remote get-url origin

Write-Host "[OK] Repositorio: $repoUrl" -ForegroundColor Green
Write-Host "[OK] Tag mais recente: $latestTag" -ForegroundColor Green
Write-Host "[OK] GitHub CLI instalado: $(gh --version | Select-Object -First 1)" -ForegroundColor Green

# Verificar autenticacao
Write-Host "`n[INFO] Verificando autenticacao..." -ForegroundColor Cyan
gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[AVISO] GitHub CLI nao autenticado" -ForegroundColor Yellow
    Write-Host "`nEXECUTE ESTES COMANDOS MANUALMENTE:" -ForegroundColor White
    Write-Host ""
    Write-Host "1. Autenticar:" -ForegroundColor Cyan
    Write-Host "   gh auth login" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Verificar se release existe:" -ForegroundColor Cyan
    Write-Host "   gh release view $latestTag" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Se NAO existir, criar release:" -ForegroundColor Cyan
    Write-Host "   gh release create $latestTag --title `"$latestTag`" --notes-from-tag" -ForegroundColor White
    Write-Host ""
    Write-Host "4. Verificar resultado:" -ForegroundColor Cyan
    Write-Host "   gh release list" -ForegroundColor White
    Write-Host ""
    
    Write-Host "ALTERNATIVA - Se tiver um token GitHub:" -ForegroundColor Yellow
    Write-Host "   `$env:GH_TOKEN = 'seu_token_aqui'" -ForegroundColor White
    Write-Host "   gh release create $latestTag --title `"$latestTag`" --notes-from-tag" -ForegroundColor White
    
} else {
    Write-Host "[OK] GitHub CLI autenticado" -ForegroundColor Green
    
    # Verificar se release existe
    Write-Host "`n[INFO] Verificando release existente..." -ForegroundColor Cyan
    $releaseCheck = gh release view $latestTag 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Release para $latestTag JA EXISTE" -ForegroundColor Green
        Write-Host "`n[INFO] Detalhes do release:" -ForegroundColor Cyan
        gh release view $latestTag
    } else {
        Write-Host "[INFO] Release para $latestTag NAO EXISTE" -ForegroundColor Yellow
        Write-Host "[INFO] Criando release automaticamente..." -ForegroundColor Cyan
        
        # Criar release
        gh release create $latestTag --title $latestTag --notes-from-tag
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Release $latestTag criado com SUCESSO!" -ForegroundColor Green
            Write-Host "`nURL do release:" -ForegroundColor Cyan
            gh release view $latestTag --json url --jq .url
        } else {
            Write-Host "[ERROR] Falha ao criar release" -ForegroundColor Red
        }
    }
    
    # Listar todos os releases
    Write-Host "`n[INFO] Releases atuais do repositorio:" -ForegroundColor Cyan
    gh release list
}

# Status do repositorio
Write-Host "`n[INFO] Status do repositorio:" -ForegroundColor Cyan
$status = git status --porcelain
if (-not $status) {
    Write-Host "[OK] Repositorio limpo" -ForegroundColor Green
} else {
    Write-Host "[INFO] Alteracoes pendentes:" -ForegroundColor Yellow
    $status | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
}

Write-Host "`n[OK] Verificacao concluida!" -ForegroundColor Green
Write-Host "URL do repositorio: https://github.com/NEO-SH1W4/SYMBEON/releases" -ForegroundColor Cyan

