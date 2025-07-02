# GuardDrive SDK

## Versão Pública para Developers v1.0.0

![GuardDrive Logo](https://private-us-east-1.manuscdn.com/sessionFile/aLZbcSb3w7gm1GYf7gSAuy/sandbox/t4ETrChQgd6D7T6wp2iAhm-images_1748098913796_na1fn_L2hvbWUvdWJ1bnR1L0d1YXJkRHJpdmUvYnJhbmRpbmcvZ3VhcmRyaXZlX3JlZmluZWRfbG9nbw.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvYUxaYmNTYjN3N2dtMUdZZjdnU0F1eS9zYW5kYm94L3Q0RVRyQ2hRZ2Q2RDdUNndwMmlBaG0taW1hZ2VzXzE3NDgwOTg5MTM3OTZfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwwZDFZWEprUkhKcGRtVXZZbkpoYm1ScGJtY3ZaM1ZoY21SeWFYWmxYM0psWm1sdVpXUmZiRzluYncucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzY3MjI1NjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=F9RxqVekVQ9yG2YhUSWCBGULz-7sih4GZQtA9emiP8feYrqTuzR5HeFTQ~rEBycx7q-ytA6jFVoYSLqaVKI0Tbhbpgq8RqY-0NuSAyU-TBOruOxGZ9BS-4hAu8uTztHetQEbBazV1neQLc4BUyUvAYPXvXJ-2YBPUnlt1PiJ~XwywptWYc~WhwJdbFCPAD~RJBh66E4K3IUjbqHuq7vrfMpsOlA6hCUTWl-eCZuQFAbRqnbuzEanG0z~oJagYLQ5yLxO91CAhUZfrij~75E~nhKBn9q40Cgh6ZMeyZG-dxAINiSZHUhDj4~36ZKayAZluNKjBmcLVnlZWdS2PTZ-HQ__)

---

## Visão Geral

O GuardDrive SDK é um conjunto completo de ferramentas, APIs e bibliotecas para integração com o ecossistema GuardDrive, especificamente com o dispositivo Selfbelt e sua infraestrutura de segurança veicular, blockchain e tokenização ESG.

Este SDK permite que desenvolvedores, fabricantes de veículos, gestores de frotas e criadores de aplicações urbanas integrem funcionalidades de monitoramento de segurança veicular, verificação externa e tokenização ESG em seus produtos e serviços.

### Principais Recursos

- **Integração com Sensores Selfbelt**: APIs para comunicação direta com dispositivos Selfbelt
- **Simulação de Ambiente**: Ferramentas para simular sensores, veículos e ambiente urbano
- **Conectividade Blockchain**: Módulos para interação com a infraestrutura blockchain GuardDrive
- **Tokenização ESG**: Interfaces para geração e gestão de tokens ESG
- **Verificação Externa**: APIs para verificação de status via QR dinâmico
- **Dashboard e Visualização**: Componentes para criação de interfaces de monitoramento
- **Testes de Latência e Confiabilidade**: Ferramentas para validação de desempenho

---

## Requisitos

### Desenvolvimento
- Python 3.8+
- Node.js 14+
- Web3.js ou ethers.js para interações blockchain
- Docker e Docker Compose para ambiente de desenvolvimento completo

### Produção
- Servidor com suporte a HTTPS
- Conexão estável com a internet
- Acesso à rede blockchain GuardDrive (credenciais fornecidas separadamente)
- Certificados SSL para comunicação segura

---

## Instalação

### Instalação via NPM (Frontend)

```bash
npm install guardrive-sdk
```

### Instalação via PIP (Backend)

```bash
pip install guardrive-sdk
```

### Instalação Manual

1. Clone o repositório:
```bash
git clone https://github.com/guardrive/guardrive-sdk.git
```

2. Instale as dependências:
```bash
cd guardrive-sdk
pip install -r requirements.txt
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

---

## Estrutura do SDK

```
guardrive-sdk/
├── api/                  # APIs REST e MQTT
│   ├── rest/             # Endpoints REST
│   └── mqtt/             # Handlers MQTT
├── blockchain/           # Conectores blockchain
│   ├── contracts/        # Smart contracts
│   └── utils/            # Utilitários blockchain
├── simulators/           # Simuladores
│   ├── sensor/           # Simulador de sensores
│   ├── vehicle/          # Simulador de veículos
│   └── urban/            # Simulador de ambiente urbano
├── web/                  # Componentes web
│   ├── dashboard/        # Dashboard de monitoramento
│   └── verification/     # Interface de verificação
├── docs/                 # Documentação
│   ├── swagger/          # Especificação Swagger
│   └── examples/         # Exemplos de uso
└── tests/                # Testes automatizados
```

---

## Início Rápido

### Exemplo 1: Conectar ao Dispositivo Selfbelt

```javascript
// JavaScript (Frontend)
import { SelfbeltConnector } from 'guardrive-sdk';

const connector = new SelfbeltConnector({
  apiKey: 'YOUR_API_KEY',
  deviceId: 'SELFBELT_DEVICE_ID'
});

connector.connect()
  .then(device => {
    console.log('Conectado ao dispositivo:', device.info);
    
    // Receber atualizações de status em tempo real
    device.onStatusUpdate(status => {
      console.log('Status atualizado:', status);
      
      if (status.beltConnected && status.beltPositionCorrect) {
        console.log('Cinto conectado corretamente!');
      } else {
        console.log('Cinto não conectado ou posicionado incorretamente!');
      }
    });
  })
  .catch(error => {
    console.error('Erro ao conectar:', error);
  });
```

```python
# Python (Backend)
from guardrive_sdk import SelfbeltConnector

connector = SelfbeltConnector(
    api_key="YOUR_API_KEY",
    device_id="SELFBELT_DEVICE_ID"
)

try:
    device = connector.connect()
    print(f"Conectado ao dispositivo: {device.info}")
    
    # Função de callback para atualizações de status
    def on_status_update(status):
        print(f"Status atualizado: {status}")
        
        if status.belt_connected and status.belt_position_correct:
            print("Cinto conectado corretamente!")
        else:
            print("Cinto não conectado ou posicionado incorretamente!")
    
    device.on_status_update(on_status_update)
    
except Exception as e:
    print(f"Erro ao conectar: {e}")
```

### Exemplo 2: Verificar QR Dinâmico

```javascript
// JavaScript (Frontend)
import { QRVerifier } from 'guardrive-sdk';

const verifier = new QRVerifier({
  apiKey: 'YOUR_API_KEY'
});

// Função para verificar QR code escaneado
function verifyQRCode(qrData) {
  verifier.verify(qrData)
    .then(result => {
      console.log('Verificação concluída:', result);
      
      if (result.isValid) {
        console.log('QR válido!');
        console.log('Status do cinto:', result.beltStatus);
        console.log('Timestamp:', new Date(result.timestamp));
        console.log('Veículo:', result.vehicleInfo);
      } else {
        console.log('QR inválido ou expirado!');
      }
    })
    .catch(error => {
      console.error('Erro na verificação:', error);
    });
}

// Exemplo de uso com scanner de QR
document.getElementById('qrScanner').addEventListener('scan', (event) => {
  verifyQRCode(event.data);
});
```

```python
# Python (Backend)
from guardrive_sdk import QRVerifier

verifier = QRVerifier(
    api_key="YOUR_API_KEY"
)

# Função para verificar QR code
def verify_qr_code(qr_data):
    try:
        result = verifier.verify(qr_data)
        print(f"Verificação concluída: {result}")
        
        if result.is_valid:
            print("QR válido!")
            print(f"Status do cinto: {result.belt_status}")
            print(f"Timestamp: {result.timestamp}")
            print(f"Veículo: {result.vehicle_info}")
        else:
            print("QR inválido ou expirado!")
            
    except Exception as e:
        print(f"Erro na verificação: {e}")

# Exemplo de uso
qr_data = "GD:SB:1234567890:ABCDEF123456789"
verify_qr_code(qr_data)
```

### Exemplo 3: Interagir com Blockchain e Tokens ESG

```javascript
// JavaScript (Frontend)
import { BlockchainConnector, ESGTokenManager } from 'guardrive-sdk';

// Conectar à blockchain GuardDrive
const blockchain = new BlockchainConnector({
  apiKey: 'YOUR_API_KEY',
  network: 'testnet' // ou 'mainnet'
});

// Inicializar gerenciador de tokens ESG
const tokenManager = new ESGTokenManager({
  blockchain: blockchain
});

// Verificar saldo de tokens ESG
async function checkESGBalance(walletAddress) {
  try {
    const balance = await tokenManager.getBalance(walletAddress);
    console.log('Saldo de tokens ESG:', balance);
    
    // Obter detalhes dos tokens
    const tokenDetails = await tokenManager.getTokenDetails(walletAddress);
    console.log('Detalhes dos tokens:', tokenDetails);
    
    // Tokens podem ser categorizados por tipo de impacto
    console.log('Impacto ambiental:', tokenDetails.environmental);
    console.log('Impacto social:', tokenDetails.social);
    console.log('Impacto de governança:', tokenDetails.governance);
    
  } catch (error) {
    console.error('Erro ao verificar saldo:', error);
  }
}

// Verificar histórico de transações
async function checkTransactionHistory(walletAddress) {
  try {
    const history = await blockchain.getTransactionHistory(walletAddress);
    console.log('Histórico de transações:', history);
    
    // Filtrar por tipo de transação
    const mintEvents = history.filter(tx => tx.type === 'mint');
    console.log('Eventos de emissão:', mintEvents);
    
    const transferEvents = history.filter(tx => tx.type === 'transfer');
    console.log('Eventos de transferência:', transferEvents);
    
    const retireEvents = history.filter(tx => tx.type === 'retire');
    console.log('Eventos de aposentadoria:', retireEvents);
    
  } catch (error) {
    console.error('Erro ao verificar histórico:', error);
  }
}

// Exemplo de uso
const walletAddress = '0x1234567890123456789012345678901234567890';
checkESGBalance(walletAddress);
checkTransactionHistory(walletAddress);
```

```python
# Python (Backend)
from guardrive_sdk import BlockchainConnector, ESGTokenManager

# Conectar à blockchain GuardDrive
blockchain = BlockchainConnector(
    api_key="YOUR_API_KEY",
    network="testnet"  # ou "mainnet"
)

# Inicializar gerenciador de tokens ESG
token_manager = ESGTokenManager(
    blockchain=blockchain
)

# Verificar saldo de tokens ESG
def check_esg_balance(wallet_address):
    try:
        balance = token_manager.get_balance(wallet_address)
        print(f"Saldo de tokens ESG: {balance}")
        
        # Obter detalhes dos tokens
        token_details = token_manager.get_token_details(wallet_address)
        print(f"Detalhes dos tokens: {token_details}")
        
        # Tokens podem ser categorizados por tipo de impacto
        print(f"Impacto ambiental: {token_details.environmental}")
        print(f"Impacto social: {token_details.social}")
        print(f"Impacto de governança: {token_details.governance}")
        
    except Exception as e:
        print(f"Erro ao verificar saldo: {e}")

# Verificar histórico de transações
def check_transaction_history(wallet_address):
    try:
        history = blockchain.get_transaction_history(wallet_address)
        print(f"Histórico de transações: {history}")
        
        # Filtrar por tipo de transação
        mint_events = [tx for tx in history if tx.type == "mint"]
        print(f"Eventos de emissão: {mint_events}")
        
        transfer_events = [tx for tx in history if tx.type == "transfer"]
        print(f"Eventos de transferência: {transfer_events}")
        
        retire_events = [tx for tx in history if tx.type == "retire"]
        print(f"Eventos de aposentadoria: {retire_events}")
        
    except Exception as e:
        print(f"Erro ao verificar histórico: {e}")

# Exemplo de uso
wallet_address = "0x1234567890123456789012345678901234567890"
check_esg_balance(wallet_address)
check_transaction_history(wallet_address)
```

---

## Simuladores

O SDK inclui simuladores para testar integrações sem necessidade de hardware físico:

### Simulador de Sensores

```python
from guardrive_sdk.simulators import SensorSimulator

# Criar simulador de sensores
simulator = SensorSimulator(
    config={
        "pressure_sensor": True,
        "tension_sensor": True,
        "position_sensor": True,
        "accelerometer": True,
        "gyroscope": True,
        "environmental_sensors": True
    }
)

# Iniciar simulação
simulator.start()

# Configurar cenário de uso correto do cinto
simulator.set_scenario("correct_usage")

# Obter leituras simuladas
readings = simulator.get_readings()
print(f"Leituras simuladas: {readings}")

# Parar simulação
simulator.stop()
```

### Simulador de Veículo

```python
from guardrive_sdk.simulators import VehicleSimulator

# Criar simulador de veículo
simulator = VehicleSimulator(
    vehicle_type="sedan",
    num_seats=5
)

# Iniciar simulação
simulator.start()

# Simular movimento do veículo
simulator.set_speed(60)  # km/h
simulator.set_acceleration(1.2)  # m/s²
simulator.turn(15)  # graus

# Simular ocupantes
simulator.set_occupant(seat=0, present=True)  # Motorista
simulator.set_occupant(seat=1, present=True)  # Passageiro dianteiro
simulator.set_occupant(seat=2, present=False)  # Passageiro traseiro esquerdo

# Simular uso de cintos
simulator.set_seatbelt(seat=0, connected=True, correct_position=True)
simulator.set_seatbelt(seat=1, connected=True, correct_position=False)

# Obter estado do veículo
state = simulator.get_state()
print(f"Estado do veículo: {state}")

# Parar simulação
simulator.stop()
```

### Simulador de Ambiente Urbano

```python
from guardrive_sdk.simulators import UrbanEnvironmentSimulator

# Criar simulador de ambiente urbano
simulator = UrbanEnvironmentSimulator(
    city_size="medium",
    traffic_density="high",
    weather_conditions="rainy"
)

# Iniciar simulação
simulator.start()

# Adicionar veículos à simulação
vehicle1 = simulator.add_vehicle(
    vehicle_type="sedan",
    has_selfbelt=True,
    position=(100, 200)
)

vehicle2 = simulator.add_vehicle(
    vehicle_type="suv",
    has_selfbelt=False,
    position=(300, 150)
)

# Simular movimento dos veículos
simulator.update(time_step=1.0)  # Avançar simulação em 1 segundo

# Obter dados da simulação
city_data = simulator.get_city_data()
print(f"Dados da cidade: {city_data}")

# Verificar conformidade de segurança
compliance_report = simulator.generate_compliance_report()
print(f"Relatório de conformidade: {compliance_report}")

# Parar simulação
simulator.stop()
```

---

## APIs REST

O SDK fornece uma API REST completa para integração com sistemas externos:

### Endpoints Principais

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/v1/devices` | GET | Listar dispositivos disponíveis |
| `/api/v1/devices/{device_id}` | GET | Obter informações de um dispositivo específico |
| `/api/v1/devices/{device_id}/status` | GET | Obter status atual de um dispositivo |
| `/api/v1/devices/{device_id}/history` | GET | Obter histórico de um dispositivo |
| `/api/v1/verification/qr/{qr_code}` | GET | Verificar QR code |
| `/api/v1/tokens/balance/{wallet_address}` | GET | Obter saldo de tokens ESG |
| `/api/v1/tokens/details/{wallet_address}` | GET | Obter detalhes dos tokens ESG |
| `/api/v1/tokens/transactions/{wallet_address}` | GET | Obter histórico de transações |

### Exemplo de Uso da API REST

```bash
# Obter lista de dispositivos
curl -X GET "https://api.guardrive.com/api/v1/devices" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Obter status de um dispositivo específico
curl -X GET "https://api.guardrive.com/api/v1/devices/SB12345/status" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Verificar QR code
curl -X GET "https://api.guardrive.com/api/v1/verification/qr/GD:SB:1234567890:ABCDEF123456789" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## MQTT

O SDK também suporta comunicação via MQTT para atualizações em tempo real:

### Tópicos Principais

| Tópico | Descrição |
|--------|-----------|
| `guardrive/devices/{device_id}/status` | Atualizações de status do dispositivo |
| `guardrive/devices/{device_id}/events` | Eventos do dispositivo (conexão/desconexão, alertas) |
| `guardrive/vehicles/{vehicle_id}/status` | Atualizações de status do veículo |
| `guardrive/blockchain/events` | Eventos da blockchain (mint, transfer, retire) |

### Exemplo de Uso MQTT

```javascript
// JavaScript (Frontend)
import { MQTTClient } from 'guardrive-sdk';

const client = new MQTTClient({
  apiKey: 'YOUR_API_KEY',
  clientId: 'my-app-client'
});

// Conectar ao broker MQTT
client.connect()
  .then(() => {
    console.log('Conectado ao broker MQTT');
    
    // Assinar tópico de status de dispositivo
    client.subscribe(`guardrive/devices/SB12345/status`, (message) => {
      console.log('Status atualizado:', message);
    });
    
    // Assinar tópico de eventos de dispositivo
    client.subscribe(`guardrive/devices/SB12345/events`, (message) => {
      console.log('Evento recebido:', message);
      
      if (message.type === 'alert' && message.severity === 'high') {
        console.log('Alerta de alta severidade!');
        // Notificar usuário
      }
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao broker MQTT:', error);
  });
```

```python
# Python (Backend)
from guardrive_sdk import MQTTClient

client = MQTTClient(
    api_key="YOUR_API_KEY",
    client_id="my-app-client"
)

# Função de callback para status
def on_status(message):
    print(f"Status atualizado: {message}")

# Função de callback para eventos
def on_event(message):
    print(f"Evento recebido: {message}")
    
    if message.type == "alert" and message.severity == "high":
        print("Alerta de alta severidade!")
        # Notificar usuário

# Conectar ao broker MQTT
client.connect()

# Assinar tópicos
client.subscribe(f"guardrive/devices/SB12345/status", on_status)
client.subscribe(f"guardrive/devices/SB12345/events", on_event)

# Manter conexão ativa
try:
    client.loop_forever()
except KeyboardInterrupt:
    client.disconnect()
```

---

## Dashboard e Visualização

O SDK inclui componentes para criação de dashboards e interfaces de visualização:

### Componentes Web

```javascript
// JavaScript (Frontend)
import { Dashboard, BeltStatusWidget, VehicleMap, ESGImpactChart } from 'guardrive-sdk/web';

// Criar dashboard
const dashboard = new Dashboard({
  containerId: 'dashboard-container',
  apiKey: 'YOUR_API_KEY',
  refreshInterval: 5000  // 5 segundos
});

// Adicionar widget de status do cinto
dashboard.addWidget(new BeltStatusWidget({
  deviceId: 'SB12345',
  position: { x: 0, y: 0, width: 2, height: 1 }
}));

// Adicionar mapa de veículos
dashboard.addWidget(new VehicleMap({
  fleetId: 'FLEET001',
  position: { x: 0, y: 1, width: 4, height: 2 }
}));

// Adicionar gráfico de impacto ESG
dashboard.addWidget(new ESGImpactChart({
  walletAddress: '0x1234567890123456789012345678901234567890',
  position: { x: 2, y: 0, width: 2, height: 1 }
}));

// Inicializar dashboard
dashboard.init();
```

### Exemplo de HTML

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GuardDrive Dashboard</title>
  <link rel="stylesheet" href="https://cdn.guardrive.com/sdk/web/v1/guardrive-sdk.css">
</head>
<body>
  <div id="dashboard-container" style="width: 100%; height: 100vh;"></div>
  
  <script src="https://cdn.guardrive.com/sdk/web/v1/guardrive-sdk.js"></script>
  <script>
    // Configurar dashboard
    const dashboard = new GuardDrive.Dashboard({
      containerId: 'dashboard-container',
      apiKey: 'YOUR_API_KEY',
      refreshInterval: 5000
    });
    
    // Adicionar widgets
    dashboard.addWidget(new GuardDrive.BeltStatusWidget({
      deviceId: 'SB12345',
      position: { x: 0, y: 0, width: 2, height: 1 }
    }));
    
    dashboard.addWidget(new GuardDrive.VehicleMap({
      fleetId: 'FLEET001',
      position: { x: 0, y: 1, width: 4, height: 2 }
    }));
    
    dashboard.addWidget(new GuardDrive.ESGImpactChart({
      walletAddress: '0x1234567890123456789012345678901234567890',
      position: { x: 2, y: 0, width: 2, height: 1 }
    }));
    
    // Inicializar dashboard
    dashboard.init();
  </script>
</body>
</html>
```

---

## Testes de Latência e Confiabilidade

O SDK inclui ferramentas para testar a latência e confiabilidade da integração:

```python
from guardrive_sdk.testing import LatencyTester, ReliabilityTester

# Teste de latência
latency_tester = LatencyTester(
    api_key="YOUR_API_KEY",
    device_id="SB12345"
)

# Executar teste de latência
latency_results = latency_tester.run_test(
    num_requests=100,
    interval=0.5  # 500ms
)

print(f"Resultados de latência:")
print(f"Média: {latency_results.average_ms} ms")
print(f"Mínima: {latency_results.min_ms} ms")
print(f"Máxima: {latency_results.max_ms} ms")
print(f"Percentil 95: {latency_results.percentile_95_ms} ms")

# Teste de confiabilidade
reliability_tester = ReliabilityTester(
    api_key="YOUR_API_KEY",
    device_id="SB12345"
)

# Executar teste de confiabilidade
reliability_results = reliability_tester.run_test(
    duration_hours=24,
    check_interval=60  # 60 segundos
)

print(f"Resultados de confiabilidade:")
print(f"Uptime: {reliability_results.uptime_percentage}%")
print(f"Falhas: {reliability_results.failure_count}")
print(f"Tempo médio entre falhas: {reliability_results.mtbf_minutes} minutos")
print(f"Tempo médio de recuperação: {reliability_results.mttr_minutes} minutos")
```

---

## Documentação Swagger

A documentação completa da API está disponível em formato Swagger:

```
https://api.guardrive.com/docs/swagger
```

Para visualizar localmente:

```bash
# Instalar Swagger UI
npm install -g swagger-ui-cli

# Iniciar servidor Swagger
swagger-ui-cli serve ./docs/swagger/guardrive-api.yaml
```

---

## Suporte e Contribuição

### Suporte

Para obter suporte, entre em contato:

- Email: developers@guardrive.com
- Portal de Desenvolvedores: https://developers.guardrive.com
- Fórum: https://forum.guardrive.com

### Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Licença

Este SDK é distribuído sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

*Metadata de Rastreabilidade Simbólica: GD-SDK-2025-001*
