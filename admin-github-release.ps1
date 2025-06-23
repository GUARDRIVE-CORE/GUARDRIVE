# GitHub Release Management com Privilegios Administrativos
# Conforme autorizacao do usuario para comandos administrativos

param(
    [string]$GitHubToken = "",
    [switch]$Force = $false
)

function Invoke-AdminCommand {
    param([string]$Command, [string]$Description = "Comando administrativo")
    
    Write-Host "[ADMIN] $Description" -ForegroundColor Yellow
    
    $encodedCommand = [Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes($Command))
    $scriptPath = "$env:TEMP\admin_github_task.ps1"
    
    @"
# Script gerado pelo Agente Warp para execucao administrativa
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    # Comando a ser executado
    `$adminCommand = [System.Text.Encoding]::Unicode.GetString([Convert]::FromBase64String("$encodedCommand"))
    Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile", "-ExecutionPolicy Bypass", "-Command `$adminCommand"
    exit
}
# Se ja estiver como admin, executa diretamente
$Command
Write-Host "`nComando concluido. Pressione qualquer tecla para fechar..." -ForegroundColor Green
`$null = `$Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
"@ | Set-Content -Path $scriptPath
    
    # Executar o script criado
    powershell -ExecutionPolicy Bypass -File $scriptPath
    Remove-Item $scriptPath -Force -ErrorAction SilentlyContinue
}

function Write-Success { param([string]$msg) Write-Host "[OK] $msg" -ForegroundColor Green }
function Write-Error-Msg { param([string]$msg) Write-Host "[ERROR] $msg" -ForegroundColor Red }
function Write-Info-Msg { param([string]$msg) Write-Host "[INFO] $msg" -ForegroundColor Cyan }

Write-Host "=== GITHUB RELEASE COM PRIVILEGIOS ADMINISTRATIVOS ===" -ForegroundColor Yellow
Write-Info-Msg "Configurando GitHub CLI e verificando release..."

# Verificar se Git esta funcionando
try {
    $gitVersion = git --version
    if ($LASTEXITCODE -ne 0) { throw "Git nao encontrado" }
    Write-Success "Git verificado: $($gitVersion)"
} catch {
    Write-Error-Msg "Git nao esta funcionando corretamente: $($_.Exception.Message)"
    exit 1
}

# Verificar/Instalar GitHub CLI com privilegios administrativos
Write-Info-Msg "Verificando GitHub CLI..."
$ghVersion = gh --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Info-Msg "GitHub CLI nao encontrado. Instalando com privilegios administrativos..."
    
    $installCommand = @"
Write-Host 'Instalando GitHub CLI...' -ForegroundColor Yellow
winget install --id GitHub.cli --silent --accept-package-agreements --accept-source-agreements
Write-Host 'Instalacao concluida!' -ForegroundColor Green
"@
    
    Invoke-AdminCommand -Command $installCommand -Description "Instalacao GitHub CLI"
    
    # Verificar instalacao
    Start-Sleep 3
    $ghVersion = gh --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Msg "Falha na instalacao do GitHub CLI"
        exit 1
    }
}

Write-Success "GitHub CLI disponivel"

# Obter informacoes do repositorio
$latestTag = git describe --tags --abbrev=0
$repoUrl = git remote get-url origin
Write-Success "Repositorio: $repoUrl"
Write-Success "Tag mais recente: $latestTag"

# Verificar autenticacao
Write-Info-Msg "Verificando autenticacao GitHub CLI..."
$authStatus = gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Info-Msg "GitHub CLI nao autenticado"
    
    if ($GitHubToken -ne "") {
        Write-Info-Msg "Usando token fornecido para autenticacao..."
        $env:GH_TOKEN = $GitHubToken
        echo $GitHubToken | gh auth login --with-token 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Msg "Falha na autenticacao com token"
            exit 1
        }
        Write-Success "Autenticado com token"
    } else {
        Write-Info-Msg "Iniciando processo de autenticacao interativa..."
        Write-Host "Sera aberta uma janela para autenticacao. Siga as instrucoes:" -ForegroundColor Yellow
        Write-Host "1. Escolha 'GitHub.com'" -ForegroundColor White
        Write-Host "2. Escolha 'HTTPS'" -ForegroundColor White
        Write-Host "3. Escolha 'Login with a web browser'" -ForegroundColor White
        Write-Host "4. Complete a autenticacao no browser" -ForegroundColor White
        
        Read-Host "`nPressione Enter para continuar"
        
        # Executar autenticacao
        gh auth login --git-protocol https --web
        
        # Verificar se funcionou
        $authStatus = gh auth status 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Msg "Falha na autenticacao"
            exit 1
        }
        Write-Success "Autenticacao concluida"
    }
} else {
    Write-Success "GitHub CLI ja autenticado"
}

# Verificar releases existentes
Write-Info-Msg "Verificando releases no GitHub..."
try {
    $releases = gh release list --limit 10 2>$null
    if ($LASTEXITCODE -eq 0) {
        if ($releases) {
            Write-Success "Releases encontrados:"
            $releases -split "`n" | ForEach-Object {
                if ($_ -ne "") { Write-Host "  • $_" -ForegroundColor White }
            }
        } else {
            Write-Info-Msg "Nenhum release encontrado no repositorio"
        }
        
        # Verificar se release existe para a tag atual
        $releaseCheck = gh release view $latestTag 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Release para $latestTag JA EXISTE no GitHub"
            Write-Info-Msg "Detalhes do release:"
            gh release view $latestTag --json tagName,name,publishedAt,url | ConvertFrom-Json | Format-List
        } else {
            Write-Info-Msg "Release para $latestTag NAO EXISTE no GitHub"
            
            if ($Force -or (Read-Host "Criar release agora? (s/N)" -eq 's')) {
                Write-Info-Msg "Criando release para $latestTag..."
                
                # Obter mensagem da tag
                $tagMessage = git tag -l --format='%(contents)' $latestTag
                
                # Criar release
                gh release create $latestTag --title $latestTag --notes $tagMessage
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Success "Release $latestTag criado com sucesso!"
                    Write-Info-Msg "URL do release:"
                    gh release view $latestTag --json url | ConvertFrom-Json | Select-Object -ExpandProperty url
                } else {
                    Write-Error-Msg "Falha ao criar release"
                }
            } else {
                Write-Info-Msg "Release nao foi criado (cancelado pelo usuario)"
            }
        }
    } else {
        Write-Error-Msg "Erro ao acessar releases do GitHub. Verifique a autenticacao."
    }
} catch {
    Write-Error-Msg "Erro ao verificar releases: $($_.Exception.Message)"
}

# Status final
Write-Info-Msg "Verificacao final do repositorio..."
$gitStatus = git status --porcelain
if (-not $gitStatus) {
    Write-Success "Repositorio limpo - sem alteracoes pendentes"
} else {
    Write-Info-Msg "Alteracoes pendentes:"
    $gitStatus | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
}

Write-Success "Processo concluido com sucesso!"
Write-Host "`nPara verificar o release criado, visite:" -ForegroundColor Cyan
Write-Host "https://github.com/NEO-SH1W4/SYMBEON/releases" -ForegroundColor White

