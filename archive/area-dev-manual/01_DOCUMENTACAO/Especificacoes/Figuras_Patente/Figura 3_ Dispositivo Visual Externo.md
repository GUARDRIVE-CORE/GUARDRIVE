# Figura 3: Dispositivo Visual Externo

```
                           DISPOSITIVO VISUAL EXTERNO (3)
                          +---------------------------+
                          |                           |
                          |     INVÓLUCRO IP67+       |
                          |         (3.4)             |
                          |                           |
                          +---------------------------+
                                      |
                   +------------------+------------------+
                   |                  |                  |
        +----------v----------+  +----v----+  +---------v---------+
        |                     |  |         |  |                   |
        |   DISPLAY QR        |  |  LEDs   |  |  DISPLAY E-INK    |
        |   DINÂMICO (3.1)    |  |  RGB    |  |  (OPCIONAL) (3.3) |
        |                     |  |  (3.2)  |  |                   |
        |  +---------------+  |  |         |  |                   |
        |  |               |  |  | VERDE   |  |                   |
        |  |    CÓDIGO     |  |  | AMARELO |  |  INFORMAÇÕES      |
        |  |      QR       |  |  | VERMELHO|  |  ADICIONAIS       |
        |  |               |  |  |         |  |                   |
        |  +---------------+  |  |         |  |                   |
        |                     |  |         |  |                   |
        +---------------------+  +---------+  +-------------------+
                   |                  |                  |
                   |                  |                  |
                   v                  v                  v
        +---------------------+  +---------+  +-------------------+
        |                     |  |         |  |                   |
        |  SISTEMA ANTI-      |  |ELEMENTOS|  |  CONTROLADOR      |
        |  FALSIFICAÇÃO (3.5) |  |   DE    |  |  ELETRÔNICO       |
        |                     |  |FIXAÇÃO  |  |     (3.7)         |
        |  - Hologramas       |  |SEGUROS  |  |                   |
        |  - Microtextos      |  |  (3.6)  |  | - Atualização QR  |
        |  - Tintas especiais |  |         |  | - Controle LEDs   |
        |  - Assinaturas      |  |         |  | - Comunicação     |
        |    digitais         |  |         |  |                   |
        |                     |  |         |  |                   |
        +---------------------+  +---------+  +-------------------+
                                      |
                                      v
                          +---------------------------+
                          |                           |
                          |   POSICIONAMENTO NO       |
                          |   VEÍCULO (3.8)           |
                          |                           |
                          | - Visibilidade externa    |
                          | - Proteção contra         |
                          |   intempéries             |
                          | - Acesso para inspeção    |
                          |                           |
                          +---------------------------+
```

## Descrição Técnica

A Figura 3 ilustra o Dispositivo Visual Externo (3), componente que permite a verificação instantânea do status do dispositivo de segurança por autoridades, gestores de frota e outros agentes autorizados, sem necessidade de acesso ao interior do veículo.

O dispositivo compreende os seguintes componentes principais:

3.1. **Display QR Dinâmico**: Exibe um código QR que é atualizado periodicamente (intervalo configurável entre 15 segundos e 5 minutos), contendo informações criptografadas sobre o status atual do dispositivo de segurança (correto, incorreto, não utilizado), timestamp, identificador único do dispositivo, dados contextuais relevantes e assinatura digital para verificação de autenticidade. Utiliza tecnologia de display de alta visibilidade em diferentes condições de iluminação.

3.2. **Indicadores LED RGB**: Mostram o status visualmente através de cores configuráveis:

- Verde: uso correto do dispositivo de segurança
- Amarelo: uso detectado mas potencialmente incorreto
- Vermelho: não uso ou uso incorreto do dispositivo
  Os LEDs possuem alta luminosidade e são visíveis mesmo sob luz solar direta, com padrões de iluminação que podem indicar diferentes estados e níveis de conformidade.

3.3. **Display e-ink** (opcional): Para exibição de informações adicionais com baixo consumo de energia, visíveis mesmo sob luz solar direta. Pode mostrar informações como status textual, identificação do veículo ou instruções para verificação.

3.4. **Invólucro Resistente**: Protege os componentes contra condições climáticas adversas e tentativas de adulteração, com classificação IP67 ou superior, resistente a impactos e radiação UV. Fabricado com materiais compostos de alta durabilidade e resistência a vandalismo.

3.5. **Sistema Anti-falsificação**: Inclui elementos físicos (hologramas, microtextos, tintas especiais) e digitais (assinaturas criptográficas, códigos de autenticação) que dificultam a criação de réplicas ou simulações do dispositivo. Os elementos são projetados para serem verificáveis tanto visualmente quanto digitalmente.

3.6. **Elementos de Fixação Seguros**: Mecanismos que dificultam a remoção não autorizada do dispositivo, com evidências visíveis em caso de tentativa de adulteração. Incluem parafusos especiais, lacres e sistemas de detecção de abertura.

3.7. **Controlador Eletrônico**: Gerencia a atualização do código QR, controla os LEDs e mantém comunicação com o Microcontrolador Seguro (2). Implementa protocolos de segurança para prevenir manipulação ou falsificação dos dados exibidos.

3.8. **Posicionamento no Veículo**: O dispositivo é projetado para ser instalado em posição estratégica no veículo, garantindo:

- Visibilidade externa para verificação por câmeras e agentes
- Proteção contra intempéries e vandalismo
- Acesso para inspeção e manutenção quando necessário
- Integração estética com o design do veículo

O Dispositivo Visual Externo é projetado para ser facilmente visível de fora do veículo, permitindo verificação rápida por câmeras de fiscalização, agentes de trânsito ou sistemas automatizados, com visibilidade em diferentes condições de iluminação e ângulos de visualização. Sua arquitetura modular permite adaptações para diferentes tipos de veículos e requisitos específicos de visibilidade.

_Nota: Este diagrama representa a arquitetura conceitual do dispositivo visual externo. A implementação física específica pode variar conforme o tipo de veículo e cenário de aplicação._
