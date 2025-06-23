# COMANDOS PRONTOS PARA CRIAR RELEASE GITHUB
# Execute estes comandos um por vez

Write-Host "=== COMANDOS PARA CRIAR RELEASE v1.0.1 ===" -ForegroundColor Yellow

Write-Host "`n1. AUTENTICAR GITHUB CLI:" -ForegroundColor Cyan
Write-Host "gh auth login" -ForegroundColor White

Write-Host "`n2. VERIFICAR SE RELEASE EXISTE:" -ForegroundColor Cyan  
Write-Host "gh release view v1.0.1" -ForegroundColor White

Write-Host "`n3. CRIAR RELEASE (se nao existir):" -ForegroundColor Cyan
Write-Host "gh release create v1.0.1 --title `"v1.0.1`" --notes-from-tag" -ForegroundColor White

Write-Host "`n4. VERIFICAR RESULTADO:" -ForegroundColor Cyan
Write-Host "gh release list" -ForegroundColor White

Write-Host "`n=== COPY/PASTE RAPIDO ===" -ForegroundColor Yellow
Write-Host @"

gh auth login
gh release view v1.0.1
gh release create v1.0.1 --title "v1.0.1" --notes-from-tag  
gh release list

"@ -ForegroundColor Green

Write-Host "=== INFORMACOES ===" -ForegroundColor Yellow
Write-Host "Repositorio: https://github.com/NEO-SH1W4/SYMBEON.git" -ForegroundColor White
Write-Host "Tag: v1.0.1" -ForegroundColor White
Write-Host "Releases: https://github.com/NEO-SH1W4/SYMBEON/releases" -ForegroundColor White

Write-Host "`n=== STATUS ATUAL ===" -ForegroundColor Yellow
Write-Host "✅ Git funcionando" -ForegroundColor Green
Write-Host "✅ GitHub CLI instalado" -ForegroundColor Green  
Write-Host "✅ Tag v1.0.1 sincronizada no GitHub" -ForegroundColor Green
Write-Host "⚠️  GitHub CLI precisa ser autenticado" -ForegroundColor Yellow
Write-Host "⚠️  Release precisa ser criado" -ForegroundColor Yellow

