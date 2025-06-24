# SYMBEON GitHub Organization Creation & Migration Script
# Executa com privilégios administrativos conforme autorização do usuário

param(
    [string]$OrgName = "SYMBEON-AI",
    [string]$OrgDescription = "Symbiotic Evolution Operating Network - AI Platform for Enterprise Automation",
    [switch]$DryRun = $false,
    [switch]$Force = $false
)

function Invoke-AdminCommand {
    param([string]$Command, [string]$Description = "Comando administrativo")
    
    Write-Host "[ADMIN] $Description" -ForegroundColor Yellow
    
    $encodedCommand = [Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes($Command))
    $scriptPath = "$env:TEMP\admin_symbeon_org.ps1"
    
    @"
# Script gerado pelo Agente Warp para execução administrativa
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    `$adminCommand = [System.Text.Encoding]::Unicode.GetString([Convert]::FromBase64String("$encodedCommand"))
    Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile", "-ExecutionPolicy Bypass", "-Command `$adminCommand"
    exit
}
# Se já estiver como admin, executa diretamente
$Command
Write-Host "`nComando concluído. Pressione qualquer tecla para fechar..." -ForegroundColor Green
`$null = `$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
"@ | Set-Content -Path $scriptPath
    
    # Executar o script criado
    powershell -ExecutionPolicy Bypass -File $scriptPath
    Remove-Item $scriptPath -Force -ErrorAction SilentlyContinue
}

function Write-Success { param([string]$msg) Write-Host "[✅] $msg" -ForegroundColor Green }
function Write-Error-Msg { param([string]$msg) Write-Host "[❌] $msg" -ForegroundColor Red }
function Write-Info-Msg { param([string]$msg) Write-Host "[ℹ️] $msg" -ForegroundColor Cyan }
function Write-Warning-Msg { param([string]$msg) Write-Host "[⚠️] $msg" -ForegroundColor Yellow }

Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "      🚀 SYMBEON GITHUB ORGANIZATION CREATOR 🚀" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Magenta

Write-Info-Msg "Configuração:"
Write-Host "  • Nome da Organização: $OrgName" -ForegroundColor White
Write-Host "  • Descrição: $OrgDescription" -ForegroundColor White
Write-Host "  • Modo: $(if($DryRun){'DRY RUN (simulação)'}else{'EXECUÇÃO REAL'})" -ForegroundColor White

if ($DryRun) {
    Write-Warning-Msg "MODO DRY RUN - Nenhuma alteração será feita"
}

# Verificar pré-requisitos
Write-Info-Msg "Verificando pré-requisitos..."

# Verificar Git
try {
    $gitVersion = git --version
    Write-Success "Git disponível: $gitVersion"
} catch {
    Write-Error-Msg "Git não encontrado. Instale o Git primeiro."
    exit 1
}

# Verificar GitHub CLI
try {
    $ghVersion = gh --version | Select-Object -First 1
    Write-Success "GitHub CLI disponível: $ghVersion"
} catch {
    Write-Error-Msg "GitHub CLI não encontrado. Executando instalação..."
    
    if (-not $DryRun) {
        $installCommand = @"
Write-Host 'Instalando GitHub CLI...' -ForegroundColor Yellow
winget install --id GitHub.cli --silent --accept-package-agreements --accept-source-agreements
Write-Host 'GitHub CLI instalado!' -ForegroundColor Green
"@
        Invoke-AdminCommand -Command $installCommand -Description "Instalação GitHub CLI"
    }
}

# Verificar autenticação
Write-Info-Msg "Verificando autenticação GitHub..."
$authStatus = gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Warning-Msg "GitHub CLI não autenticado"
    Write-Info-Msg "Execute primeiro: gh auth login"
    if (-not $Force) {
        $continue = Read-Host "Continuar mesmo assim? (s/N)"
        if ($continue -ne 's') {
            Write-Info-Msg "Operação cancelada. Execute 'gh auth login' primeiro."
            exit 0
        }
    }
} else {
    Write-Success "GitHub CLI autenticado"
}

# Verificar repositório atual
Write-Info-Msg "Analisando repositório atual..."
try {
    $currentRepo = git remote get-url origin
    $repoName = ($currentRepo -split '/')[-1] -replace '\.git$', ''
    $currentOwner = ($currentRepo -split '/')[-2]
    
    Write-Success "Repositório atual: $currentRepo"
    Write-Info-Msg "  • Proprietário: $currentOwner"
    Write-Info-Msg "  • Nome: $repoName"
} catch {
    Write-Error-Msg "Não é um repositório Git válido"
    exit 1
}

# Verificar se a organização já existe
Write-Info-Msg "Verificando se a organização '$OrgName' já existe..."
if (-not $DryRun) {
    $orgExists = gh api "/orgs/$OrgName" 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Warning-Msg "Organização '$OrgName' já existe!"
        if (-not $Force) {
            $continue = Read-Host "Continuar com migração? (s/N)"
            if ($continue -ne 's') {
                Write-Info-Msg "Operação cancelada."
                exit 0
            }
        }
    } else {
        Write-Info-Msg "Organização '$OrgName' não existe - será criada"
    }
}

# Plano de execução
Write-Host "`n═══ PLANO DE EXECUÇÃO ═══" -ForegroundColor Yellow
Write-Host "1. 🏢 Criar organização '$OrgName'" -ForegroundColor Cyan
Write-Host "2. 📋 Configurar descrição e settings" -ForegroundColor Cyan
Write-Host "3. 🔄 Transferir repositório '$repoName'" -ForegroundColor Cyan
Write-Host "4. 📁 Renomear para 'symbeon-platform'" -ForegroundColor Cyan
Write-Host "5. ⚙️ Configurar settings organizacionais" -ForegroundColor Cyan
Write-Host "6. 📊 Verificar migração" -ForegroundColor Cyan

if (-not $Force -and -not $DryRun) {
    $proceed = Read-Host "`nProsseguir com a criação? (s/N)"
    if ($proceed -ne 's') {
        Write-Info-Msg "Operação cancelada pelo usuário."
        exit 0
    }
}

Write-Host "`n═══ INICIANDO MIGRAÇÃO ═══" -ForegroundColor Green

# Passo 1: Criar organização
Write-Info-Msg "Passo 1/6: Criando organização GitHub..."
if (-not $DryRun) {
    try {
        # Verificar se já existe primeiro
        $orgCheck = gh api "/orgs/$OrgName" 2>$null
        if ($LASTEXITCODE -ne 0) {
            # Criar organização (isso pode exigir interface web)
            Write-Warning-Msg "A criação de organizações via CLI pode requerer confirmação web"
            Write-Info-Msg "Executando comando de criação..."
            
            # Tentar criar via API (pode falhar e exigir web)
            $orgData = @{
                login = $OrgName
                description = $OrgDescription
                company = "SYMBEON Technologies"
                location = "Global"
                blog = "https://github.com/$OrgName"
            } | ConvertTo-Json
            
            $createResult = gh api --method POST "/user/orgs" --input - <<< $orgData 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Organização '$OrgName' criada com sucesso!"
            } else {
                Write-Warning-Msg "Criação via API falhou. Será necessário criar manualmente."
                Write-Info-Msg "Visite: https://github.com/organizations/new"
                Write-Info-Msg "Nome: $OrgName"
                Write-Info-Msg "Descrição: $OrgDescription"
                Read-Host "Pressione Enter após criar a organização manualmente"
            }
        } else {
            Write-Success "Organização '$OrgName' já existe"
        }
    } catch {
        Write-Warning-Msg "Erro na criação automática: $($_.Exception.Message)"
        Write-Info-Msg "Prosseguindo assumindo que a organização existe..."
    }
} else {
    Write-Info-Msg "[DRY RUN] Criaria organização '$OrgName'"
}

# Passo 2: Configurar organização
Write-Info-Msg "Passo 2/6: Configurando organização..."
if (-not $DryRun) {
    try {
        # Atualizar descrição e configurações
        $updateData = @{
            description = $OrgDescription
            company = "SYMBEON Technologies"
            blog = "https://symbeon.ai"
            location = "Global"
            email = "contact@symbeon.ai"
        } | ConvertTo-Json
        
        gh api --method PATCH "/orgs/$OrgName" --input - <<< $updateData 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Configurações da organização atualizadas"
        }
    } catch {
        Write-Warning-Msg "Algumas configurações podem precisar ser feitas manualmente"
    }
} else {
    Write-Info-Msg "[DRY RUN] Configuraria organização com descrição e settings"
}

# Passo 3: Transferir repositório
Write-Info-Msg "Passo 3/6: Transferindo repositório..."
if (-not $DryRun) {
    try {
        Write-Warning-Msg "ATENÇÃO: Transferindo '$currentOwner/$repoName' para '$OrgName'"
        
        # Fazer backup das informações antes da transferência
        $backupInfo = @{
            originalOwner = $currentOwner
            originalName = $repoName
            transferDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            newOrg = $OrgName
        }
        $backupInfo | ConvertTo-Json | Out-File "migration-backup.json" -Encoding UTF8
        
        # Transferir repositório
        gh repo transfer "$currentOwner/$repoName" $OrgName
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Repositório transferido para $OrgName/$repoName"
        } else {
            Write-Error-Msg "Falha na transferência do repositório"
            exit 1
        }
    } catch {
        Write-Error-Msg "Erro na transferência: $($_.Exception.Message)"
        exit 1
    }
} else {
    Write-Info-Msg "[DRY RUN] Transferiria '$currentOwner/$repoName' para '$OrgName'"
}

# Passo 4: Renomear repositório
Write-Info-Msg "Passo 4/6: Renomeando repositório para 'symbeon-platform'..."
if (-not $DryRun) {
    try {
        $renameData = @{
            name = "symbeon-platform"
            description = "SYMBEON AI Platform - Enterprise Automation & Symbiotic Evolution Operating Network"
        } | ConvertTo-Json
        
        gh api --method PATCH "/repos/$OrgName/$repoName" --input - <<< $renameData
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Repositório renomeado para 'symbeon-platform'"
        }
    } catch {
        Write-Warning-Msg "Renomeação pode precisar ser feita manualmente"
    }
} else {
    Write-Info-Msg "[DRY RUN] Renomearia repositório para 'symbeon-platform'"
}

# Passo 5: Configurar settings organizacionais
Write-Info-Msg "Passo 5/6: Configurando settings do repositório..."
if (-not $DryRun) {
    try {
        # Configurações do repositório
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
        
        gh api --method PATCH "/repos/$OrgName/symbeon-platform" --input - <<< $repoSettings
        
        Write-Success "Settings do repositório configurados"
    } catch {
        Write-Warning-Msg "Algumas configurações podem precisar ser feitas manualmente"
    }
} else {
    Write-Info-Msg "[DRY RUN] Configuraria settings do repositório"
}

# Passo 6: Verificação final
Write-Info-Msg "Passo 6/6: Verificando migração..."
if (-not $DryRun) {
    try {
        # Verificar se tudo está funcionando
        $orgInfo = gh api "/orgs/$OrgName" | ConvertFrom-Json
        $repoInfo = gh api "/repos/$OrgName/symbeon-platform" | ConvertFrom-Json
        
        Write-Success "Migração concluída com sucesso!"
        Write-Host "`n═══ RESULTADO DA MIGRAÇÃO ═══" -ForegroundColor Green
        Write-Host "🏢 Organização: $($orgInfo.login)" -ForegroundColor White
        Write-Host "📁 Repositório: $($repoInfo.full_name)" -ForegroundColor White
        Write-Host "🔗 URL: $($repoInfo.html_url)" -ForegroundColor White
        Write-Host "📊 Stars: $($repoInfo.stargazers_count)" -ForegroundColor White
        Write-Host "🍴 Forks: $($repoInfo.forks_count)" -ForegroundColor White
        
    } catch {
        Write-Warning-Msg "Verificação parcial - algumas informações podem não estar disponíveis"
    }
} else {
    Write-Info-Msg "[DRY RUN] Verificaria o resultado da migração"
}

# Próximos passos
Write-Host "`n═══ PRÓXIMOS PASSOS ═══" -ForegroundColor Yellow
Write-Host "1. 🔄 Atualizar remote local: git remote set-url origin https://github.com/$OrgName/symbeon-platform.git" -ForegroundColor Cyan
Write-Host "2. 🏷️ Criar nova tag: git tag v1.0.2 && git push origin v1.0.2" -ForegroundColor Cyan
Write-Host "3. 📋 Criar repositórios adicionais (mcp-servers, docs, examples)" -ForegroundColor Cyan
Write-Host "4. 👥 Configurar teams e permissões" -ForegroundColor Cyan
Write-Host "5. 🎯 Atualizar README com nova organização" -ForegroundColor Cyan

# Comandos prontos
Write-Host "`n═══ COMANDOS PRONTOS ═══" -ForegroundColor Green
Write-Host @"
# Atualizar remote local
git remote set-url origin https://github.com/$OrgName/symbeon-platform.git

# Verificar
git remote -v

# Push de teste
git push origin main

"@ -ForegroundColor White

Write-Success "Script de migração concluído!"

if (-not $DryRun) {
    Write-Host "`nVisite: https://github.com/$OrgName" -ForegroundColor Cyan
    Write-Info-Msg "Backup das informações salvo em: migration-backup.json"
}

