# GuardDrive FleetShield - Landing Page

Landing page oficial do GuardDrive FleetShield, uma plataforma revolucionária de monitoramento veicular com tecnologia blockchain, inteligência artificial e certificação ESG.

## 🚀 Visão Geral

Esta landing page foi desenvolvida para apresentar o GuardDrive FleetShield de forma profissional e convincente, destacando seus benefícios, funcionalidades e casos de uso para diferentes públicos-alvo.

### Características Principais

- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **Performance Otimizada**: Carregamento rápido e experiência fluida
- **SEO Avançado**: Meta tags, structured data e otimizações para motores de busca
- **Animações Suaves**: Micro-interações e animações com Framer Motion
- **Acessibilidade**: Seguindo padrões WCAG para inclusão digital
- **PWA Ready**: Preparado para funcionar como Progressive Web App

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18**: Biblioteca principal para interface
- **Styled Components**: CSS-in-JS para estilização
- **Framer Motion**: Animações e transições
- **React Router**: Navegação entre páginas
- **React Helmet**: Gerenciamento de meta tags
- **React Icons**: Biblioteca de ícones

### Ferramentas de Desenvolvimento

- **React Scripts**: Configuração e build
- **ESLint**: Linting de código
- **Prettier**: Formatação de código

## 📁 Estrutura do Projeto

```
web-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── HeroSection.js
│   │   ├── BenefitsSection.js
│   │   ├── HowItWorksSection.js
│   │   ├── UseCasesSection.js
│   │   ├── ContactSection.js
│   │   └── Footer.js
│   ├── pages/
│   │   └── LandingPage.js
│   ├── styles/
│   │   └── GlobalStyles.js
│   ├── App.js
│   └── index.js
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
- **Neutros**: Escala de cinzas de #F8FAFC a #0F172A

### Tipografia

- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

### Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/guarddrive/web-app.git

# Entre no diretório
cd web-app

# Instale as dependências
npm install
```

### Execução em Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm start

# A aplicação estará disponível em http://localhost:3000
```

### Build para Produção

```bash
# Gere o build otimizado
npm run build

# Os arquivos estarão na pasta build/
```

### Testes

```bash
# Execute os testes
npm test

# Execute os testes com coverage
npm run test:coverage
```

### Linting e Formatação

```bash
# Execute o linting
npm run lint

# Formate o código
npm run format
```

## 📱 Seções da Landing Page

### 1. Header

- Logo e navegação principal
- Menu mobile responsivo
- CTAs de contato e demonstração

### 2. Hero Section

- Proposta de valor principal
- CTAs primários
- Estatísticas de impacto
- Animações de entrada

### 3. Benefits Section

- 6 benefícios principais do sistema
- Cards interativos com hover effects
- Estatísticas de performance

### 4. How It Works Section

- Processo em 4 etapas
- Visualizações interativas
- Stack tecnológico

### 5. Use Cases Section

- 3 casos de uso principais:
  - Frotas Corporativas
  - Seguradoras
  - Governos e Reguladores
- Tabs interativas
- Métricas específicas por segmento

### 6. Contact Section

- Formulário de contato
- Informações de contato
- Horário de atendimento
- Indicadores de confiança

### 7. Footer

- Links organizacionais
- Newsletter
- Redes sociais
- Informações legais

## 🔧 Configurações

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=https://api.guarddrive.com
REACT_APP_ANALYTICS_ID=GA_TRACKING_ID
REACT_APP_CONTACT_EMAIL=contato@guarddrive.com
REACT_APP_CONTACT_PHONE=+5511999999999
```

### Configuração de Analytics

Para habilitar Google Analytics, adicione o script no `public/index.html`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_TRACKING_ID");
</script>
```

## 📈 Performance e SEO

### Otimizações Implementadas

- **Code Splitting**: Carregamento sob demanda
- **Lazy Loading**: Imagens e componentes
- **Minificação**: CSS e JavaScript otimizados
- **Compression**: Gzip habilitado
- **Caching**: Headers de cache configurados

### SEO Features

- Meta tags dinâmicas
- Structured data (JSON-LD)
- Sitemap automático
- Robots.txt configurado
- URLs amigáveis

### Métricas de Performance

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Segurança

### Medidas Implementadas

- **Content Security Policy**: Headers de segurança
- **HTTPS Only**: Redirecionamento automático
- **Input Sanitization**: Validação de formulários
- **Error Handling**: Tratamento seguro de erros

## 🚀 Deploy

### Netlify (Recomendado)

```bash
# Build e deploy automático
npm run build
netlify deploy --prod --dir=build
```

### Vercel

```bash
# Deploy com Vercel CLI
vercel --prod
```

### AWS S3 + CloudFront

```bash
# Sync com S3
aws s3 sync build/ s3://guarddrive-website --delete
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

## 🤝 Contribuição

### Padrões de Código

- Use ESLint e Prettier
- Siga os padrões de nomenclatura
- Documente componentes complexos
- Escreva testes para novas funcionalidades

### Processo de Contribuição

1. Fork o repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte técnico:

- **Email**: dev@guarddrive.com
- **Documentação**: [docs.guarddrive.com](https://docs.guarddrive.com)
- **Issues**: [GitHub Issues](https://github.com/guarddrive/web-app/issues)

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**GuardDrive Team** - Revolucionando a segurança veicular com blockchain e IA.
