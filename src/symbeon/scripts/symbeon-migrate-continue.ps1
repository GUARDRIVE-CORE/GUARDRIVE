# SYMBEON Migration Continuation Script
# Continua a migracao apos criacao da organizacao

param(
    [string]$OrgName = "SYMBEON-AI"
)

function Write-Success { param([string]$msg) Write-Host "[OK] $msg" -ForegroundColor Green }
function Write-Error-Msg { param([string]$msg) Write-Host "[ERROR] $msg" -ForegroundColor Red }
function Write-Info-Msg { param([string]$msg) Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warning-Msg { param([string]$msg) Write-Host "[WARNING] $msg" -ForegroundColor Yellow }

Write-Host "===============================================" -ForegroundColor Magenta
Write-Host "      SYMBEON MIGRATION CONTINUATION" -ForegroundColor Magenta
Write-Host "===============================================" -ForegroundColor Magenta

# Aguardar criacao da organizacao
Write-Info-Msg "Aguardando criacao da organizacao $OrgName..."
Write-Host "`nPara criar a organizacao:" -ForegroundColor Yellow
Write-Host "1. Visite: https://github.com/organizations/new" -ForegroundColor Cyan
Write-Host "2. Nome: $OrgName" -ForegroundColor White
Write-Host "3. Descricao: Symbiotic Evolution Operating Network - AI Platform for Enterprise Automation" -ForegroundColor White

do {
    $orgExists = gh api "/orgs/$OrgName" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Organizacao $OrgName detectada!"
        break
    } else {
        Write-Info-Msg "Organizacao ainda nao existe. Aguardando..."
        Start-Sleep 5
    }
} while ($true)

# Obter informacoes do repositorio atual
$currentRepo = git remote get-url origin
$repoName = ($currentRepo -split '/')[-1] -replace '\.git$', ''
$currentOwner = ($currentRepo -split '/')[-2]

Write-Info-Msg "Repositorio atual: $currentOwner/$repoName"

# Continuar com a migracao
Write-Host "`n=== CONTINUANDO MIGRACAO ===" -ForegroundColor Green

# Passo 1: Configurar organizacao
Write-Info-Msg "Configurando organizacao..."
try {
    $updateData = @{
        description = "Symbiotic Evolution Operating Network - AI Platform for Enterprise Automation"
        company = "SYMBEON Technologies"
        blog = "https://symbeon.ai"
        location = "Global"
    } | ConvertTo-Json
    
    $tempFile = "$env:TEMP\org-update.json"
    $updateData | Out-File -FilePath $tempFile -Encoding UTF8
    
    gh api --method PATCH "/orgs/$OrgName" --input $tempFile 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Organizacao configurada"
    }
    Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
} catch {
    Write-Warning-Msg "Algumas configuracoes podem ser feitas manualmente"
}

# Passo 2: Transferir repositorio
Write-Info-Msg "Transferindo repositorio $currentOwner/$repoName para $OrgName..."
try {
    # Backup
    $backupInfo = @{
        originalOwner = $currentOwner
        originalName = $repoName
        transferDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        newOrg = $OrgName
    }
    $backupInfo | ConvertTo-Json | Out-File "migration-backup.json" -Encoding UTF8
    
    # Transferir
    gh repo transfer "$currentOwner/$repoName" $OrgName
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Repositorio transferido para $OrgName/$repoName"
    } else {
        Write-Error-Msg "Falha na transferencia"
        exit 1
    }
} catch {
    Write-Error-Msg "Erro na transferencia: $($_.Exception.Message)"
    exit 1
}

# Passo 3: Renomear repositorio
Write-Info-Msg "Renomeando repositorio para 'symbeon-platform'..."
try {
    $renameData = @{
        name = "symbeon-platform"
        description = "SYMBEON AI Platform - Enterprise Automation & Symbiotic Evolution Operating Network"
    } | ConvertTo-Json
    
    $tempFile = "$env:TEMP\repo-rename.json"
    $renameData | Out-File -FilePath $tempFile -Encoding UTF8
    
    gh api --method PATCH "/repos/$OrgName/$repoName" --input $tempFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Repositorio renomeado para 'symbeon-platform'"
    }
    Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
} catch {
    Write-Warning-Msg "Renomeacao pode precisar ser feita manualmente"
}

# Passo 4: Configurar settings
Write-Info-Msg "Configurando settings do repositorio..."
try {
    $repoSettings = @{
        description = "SYMBEON AI Platform - Enterprise Automation & Symbiotic Evolution Operating Network"
        homepage = "https://symbeon.ai"
        topics = @("ai", "automation", "mcp-servers", "enterprise", "platform", "symbeon")
        has_issues = $true
        has_projects = $true
        has_wiki = $true
        has_downloads = $true
        default_branch = "main"
    } | ConvertTo-Json
    
    $tempFile = "$env:TEMP\repo-settings.json"
    $repoSettings | Out-File -FilePath $tempFile -Encoding UTF8
    
    gh api --method PATCH "/repos/$OrgName/symbeon-platform" --input $tempFile
    
    Write-Success "Settings configurados"
    Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
} catch {
    Write-Warning-Msg "Algumas configuracoes podem ser feitas manualmente"
}

# Verificacao final
Write-Info-Msg "Verificando resultado..."
try {
    $orgInfo = gh api "/orgs/$OrgName" | ConvertFrom-Json
    $repoInfo = gh api "/repos/$OrgName/symbeon-platform" | ConvertFrom-Json
    
    Write-Success "MIGRACAO CONCLUIDA COM SUCESSO!"
    Write-Host "`n=== RESULTADO FINAL ===" -ForegroundColor Green
    Write-Host "Organizacao: $($orgInfo.login)" -ForegroundColor White
    Write-Host "Repositorio: $($repoInfo.full_name)" -ForegroundColor White
    Write-Host "URL: $($repoInfo.html_url)" -ForegroundColor White
    Write-Host "Stars: $($repoInfo.stargazers_count)" -ForegroundColor White
    Write-Host "Forks: $($repoInfo.forks_count)" -ForegroundColor White
} catch {
    Write-Warning-Msg "Verificacao parcial"
}

# Proximos passos
Write-Host "`n=== PROXIMOS PASSOS ===" -ForegroundColor Yellow
Write-Host "1. Atualizar remote local:" -ForegroundColor Cyan
Write-Host "   git remote set-url origin https://github.com/$OrgName/symbeon-platform.git" -ForegroundColor White
Write-Host "2. Verificar:" -ForegroundColor Cyan
Write-Host "   git remote -v" -ForegroundColor White
Write-Host "3. Push de teste:" -ForegroundColor Cyan
Write-Host "   git push origin main" -ForegroundColor White

Write-Success "Migracao completa!"
Write-Host "`nVisite: https://github.com/$OrgName" -ForegroundColor Cyan

