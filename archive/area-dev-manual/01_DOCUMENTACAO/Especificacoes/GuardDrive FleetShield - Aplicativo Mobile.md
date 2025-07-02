# GuardDrive FleetShield - Aplicativo Mobile

Aplicativo móvel oficial do GuardDrive FleetShield para monitoramento de frotas, gestão ESG e tokenização de créditos de carbono.

## 🚀 Visão Geral

O aplicativo móvel GuardDrive oferece uma interface intuitiva e poderosa para gestores de frota monitorarem seus veículos em tempo real, acompanharem métricas ESG e gerenciarem tokens de créditos de carbono.

### Características Principais

- **Monitoramento em Tempo Real**: Acompanhe a localização e status de todos os veículos
- **Dashboard ESG**: Visualize métricas de sustentabilidade e impacto ambiental
- **Carteira de Tokens**: Gerencie créditos de carbono tokenizados
- **Alertas Inteligentes**: Notificações proativas sobre eventos importantes
- **Relatórios Detalhados**: Análises completas de performance e conformidade
- **Interface Responsiva**: Design otimizado para smartphones e tablets

## 🛠️ Tecnologias Utilizadas

### Framework e Bibliotecas

- **React Native 0.72**: Framework principal
- **React Navigation 6**: Navegação entre telas
- **React Query**: Gerenciamento de estado e cache
- **Zustand**: Estado global simplificado
- **React Hook Form**: Formulários performáticos
- **Yup**: Validação de esquemas

### UI/UX

- **React Native Vector Icons**: Ícones consistentes
- **React Native Linear Gradient**: Gradientes suaves
- **React Native Chart Kit**: Gráficos e visualizações
- **React Native Modal**: Modais customizados
- **React Native Shimmer**: Loading states elegantes

### Funcionalidades Nativas

- **React Native Maps**: Mapas e geolocalização
- **React Native Camera**: Scanner QR e captura
- **React Native Biometrics**: Autenticação biométrica
- **React Native Push Notification**: Notificações push
- **React Native Bluetooth**: Conectividade IoT

### Desenvolvimento

- **TypeScript**: Tipagem estática (configuração futura)
- **ESLint**: Linting de código
- **Prettier**: Formatação automática
- **Flipper**: Debug e desenvolvimento

## 📁 Estrutura do Projeto

```
mobile-app/
├── android/                 # Configurações Android
├── ios/                     # Configurações iOS
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   └── ...
│   ├── screens/             # Telas da aplicação
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── FleetScreen.js
│   │   └── ...
│   ├── navigation/          # Configuração de navegação
│   ├── services/            # APIs e serviços
│   ├── utils/               # Utilitários e helpers
│   └── styles/              # Temas e estilos
│       └── theme.js
├── App.js                   # Componente raiz
├── package.json
└── README.md
```

## 🎨 Design System

### Paleta de Cores

- **Primária**: #1E3A8A (Azul Profundo)
- **Secundária**: #10B981 (Verde ESG)
- **Accent**: #F59E0B (Âmbar/Alerta)
- **Sucesso**: #22C55E
- **Erro**: #EF4444
- **Neutros**: Escala de cinzas

### Tipografia

- **Fonte**: Inter (sistema)
- **Pesos**: Regular, Medium, SemiBold, Bold, ExtraBold
- **Tamanhos**: 12px a 48px (escala responsiva)

### Componentes

- **Botões**: 3 tamanhos, 5 variantes
- **Cards**: Múltiplas variações com sombras
- **Inputs**: Estados focado, erro, desabilitado
- **Navegação**: Tab bar e stack navigation

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 16+
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS, apenas macOS)
- JDK 11+

### Configuração do Ambiente

#### Android

```bash
# Instalar Android Studio
# Configurar ANDROID_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### iOS (macOS apenas)

```bash
# Instalar Xcode via App Store
# Instalar CocoaPods
sudo gem install cocoapods
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/guarddrive/mobile-app.git

# Entre no diretório
cd mobile-app

# Instale as dependências
npm install

# Para iOS, instale os pods
cd ios && pod install && cd ..
```

### Execução

#### Android

```bash
# Inicie o Metro bundler
npm start

# Em outro terminal, execute no Android
npm run android

# Ou execute diretamente
npx react-native run-android
```

#### iOS

```bash
# Inicie o Metro bundler
npm start

# Em outro terminal, execute no iOS
npm run ios

# Ou execute diretamente
npx react-native run-ios
```

### Build para Produção

#### Android

```bash
# Gerar APK de release
npm run build:android

# O APK estará em android/app/build/outputs/apk/release/
```

#### iOS

```bash
# Gerar arquivo para App Store
npm run build:ios

# Ou use Xcode para archive e upload
```

## 📱 Funcionalidades Principais

### 1. Autenticação

- Login com email/senha
- Autenticação biométrica (Touch ID/Face ID)
- Recuperação de senha
- Logout seguro

### 2. Dashboard

- Visão geral da frota
- Métricas ESG em tempo real
- Gráficos de performance
- Ações rápidas

### 3. Monitoramento de Frota

- Lista de veículos
- Status em tempo real
- Localização no mapa
- Histórico de viagens

### 4. Gestão ESG

- Métricas de sustentabilidade
- Cálculo de CO₂ evitado
- Score ESG
- Relatórios de conformidade

### 5. Carteira de Tokens

- Saldo de tokens ESG
- Histórico de transações
- Marketplace de créditos
- Conversão de valores

### 6. Alertas e Notificações

- Alertas de segurança
- Notificações de manutenção
- Updates de conformidade
- Lembretes personalizados

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
API_BASE_URL=https://api.guarddrive.com
MAPS_API_KEY=your_google_maps_key
PUSH_NOTIFICATION_KEY=your_fcm_key
SENTRY_DSN=your_sentry_dsn
```

### Configuração de Push Notifications

```javascript
// android/app/src/main/res/values/strings.xml
<string name="app_name">GuardDrive</string>
<string name="fcm_default_notification_channel_id">guarddrive_channel</string>

// ios/GuardDrive/Info.plist
<key>UIBackgroundModes</key>
<array>
    <string>remote-notification</string>
</array>
```

### Permissões

#### Android (android/app/src/main/AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

#### iOS (ios/GuardDrive/Info.plist)

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>Este app precisa de acesso à localização para monitorar a frota</string>
<key>NSCameraUsageDescription</key>
<string>Este app precisa de acesso à câmera para escanear QR codes</string>
<key>NSBluetoothAlwaysUsageDescription</key>
<string>Este app precisa de Bluetooth para conectar com dispositivos IoT</string>
```

## 📊 Performance e Otimização

### Métricas de Performance

- **Tempo de inicialização**: < 3s
- **Navegação entre telas**: < 500ms
- **Carregamento de dados**: < 2s
- **Uso de memória**: < 150MB

### Otimizações Implementadas

- **Lazy Loading**: Componentes carregados sob demanda
- **Image Caching**: Cache inteligente de imagens
- **Data Caching**: React Query para cache de dados
- **Bundle Splitting**: Separação de código por funcionalidade

## 🔒 Segurança

### Medidas de Segurança

- **Criptografia**: Dados sensíveis criptografados
- **Keychain/Keystore**: Armazenamento seguro de tokens
- **Certificate Pinning**: Validação de certificados SSL
- **Biometric Auth**: Autenticação biométrica opcional
- **Session Management**: Gerenciamento seguro de sessões

### Compliance

- **LGPD**: Conformidade com lei de proteção de dados
- **GDPR**: Compliance europeu
- **SOC 2**: Padrões de segurança empresarial

## 🧪 Testes

### Tipos de Teste

```bash
# Testes unitários
npm test

# Testes de integração
npm run test:integration

# Testes E2E (Detox)
npm run test:e2e

# Coverage
npm run test:coverage
```

### Ferramentas de Teste

- **Jest**: Framework de testes
- **React Native Testing Library**: Testes de componentes
- **Detox**: Testes end-to-end
- **Flipper**: Debug e inspeção

## 📈 Analytics e Monitoramento

### Ferramentas Integradas

- **Firebase Analytics**: Métricas de uso
- **Crashlytics**: Relatórios de crash
- **Sentry**: Monitoramento de erros
- **Performance Monitoring**: Métricas de performance

### Métricas Coletadas

- Tempo de uso por tela
- Jornadas de usuário
- Crashes e erros
- Performance de rede

## 🚀 Deploy e Distribuição

### App Store (iOS)

```bash
# Build para App Store
xcodebuild -workspace ios/GuardDrive.xcworkspace \
           -scheme GuardDrive \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath GuardDrive.xcarchive \
           archive
```

### Google Play Store (Android)

```bash
# Gerar AAB para Play Store
cd android
./gradlew bundleRelease
```

### Distribuição Beta

- **TestFlight** (iOS): Distribuição beta para iOS
- **Firebase App Distribution**: Distribuição multiplataforma
- **Internal Testing**: Testes internos da equipe

## 🤝 Contribuição

### Padrões de Código

- Use ESLint e Prettier
- Siga convenções de nomenclatura React Native
- Documente componentes complexos
- Escreva testes para novas funcionalidades

### Fluxo de Desenvolvimento

1. Fork o repositório
2. Crie uma branch para sua feature
3. Desenvolva e teste localmente
4. Execute testes automatizados
5. Faça commit seguindo conventional commits
6. Abra um Pull Request

### Code Review

- Todas as mudanças passam por code review
- Testes automatizados devem passar
- Performance deve ser mantida
- Documentação deve ser atualizada

## 📞 Suporte

### Canais de Suporte

- **Email**: mobile@guarddrive.com
- **Documentação**: [docs.guarddrive.com/mobile](https://docs.guarddrive.com/mobile)
- **Issues**: [GitHub Issues](https://github.com/guarddrive/mobile-app/issues)
- **Discord**: [Comunidade GuardDrive](https://discord.gg/guarddrive)

### FAQ

**P: O app funciona offline?**
R: Sim, funcionalidades básicas funcionam offline com sincronização automática.

**P: Como reportar bugs?**
R: Use o GitHub Issues ou o sistema de feedback integrado no app.

**P: Há suporte para tablets?**
R: Sim, o app é otimizado para smartphones e tablets.

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🗺️ Roadmap

### Versão 1.1 (Q2 2024)

- [ ] Modo offline completo
- [ ] Widget para tela inicial
- [ ] Integração com Apple CarPlay/Android Auto
- [ ] Relatórios personalizáveis

### Versão 1.2 (Q3 2024)

- [ ] Realidade aumentada para manutenção
- [ ] IA preditiva para manutenção
- [ ] Integração com assistentes de voz
- [ ] Marketplace de peças

### Versão 2.0 (Q4 2024)

- [ ] Plataforma multi-tenant
- [ ] API pública para integrações
- [ ] Dashboard web sincronizado
- [ ] Blockchain nativa

---

**GuardDrive Mobile Team** - Revolucionando a gestão de frotas na palma da sua mão.
