# GUARDRIVE Repository Sync Script
# Sincroniza entre repositório pessoal e organizacional

Write-Host "🔄 Sincronizando repositórios GUARDRIVE..." -ForegroundColor Green

# Verificar status atual
Write-Host "📊 Status atual dos repositórios:" -ForegroundColor Cyan
git remote -v

Write-Host "`n📋 Commits recentes:" -ForegroundColor Cyan
git log --oneline --graph --decorate -3

# Função para push seguro
function Push-ToRemote {
    param([string]$remoteName, [string]$remoteUrl)
    
    Write-Host "`n🚀 Fazendo push para $remoteName ($remoteUrl)..." -ForegroundColor Yellow
    
    try {
        $result = git push $remoteName main 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Push para $remoteName realizado com sucesso!" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Push para $remoteName com avisos: $result" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "  ❌ Erro no push para $remoteName : $_" -ForegroundColor Red
    }
}

# Sincronizar com repositório pessoal (NEO-SH1W4/GUARDRIVE)
Push-ToRemote "origin" "https://github.com/NEO-SH1W4/GUARDRIVE.git"

# Sincronizar com repositório organizacional (GUARDRIVE-CORE/GUARDRIVE)
Push-ToRemote "org" "https://github.com/GUARDRIVE-CORE/GUARDRIVE.git"

# Verificar sincronização final
Write-Host "`n📊 Status final:" -ForegroundColor Cyan
git log --oneline --graph --decorate -2

Write-Host "`n✅ Sincronização concluída!" -ForegroundColor Green
Write-Host "📖 Repositórios atualizados:" -ForegroundColor Yellow
Write-Host "  • Personal: https://github.com/NEO-SH1W4/GUARDRIVE" -ForegroundColor Gray
Write-Host "  • Organization: https://github.com/GUARDRIVE-CORE/GUARDRIVE" -ForegroundColor Gray

# Verificar se há divergências
Write-Host "`n🔍 Verificando consistência entre repositórios..." -ForegroundColor Cyan

$originCommit = git rev-parse origin/main 2>$null
$orgCommit = git rev-parse org/main 2>$null

if ($originCommit -eq $orgCommit) {
    Write-Host "  ✅ Repositórios estão sincronizados!" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Repositórios podem estar dessincronizados" -ForegroundColor Yellow
    Write-Host "    Origin: $originCommit" -ForegroundColor Gray
    Write-Host "    Org: $orgCommit" -ForegroundColor Gray
}

