# Figura 6: Interface de Verificação

```
+-----------------------------------+   +-----------------------------------+
|                                   |   |                                   |
|     DISPOSITIVO DE VERIFICAÇÃO    |   |     TELA DE VERIFICAÇÃO           |
|            (6.1)                  |   |            (6.2)                  |
|                                   |   |                                   |
|  +---------------------------+    |   |  +---------------------------+    |
|  |                           |    |   |  |                           |    |
|  |      [Smartphone/Tablet]  |    |   |  |    GuardDrive Verify      |    |
|  |                           |    |   |  |                           |    |
|  |  +-----------------+      |    |   |  |  Status: VERIFICADO       |    |
|  |  |                 |      |    |   |  |  Veículo: XYZ-1234        |    |
|  |  |  [Câmera ativa] |      |    |   |  |  Timestamp: 15:30:22      |    |
|  |  |                 |      |    |   |  |  Dispositivo: CORRETO     |    |
|  |  |                 |      |    |   |  |                           |    |
|  |  +-----------------+      |    |   |  |  [Detalhes adicionais]    |    |
|  |                           |    |   |  |                           |    |
|  +---------------------------+    |   |  +---------------------------+    |
|                                   |   |                                   |
+-----------------------------------+   +-----------------------------------+

+-----------------------------------+   +-----------------------------------+
|                                   |   |                                   |
|     PROCESSO DE VERIFICAÇÃO       |   |     NÍVEIS DE AUTORIZAÇÃO         |
|            (6.3)                  |   |            (6.4)                  |
|                                   |   |                                   |
|  +---------------------------+    |   |  +---------------------------+    |
|  |                           |    |   |  |                           |    |
|  |  1. Escanear QR           |    |   |  |  AUTORIDADE               |    |
|  |     |                     |    |   |  |  • Dados completos        |    |
|  |     v                     |    |   |  |  • Histórico              |    |
|  |  2. Verificar assinatura  |    |   |  |  • Ações administrativas  |    |
|  |     |                     |    |   |  |                           |    |
|  |     v                     |    |   |  |  GESTOR DE FROTA          |    |
|  |  3. Decodificar dados     |    |   |  |  • Status da frota        |    |
|  |     |                     |    |   |  |  • Alertas                |    |
|  |     v                     |    |   |  |  • Relatórios             |    |
|  |  4. Exibir resultado      |    |   |  |                           |    |
|  |                           |    |   |  |  PÚBLICO                  |    |
|  +---------------------------+    |   |  |  • Verificação básica      |    |
|                                   |   |  |  • Sem dados sensíveis     |    |
+-----------------------------------+   +-----------------------------------+
```

## Descrição Técnica

A Figura 6 apresenta a interface de verificação para autoridades, gestores de frota e outros agentes autorizados, ilustrando o processo de verificação externa do status do dispositivo de segurança veicular.

### 6.1. Dispositivo de Verificação
- **Hardware**: Smartphone, tablet ou dispositivo dedicado com câmera e capacidade de processamento
- **Requisitos**:
  - Câmera com resolução mínima de 5MP para leitura confiável do código QR
  - Conectividade (Wi-Fi, celular) para verificação online quando necessário
  - Capacidade de processamento criptográfico para verificação offline
  - Armazenamento seguro para chaves de verificação
- **Características**:
  - Portabilidade para uso em campo por agentes de fiscalização
  - Interface intuitiva otimizada para uso rápido
  - Resistência para uso em condições adversas (opcional para dispositivos dedicados)
  - Compatibilidade com múltiplas plataformas (iOS, Android, Windows)

### 6.2. Tela de Verificação
- **Elementos da Interface**:
  - Status de verificação: indicação clara e visível (Verificado, Inválido, Expirado)
  - Identificação do veículo: placa ou outro identificador único
  - Timestamp da verificação: data e hora precisas da leitura
  - Status do dispositivo de segurança: Correto, Incorreto, Não utilizado
  - Detalhes adicionais: informações específicas conforme nível de autorização
- **Características**:
  - Design de alta visibilidade, legível em condições de luz variáveis
  - Código de cores intuitivo (verde, amarelo, vermelho)
  - Informações hierarquizadas por relevância
  - Opções para visualização detalhada ou resumida

### 6.3. Processo de Verificação
- **Etapas**:
  1. **Escanear código QR**: Captura do código QR dinâmico exibido no dispositivo visual externo
  2. **Verificar assinatura digital**: Validação criptográfica da autenticidade dos dados
  3. **Decodificar dados**: Extração e interpretação das informações contidas no código
  4. **Exibir resultado**: Apresentação clara do status e informações relevantes
- **Características**:
  - Processo rápido (menos de 3 segundos em condições normais)
  - Verificação offline possível para dados básicos
  - Verificação online para dados históricos e detalhados
  - Registro de verificação (opcional, conforme configuração)

### 6.4. Níveis de Autorização
- **Autoridade (Agentes de fiscalização, órgãos reguladores)**:
  - Acesso a dados completos do dispositivo e veículo
  - Visualização de histórico de conformidade
  - Capacidade de emitir notificações e registrar infrações
  - Acesso a relatórios detalhados de conformidade
- **Gestor de Frota**:
  - Visualização do status de toda a frota
  - Alertas de não conformidade
  - Relatórios de desempenho e tendências
  - Dados para gestão de segurança e manutenção
- **Público (Verificação básica)**:
  - Confirmação simples de autenticidade do dispositivo
  - Status atual básico (sem dados sensíveis)
  - Verificação de validade da certificação
  - Informações educativas sobre segurança

A interface de verificação é projetada para ser intuitiva e eficiente, permitindo verificação rápida em campo ou remotamente. O sistema de autorização em camadas garante que apenas informações apropriadas sejam disponibilizadas para cada tipo de usuário, protegendo dados sensíveis enquanto permite verificação transparente do status de conformidade.

*Nota: Este diagrama representa a interface conceitual de verificação. A implementação específica pode variar conforme requisitos regulatórios, plataforma de dispositivo e preferências do usuário.*
