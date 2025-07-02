#!/usr/bin/env node

/**
 * Script de teste manual para o System Monitor MCP Server
 * 
 * Este script simula as chamadas que o Warp Agent faria para testar
 * as funcionalidades do MCP server localmente.
 */

const { spawn } = require('child_process');
const path = require('path');

/**
 * Testa uma ferramenta específica do MCP server
 */
function testTool(toolName, args = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔧 Testando: ${toolName}`);
    console.log('─'.repeat(50));
    
    const mcpServer = spawn('node', ['index.js'], {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let output = '';
    let errorOutput = '';
    
    mcpServer.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    mcpServer.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    mcpServer.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Teste concluído com sucesso');
        if (output) console.log('Output:', output);
        resolve({ output, errorOutput });
      } else {
        console.log('❌ Teste falhou');
        if (errorOutput) console.error('Error:', errorOutput);
        reject(new Error(`Exit code: ${code}`));
      }
    });
    
    // Simula as mensagens do protocolo MCP
    const requests = [
      // Inicialização do servidor
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: {
            name: 'test-client',
            version: '1.0.0'
          }
        }
      },
      // Lista ferramentas disponíveis
      {
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/list'
      },
      // Chama a ferramenta específica
      {
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
          name: toolName,
          arguments: args
        }
      }
    ];
    
    // Envia as requisições
    requests.forEach(request => {
      mcpServer.stdin.write(JSON.stringify(request) + '\n');
    });
    
    // Fecha o stdin após um delay para permitir processamento
    setTimeout(() => {
      mcpServer.stdin.end();
    }, 1000);
  });
}

/**
 * Executa todos os testes
 */
async function runAllTests() {
  console.log('🖥️ System Monitor MCP Server - Teste Manual');
  console.log('='.repeat(60));
  
  try {
    // Teste 1: Métricas básicas
    await testTool('get_system_metrics');
    
    // Teste 2: Salvar métricas
    await testTool('save_metrics_to_file');
    
    // Teste 3: Relatório de saúde (sem salvar)
    await testTool('get_system_health_report', { save_to_file: false });
    
    // Teste 4: Relatório de saúde (com salvamento)
    await testTool('get_system_health_report', { save_to_file: true });
    
    console.log('\n🎉 Todos os testes foram executados!');
    console.log('\n📝 Próximos passos:');
    console.log('1. Configure o MCP server no Warp');
    console.log('2. Teste as ferramentas através do Agent');
    console.log('3. Verifique os arquivos gerados em:', process.env.USERPROFILE || process.env.HOME);
    
  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error.message);
    process.exit(1);
  }
}

// Executa os testes se este arquivo foi chamado diretamente
if (require.main === module) {
  runAllTests();
}

module.exports = { testTool, runAllTests };

