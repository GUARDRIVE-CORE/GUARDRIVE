# Script Direto para Criar Organizacao SYMBEON-AI
Write-Host "================================================" -ForegroundColor Magenta
Write-Host "         CRIAR ORGANIZACAO SYMBEON-AI" -ForegroundColor Magenta
Write-Host "================================================" -ForegroundColor Magenta

Write-Host "`n[PASSO 1] CRIAR ORGANIZACAO MANUALMENTE" -ForegroundColor Yellow
Write-Host "1. Abra no navegador: https://github.com/organizations/new" -ForegroundColor Cyan
Write-Host "2. Preencha os dados:" -ForegroundColor Cyan
Write-Host "   • Organization account name: SYMBEON-AI" -ForegroundColor White
Write-Host "   • Contact email: Seu email" -ForegroundColor White
Write-Host "   • This organization belongs to: My personal account" -ForegroundColor White
Write-Host "   • Description: Symbiotic Evolution Operating Network - AI Platform for Enterprise Automation" -ForegroundColor White
Write-Host "3. Clique em 'Create organization'" -ForegroundColor Cyan
Write-Host "4. Complete qualquer verificacao adicional" -ForegroundColor Cyan

Write-Host "`n[AGUARDANDO] Pressione Enter APOS criar a organizacao..." -ForegroundColor Yellow
Read-Host

# Verificar se a organizacao foi criada
Write-Host "`n[VERIFICANDO] Testando se organizacao SYMBEON-AI existe..." -ForegroundColor Cyan
$maxTentativas = 5
$tentativa = 0

do {
    $tentativa++
    Write-Host "Tentativa $tentativa de $maxTentativas..." -ForegroundColor Gray
    
    $orgCheck = gh api "/orgs/SYMBEON-AI" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Organizacao SYMBEON-AI encontrada!" -ForegroundColor Green
        $orgCriada = $true
        break
    } else {
        Write-Host "[AVISO] Organizacao ainda nao encontrada. Aguardando..." -ForegroundColor Yellow
        Start-Sleep 3
        $orgCriada = $false
    }
} while ($tentativa -lt $maxTentativas)

if (-not $orgCriada) {
    Write-Host "[ERRO] Organizacao nao foi encontrada apos $maxTentativas tentativas." -ForegroundColor Red
    Write-Host "Verifique se a organizacao foi criada corretamente." -ForegroundColor Yellow
    exit 1
}

# Obter informacoes do repositorio atual
Write-Host "`n[INFO] Analisando repositorio atual..." -ForegroundColor Cyan
$currentRepo = git remote get-url origin
$repoName = ($currentRepo -split '/')[-1] -replace '\.git$', ''
$currentOwner = ($currentRepo -split '/')[-2]

Write-Host "Repositorio: $currentOwner/$repoName" -ForegroundColor White

Write-Host "`n[PASSO 2] INICIANDO MIGRACAO..." -ForegroundColor Yellow

# Backup das informacoes
$backupInfo = @{
    originalOwner = $currentOwner
    originalName = $repoName
    transferDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    newOrg = "SYMBEON-AI"
    originalUrl = $currentRepo
}
$backupInfo | ConvertTo-Json | Out-File "symbeon-migration-backup.json" -Encoding UTF8
Write-Host "[OK] Backup criado em symbeon-migration-backup.json" -ForegroundColor Green

# Transferir repositorio
Write-Host "`n[EXECUTANDO] Transferindo repositorio para SYMBEON-AI..." -ForegroundColor Cyan
try {
    gh repo transfer "$currentOwner/$repoName" "SYMBEON-AI"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Repositorio transferido com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "[ERRO] Falha na transferencia do repositorio" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "[ERRO] Erro na transferencia: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Aguardar um pouco para a transferencia ser processada
Write-Host "`n[AGUARDANDO] Processamento da transferencia..." -ForegroundColor Yellow
Start-Sleep 5

# Renomear repositorio para symbeon-platform
Write-Host "`n[EXECUTANDO] Renomeando repositorio para 'symbeon-platform'..." -ForegroundColor Cyan
try {
    $renameData = @{
        name = "symbeon-platform"
        description = "SYMBEON AI Platform - Enterprise Automation & Symbiotic Evolution Operating Network"
    } | ConvertTo-Json
    
    $tempFile = "$env:TEMP\symbeon-rename.json"
    $renameData | Out-File -FilePath $tempFile -Encoding UTF8
    
    gh api --method PATCH "/repos/SYMBEON-AI/$repoName" --input $tempFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Repositorio renomeado para 'symbeon-platform'" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] Renomeacao pode precisar ser feita manualmente" -ForegroundColor Yellow
    }
    
    Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
} catch {
    Write-Host "[AVISO] Erro na renomeacao: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Configurar repositorio
Write-Host "`n[EXECUTANDO] Configurando repositorio..." -ForegroundColor Cyan
try {
    $repoSettings = @{
        description = "SYMBEON AI Platform - Enterprise Automation & Symbiotic Evolution Operating Network"
        homepage = "https://symbeon.ai"
        topics = @("ai", "automation", "mcp-servers", "enterprise", "platform", "symbeon")
        has_issues = $true
        has_projects = $true
        has_wiki = $true
    } | ConvertTo-Json
    
    $tempFile = "$env:TEMP\symbeon-settings.json"
    $repoSettings | Out-File -FilePath $tempFile -Encoding UTF8
    
    gh api --method PATCH "/repos/SYMBEON-AI/symbeon-platform" --input $tempFile
    
    Write-Host "[OK] Configuracoes aplicadas" -ForegroundColor Green
    Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
} catch {
    Write-Host "[AVISO] Algumas configuracoes podem precisar ser ajustadas manualmente" -ForegroundColor Yellow
}

# Verificacao final
Write-Host "`n[VERIFICANDO] Resultado final..." -ForegroundColor Cyan
try {
    $orgInfo = gh api "/orgs/SYMBEON-AI" | ConvertFrom-Json
    $repoInfo = gh api "/repos/SYMBEON-AI/symbeon-platform" | ConvertFrom-Json
    
    Write-Host "`n================================================" -ForegroundColor Green
    Write-Host "         MIGRACAO CONCLUIDA COM SUCESSO!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "Organizacao: $($orgInfo.login)" -ForegroundColor White
    Write-Host "Repositorio: $($repoInfo.full_name)" -ForegroundColor White
    Write-Host "URL: $($repoInfo.html_url)" -ForegroundColor White
    Write-Host "Descricao: $($repoInfo.description)" -ForegroundColor White
    
    $migracaoSucesso = $true
} catch {
    Write-Host "[AVISO] Verificacao parcial - repositorio pode estar sendo processado" -ForegroundColor Yellow
    $migracaoSucesso = $false
}

# Proximos passos
Write-Host "`n================================================" -ForegroundColor Yellow
Write-Host "              PROXIMOS PASSOS" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Yellow

if ($migracaoSucesso) {
    Write-Host "1. Atualizar remote local:" -ForegroundColor Cyan
    Write-Host "   git remote set-url origin https://github.com/SYMBEON-AI/symbeon-platform.git" -ForegroundColor White
    
    Write-Host "`n2. Verificar conexao:" -ForegroundColor Cyan
    Write-Host "   git remote -v" -ForegroundColor White
    
    Write-Host "`n3. Fazer push de teste:" -ForegroundColor Cyan
    Write-Host "   git push origin main" -ForegroundColor White
    
    Write-Host "`n4. Criar nova tag:" -ForegroundColor Cyan
    Write-Host "   git tag v1.1.0 -m 'SYMBEON Organization Migration'" -ForegroundColor White
    Write-Host "   git push origin v1.1.0" -ForegroundColor White
    
    Write-Host "`n5. Atualizar README com nova organizacao" -ForegroundColor Cyan
} else {
    Write-Host "Aguarde alguns minutos e verifique:" -ForegroundColor Yellow
    Write-Host "https://github.com/SYMBEON-AI/symbeon-platform" -ForegroundColor Cyan
}

Write-Host "`n[LINKS IMPORTANTES]" -ForegroundColor Yellow
Write-Host "Organizacao: https://github.com/SYMBEON-AI" -ForegroundColor Cyan
Write-Host "Repositorio: https://github.com/SYMBEON-AI/symbeon-platform" -ForegroundColor Cyan

Write-Host "`n[OK] Script concluido!" -ForegroundColor Green

