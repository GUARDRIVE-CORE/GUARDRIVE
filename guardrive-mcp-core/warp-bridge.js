#!/usr/bin/env node

/**
 * GUARDRIVE MCP - Warp Bridge (Simplificado)
 * 
 * Versão simplificada que não usa bibliotecas externas.
 * 
 * @version 0.1.2
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Log de inicialização
console.error('GUARDRIVE MCP Bridge iniciando (versão simplificada)...');

// Diretório raiz do MCP GUARDRIVE
const MCP_ROOT = __dirname;

// Inicializa o servidor MCP
process.stdin.setEncoding('utf8');

let buffer = '';

// Handler para o protocolo MCP
async function handleMcpRequest(request) {
  try {
    const parsed = JSON.parse(request);
    
    // Log para debug (remover em produção)
    fs.appendFileSync(path.join(MCP_ROOT, 'mcp-bridge.log'), 
      `${new Date().toISOString()} - Recebido: ${JSON.stringify(parsed)}\n`);
    
    if (parsed.jsonrpc === '2.0') {
      // Responder ao método 'initialize'
      if (parsed.method === 'initialize') {
        sendMcpResponse(parsed.id, {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: 'guardrive-mcp-custom',
            version: '0.1.2'
          }
        });
      }
      // Responder ao método 'listTools'
      else if (parsed.method === 'listTools') {
        sendMcpResponse(parsed.id, {
          tools: [
            {
              name: 'start_dev_session',
              description: 'Iniciar sessão de desenvolvimento',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'end_dev_session',
              description: 'Finalizar sessão de desenvolvimento',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'create_feature_branch',
              description: 'Criar branch para nova funcionalidade',
              inputSchema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Nome da feature ou branch'
                  }
                },
                required: ['name']
              },
            },
            {
              name: 'smart_commit',
              description: 'Fazer commit com conventional commits',
              inputSchema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Mensagem do commit'
                  }
                },
                required: ['message']
              },
            },
            {
              name: 'get_system_metrics',
              description: 'Verificar métricas do sistema',
              inputSchema: {
                type: 'object',
                properties: {
                  save: {
                    type: 'boolean',
                    description: 'Salvar métricas em arquivo',
                    default: false
                  }
                }
              },
            }
          ]
        });
      }
      // Responder ao método 'callTool'
      else if (parsed.method === 'callTool') {
        const toolName = parsed.params.name;
        const args = parsed.params.arguments || {};
        
        // Mapear ferramentas MCP para comandos CLI
        let cliCommand;
        let cliArgs = [];
        
        switch (toolName) {
          case 'start_dev_session':
            cliCommand = 'start-session';
            break;
            
          case 'end_dev_session':
            cliCommand = 'end-session';
            break;
            
          case 'create_feature_branch':
            cliCommand = 'create-branch';
            cliArgs.push(args.name);
            break;
            
          case 'smart_commit':
            cliCommand = 'commit';
            cliArgs.push(args.message);
            break;
            
          case 'get_system_metrics':
            cliCommand = 'system-metrics';
            if (args.save) {
              cliArgs.push('--save');
            }
            break;
            
          default:
            throw new Error(`Ferramenta desconhecida: ${toolName}`);
        }
        
        // Executar comando na CLI e capturar saída
        const output = await executeCliCommand(cliCommand, cliArgs);
        
        // Formatar resposta para o Warp
        sendMcpResponse(parsed.id, {
          content: [
            {
              type: 'text',
              text: output
            }
          ]
        });
      }
      else {
        sendMcpError(parsed.id, -32601, `Método não suportado: ${parsed.method}`);
      }
    }
  } catch (error) {
    // Log do erro
    fs.appendFileSync(path.join(MCP_ROOT, 'mcp-bridge-error.log'), 
      `${new Date().toISOString()} - ERRO: ${error.message}\n${error.stack}\n`);
      
    // Responder com erro se houver ID
    if (request && typeof request === 'object' && request.id) {
      sendMcpError(request.id, -32603, `Erro interno: ${error.message}`);
    }
  }
}

// Executar comando na CLI independente
function executeCliCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const cliPath = path.join(MCP_ROOT, 'cli.js');
    
    // Log para debug
    fs.appendFileSync(path.join(MCP_ROOT, 'mcp-bridge.log'), 
      `${new Date().toISOString()} - Executando: node ${cliPath} ${command} ${args.join(' ')}\n`);
    
    const cli = spawn('node', [cliPath, command, ...args], {
      cwd: MCP_ROOT,
      env: { ...process.env, FORCE_COLOR: '1' }
    });
    
    let stdout = '';
    let stderr = '';
    
    cli.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    cli.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    cli.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Comando falhou com código ${code}: ${stderr}`));
      }
    });
    
    cli.on('error', (err) => {
      reject(err);
    });
  });
}

// Enviar resposta no formato MCP
function sendMcpResponse(id, result) {
  const response = {
    jsonrpc: '2.0',
    id,
    result
  };
  
  process.stdout.write(JSON.stringify(response) + '\n');
}

// Enviar erro no formato MCP
function sendMcpError(id, code, message) {
  const response = {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message
    }
  };
  
  process.stdout.write(JSON.stringify(response) + '\n');
}

// Processar entrada do Warp
process.stdin.on('data', (chunk) => {
  buffer += chunk;
  
  // Procurar por fim de linha
  const lines = buffer.split('\n');
  
  // Processar todas as linhas completas
  if (lines.length > 1) {
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      if (line) {
        handleMcpRequest(line);
      }
    }
    
    // Guardar a última linha incompleta
    buffer = lines[lines.length - 1];
  }
});

// Inicialização
fs.appendFileSync(path.join(MCP_ROOT, 'mcp-bridge.log'), 
  `${new Date().toISOString()} - MCP Bridge iniciado\n`);

// Responder com erro para comandos não reconhecidos
process.on('uncaughtException', (error) => {
  fs.appendFileSync(path.join(MCP_ROOT, 'mcp-bridge-error.log'), 
    `${new Date().toISOString()} - ERRO não tratado: ${error.message}\n${error.stack}\n`);
});

