# 🔄 GUARDRIVE Complete Repository Sync Script
# Sincronização GUARDRIVE-CORE → Personal Repositories

param(
    [string]$PersonalUsername = "João",
    [switch]$CreateMissingRepos = $false,
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Continue"

# Configurações
$OrgName = "GUARDRIVE-CORE"
$BaseDir = "C:\Users\João\Desktop\PROJETOS\GUARDRIVE-ORG"

$Repositories = @(
    @{
        Name = "GUARDRIVE"
        OrgUrl = "https://github.com/GUARDRIVE-CORE/GUARDRIVE.git"
        PersonalUrl = "https://github.com/$PersonalUsername/GUARDRIVE.git"
        LocalPath = "$BaseDir\GUARDRIVE"
        Branch = "main"
        Priority = 1
    },
    @{
        Name = "GUARDRIVE-SDK"
        OrgUrl = "https://github.com/GUARDRIVE-CORE/GUARDRIVE-SDK.git"
        PersonalUrl = "https://github.com/$PersonalUsername/GUARDRIVE-SDK.git"
        LocalPath = "$BaseDir\GUARDRIVE-SDK"
        Branch = "master"
        Priority = 2
    },
    @{
        Name = "GUARDRIVE-MCP"
        OrgUrl = "https://github.com/GUARDRIVE-CORE/GUARDRIVE-MCP.git"
        PersonalUrl = "https://github.com/$PersonalUsername/GUARDRIVE-MCP.git"
        LocalPath = "$BaseDir\GUARDRIVE-MCP"
        Branch = "main"
        Priority = 3
    }
)

function Write-StatusMessage {
    param($Message, $Type = "Info")
    
    $colors = @{
        "Success" = "Green"
        "Warning" = "Yellow" 
        "Error" = "Red"
        "Info" = "Cyan"
        "Header" = "Magenta"
    }
    
    $emoji = @{
        "Success" = "✅"
        "Warning" = "⚠️"
        "Error" = "❌"
        "Info" = "ℹ️"
        "Header" = "🔄"
    }
    
    Write-Host "$($emoji[$Type]) $Message" -ForegroundColor $colors[$Type]
}

function Test-RepositoryExists {
    param($Url)
    
    try {
        $result = git ls-remote $Url 2>$null
        return $result -ne $null
    } catch {
        return $false
    }
}

function Sync-Repository {
    param($Repo)
    
    Write-StatusMessage "Processando: $($Repo.Name)" "Header"
    
    # Verificar se diretório local existe
    if (-not (Test-Path $Repo.LocalPath)) {
        Write-StatusMessage "Diretório local não encontrado: $($Repo.LocalPath)" "Error"
        return $false
    }
    
    # Navegar para diretório
    Push-Location $Repo.LocalPath
    
    try {
        # Verificar status do repositório
        $status = git status --porcelain 2>$null
        if ($status -and -not $DryRun) {
            Write-StatusMessage "Repositório tem alterações não commitadas" "Warning"
            if ($Verbose) {
                Write-Host $status
            }
        }
        
        # Verificar branch atual
        $currentBranch = git branch --show-current 2>$null
        if ($currentBranch -ne $Repo.Branch) {
            Write-StatusMessage "Branch atual: $currentBranch, esperado: $($Repo.Branch)" "Warning"
        }
        
        # Verificar se remote pessoal existe
        $remotes = git remote -v 2>$null
        $personalRemoteExists = $remotes -like "*personal*"
        
        if (-not $personalRemoteExists) {
            Write-StatusMessage "Adicionando remote pessoal..." "Info"
            if (-not $DryRun) {
                git remote add personal $Repo.PersonalUrl
            }
        } else {
            Write-StatusMessage "Remote pessoal já configurado" "Success"
        }
        
        # Verificar se repositório pessoal existe
        $personalRepoExists = Test-RepositoryExists $Repo.PersonalUrl
        
        if (-not $personalRepoExists) {
            Write-StatusMessage "Repositório pessoal não encontrado: $($Repo.PersonalUrl)" "Error"
            Write-StatusMessage "Ação necessária: Criar repositório no GitHub" "Warning"
            
            if ($CreateMissingRepos) {
                Write-StatusMessage "Criação automática não implementada - use GitHub CLI ou interface web" "Warning"
            }
            
            return $false
        }
        
        # Fazer fetch da origem
        Write-StatusMessage "Fazendo fetch da origem..." "Info"
        if (-not $DryRun) {
            git fetch origin 2>$null
        }
        
        # Fazer push para repositório pessoal
        Write-StatusMessage "Sincronizando com repositório pessoal..." "Info"
        if (-not $DryRun) {
            $pushResult = git push personal $Repo.Branch 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-StatusMessage "Sincronização concluída com sucesso!" "Success"
                return $true
            } else {
                Write-StatusMessage "Erro na sincronização: $pushResult" "Error"
                return $false
            }
        } else {
            Write-StatusMessage "[DRY RUN] Push para personal/$($Repo.Branch)" "Info"
            return $true
        }
        
    } catch {
        Write-StatusMessage "Erro inesperado: $($_.Exception.Message)" "Error"
        return $false
    } finally {
        Pop-Location
    }
}

function Generate-SyncReport {
    param($Results)
    
    $reportPath = "SYNC_REPORT_$(Get-Date -Format 'yyyyMMdd_HHmmss').md"
    
    $report = @"
# 🔄 Relatório de Sincronização GUARDRIVE

**Data**: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  
**Usuário**: $PersonalUsername  
**Modo**: $(if($DryRun){"DRY RUN"}else{"EXECUÇÃO REAL"})

## 📊 Resumo Geral

| Repositório | Status | Ação Necessária |
|-------------|--------|----------------|
$(foreach ($result in $Results) {
"| $($result.Name) | $(if($result.Success){"✅ Sucesso"}else{"❌ Falha"}) | $(if($result.Success){"Nenhuma"}else{"Criar repositório pessoal"}) |"
})

## 📋 Detalhes por Repositório

$(foreach ($result in $Results) {
@"
### $($result.Name)

- **Status**: $(if($result.Success){"✅ Sincronizado"}else{"❌ Falha na sincronização"})
- **Organização**: $($result.OrgUrl)
- **Pessoal**: $($result.PersonalUrl)
- **Local**: $($result.LocalPath)
- **Branch**: $($result.Branch)

$(if($result.Message){"**Observações**: $($result.Message)"})

"@
})

## 🎯 Próximas Ações

$(if ($Results | Where-Object { -not $_.Success }) {
@"
### Repositórios Pendentes

$(foreach ($failed in ($Results | Where-Object { -not $_.Success })) {
"1. **Criar repositório**: [$($failed.Name)]($($failed.PersonalUrl))"
})

### Comandos para Execução Manual

``````powershell
$(foreach ($failed in ($Results | Where-Object { -not $_.Success })) {
@"
# $($failed.Name)
cd "$($failed.LocalPath)"
git remote add personal $($failed.PersonalUrl)
git push personal $($failed.Branch)

"@
})
``````
"@
} else {
"✅ **Todos os repositórios foram sincronizados com sucesso!**"
})

---

**Gerado por**: GUARDRIVE Sync Script  
**Versão**: 1.0.0  
**Autor**: GUARDRIVE-CORE Team
"@

    $report | Out-File -FilePath $reportPath -Encoding UTF8
    Write-StatusMessage "Relatório gerado: $reportPath" "Success"
    
    return $reportPath
}

# 🚀 INÍCIO DA EXECUÇÃO
Write-StatusMessage "GUARDRIVE REPOSITORY SYNC INICIADO" "Header"
Write-StatusMessage "Organização: $OrgName → Pessoal: $PersonalUsername" "Info"
Write-StatusMessage "Modo: $(if($DryRun){"DRY RUN (sem alterações)"}else{"EXECUÇÃO REAL"})" "Info"

if ($DryRun) {
    Write-StatusMessage "Executando em modo DRY RUN - nenhuma alteração será feita" "Warning"
}

$results = @()
$successCount = 0

foreach ($repo in ($Repositories | Sort-Object Priority)) {
    Write-Host "`n" + "="*60
    
    $syncResult = Sync-Repository $repo
    
    $results += @{
        Name = $repo.Name
        Success = $syncResult
        OrgUrl = $repo.OrgUrl
        PersonalUrl = $repo.PersonalUrl
        LocalPath = $repo.LocalPath
        Branch = $repo.Branch
        Message = ""
    }
    
    if ($syncResult) {
        $successCount++
    }
    
    Start-Sleep -Seconds 1
}

# 📊 RELATÓRIO FINAL
Write-Host "`n" + "="*60
Write-StatusMessage "SINCRONIZAÇÃO CONCLUÍDA" "Header"
Write-StatusMessage "Sucessos: $successCount/$($Repositories.Count)" "Info"

$reportFile = Generate-SyncReport $results

# Mostrar summary
if ($successCount -eq $Repositories.Count) {
    Write-StatusMessage "🎉 TODOS OS REPOSITÓRIOS SINCRONIZADOS COM SUCESSO!" "Success"
} else {
    Write-StatusMessage "⚠️ Alguns repositórios necessitam de ação manual" "Warning"
    Write-StatusMessage "Verifique o relatório: $reportFile" "Info"
}

Write-StatusMessage "📊 Para ver o relatório completo: Get-Content '$reportFile'" "Info"

return $results

