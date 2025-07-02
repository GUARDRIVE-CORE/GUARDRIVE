# Figura 5: Cenários de Implementação

```
+-----------------------------------+   +-----------------------------------+
|                                   |   |                                   |
|     VEÍCULO DE PASSEIO (5.1)      |   |     VEÍCULO COMERCIAL (5.2)       |
|                                   |   |                                   |
|  +---------------------------+    |   |  +---------------------------+    |
|  |                           |    |   |  |                           |    |
|  |      [Vista Lateral]      |    |   |  |      [Vista Lateral]      |    |
|  |                           |    |   |  |                           |    |
|  |  +-+              +-+     |    |   |  |  +-+              +-+     |    |
|  |  | |              | |     |    |   |  |  | |              | |     |    |
|  |  +-+              +-+     |    |   |  |  +-+              +-+     |    |
|  |   ^                ^      |    |   |  |   ^                ^      |    |
|  |   |                |      |    |   |  |   |                |      |    |
|  |  (1)              (3)     |    |   |  |  (1)              (3)     |    |
|  |                           |    |   |  |                           |    |
|  +---------------------------+    |   |  +---------------------------+    |
|                                   |   |                                   |
|  • Instalação compacta            |   |  • Instalação robusta            |
|  • Integração com cinto padrão    |   |  • Múltiplos pontos de           |
|  • Verificação individual         |   |    monitoramento                 |
|  • Perfil de consumidor           |   |  • Integração com tacógrafo      |
|                                   |   |  • Perfil de frota               |
+-----------------------------------+   +-----------------------------------+

+-----------------------------------+   +-----------------------------------+
|                                   |   |                                   |
|     TRANSPORTE PÚBLICO (5.3)      |   |     VERSÕES DO SISTEMA (5.4)      |
|                                   |   |                                   |
|  +---------------------------+    |   |  +---------------------------+    |
|  |                           |    |   |  |                           |    |
|  |      [Vista Superior]     |    |   |  |      [Comparativo]        |    |
|  |                           |    |   |  |                           |    |
|  |  (1)(1)(1)    (1)(1)(1)  |    |   |  |  RETROFIT    vs    OEM     |    |
|  |                           |    |   |  |  +------+        +------+ |    |
|  |  (1)(1)(1)    (1)(1)(1)  |    |   |  |  |      |        |      | |    |
|  |                           |    |   |  |  +------+        +------+ |    |
|  |  (3)                      |    |   |  |                           |    |
|  |                           |    |   |  |  • Adaptável   • Integrado|    |
|  +---------------------------+    |   |  |  • Universal   • Otimizado|    |
|                                   |   |  |  • Pós-venda   • Fábrica  |    |
|  • Monitoramento múltiplo         |   |  |                           |    |
|  • Verificação centralizada       |   |  +---------------------------+    |
|  • Integração com bilhetagem      |   |                                   |
|  • Perfil de operadora            |   |  • Mesma funcionalidade core      |
|                                   |   |  • Diferentes implementações      |
+-----------------------------------+   +-----------------------------------+
```

## Descrição Técnica

A Figura 5 ilustra diferentes cenários de implementação do sistema GuardDrive FleetShield, demonstrando sua versatilidade e adaptabilidade para diversos tipos de veículos e configurações. Cada cenário apresenta características específicas de instalação, integração e funcionalidades.

### 5.1. Veículo de Passeio
- **Configuração**: Instalação compacta e discreta, integrada ao cinto de segurança padrão do veículo
- **Componentes**: Módulo sensor (1) instalado no mecanismo do cinto, dispositivo visual externo (3) posicionado no para-brisa ou janela lateral para visibilidade externa
- **Características**:
  - Design minimalista para não interferir na estética do veículo
  - Foco em verificação individual (por ocupante)
  - Otimizado para perfil de consumidor individual
  - Possibilidade de integração com sistemas de infoentretenimento existentes
  - Baixo consumo energético, podendo operar com bateria própria de longa duração

### 5.2. Veículo Comercial
- **Configuração**: Instalação robusta para ambiente de uso intensivo, com múltiplos pontos de monitoramento
- **Componentes**: Módulos sensores (1) em todos os cintos e dispositivos de segurança, dispositivo visual externo (3) em posição de alta visibilidade
- **Características**:
  - Design reforçado para resistir a condições severas de operação
  - Integração com tacógrafo e sistemas de gestão de frota
  - Monitoramento de múltiplos dispositivos de segurança (cinto, EPI específicos)
  - Otimizado para perfil de frota comercial
  - Alimentação integrada ao sistema elétrico do veículo

### 5.3. Transporte Público
- **Configuração**: Sistema escalável para monitoramento de múltiplos assentos, com verificação centralizada
- **Componentes**: Módulos sensores (1) em cada assento/posição, dispositivo visual externo (3) centralizado na entrada do veículo
- **Características**:
  - Monitoramento simultâneo de múltiplos dispositivos de segurança
  - Verificação centralizada para facilitar fiscalização
  - Integração com sistemas de bilhetagem e controle de acesso
  - Otimizado para operadoras de transporte público
  - Dashboard para motorista/cobrador com status de todos os assentos

### 5.4. Versões do Sistema
- **Retrofit**: Versão adaptável para instalação em veículos existentes
  - Universal: compatível com diferentes marcas e modelos
  - Instalação não invasiva, sem modificações estruturais no veículo
  - Distribuição via rede de pós-venda, oficinas e concessionárias
  - Alimentação independente ou conexão ao sistema elétrico existente

- **OEM (Original Equipment Manufacturer)**: Versão integrada para instalação de fábrica
  - Integração profunda com sistemas eletrônicos do veículo
  - Design otimizado para cada modelo específico
  - Instalação durante a fabricação do veículo
  - Compartilhamento de recursos com outros sistemas do veículo

Ambas as versões (Retrofit e OEM) mantêm a mesma funcionalidade core e compatibilidade com o ecossistema GuardDrive FleetShield, diferindo apenas na implementação física e nível de integração com o veículo.

O sistema é projetado com arquitetura modular que permite adaptação a diferentes cenários de uso, tipos de veículos e requisitos específicos, mantendo a integridade das funcionalidades essenciais de monitoramento, verificação externa e registro blockchain.

*Nota: Este diagrama representa configurações conceituais do sistema. A implementação específica pode variar conforme o tipo de veículo, requisitos regulatórios e preferências do cliente.*
