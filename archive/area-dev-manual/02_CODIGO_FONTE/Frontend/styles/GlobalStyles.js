import styled, { createGlobalStyle } from 'styled-components';

// Paleta de cores do GuardDrive
export const colors = {
  primary: '#1E3A8A',      // Azul Profundo
  secondary: '#10B981',    // Verde ESG
  accent: '#F59E0B',       // Âmbar/Alerta
  success: '#22C55E',      // Sucesso
  error: '#EF4444',        // Erro
  warning: '#F59E0B',      // Aviso
  
  // Neutros
  white: '#FFFFFF',
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  gray900: '#0F172A',
  
  // Gradientes
  primaryGradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  secondaryGradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  heroGradient: 'linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)',
};

// Breakpoints responsivos
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};

// Estilos globais
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.gray800};
    line-height: 1.6;
    background-color: ${colors.white};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    color: ${colors.gray900};
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 2.5rem;
    }
    
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 2rem;
    
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.75rem;
    }
  }

  h4 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.7;
    color: ${colors.gray600};
    
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1rem;
    }
  }

  a {
    text-decoration: none;
    color: ${colors.primary};
    transition: color 0.2s ease-in-out;
    
    &:hover {
      color: ${colors.secondary};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease-in-out;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    
    @media (min-width: ${breakpoints.tablet}) {
      padding: 0 2rem;
    }
  }

  .section {
    padding: 5rem 0;
    
    @media (max-width: ${breakpoints.tablet}) {
      padding: 3rem 0;
    }
  }

  // Animações
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out;
  }

  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  // Utilitários
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }
  .mb-5 { margin-bottom: 3rem; }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }
  .mt-5 { margin-top: 3rem; }

  // Scrollbar personalizada
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.gray100};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.gray400};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.gray500};
  }
`;

// Componentes styled reutilizáveis
export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'large' ? '1rem 2rem' : '0.75rem 1.5rem'};
  font-size: ${props => props.size === 'large' ? '1.125rem' : '1rem'};
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  min-height: 48px;
  
  ${props => props.variant === 'primary' && `
    background: ${colors.primaryGradient};
    color: ${colors.white};
    box-shadow: 0 4px 14px 0 rgba(30, 58, 138, 0.25);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px 0 rgba(30, 58, 138, 0.35);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background: transparent;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    
    &:hover {
      background: ${colors.primary};
      color: ${colors.white};
    }
  `}
  
  ${props => props.variant === 'success' && `
    background: ${colors.secondaryGradient};
    color: ${colors.white};
    box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.25);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px 0 rgba(16, 185, 129, 0.35);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 2rem;
  }
`;

export const Section = styled.section`
  padding: 5rem 0;
  
  @media (max-width: ${breakpoints.tablet}) {
    padding: 3rem 0;
  }
  
  ${props => props.background && `
    background: ${props.background};
  `}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  ${props => props.columns && `
    grid-template-columns: repeat(${props.columns}, 1fr);
    
    @media (max-width: ${breakpoints.tablet}) {
      grid-template-columns: 1fr;
    }
  `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '1rem'};
  
  ${props => props.direction && `
    flex-direction: ${props.direction};
  `}
  
  ${props => props.wrap && `
    flex-wrap: wrap;
  `}
  
  @media (max-width: ${breakpoints.tablet}) {
    ${props => props.mobileDirection && `
      flex-direction: ${props.mobileDirection};
    `}
  }
`;

