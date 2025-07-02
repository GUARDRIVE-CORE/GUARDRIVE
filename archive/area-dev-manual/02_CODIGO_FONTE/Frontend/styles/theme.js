import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Paleta de cores do GuardDrive
export const colors = {
  primary: '#1E3A8A',      // Azul Profundo
  secondary: '#10B981',    // Verde ESG
  accent: '#F59E0B',       // Âmbar/Alerta
  success: '#22C55E',      // Sucesso
  error: '#EF4444',        // Erro
  warning: '#F59E0B',      // Aviso
  info: '#3B82F6',         // Informação
  
  // Neutros
  white: '#FFFFFF',
  black: '#000000',
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
  primaryGradient: ['#1E3A8A', '#3B82F6'],
  secondaryGradient: ['#10B981', '#34D399'],
  heroGradient: ['#1E3A8A', '#10B981'],
  
  // Transparências
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(15, 23, 42, 0.8)',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
};

// Tipografia
export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    extraBold: 'Inter-ExtraBold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};

// Espaçamentos
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Dimensões da tela
export const dimensions = {
  width,
  height,
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 414,
  isLargeDevice: width >= 414,
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Sombras
export const shadows = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 8,
  },
};

// Componentes base
export const components = {
  button: {
    height: 48,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
  },
  input: {
    height: 48,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    backgroundColor: colors.white,
    ...shadows.md,
  },
  header: {
    height: 60,
    paddingHorizontal: spacing.md,
  },
  tabBar: {
    height: 80,
    paddingBottom: spacing.md,
  },
};

// Animações
export const animations = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// Layout
export const layout = {
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
};

// Status bar
export const statusBar = {
  light: {
    backgroundColor: colors.primary,
    barStyle: 'light-content',
  },
  dark: {
    backgroundColor: colors.white,
    barStyle: 'dark-content',
  },
};

// Tema completo
export const theme = {
  colors,
  typography,
  spacing,
  dimensions,
  borderRadius,
  shadows,
  components,
  animations,
  layout,
  statusBar,
};

export default theme;

