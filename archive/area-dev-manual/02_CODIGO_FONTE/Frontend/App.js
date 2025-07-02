import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyles';
import LandingPage from './pages/LandingPage';

// Componentes de páginas adicionais (para futuras implementações)
const AboutPage = () => <div>Página Sobre Nós - Em desenvolvimento</div>;
const TeamPage = () => <div>Página Nossa Equipe - Em desenvolvimento</div>;
const CareersPage = () => <div>Página Carreiras - Em desenvolvimento</div>;
const PressPage = () => <div>Página Imprensa - Em desenvolvimento</div>;
const HelpPage = () => <div>Central de Ajuda - Em desenvolvimento</div>;
const PrivacyPage = () => <div>Política de Privacidade - Em desenvolvimento</div>;
const TermsPage = () => <div>Termos de Uso - Em desenvolvimento</div>;
const CookiesPage = () => <div>Política de Cookies - Em desenvolvimento</div>;
const NotFoundPage = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <h1>404 - Página não encontrada</h1>
    <p>A página que você está procurando não existe.</p>
    <a href="/" style={{ marginTop: '1rem', color: '#1E3A8A' }}>
      Voltar para a página inicial
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Páginas institucionais */}
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/equipe" element={<TeamPage />} />
          <Route path="/carreiras" element={<CareersPage />} />
          <Route path="/imprensa" element={<PressPage />} />
          
          {/* Páginas de suporte */}
          <Route path="/ajuda" element={<HelpPage />} />
          
          {/* Páginas legais */}
          <Route path="/privacidade" element={<PrivacyPage />} />
          <Route path="/termos" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          
          {/* Página 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

