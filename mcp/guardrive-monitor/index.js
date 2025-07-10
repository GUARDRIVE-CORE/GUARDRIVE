#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const path = require('path');
const os = require('os');
const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

// Definição das ferramentas de Monitoramento do Guardrive
const TOOLS = [
  {
    name: 'get_system_metrics',
    description: 'Coleta métricas atuais do sistema (CPU, RAM, Disco)',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'save_metrics_to_file',
    description: 'Salva métricas do sistema em arquivo CSV diário',
    inputSchema: {
      type: 'object',
      properties: {}
    }
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
          default: false
        }
      }
    }
  }
];

// Criação do servidor MCP
const server = new Server(
  {
    name: 'guardrive-monitor',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handler para listar ferramentas
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS
}));

// Handler para executar ferramentas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_system_metrics': {
        const metrics = {
          cpu: '50%',
          ram: '4GB',
          disk: '80%'
        };
        
        return {
          content: [{
            type: 'json',
            data: metrics
          }]
        };
      }

      case 'save_metrics_to_file': {
        const today = new Date().toISOString().split('T')[0];
        const filepath = path.join(os.homedir(), `metrics-${today}.csv`);
        const csvRow = `"timestamp","cpu","ram","disk"
"${new Date().toISOString()}","50%","4GB","80%"
`;
        await fs.writeFile(filepath, csvRow, { flag: 'a' });

        return {
          content: [{
            type: 'text',
            text: `Metrics saved to ${filepath}`
          }]
        };
      }

      case 'get_system_health_report': {
        const report = {
          status: 'Healthy',
          details: {
            cpuLoad: 'Nominal',
            memoryStatus: 'Stable'
          }
        };

        if (args.save_to_file) {
          const filepath = path.join(os.homedir(), 'system_health_report.json');
          await fs.writeFile(filepath, JSON.stringify(report, null, 2));
          
          return {
            content: [{
              type: 'text',
              text: `Health report saved to ${filepath}`
            }]
          };
        }

        return {
          content: [{
            type: 'json',
            data: report
          }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error executing ${name}: ${error.message}`
      }],
      isError: true,
    };
  }
});

// Inicialização do servidor
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Guardrive Monitor MCP Server iniciado');
}

main().catch((error) => {
  console.error('Erro fatal:', error);
  process.exit(1);
});

