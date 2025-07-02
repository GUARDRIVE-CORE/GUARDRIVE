# Simulador de Ambiente Urbano e Veicular - GuardDrive FleetShield

## Metadados

- **Projeto**: GuardDrive FleetShield
- **Componente**: Simulador de Ambiente Urbano e Veicular
- **Versão**: 1.0
- **Data**: 02/06/2025
- **Status**: Documento Técnico

## 1. Introdução

O Simulador de Ambiente Urbano e Veicular do GuardDrive FleetShield é uma ferramenta avançada que permite testar, validar e demonstrar o funcionamento do sistema em ambientes controlados, sem necessidade de hardware físico ou veículos reais. Este simulador recria cenários urbanos complexos, comportamentos veiculares e interações com o sistema GuardDrive FleetShield, possibilitando testes abrangentes e demonstrações realistas.

### 1.1. Propósito

O simulador foi desenvolvido para:

- Testar o sistema GuardDrive FleetShield em diversos cenários sem necessidade de implementação física
- Validar algoritmos de detecção de eventos de segurança em condições controladas
- Demonstrar o funcionamento do sistema para potenciais clientes e parceiros
- Treinar modelos de IA com dados sintéticos antes da implementação em campo
- Simular cenários de falha e comportamentos extremos para testar a robustez do sistema

### 1.2. Público-Alvo

- Desenvolvedores integrando com o ecossistema GuardDrive
- Equipes de QA realizando testes de sistema
- Equipes de vendas e marketing demonstrando o produto
- Pesquisadores e engenheiros aprimorando algoritmos de detecção
- Parceiros avaliando a integração com seus sistemas

### 1.3. Recursos Principais

- Simulação de ambientes urbanos com diferentes características (centro urbano, rodovia, área residencial)
- Geração de frotas virtuais com comportamentos configuráveis
- Simulação de eventos de segurança (não uso de cinto, freadas bruscas, excesso de velocidade)
- Integração com o SDK GuardDrive FleetShield para testes end-to-end
- Visualização 3D e análise de dados em tempo real
- Exportação de dados para análise posterior

## 2. Arquitetura

### 2.1. Visão Geral

O simulador é composto por quatro módulos principais que trabalham em conjunto:

```
┌─────────────────────────────────────────────────────────┐
│            Simulador GuardDrive FleetShield             │
├─────────────┬─────────────┬────────────┬───────────────┤
│  Módulo de  │  Módulo de  │  Módulo de │   Módulo de   │
│  Ambiente   │  Veículos   │  Sensores  │  Integração   │
│   Urbano    │             │            │               │
└─────┬───────┴──────┬──────┴─────┬──────┴───────┬───────┘
      │              │            │              │
      ▼              ▼            ▼              ▼
┌─────────────┐ ┌──────────┐ ┌──────────┐ ┌────────────────┐
│ Renderização│ │ Interface│ │ Análise  │ │ SDK GuardDrive │
│     3D      │ │ Usuário  │ │ de Dados │ │  FleetShield   │
└─────────────┘ └──────────┘ └──────────┘ └────────────────┘
```

### 2.2. Componentes Principais

#### 2.2.1. Módulo de Ambiente Urbano

Responsável por gerar e gerenciar o ambiente urbano virtual, incluindo:

- Malha viária (ruas, avenidas, rodovias)
- Elementos urbanos (semáforos, faixas de pedestres, cruzamentos)
- Condições ambientais (clima, iluminação, tráfego)
- Física do ambiente (atrito, gravidade, colisões)

#### 2.2.2. Módulo de Veículos

Gerencia a frota virtual e o comportamento dos veículos:

- Modelos de veículos com características físicas realistas
- Comportamentos de condução configuráveis (agressivo, defensivo, normal)
- Geração de eventos de segurança (não uso de cinto, freadas bruscas)
- Movimentação autônoma ou controlada pelo usuário

#### 2.2.3. Módulo de Sensores

Simula os sensores do sistema GuardDrive FleetShield:

- Sensores de cinto de segurança
- Acelerômetros e giroscópios
- GPS e localização
- Sensores de velocidade e RPM
- Comunicação com barramento CAN/OBD-II

#### 2.2.4. Módulo de Integração

Conecta o simulador ao ecossistema GuardDrive FleetShield:

- Integração com SDK GuardDrive
- Comunicação com backend e blockchain
- Geração de certificados e tokens virtuais
- Simulação de verificação externa (QR dinâmico, LED)

### 2.3. Fluxo de Dados

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│   Simulação   │     │  Processamento│     │ Visualização  │
│   Ambiente    │────►│   de Dados    │────►│   e Análise   │
│   e Veículos  │     │               │     │               │
└───────┬───────┘     └───────┬───────┘     └───────────────┘
        │                     │
        │                     │
        ▼                     ▼
┌───────────────┐     ┌───────────────┐
│  Geração de   │     │  Integração   │
│   Eventos     │────►│  com SDK e    │
│  de Segurança │     │   Backend     │
└───────────────┘     └───────────────┘
```

## 3. Instalação e Configuração

### 3.1. Requisitos de Sistema

#### 3.1.1. Hardware Recomendado

- Processador: Intel Core i7 ou AMD Ryzen 7 (ou superior)
- Memória RAM: 16GB (mínimo), 32GB (recomendado)
- Placa de Vídeo: NVIDIA GTX 1660 ou AMD Radeon RX 5600 (ou superior) com 6GB VRAM
- Armazenamento: 20GB de espaço livre em SSD
- Conexão de Internet: 10 Mbps (mínimo)

#### 3.1.2. Software Necessário

- Sistema Operacional: Windows 10/11, macOS 12+, Ubuntu 20.04+ ou Debian 11+
- Dependências: Python 3.9+, Node.js 16+, Docker 20+
- Bibliotecas: OpenGL 4.5+, CUDA 11+ (opcional, para aceleração GPU)

### 3.2. Processo de Instalação

#### 3.2.1. Instalação via Docker (Recomendado)

```bash
# Baixar a imagem Docker
docker pull guarddrive/fleetshield-simulator:latest

# Executar o simulador
docker run -p 8080:8080 -p 9000:9000 --name fleetshield-simulator guarddrive/fleetshield-simulator:latest
```

#### 3.2.2. Instalação Manual

```bash
# Clonar o repositório
git clone https://github.com/guarddrive/fleetshield-simulator.git
cd fleetshield-simulator

# Instalar dependências
pip install -r requirements.txt
npm install

# Compilar componentes nativos
make build

# Iniciar o simulador
python simulator.py
```

### 3.3. Configuração Inicial

#### 3.3.1. Configuração do Ambiente

O simulador pode ser configurado através do arquivo `config.yaml`:

```yaml
# Configurações gerais
general:
  log_level: info
  data_dir: ./data
  port: 8080
  api_port: 9000

# Configurações de renderização
rendering:
  resolution: 1920x1080
  quality: high # low, medium, high, ultra
  fps_limit: 60
  use_gpu: true

# Configurações de simulação
simulation:
  physics_update_rate: 60 # Hz
  default_environment: urban_center
  vehicle_count: 50
  traffic_density: medium # low, medium, high
  time_scale: 1.0 # 1.0 = tempo real, 2.0 = 2x mais rápido

# Integração com GuardDrive
guarddrive:
  api_key: YOUR_API_KEY
  environment: sandbox
  organization_id: YOUR_ORGANIZATION_ID
```

#### 3.3.2. Configuração da Integração com SDK

Para integrar o simulador com o SDK GuardDrive FleetShield:

```python
from guarddrive_simulator import Simulator
from guarddrive_fleetshield import GuardDriveSDK

# Inicializar o SDK
sdk = GuardDriveSDK(
    api_key="YOUR_API_KEY",
    environment="sandbox",
    organization_id="YOUR_ORGANIZATION_ID"
)

# Inicializar o simulador com integração SDK
simulator = Simulator(
    config_path="./config.yaml",
    guarddrive_sdk=sdk
)

# Iniciar a simulação
simulator.start()
```

## 4. Uso do Simulador

### 4.1. Interface de Usuário

A interface do simulador é dividida em quatro áreas principais:

1. **Visualização 3D**: Renderização do ambiente urbano e veículos
2. **Painel de Controle**: Controles para manipular a simulação
3. **Painel de Dados**: Visualização de telemetria e eventos em tempo real
4. **Console de Comandos**: Interface para comandos avançados e scripting

![Interface do Simulador](https://docs.guarddrive.com/images/simulator_ui.png)

### 4.2. Comandos Básicos

#### 4.2.1. Controle de Simulação

| Comando                 | Descrição                                 |
| ----------------------- | ----------------------------------------- |
| `Ctrl+P` ou botão Play  | Iniciar/pausar simulação                  |
| `Ctrl+R` ou botão Reset | Reiniciar simulação                       |
| `+` / `-`               | Aumentar/diminuir velocidade da simulação |
| `Esc`                   | Abrir menu principal                      |
| `F1`                    | Mostrar ajuda                             |

#### 4.2.2. Navegação na Visualização 3D

| Comando               | Descrição                                                    |
| --------------------- | ------------------------------------------------------------ |
| Mouse + botão direito | Rotacionar câmera                                            |
| WASD                  | Mover câmera                                                 |
| Scroll do mouse       | Zoom in/out                                                  |
| F                     | Focar no veículo selecionado                                 |
| C                     | Alternar entre modos de câmera (livre, seguir veículo, topo) |

### 4.3. Cenários Pré-configurados

O simulador inclui diversos cenários pré-configurados para testes e demonstrações:

#### 4.3.1. Carregando um Cenário

Via Interface Gráfica:

1. Clique em "Arquivo" > "Carregar Cenário"
2. Selecione o cenário desejado
3. Clique em "Carregar"

Via Console de Comandos:

```
load_scenario("urban_rush_hour")
```

#### 4.3.2. Cenários Disponíveis

| Cenário             | Descrição                                               |
| ------------------- | ------------------------------------------------------- |
| `urban_rush_hour`   | Centro urbano em horário de pico com alto tráfego       |
| `highway_fleet`     | Frota em rodovia com diferentes condições de velocidade |
| `residential_area`  | Área residencial com tráfego moderado e muitas paradas  |
| `mixed_conditions`  | Combinação de ambientes urbanos e rodovias              |
| `safety_violations` | Cenário com alta incidência de violações de segurança   |
| `extreme_weather`   | Condições climáticas adversas (chuva, neblina)          |

### 4.4. Criação de Cenários Personalizados

#### 4.4.1. Editor de Cenários

O simulador inclui um editor visual para criação de cenários personalizados:

1. Clique em "Arquivo" > "Novo Cenário"
2. Use as ferramentas de edição para:
   - Desenhar a malha viária
   - Posicionar elementos urbanos
   - Configurar condições ambientais
   - Adicionar e configurar veículos
3. Salve o cenário com "Arquivo" > "Salvar Cenário"

#### 4.4.2. Criação via Script

Cenários também podem ser criados programaticamente:

```python
from guarddrive_simulator import Simulator, ScenarioBuilder
from guarddrive_simulator.elements import Road, Vehicle, TrafficLight

# Inicializar construtor de cenário
builder = ScenarioBuilder("meu_cenario_personalizado")

# Adicionar elementos urbanos
builder.add_road(Road.create_straight(start=(0, 0), end=(1000, 0), lanes=2))
builder.add_road(Road.create_straight(start=(500, 0), end=(500, 1000), lanes=2))
builder.add_traffic_light(TrafficLight(position=(500, 0)))

# Adicionar veículos
for i in range(20):
    vehicle = Vehicle(
        model="sedan",
        position=(100 + i*50, 10),
        direction=(1, 0),
        behavior="normal"
    )
    builder.add_vehicle(vehicle)

# Configurar condições ambientais
builder.set_weather("rainy")
builder.set_time_of_day("evening")
builder.set_traffic_density("medium")

# Salvar cenário
scenario = builder.build()
scenario.save("./scenarios/meu_cenario_personalizado.scenario")

# Carregar no simulador
simulator = Simulator()
simulator.load_scenario(scenario)
simulator.start()
```

## 5. Simulação de Eventos de Segurança

### 5.1. Tipos de Eventos

O simulador pode gerar diversos eventos de segurança para testar o sistema GuardDrive FleetShield:

| Evento               | Descrição                           | Parâmetros Configuráveis   |
| -------------------- | ----------------------------------- | -------------------------- |
| `seatbelt_violation` | Não uso do cinto de segurança       | Duração, frequência        |
| `harsh_braking`      | Freada brusca                       | Intensidade, duração       |
| `harsh_acceleration` | Aceleração brusca                   | Intensidade, duração       |
| `speeding`           | Excesso de velocidade               | Percentual acima do limite |
| `sharp_turn`         | Curva fechada em alta velocidade    | Ângulo, velocidade         |
| `collision`          | Colisão com outro veículo ou objeto | Intensidade, tipo          |
| `distracted_driving` | Condução distraída                  | Tipo, duração              |
| `fatigue`            | Fadiga do motorista                 | Nível, progressão          |

### 5.2. Configuração de Eventos

#### 5.2.1. Configuração via Interface Gráfica

1. Selecione um veículo na visualização 3D
2. Clique em "Eventos" no painel de controle
3. Selecione o tipo de evento desejado
4. Configure os parâmetros do evento
5. Clique em "Aplicar" para programar o evento ou "Executar Agora" para acionar imediatamente

#### 5.2.2. Configuração via Script

```python
# Selecionar veículo por ID
vehicle = simulator.get_vehicle("vehicle-123")

# Configurar evento de não uso do cinto
vehicle.schedule_event(
    event_type="seatbelt_violation",
    start_time=60,  # segundos após início da simulação
    duration=120,   # duração em segundos
    parameters={
        "intermittent": True,  # violação intermitente
        "intervals": [(0, 30), (60, 90)]  # períodos de violação em segundos
    }
)

# Configurar evento de freada brusca
vehicle.schedule_event(
    event_type="harsh_braking",
    start_time=180,  # segundos após início da simulação
    duration=3,      # duração em segundos
    parameters={
        "intensity": 0.8,  # intensidade (0.0 - 1.0)
        "cause": "obstacle_avoidance"
    }
)
```

### 5.3. Geração Aleatória de Eventos

O simulador pode gerar eventos aleatórios baseados em perfis de comportamento:

```python
# Configurar gerador de eventos aleatórios
event_generator = simulator.create_event_generator(
    profile="urban_fleet",  # perfil de comportamento
    seed=12345,            # semente para reprodutibilidade
    intensity=0.7,         # intensidade geral (0.0 - 1.0)
    events_per_hour=25     # frequência média de eventos
)

# Aplicar a todos os veículos
simulator.apply_event_generator(event_generator)

# Ou aplicar a veículos específicos
for vehicle_id in ["vehicle-123", "vehicle-456", "vehicle-789"]:
    vehicle = simulator.get_vehicle(vehicle_id)
    vehicle.apply_event_generator(event_generator)
```

## 6. Integração com SDK GuardDrive FleetShield

### 6.1. Configuração da Integração

Para integrar o simulador com o SDK GuardDrive FleetShield:

```python
from guarddrive_simulator import Simulator
from guarddrive_fleetshield import GuardDriveSDK

# Inicializar o SDK
sdk = GuardDriveSDK(
    api_key="YOUR_API_KEY",
    environment="sandbox",
    organization_id="YOUR_ORGANIZATION_ID"
)

# Inicializar o simulador com integração SDK
simulator = Simulator(
    config_path="./config.yaml",
    guarddrive_sdk=sdk
)

# Configurar mapeamento de veículos simulados para IDs no GuardDrive
simulator.map_vehicle("sim-vehicle-001", "guarddrive-vehicle-123")
simulator.map_vehicle("sim-vehicle-002", "guarddrive-vehicle-456")

# Iniciar a simulação com transmissão de dados para o GuardDrive
simulator.start(transmit_data=True)
```

### 6.2. Fluxo de Dados

Quando integrado com o SDK, o simulador:

1. Gera dados de telemetria simulados (velocidade, aceleração, uso do cinto, etc.)
2. Transmite esses dados para o SDK GuardDrive FleetShield
3. O SDK processa os dados e interage com o backend e blockchain
4. Eventos e certificações são gerados no ecossistema GuardDrive
5. O simulador recebe feedback do SDK (certificações, tokens, alertas)
6. A interface do simulador exibe o status da integração em tempo real

### 6.3. Monitoramento da Integração

O simulador fornece um painel específico para monitorar a integração com o GuardDrive:

1. Clique em "Visualizar" > "Painel de Integração GuardDrive"
2. O painel exibirá:
   - Status da conexão com o backend GuardDrive
   - Eventos transmitidos e recebidos
   - Certificados gerados na blockchain
   - Tokens ESG acumulados
   - Alertas e notificações

### 6.4. Teste de Cenários Específicos

#### 6.4.1. Teste de Certificação de Segurança

```python
# Configurar cenário de teste de certificação
scenario = simulator.load_scenario("safety_certification_test")

# Configurar veículo para comportamento seguro
vehicle = scenario.get_vehicle("test-vehicle-001")
vehicle.set_behavior("safety_compliant")

# Executar simulação por período específico
simulator.run_for(hours=8)  # Simular 8 horas de operação

# Verificar se certificado foi gerado
certificates = sdk.blockchain.getVehicleCertificates(
    "guarddrive-vehicle-123"
)

print(f"Certificados gerados: {len(certificates)}")
for cert in certificates:
    print(f"ID: {cert.id}, Status: {cert.status}, Emitido: {cert.issuedAt}")
```

#### 6.4.2. Teste de Detecção de Violações

```python
# Configurar cenário de teste de violações
scenario = simulator.load_scenario("safety_violations_test")

# Configurar veículo para comportamento inseguro
vehicle = scenario.get_vehicle("test-vehicle-002")
vehicle.set_behavior("high_risk")

# Programar eventos específicos
vehicle.schedule_event(
    event_type="seatbelt_violation",
    start_time=300,
    duration=600
)

vehicle.schedule_event(
    event_type="harsh_braking",
    start_time=900,
    duration=5
)

# Executar simulação
simulator.run_for(hours=1)

# Verificar eventos detectados
events = sdk.telemetry.getEvents(
    "guarddrive-vehicle-456",
    start_date="2025-06-02T00:00:00Z",
    end_date="2025-06-03T00:00:00Z"
)

print(f"Eventos detectados: {len(events)}")
for event in events:
    print(f"Tipo: {event.type}, Horário: {event.timestamp}")
```

## 7. Análise de Dados e Relatórios

### 7.1. Visualização em Tempo Real

O simulador oferece diversas visualizações em tempo real:

#### 7.1.1. Mapa de Calor de Eventos

Exibe concentrações de eventos de segurança no mapa:

1. Clique em "Visualizar" > "Mapa de Calor"
2. Selecione o tipo de evento (freadas bruscas, não uso do cinto, etc.)
3. Ajuste a escala de tempo e intensidade

#### 7.1.2. Gráficos de Telemetria

Exibe dados de telemetria em tempo real:

1. Selecione um veículo
2. Clique em "Visualizar" > "Telemetria"
3. Escolha os parâmetros a serem exibidos (velocidade, aceleração, etc.)
4. Configure o intervalo de tempo e tipo de gráfico

### 7.2. Exportação de Dados

O simulador permite exportar dados para análise posterior:

#### 7.2.1. Formatos de Exportação

| Formato | Descrição                  | Uso Recomendado                            |
| ------- | -------------------------- | ------------------------------------------ |
| CSV     | Dados tabulares simples    | Análise em Excel, Python, R                |
| JSON    | Estrutura hierárquica      | Integração com aplicações web              |
| SQLite  | Banco de dados local       | Consultas complexas e relacionamentos      |
| Parquet | Formato colunar comprimido | Grandes volumes de dados, análise em Spark |

#### 7.2.2. Exportação via Interface

1. Clique em "Arquivo" > "Exportar Dados"
2. Selecione o tipo de dados (telemetria, eventos, certificados)
3. Escolha o período de tempo
4. Selecione o formato de saída
5. Escolha o local para salvar o arquivo

#### 7.2.3. Exportação via Script

```python
# Exportar dados de telemetria
simulator.export_telemetry(
    vehicles=["sim-vehicle-001", "sim-vehicle-002"],
    start_time=simulator.time - 3600,  # última hora
    end_time=simulator.time,
    data_points=["speed", "acceleration", "seatbelt", "location"],
    format="csv",
    output_path="./data/telemetry_export.csv"
)

# Exportar eventos de segurança
simulator.export_events(
    event_types=["seatbelt_violation", "harsh_braking", "speeding"],
    start_time=simulator.time - 86400,  # último dia
    end_time=simulator.time,
    format="json",
    output_path="./data/events_export.json"
)
```

### 7.3. Relatórios Automáticos

O simulador pode gerar relatórios automáticos após a simulação:

#### 7.3.1. Configuração de Relatórios

```python
# Configurar geração de relatório
simulator.configure_report(
    title="Relatório de Simulação de Frota",
    sections=[
        "summary",              # resumo geral
        "safety_violations",    # violações de segurança
        "vehicle_performance",  # desempenho dos veículos
        "certification_status", # status de certificação
        "token_generation"      # geração de tokens ESG
    ],
    format="pdf",               # pdf, html, docx
    output_path="./reports/fleet_simulation_report.pdf"
)

# Executar simulação
simulator.run_scenario("urban_fleet_test")

# Gerar relatório
simulator.generate_report()
```

#### 7.3.2. Exemplo de Relatório

Um relatório típico inclui:

- **Resumo Executivo**: Visão geral da simulação
- **Métricas de Segurança**: Estatísticas de eventos e violações
- **Análise por Veículo**: Desempenho individual de cada veículo
- **Certificação Blockchain**: Status e histórico de certificados
- **Tokenização ESG**: Tokens gerados e valor estimado
- **Recomendações**: Sugestões baseadas nos resultados da simulação

## 8. Casos de Uso Avançados

### 8.1. Treinamento de Modelos de IA

O simulador pode ser usado para gerar dados para treinamento de modelos de IA:

```python
from guarddrive_simulator import Simulator, DataGenerator
import pandas as pd

# Inicializar simulador
simulator = Simulator()

# Configurar gerador de dados para treinamento de IA
data_generator = DataGenerator(
    scenario_templates=["urban", "highway", "residential"],
    vehicle_count=100,
    duration_hours=24,
    event_distribution={
        "seatbelt_violation": 0.3,
        "harsh_braking": 0.2,
        "speeding": 0.4,
        "sharp_turn": 0.1
    },
    noise_level=0.05  # adicionar ruído realista
)

# Gerar conjunto de dados
training_data = data_generator.generate()

# Exportar para treinamento
training_data.to_csv("./data/ai_training_dataset.csv")

# Visualizar estatísticas
print(f"Registros gerados: {len(training_data)}")
print(f"Distribuição de eventos:\n{training_data['event_type'].value_counts()}")
```

### 8.2. Testes de Carga e Performance

O simulador permite testar a capacidade do sistema GuardDrive FleetShield sob carga:

```python
from guarddrive_simulator import Simulator, LoadTest
from guarddrive_fleetshield import GuardDriveSDK

# Inicializar SDK
sdk = GuardDriveSDK(
    api_key="YOUR_API_KEY",
    environment="sandbox",
    organization_id="YOUR_ORGANIZATION_ID"
)

# Configurar teste de carga
load_test = LoadTest(
    simulator=Simulator(),
    guarddrive_sdk=sdk,
    vehicle_count_steps=[10, 50, 100, 500, 1000],  # incremento gradual
    duration_per_step=600,  # segundos por etapa
    data_frequency=1,       # Hz
    event_frequency=0.01    # eventos por veículo por segundo
)

# Executar teste de carga
results = load_test.run()

# Analisar resultados
print("Resultados do Teste de Carga:")
for step in results:
    print(f"Veículos: {step['vehicle_count']}")
    print(f"  Latência média: {step['avg_latency']}ms")
    print(f"  Taxa de erros: {step['error_rate']}%")
    print(f"  Throughput: {step['throughput']} eventos/s")
```

### 8.3. Demonstrações Interativas

O simulador pode ser usado para criar demonstrações interativas para clientes e parceiros:

```python
from guarddrive_simulator import Simulator, DemoScenario

# Criar cenário de demonstração
demo = DemoScenario(
    title="GuardDrive FleetShield - Demonstração de Segurança",
    duration_minutes=15,
    interactive=True
)

# Adicionar etapas da demonstração
demo.add_step(
    title="Introdução ao Ambiente Urbano",
    duration=120,  # segundos
    camera_position="overview",
    narration="Visualização da frota operando em ambiente urbano com tráfego moderado."
)

demo.add_step(
    title="Detecção de Violação de Segurança",
    duration=180,
    camera_position="follow_vehicle",
    target_vehicle="demo-vehicle-1",
    events=[
        {"type": "seatbelt_violation", "time": 30, "duration": 60},
        {"type": "harsh_braking", "time": 120, "duration": 3}
    ],
    narration="Observação de eventos de segurança sendo detectados e registrados em tempo real."
)

demo.add_step(
    title="Certificação Blockchain",
    duration=240,
    camera_position="dashboard",
    focus_element="blockchain_panel",
    narration="Visualização do processo de certificação na blockchain e geração de tokens ESG."
)

# Executar demonstração
simulator = Simulator()
simulator.load_demo(demo)
simulator.start_demo()
```

## 9. Troubleshooting

### 9.1. Problemas Comuns e Soluções

#### 9.1.1. Desempenho Baixo

**Problema**: O simulador está lento ou com baixo FPS.

**Possíveis Causas e Soluções**:

- **Hardware insuficiente**: Reduza a qualidade gráfica em `config.yaml`
- **Muitos veículos**: Diminua o número de veículos simulados
- **Vazamento de memória**: Reinicie o simulador após longas sessões
- **Processos em segundo plano**: Feche aplicações que consomem muitos recursos

#### 9.1.2. Falha na Integração com SDK

**Problema**: Erros ao integrar com o SDK GuardDrive FleetShield.

**Possíveis Causas e Soluções**:

- **Credenciais inválidas**: Verifique API key e organization ID
- **Ambiente incorreto**: Confirme se está usando o ambiente correto (sandbox/production)
- **Versões incompatíveis**: Atualize o simulador e o SDK para as versões mais recentes
- **Problemas de rede**: Verifique sua conexão com a internet e firewall

#### 9.1.3. Comportamento Inesperado de Veículos

**Problema**: Veículos se comportando de forma estranha ou irrealista.

**Possíveis Causas e Soluções**:

- **Configurações de física**: Ajuste parâmetros de física no arquivo de configuração
- **Colisões**: Ative detecção de colisão mais precisa (aumenta uso de CPU)
- **Malha viária inconsistente**: Verifique e repare a malha viária no editor
- **Comportamentos conflitantes**: Remova eventos programados que possam estar em conflito

### 9.2. Logs e Diagnóstico

O simulador mantém logs detalhados que podem ajudar a diagnosticar problemas:

#### 9.2.1. Níveis de Log

Configure o nível de log em `config.yaml`:

```yaml
general:
  log_level: debug # error, warn, info, debug, trace
  log_file: ./logs/simulator.log
```

#### 9.2.2. Visualização de Logs

Via Interface Gráfica:

1. Clique em "Ferramentas" > "Console de Logs"
2. Selecione o nível de log desejado
3. Filtre por categoria ou texto

Via Linha de Comando:

```bash
# Visualizar logs em tempo real
tail -f ./logs/simulator.log

# Filtrar logs por categoria
grep "PHYSICS" ./logs/simulator.log

# Encontrar erros
grep "ERROR" ./logs/simulator.log
```

#### 9.2.3. Diagnóstico Avançado

O simulador inclui ferramentas de diagnóstico avançado:

```python
# Executar diagnóstico completo
simulator.run_diagnostics()

# Verificar consistência da simulação
simulator.check_simulation_integrity()

# Gerar relatório de performance
simulator.generate_performance_report("./reports/performance.json")
```

### 9.3. Suporte

Se você encontrar problemas que não consegue resolver:

- **Portal de Desenvolvedores**: https://developers.guarddrive.com/simulator
- **Documentação Completa**: https://docs.guarddrive.com/simulator
- **Fórum da Comunidade**: https://community.guarddrive.com/simulator
- **Email de Suporte**: simulator-support@guarddrive.com
- **GitHub Issues**: https://github.com/guarddrive/fleetshield-simulator/issues

## 10. Referências

- [Documentação Completa do Simulador GuardDrive FleetShield](https://docs.guarddrive.com/simulator)
- [SDK GuardDrive FleetShield](https://docs.guarddrive.com/sdk)
- [API de Simulação](https://docs.guarddrive.com/simulator/api)
- [Guia de Scripting](https://docs.guarddrive.com/simulator/scripting)
- [Biblioteca de Cenários](https://docs.guarddrive.com/simulator/scenarios)
- [Fórum da Comunidade](https://community.guarddrive.com/simulator)

---

_Este documento é parte da documentação oficial do Simulador GuardDrive FleetShield v1.0._
