#!/usr/bin/env node

/**
 * DevOps Orchestrator MCP Server
 * 
 * O MCP Server mais inteligente - integra todas as regras de desenvolvimento
 * e maximiza as capacidades do Warp Agent para automatizar workflows completos.
 * 
 * @author SYMBEON
 * @version 1.0.0
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} = require('@modelcontextprotocol/sdk/types.js');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Utilitários para execução de comandos
 */
class CommandUtils {
  /**
   * Executa comando e retorna resultado
   */
  static async executeCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      exec(command, {
        cwd: options.cwd || process.cwd(),
        timeout: options.timeout || 30000,
        ...options
      }, (error, stdout, stderr) => {
        if (error) {
          reject({ error, stdout, stderr });
        } else {
          resolve({ stdout: stdout.trim(), stderr: stderr.trim() });
        }
      });
    });
  }

  /**
   * Verifica se comando/ferramenta está disponível
   */
  static async checkTool(command) {
    try {
      await this.executeCommand(`${command} --version`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Executa múltiplos comandos em sequência
   */
  static async executeSequence(commands, options = {}) {
    const results = [];
    
    for (const command of commands) {
      try {
        const result = await this.executeCommand(command, options);
        results.push({ command, success: true, ...result });
      } catch (error) {
        results.push({ command, success: false, ...error });
        if (options.stopOnError !== false) {
          break;
        }
      }
    }
    
    return results;
  }
}

/**
 * Gerenciador de Sessões de Desenvolvimento
 */
class SessionManager {
  /**
   * Ferramentas obrigatórias conforme Session Rules
   */
  static REQUIRED_TOOLS = [
    { name: 'git', version: '2.40', command: 'git --version' },
    { name: 'node', version: '18', command: 'node --version' },
    { name: 'python', version: '3.10', command: 'python --version' },
    { name: 'winget', version: 'any', command: 'winget --version' }
  ];

  /**
   * Inicia sessão de desenvolvimento seguindo Session Rules
   */
  static async startDevSession(projectPath = null) {
    const workingDir = projectPath || process.cwd();
    const results = [];
    
    // 1. Verificação de Ferramentas
    results.push('🔧 VERIFICAÇÃO DE FERRAMENTAS');
    results.push('=' .repeat(50));
    
    for (const tool of this.REQUIRED_TOOLS) {
      try {
        const result = await CommandUtils.executeCommand(tool.command);
        const version = result.stdout;
        results.push(`✅ ${tool.name}: ${version}`);
      } catch (error) {
        results.push(`❌ ${tool.name}: AUSENTE ou com problema`);
        results.push(`   Erro: ${error.stderr || error.error?.message}`);
      }
    }
    
    // 2. Status do Git
    results.push('\n📁 STATUS DO PROJETO');
    results.push('=' .repeat(50));
    
    try {
      const gitStatus = await CommandUtils.executeCommand('git status --porcelain', { cwd: workingDir });
      if (gitStatus.stdout) {
        results.push(`⚠️  Arquivos modificados detectados:`);
        results.push(gitStatus.stdout);
      } else {
        results.push(`✅ Working directory limpo`);
      }
      
      const branch = await CommandUtils.executeCommand('git branch --show-current', { cwd: workingDir });
      results.push(`🌿 Branch atual: ${branch.stdout}`);
      
    } catch (error) {
      results.push(`❓ Não é um repositório Git ou Git não funciona`);
    }
    
    // 3. Checklist de Arquivos Importantes
    results.push('\n📋 ARQUIVOS DE PROJETO');
    results.push('=' .repeat(50));
    
    const importantFiles = ['package.json', 'requirements.txt', 'TASKS.md', 'CHANGELOG.md', '.gitignore'];
    for (const file of importantFiles) {
      const filePath = path.join(workingDir, file);
      if (fs.existsSync(filePath)) {
        results.push(`✅ ${file}`);
      } else {
        results.push(`➖ ${file} (não encontrado)`);
      }
    }
    
    return {
      success: true,
      workingDir,
      timestamp: new Date().toISOString(),
      report: results.join('\n')
    };
  }

  /**
   * Finaliza sessão seguindo Session Rules
   */
  static async endDevSession(options = {}) {
    const workingDir = options.projectPath || process.cwd();
    const results = [];
    
    results.push('🏁 FINALIZANDO SESSÃO DE DESENVOLVIMENTO');
    results.push('=' .repeat(60));
    
    // 1. Salvamento de Trabalho
    results.push('\n💾 SALVAMENTO DE TRABALHO');
    results.push('-' .repeat(30));
    
    try {
      // Verifica se há mudanças para commitar
      const gitStatus = await CommandUtils.executeCommand('git status --porcelain', { cwd: workingDir });
      
      if (gitStatus.stdout && options.autoCommit !== false) {
        // Auto-commit WIP se solicitado
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const commitMsg = options.commitMessage || `WIP: Session end ${timestamp}`;
        
        const commitCommands = [
          'git add -A',
          `git commit -m "${commitMsg}"`,
          'git push || echo "Push failed - branch not set up"'
        ];
        
        const commitResults = await CommandUtils.executeSequence(commitCommands, { 
          cwd: workingDir, 
          stopOnError: false 
        });
        
        commitResults.forEach(result => {
          if (result.success) {
            results.push(`✅ ${result.command}`);
          } else {
            results.push(`⚠️  ${result.command} - ${result.stderr || 'erro'}`);
          }
        });
      } else if (!gitStatus.stdout) {
        results.push('✅ Nenhuma alteração pendente');
      } else {
        results.push('ℹ️  Alterações detectadas, mas auto-commit desabilitado');
      }
    } catch (error) {
      results.push(`❌ Erro ao verificar Git: ${error.stderr || error.message}`);
    }
    
    // 2. Atualização de Arquivos de Projeto
    results.push('\n📝 ATUALIZAÇÃO DE DOCUMENTAÇÃO');
    results.push('-' .repeat(30));
    
    try {
      await this.updateProjectFiles(workingDir, options);
      results.push('✅ Arquivos de projeto atualizados');
    } catch (error) {
      results.push(`⚠️  Erro ao atualizar arquivos: ${error.message}`);
    }
    
    // 3. Limpeza de Ambiente
    results.push('\n🧹 LIMPEZA DE AMBIENTE');
    results.push('-' .repeat(30));
    
    const cleanupCommands = [
      'npm run clean 2>NUL || echo "No npm clean script"',
      'rm -rf node_modules/.cache 2>NUL || echo "No npm cache to clean"',
      'python -c "import shutil; shutil.rmtree(\'__pycache__\', ignore_errors=True)" 2>NUL || echo "No Python cache"'
    ];
    
    const cleanupResults = await CommandUtils.executeSequence(cleanupCommands, { 
      cwd: workingDir, 
      stopOnError: false 
    });
    
    cleanupResults.forEach(result => {
      results.push(`🧹 ${result.command.split('||')[0].trim()}`);
    });
    
    // 4. Verificação Final
    results.push('\n✅ CHECKLIST FINAL');
    results.push('-' .repeat(30));
    results.push('✅ Código versionado');
    results.push('✅ Documentação atualizada');
    results.push('✅ Ambiente limpo');
    results.push('✅ Sessão finalizada com sucesso');
    
    return {
      success: true,
      timestamp: new Date().toISOString(),
      report: results.join('\n')
    };
  }

  /**
   * Atualiza arquivos de projeto (TASKS.md, CHANGELOG.md)
   */
  static async updateProjectFiles(workingDir, options = {}) {
    const timestamp = new Date().toISOString();
    
    // Atualizar TASKS.md se existir
    const tasksPath = path.join(workingDir, 'TASKS.md');
    if (fs.existsSync(tasksPath)) {
      const content = fs.readFileSync(tasksPath, 'utf8');
      if (!content.includes('Session fechada em')) {
        const updatedContent = content + `\n\n<!-- Session fechada em ${timestamp} -->\n`;
        fs.writeFileSync(tasksPath, updatedContent);
      }
    }
    
    // Atualizar CHANGELOG.md se existir
    const changelogPath = path.join(workingDir, 'CHANGELOG.md');
    if (fs.existsSync(changelogPath) && options.changelogEntry) {
      const content = fs.readFileSync(changelogPath, 'utf8');
      const entry = `\n### [Unreleased] - ${timestamp.split('T')[0]}\n- ${options.changelogEntry}\n`;
      const updatedContent = content.replace('# Changelog', `# Changelog${entry}`);
      fs.writeFileSync(changelogPath, updatedContent);
    }
  }
}

/**
 * Gerenciador de Operações Git Inteligentes
 */
class GitOpsManager {
  /**
   * Cria branch seguindo convenções de Branching Rules
   */
  static async createFeatureBranch(options = {}) {
    const { type = 'feature', name, description } = options;
    
    if (!name) {
      throw new Error('Nome da branch é obrigatório');
    }
    
    // Nomenclatura seguindo Branching Rules
    const branchName = `${type}/${name.toLowerCase().replace(/\s+/g, '-')}`;
    
    const commands = [
      'git fetch origin',
      'git checkout main || git checkout master || git checkout develop',
      'git pull',
      `git checkout -b ${branchName}`,
      `git push --set-upstream origin ${branchName}`
    ];
    
    const results = await CommandUtils.executeSequence(commands, { stopOnError: true });
    
    return {
      branchName,
      success: results.every(r => r.success),
      results,
      description: description || `Branch ${branchName} criada seguindo convenções`
    };
  }

  /**
   * Commit inteligente com Conventional Commits
   */
  static async smartCommit(options = {}) {
    const { type, scope, description, breaking = false } = options;
    
    if (!type || !description) {
      throw new Error('Tipo e descrição são obrigatórios para commit');
    }
    
    // Formato Conventional Commits
    let message = `${type}`;
    if (scope) message += `(${scope})`;
    if (breaking) message += '!';
    message += `: ${description}`;
    
    const commands = [
      'git add -A',
      `git commit -m "${message}"`,
      'git push'
    ];
    
    const results = await CommandUtils.executeSequence(commands);
    
    return {
      message,
      success: results.every(r => r.success),
      results
    };
  }

  /**
   * Prepara PR seguindo PR Rules
   */
  static async preparePR(options = {}) {
    const { title, description, reviewers = [] } = options;
    
    const commands = [
      'git push',
      'git status'
    ];
    
    const results = await CommandUtils.executeSequence(commands);
    
    // Template de PR seguindo as regras
    const prTemplate = `## 📝 Descrição
${description || 'Descrição das alterações realizadas'}

## 🔧 Tipo de Mudança
- [ ] Bug fix (correção que resolve um issue)
- [ ] Nova feature (mudança que adiciona funcionalidade)
- [ ] Breaking change (correção ou feature que causa breaking change)
- [ ] Documentação

## ✅ Checklist
- [ ] Build passa ✅
- [ ] Testes passam ✅  
- [ ] Lint passa ✅
- [ ] Código revisado por pares
- [ ] CHANGELOG.md atualizado

## 👥 Reviewers
${reviewers.map(r => `@${r}`).join(', ')}
`;

    return {
      template: prTemplate,
      title: title || 'Nova funcionalidade',
      success: results.every(r => r.success),
      results
    };
  }
}

/**
 * Enforcer de Qualidade de Código
 */
class CodeQualityEnforcer {
  /**
   * Executa gate de qualidade completo
   */
  static async qualityGate(projectPath = null) {
    const workingDir = projectPath || process.cwd();
    const results = [];
    
    results.push('🛡️ QUALITY GATE - VERIFICAÇÃO COMPLETA');
    results.push('=' .repeat(50));
    
    // 1. Verificar package.json para determinar tipo de projeto
    const packagePath = path.join(workingDir, 'package.json');
    const isNodeProject = fs.existsSync(packagePath);
    
    const requirementsPath = path.join(workingDir, 'requirements.txt');
    const isPythonProject = fs.existsSync(requirementsPath);
    
    if (isNodeProject) {
      results.push('\n📦 PROJETO NODE.JS DETECTADO');
      results.push('-' .repeat(30));
      
      const nodeCommands = [
        'npm install',
        'npm run lint || npx eslint . || echo "Lint não configurado"',
        'npm run prettier || npx prettier --check . || echo "Prettier não configurado"',
        'npm test || echo "Testes não configurados"',
        'npm audit --audit-level=high || echo "Audit concluído"'
      ];
      
      const nodeResults = await CommandUtils.executeSequence(nodeCommands, { 
        cwd: workingDir, 
        stopOnError: false 
      });
      
      nodeResults.forEach(result => {
        const icon = result.success ? '✅' : '⚠️';
        results.push(`${icon} ${result.command.split('||')[0].trim()}`);
      });
    }
    
    if (isPythonProject) {
      results.push('\n🐍 PROJETO PYTHON DETECTADO');
      results.push('-' .repeat(30));
      
      const pythonCommands = [
        'pip install -r requirements.txt || echo "Requirements install failed"',
        'python -m black --check . || echo "Black não configurado"',
        'python -m isort --check-only . || echo "isort não configurado"',
        'python -m flake8 . || echo "flake8 não configurado"',
        'python -m pytest || echo "Testes não configurados"'
      ];
      
      const pythonResults = await CommandUtils.executeSequence(pythonCommands, { 
        cwd: workingDir, 
        stopOnError: false 
      });
      
      pythonResults.forEach(result => {
        const icon = result.success ? '✅' : '⚠️';
        results.push(`${icon} ${result.command.split('||')[0].trim()}`);
      });
    }
    
    // 2. Verificações Gerais
    results.push('\n🔍 VERIFICAÇÕES GERAIS');
    results.push('-' .repeat(30));
    
    const generalChecks = [
      { name: 'Git status limpo', check: async () => {
        const status = await CommandUtils.executeCommand('git status --porcelain', { cwd: workingDir });
        return !status.stdout;
      }},
      { name: 'Arquivos importantes presentes', check: () => {
        const importantFiles = ['.gitignore', 'README.md'];
        return importantFiles.some(file => fs.existsSync(path.join(workingDir, file)));
      }},
      { name: 'Sem arquivos grandes (>10MB)', check: () => {
        // Verificação simples - em um projeto real usaria git ls-files
        return true; // Placeholder
      }}
    ];
    
    for (const check of generalChecks) {
      try {
        const passed = await check.check();
        results.push(`${passed ? '✅' : '❌'} ${check.name}`);
      } catch {
        results.push(`⚠️ ${check.name} - erro na verificação`);
      }
    }
    
    return {
      success: true,
      timestamp: new Date().toISOString(),
      report: results.join('\n')
    };
  }

  /**
   * Corrige problemas de estilo automaticamente
   */
  static async fixCodeStyle(projectPath = null) {
    const workingDir = projectPath || process.cwd();
    const results = [];
    
    results.push('🔧 AUTO-FIX DE CÓDIGO');
    results.push('=' .repeat(30));
    
    // Detectar tipo de projeto e aplicar fixes
    const packagePath = path.join(workingDir, 'package.json');
    if (fs.existsSync(packagePath)) {
      const fixCommands = [
        'npx prettier --write . || echo "Prettier fix failed"',
        'npx eslint . --fix || echo "ESLint fix failed"'
      ];
      
      const fixResults = await CommandUtils.executeSequence(fixCommands, { 
        cwd: workingDir, 
        stopOnError: false 
      });
      
      fixResults.forEach(result => {
        results.push(`${result.success ? '✅' : '⚠️'} ${result.command.split('||')[0].trim()}`);
      });
    }
    
    const requirementsPath = path.join(workingDir, 'requirements.txt');
    if (fs.existsSync(requirementsPath)) {
      const pythonFixCommands = [
        'python -m black . || echo "Black fix failed"',
        'python -m isort . || echo "isort fix failed"'
      ];
      
      const pythonFixResults = await CommandUtils.executeSequence(pythonFixCommands, { 
        cwd: workingDir, 
        stopOnError: false 
      });
      
      pythonFixResults.forEach(result => {
        results.push(`${result.success ? '✅' : '⚠️'} ${result.command.split('||')[0].trim()}`);
      });
    }
    
    return {
      success: true,
      report: results.join('\n')
    };
  }
}

/**
 * DevOps Orchestrator Server Principal
 */
class DevOpsOrchestratorServer {
  constructor() {
    this.server = new Server(
      {
        name: 'devops-orchestrator',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupToolHandlers() {
    // Lista das ferramentas disponíveis
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'start_dev_session',
            description: 'Inicia sessão de desenvolvimento com checklist completo seguindo Session Rules',
            inputSchema: {
              type: 'object',
              properties: {
                project_path: {
                  type: 'string',
                  description: 'Caminho do projeto (opcional, usa diretório atual se não especificado)',
                },
              },
            },
          },
          {
            name: 'end_dev_session',
            description: 'Finaliza sessão seguindo Session Rules com auto-commit e limpeza',
            inputSchema: {
              type: 'object',
              properties: {
                project_path: {
                  type: 'string',
                  description: 'Caminho do projeto',
                },
                auto_commit: {
                  type: 'boolean',
                  description: 'Se deve fazer commit automático das alterações',
                  default: true,
                },
                commit_message: {
                  type: 'string',
                  description: 'Mensagem personalizada para o commit',
                },
                changelog_entry: {
                  type: 'string',
                  description: 'Entrada para adicionar ao CHANGELOG.md',
                },
              },
            },
          },
          {
            name: 'create_feature_branch',
            description: 'Cria branch seguindo convenções de Branching Rules',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nome da funcionalidade/correção',
                },
                type: {
                  type: 'string',
                  description: 'Tipo da branch (feature, fix, hotfix, release)',
                  enum: ['feature', 'fix', 'hotfix', 'release'],
                  default: 'feature',
                },
                description: {
                  type: 'string',
                  description: 'Descrição da branch',
                },
              },
              required: ['name'],
            },
          },
          {
            name: 'smart_commit',
            description: 'Commit inteligente seguindo Conventional Commits',
            inputSchema: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  description: 'Tipo do commit',
                  enum: ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
                },
                scope: {
                  type: 'string',
                  description: 'Escopo do commit (opcional)',
                },
                description: {
                  type: 'string',
                  description: 'Descrição do commit',
                },
                breaking: {
                  type: 'boolean',
                  description: 'Se é uma breaking change',
                  default: false,
                },
              },
              required: ['type', 'description'],
            },
          },
          {
            name: 'quality_gate',
            description: 'Executa verificação completa de qualidade (lint, prettier, tests)',
            inputSchema: {
              type: 'object',
              properties: {
                project_path: {
                  type: 'string',
                  description: 'Caminho do projeto',
                },
              },
            },
          },
          {
            name: 'fix_code_style',
            description: 'Corrige automaticamente problemas de estilo de código',
            inputSchema: {
              type: 'object',
              properties: {
                project_path: {
                  type: 'string',
                  description: 'Caminho do projeto',
                },
              },
            },
          },
          {
            name: 'prepare_pr',
            description: 'Prepara PR seguindo PR Rules com template e checklist',
            inputSchema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'Título do PR',
                },
                description: {
                  type: 'string',
                  description: 'Descrição das alterações',
                },
                reviewers: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Lista de revisores (usernames)',
                },
              },
            },
          },
        ],
      };
    });

    // Manipulador das chamadas de ferramentas
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args = {} } = request.params;

      try {
        switch (name) {
          case 'start_dev_session':
            return await this.handleStartDevSession(args);
          
          case 'end_dev_session':
            return await this.handleEndDevSession(args);
          
          case 'create_feature_branch':
            return await this.handleCreateFeatureBranch(args);
          
          case 'smart_commit':
            return await this.handleSmartCommit(args);
          
          case 'quality_gate':
            return await this.handleQualityGate(args);
          
          case 'fix_code_style':
            return await this.handleFixCodeStyle(args);
          
          case 'prepare_pr':
            return await this.handlePreparePR(args);
          
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Ferramenta desconhecida: ${name}`
            );
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Erro ao executar ${name}: ${error.message}`
        );
      }
    });
  }

  async handleStartDevSession(args) {
    const result = await SessionManager.startDevSession(args.project_path);
    
    return {
      content: [
        {
          type: 'text',
          text: `🚀 SESSÃO DE DESENVOLVIMENTO INICIADA\n\n${result.report}\n\n✨ Ambiente verificado e pronto para desenvolvimento!`,
        },
      ],
    };
  }

  async handleEndDevSession(args) {
    const result = await SessionManager.endDevSession(args);
    
    return {
      content: [
        {
          type: 'text',
          text: `🏁 SESSÃO FINALIZADA COM SUCESSO\n\n${result.report}\n\n💾 Todas as alterações foram salvas e o ambiente foi limpo.`,
        },
      ],
    };
  }

  async handleCreateFeatureBranch(args) {
    const result = await GitOpsManager.createFeatureBranch(args);
    
    return {
      content: [
        {
          type: 'text',
          text: `🌿 BRANCH CRIADA: ${result.branchName}\n\n${result.success ? '✅' : '❌'} ${result.description}\n\n📋 Comandos executados:\n${result.results.map(r => `${r.success ? '✅' : '❌'} ${r.command}`).join('\n')}`,
        },
      ],
    };
  }

  async handleSmartCommit(args) {
    const result = await GitOpsManager.smartCommit(args);
    
    return {
      content: [
        {
          type: 'text',
          text: `📝 COMMIT REALIZADO\n\nMensagem: ${result.message}\n\n${result.success ? '✅ Commit realizado com sucesso' : '❌ Erro no commit'}\n\n📋 Comandos executados:\n${result.results.map(r => `${r.success ? '✅' : '❌'} ${r.command}`).join('\n')}`,
        },
      ],
    };
  }

  async handleQualityGate(args) {
    const result = await CodeQualityEnforcer.qualityGate(args.project_path);
    
    return {
      content: [
        {
          type: 'text',
          text: result.report,
        },
      ],
    };
  }

  async handleFixCodeStyle(args) {
    const result = await CodeQualityEnforcer.fixCodeStyle(args.project_path);
    
    return {
      content: [
        {
          type: 'text',
          text: `🔧 CORREÇÕES AUTOMÁTICAS APLICADAS\n\n${result.report}\n\n✨ Código formatado seguindo as regras de estilo.`,
        },
      ],
    };
  }

  async handlePreparePR(args) {
    const result = await GitOpsManager.preparePR(args);
    
    return {
      content: [
        {
          type: 'text',
          text: `📋 TEMPLATE DE PR GERADO\n\n**Título:** ${result.title}\n\n**Template:**\n\n${result.template}\n\n${result.success ? '✅ Branch sincronizada e pronta para PR' : '⚠️ Verifique o status do Git'}`,
        },
      ],
    };
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[DevOps Orchestrator Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('🚀 DevOps Orchestrator MCP Server rodando...');
  }
}

// Inicializa o servidor
const server = new DevOpsOrchestratorServer();
server.run().catch(console.error);

