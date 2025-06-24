# SYMBEON GitHub Organization Creator
# Script com privilegios administrativos

param(
    [string]$OrgName = "SYMBEON-AI",
    [string]$OrgDescription = "Symbiotic Evolution Operating Network - AI Platform for Enterprise Automation",
    [switch]$DryRun = $false,
    [switch]$Force = $false
)

function Write-Success { param([string]$msg) Write-Host "[OK] $msg" -ForegroundColor Green }
function Write-Error-Msg { param([string]$msg) Write-Host "[ERROR] $msg" -ForegroundColor Red }
function Write-Info-Msg { param([string]$msg) Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warning-Msg { param([string]$msg) Write-Host "[WARNING] $msg" -ForegroundColor Yellow }

Write-Host "===============================================" -ForegroundColor Magenta
Write-Host "    SYMBEON GITHUB ORGANIZATION CREATOR" -ForegroundColor Magenta
Write-Host "===============================================" -ForegroundColor Magenta

Write-Info-Msg "Configuracao:"
Write-Host "  Nome da Organizacao: $OrgName" -ForegroundColor White
Write-Host "  Descricao: $OrgDescription" -ForegroundColor White
Write-Host "  Modo: $(if($DryRun){'DRY RUN (simulacao)'}else{'EXECUCAO REAL'})" -ForegroundColor White

if ($DryRun) {
    Write-Warning-Msg "MODO DRY RUN - Nenhuma alteracao sera feita"
}

# Verificar pre-requisitos
Write-Info-Msg "Verificando pre-requisitos..."

# Verificar Git
try {
    $gitVersion = git --version
    Write-Success "Git disponivel: $gitVersion"
} catch {
    Write-Error-Msg "Git nao encontrado"
    exit 1
}

# Verificar GitHub CLI
try {
    $ghVersion = gh --version | Select-Object -First 1
    Write-Success "GitHub CLI disponivel: $ghVersion"
} catch {
    Write-Error-Msg "GitHub CLI nao encontrado"
    if (-not $DryRun) {
        Write-Info-Msg "Execute: winget install --id GitHub.cli"
    }
    exit 1
}

# Verificar autenticacao
Write-Info-Msg "Verificando autenticacao GitHub..."
gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Warning-Msg "GitHub CLI nao autenticado"
    if (-not $Force -and -not $DryRun) {
        $continue = Read-Host "Continuar mesmo assim? (s/N)"
        if ($continue -ne 's') {
            Write-Info-Msg "Execute primeiro: gh auth login"
            exit 0
        }
    }
} else {
    Write-Success "GitHub CLI autenticado"
}

# Verificar repositorio atual
Write-Info-Msg "Analisando repositorio atual..."
try {
    $currentRepo = git remote get-url origin
    $repoName = ($currentRepo -split '/')[-1] -replace '\.git$', ''
    $currentOwner = ($currentRepo -split '/')[-2]
    
    Write-Success "Repositorio atual: $currentRepo"
    Write-Info-Msg "  Proprietario: $currentOwner"
    Write-Info-Msg "  Nome: $repoName"
} catch {
    Write-Error-Msg "Nao e um repositorio Git valido"
    exit 1
}

# Plano de execucao
Write-Host "`n=== PLANO DE EXECUCAO ===" -ForegroundColor Yellow
Write-Host "1. Criar organizacao '$OrgName'" -ForegroundColor Cyan
Write-Host "2. Configurar organizacao" -ForegroundColor Cyan
Write-Host "3. Transferir repositorio '$repoName'" -ForegroundColor Cyan
Write-Host "4. Renomear para 'symbeon-platform'" -ForegroundColor Cyan
Write-Host "5. Configurar settings" -ForegroundColor Cyan
Write-Host "6. Verificar migracao" -ForegroundColor Cyan

if (-not $Force -and -not $DryRun) {
    $proceed = Read-Host "`nProsseguir com a criacao? (s/N)"
    if ($proceed -ne 's') {
        Write-Info-Msg "Operacao cancelada pelo usuario"
        exit 0
    }
}

Write-Host "`n=== INICIANDO MIGRACAO ===" -ForegroundColor Green

# Passo 1: Verificar/Criar organizacao
Write-Info-Msg "Passo 1/6: Verificando organizacao GitHub..."
if (-not $DryRun) {
    $orgExists = gh api "/orgs/$OrgName" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Organizacao '$OrgName' ja existe"
    } else {
        Write-Warning-Msg "Organizacao '$OrgName' nao existe"
        Write-Info-Msg "A criacao de organizacoes deve ser feita via web"
        Write-Info-Msg "Visite: https://github.com/organizations/new"
        Write-Info-Msg "Nome: $OrgName"
        Write-Info-Msg "Descricao: $OrgDescription"
        Read-Host "Pressione Enter apos criar a organizacao"
        
        # Verificar novamente
        $orgExists = gh api "/orgs/$OrgName" 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Msg "Organizacao nao encontrada. Verifique se foi criada corretamente"
            exit 1
        }
        Write-Success "Organizacao verificada"
    }
} else {
    Write-Info-Msg "[DRY RUN] Verificaria/criaria organizacao '$OrgName'"
}

# Passo 2: Configurar organizacao
Write-Info-Msg "Passo 2/6: Configurando organizacao..."
if (-not $DryRun) {
    try {
        # Criar arquivo temporario com dados da organizacao
        $updateData = @{
            description = $OrgDescription
            company = "SYMBEON Technologies"
            blog = "https://symbeon.ai"
            location = "Global"
        } | ConvertTo-Json
        
        $tempFile = "$env:TEMP\org-update.json"
        $updateData | Out-File -FilePath $tempFile -Encoding UTF8
        
        gh api --method PATCH "/orgs/$OrgName" --input $tempFile 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Configuracoes da organizacao atualizadas"
        } else {
            Write-Warning-Msg "Algumas configuracoes podem precisar ser feitas manualmente"
        }
        
        Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
    } catch {
        Write-Warning-Msg "Erro ao configurar organizacao: $($_.Exception.Message)"
    }
} else {
    Write-Info-Msg "[DRY RUN] Configuraria organizacao"
}

# Passo 3: Transferir repositorio
Write-Info-Msg "Passo 3/6: Transferindo repositorio..."
if (-not $DryRun) {
    try {
        Write-Warning-Msg "ATENCAO: Transferindo '$currentOwner/$repoName' para '$OrgName'"
        
        # Backup das informacoes
        $backupInfo = @{
            originalOwner = $currentOwner
            originalName = $repoName
            transferDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            newOrg = $OrgName
        }
        $backupInfo | ConvertTo-Json | Out-File "migration-backup.json" -Encoding UTF8
        
        # Transferir repositorio
        gh repo transfer "$currentOwner/$repoName" $OrgName
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Repositorio transferido para $OrgName/$repoName"
        } else {
            Write-Error-Msg "Falha na transferencia do repositorio"
            exit 1
        }
    } catch {
        Write-Error-Msg "Erro na transferencia: $($_.Exception.Message)"
        exit 1
    }
} else {
    Write-Info-Msg "[DRY RUN] Transferiria '$currentOwner/$repoName' para '$OrgName'"
}

# Passo 4: Renomear repositorio
Write-Info-Msg "Passo 4/6: Renomeando repositorio para 'symbeon-platform'..."
if (-not $DryRun) {
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
        } else {
            Write-Warning-Msg "Renomeacao pode precisar ser feita manualmente"
        }
        
        Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
    } catch {
        Write-Warning-Msg "Erro na renomeacao: $($_.Exception.Message)"
    }
} else {
    Write-Info-Msg "[DRY RUN] Renomearia repositorio para 'symbeon-platform'"
}

# Passo 5: Configurar settings do repositorio
Write-Info-Msg "Passo 5/6: Configurando settings do repositorio..."
if (-not $DryRun) {
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
        
        Write-Success "Settings do repositorio configurados"
        Remove-Item $tempFile -Force -ErrorAction SilentlyContinue
    } catch {
        Write-Warning-Msg "Algumas configuracoes podem precisar ser feitas manualmente"
    }
} else {
    Write-Info-Msg "[DRY RUN] Configuraria settings do repositorio"
}

# Passo 6: Verificacao final
Write-Info-Msg "Passo 6/6: Verificando migracao..."
if (-not $DryRun) {
    try {
        $orgInfo = gh api "/orgs/$OrgName" | ConvertFrom-Json
        $repoInfo = gh api "/repos/$OrgName/symbeon-platform" | ConvertFrom-Json
        
        Write-Success "Migracao concluida com sucesso!"
        Write-Host "`n=== RESULTADO DA MIGRACAO ===" -ForegroundColor Green
        Write-Host "Organizacao: $($orgInfo.login)" -ForegroundColor White
        Write-Host "Repositorio: $($repoInfo.full_name)" -ForegroundColor White
        Write-Host "URL: $($repoInfo.html_url)" -ForegroundColor White
        Write-Host "Stars: $($repoInfo.stargazers_count)" -ForegroundColor White
        Write-Host "Forks: $($repoInfo.forks_count)" -ForegroundColor White
        
    } catch {
        Write-Warning-Msg "Verificacao parcial - algumas informacoes podem nao estar disponiveis"
    }
} else {
    Write-Info-Msg "[DRY RUN] Verificaria o resultado da migracao"
}

# Proximos passos
Write-Host "`n=== PROXIMOS PASSOS ===" -ForegroundColor Yellow
Write-Host "1. Atualizar remote local:" -ForegroundColor Cyan
Write-Host "   git remote set-url origin https://github.com/$OrgName/symbeon-platform.git" -ForegroundColor White
Write-Host "2. Criar nova tag:" -ForegroundColor Cyan
Write-Host "   git tag v1.0.2 && git push origin v1.0.2" -ForegroundColor White
Write-Host "3. Criar repositorios adicionais (docs, examples)" -ForegroundColor Cyan
Write-Host "4. Configurar teams e permissoes" -ForegroundColor Cyan
Write-Host "5. Atualizar README com nova organizacao" -ForegroundColor Cyan

Write-Success "Script de migracao concluido!"

if (-not $DryRun) {
    Write-Host "`nVisite: https://github.com/$OrgName" -ForegroundColor Cyan
    if (Test-Path "migration-backup.json") {
        Write-Info-Msg "Backup das informacoes salvo em: migration-backup.json"
    }
}

