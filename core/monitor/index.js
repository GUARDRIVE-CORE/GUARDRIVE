#!/usr/bin/env node

/**
 * Sistema de Monitoramento MCP Server
 * 
 * Este MCP server fornece ferramentas para monitorar métricas do sistema,
 * seguindo as regras de monitoramento definidas.
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
const os = require('os');
const fs = require('fs');
const path = require('path');

/**
 * Coleta métricas do sistema seguindo as regras de monitoramento
 * Métricas: Timestamp ISO 8601, % CPU Total, RAM Livre (GB), Disco Livre C: (GB)
 */
class SystemMonitor {
  /**
   * Obtém timestamp no formato ISO 8601
   */
  static getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Calcula porcentagem de uso de CPU (aproximação)
   */
  static getCpuUsage() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });

    const idle = totalIdle / cpus.length;
    const total = totalTick / cpus.length;
    const usage = 100 - Math.floor((idle / total) * 100);
    
    return Math.max(0, Math.min(100, usage));
  }

  /**
   * Obtém RAM livre em GB
   */
  static getFreeRamGB() {
    const freeMemBytes = os.freemem();
    return Math.round((freeMemBytes / (1024 * 1024 * 1024)) * 100) / 100;
  }

  /**
   * Obtém espaço livre no disco C: em GB (Windows)
   */
  static async getFreeDiskGB() {
    try {
      if (process.platform === 'win32') {
        // Para Windows, usa comando wmic
        const { exec } = require('child_process');
        return new Promise((resolve) => {
          exec('wmic logicaldisk where size!="" get size,freespace,caption', (error, stdout) => {
            if (error) {
              resolve(0);
              return;
            }
            
            const lines = stdout.split('\n');
            for (const line of lines) {
              if (line.includes('C:')) {
                const parts = line.trim().split(/\s+/);
                if (parts.length >= 3) {
                  const freeBytes = parseInt(parts[1]);
                  const freeGB = Math.round((freeBytes / (1024 * 1024 * 1024)) * 100) / 100;
                  resolve(freeGB);
                  return;
                }
              }
            }
            resolve(0);
          });
        });
      } else {
        // Para Unix-like, usa statvfs
        const stats = fs.statSync('/');
        return Math.round((stats.free / (1024 * 1024 * 1024)) * 100) / 100;
      }
    } catch (error) {
      return 0;
    }
  }

  /**
   * Coleta todas as métricas em formato estruturado
   */
  static async collectMetrics() {
    const timestamp = this.getTimestamp();
    const cpuUsage = this.getCpuUsage();
    const freeRam = this.getFreeRamGB();
    const freeDisk = await this.getFreeDiskGB();

    return {
      timestamp,
      cpu_usage_percent: cpuUsage,
      free_ram_gb: freeRam,
      free_disk_c_gb: freeDisk,
      system_info: {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        uptime_hours: Math.round(os.uptime() / 3600 * 100) / 100
      }
    };
  }

  /**
   * Salva métricas em arquivo CSV (seguindo regras de retenção)
   */
  static async saveMetricsToFile(metrics) {
    const today = new Date().toISOString().split('T')[0];
    const filename = `health-${today}.csv`;
    const filepath = path.join(os.homedir(), filename);
    
    const csvRow = `${metrics.timestamp},${metrics.cpu_usage_percent},${metrics.free_ram_gb},${metrics.free_disk_c_gb}\n`;
    
    try {
      // Verifica se arquivo existe para adicionar header
      const fileExists = fs.existsSync(filepath);
      
      if (!fileExists) {
        const header = 'timestamp,cpu_usage_percent,free_ram_gb,free_disk_c_gb\n';
        fs.writeFileSync(filepath, header);
      }
      
      fs.appendFileSync(filepath, csvRow);
      return filepath;
    } catch (error) {
      throw new Error(`Erro ao salvar métricas: ${error.message}`);
    }
  }
}

/**
 * Configuração do MCP Server
 */
class SystemMonitorServer {
  constructor() {
    this.server = new Server(
      {
        name: 'system-monitor',
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
    // Lista as ferramentas disponíveis
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_system_metrics',
            description: 'Coleta métricas atuais do sistema (CPU, RAM, Disco)',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'save_metrics_to_file',
            description: 'Salva métricas do sistema em arquivo CSV diário',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_system_health_report',
            description: 'Gera relatório completo de saúde do sistema',
            inputSchema: {
              type: 'object',
              properties: {
                save_to_file: {
                  type: 'boolean',
                  description: 'Se deve salvar o relatório em arquivo',
                  default: false,
                },
              },
            },
          },
        ],
      };
    });

    // Manipula chamadas de ferramentas
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'get_system_metrics':
          return await this.handleGetSystemMetrics();
        
        case 'save_metrics_to_file':
          return await this.handleSaveMetricsToFile();
        
        case 'get_system_health_report':
          return await this.handleGetSystemHealthReport(request.params.arguments);
        
        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Ferramenta desconhecida: ${request.params.name}`
          );
      }
    });
  }

  async handleGetSystemMetrics() {
    try {
      const metrics = await SystemMonitor.collectMetrics();
      
      return {
        content: [
          {
            type: 'text',
            text: `🖥️ Métricas do Sistema - ${metrics.timestamp}

` +
                  `💻 CPU: ${metrics.cpu_usage_percent}% de uso\n` +
                  `🧠 RAM Livre: ${metrics.free_ram_gb} GB\n` +
                  `💾 Disco C: Livre ${metrics.free_disk_c_gb} GB\n\n` +
                  `ℹ️ Sistema: ${metrics.system_info.platform} ${metrics.system_info.arch}\n` +
                  `🏠 Host: ${metrics.system_info.hostname}\n` +
                  `⏱️ Uptime: ${metrics.system_info.uptime_hours} horas`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Erro ao coletar métricas: ${error.message}`
      );
    }
  }

  async handleSaveMetricsToFile() {
    try {
      const metrics = await SystemMonitor.collectMetrics();
      const filepath = await SystemMonitor.saveMetricsToFile(metrics);
      
      return {
        content: [
          {
            type: 'text',
            text: `✅ Métricas salvas com sucesso!\n\n` +
                  `📁 Arquivo: ${filepath}\n` +
                  `📊 Dados: ${metrics.timestamp}\n` +
                  `   • CPU: ${metrics.cpu_usage_percent}%\n` +
                  `   • RAM Livre: ${metrics.free_ram_gb} GB\n` +
                  `   • Disco Livre: ${metrics.free_disk_c_gb} GB`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Erro ao salvar métricas: ${error.message}`
      );
    }
  }

  async handleGetSystemHealthReport(args = {}) {
    try {
      const metrics = await SystemMonitor.collectMetrics();
      const saveToFile = args.save_to_file || false;
      
      // Análise básica de saúde
      const healthStatus = {
        cpu: metrics.cpu_usage_percent < 80 ? 'BOM' : metrics.cpu_usage_percent < 95 ? 'ATENÇÃO' : 'CRÍTICO',
        ram: metrics.free_ram_gb > 2 ? 'BOM' : metrics.free_ram_gb > 0.5 ? 'ATENÇÃO' : 'CRÍTICO',
        disk: metrics.free_disk_c_gb > 10 ? 'BOM' : metrics.free_disk_c_gb > 2 ? 'ATENÇÃO' : 'CRÍTICO'
      };
      
      const overallHealth = Object.values(healthStatus).includes('CRÍTICO') ? 'CRÍTICO' :
                           Object.values(healthStatus).includes('ATENÇÃO') ? 'ATENÇÃO' : 'BOM';
      
      const report = `🏥 RELATÓRIO DE SAÚDE DO SISTEMA\n` +
                    `═══════════════════════════════════\n\n` +
                    `📊 Status Geral: ${overallHealth}\n` +
                    `🕐 Gerado em: ${metrics.timestamp}\n\n` +
                    `📈 MÉTRICAS DETALHADAS:\n` +
                    `├─ 💻 CPU: ${metrics.cpu_usage_percent}% (${healthStatus.cpu})\n` +
                    `├─ 🧠 RAM Livre: ${metrics.free_ram_gb} GB (${healthStatus.ram})\n` +
                    `└─ 💾 Disco C: ${metrics.free_disk_c_gb} GB livre (${healthStatus.disk})\n\n` +
                    `🖥️ INFORMAÇÕES DO SISTEMA:\n` +
                    `├─ Plataforma: ${metrics.system_info.platform}\n` +
                    `├─ Arquitetura: ${metrics.system_info.arch}\n` +
                    `├─ Hostname: ${metrics.system_info.hostname}\n` +
                    `└─ Uptime: ${metrics.system_info.uptime_hours} horas\n\n` +
                    `📋 RECOMENDAÇÕES:\n`;
      
      let recommendations = '';
      if (healthStatus.cpu !== 'BOM') {
        recommendations += `⚠️ CPU em uso elevado - verificar processos ativos\n`;
      }
      if (healthStatus.ram !== 'BOM') {
        recommendations += `⚠️ Pouca RAM disponível - considerar fechar aplicações\n`;
      }
      if (healthStatus.disk !== 'BOM') {
        recommendations += `⚠️ Pouco espaço em disco - executar limpeza\n`;
      }
      if (recommendations === '') {
        recommendations = `✅ Sistema operando dentro dos parâmetros normais\n`;
      }
      
      const fullReport = report + recommendations;
      
      if (saveToFile) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportFile = path.join(os.homedir(), `system-health-${timestamp}.txt`);
        fs.writeFileSync(reportFile, fullReport);
        
        return {
          content: [
            {
              type: 'text',
              text: fullReport + `\n\n📄 Relatório salvo em: ${reportFile}`,
            },
          ],
        };
      }
      
      return {
        content: [
          {
            type: 'text',
            text: fullReport,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Erro ao gerar relatório: ${error.message}`
      );
    }
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('🖥️ System Monitor MCP Server rodando...');
  }
}

// Inicializa o servidor
const server = new SystemMonitorServer();
server.run().catch(console.error);

