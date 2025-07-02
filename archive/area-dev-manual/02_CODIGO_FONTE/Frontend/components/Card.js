import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, shadows, spacing } from '../styles/theme';

const Card = ({
  children,
  style,
  onPress,
  variant = 'default',
  padding = 'default',
  shadow = 'md',
  ...props
}) => {
  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
    };

    // Aplicar sombra
    if (shadow && shadows[shadow]) {
      Object.assign(baseStyle, shadows[shadow]);
    }

    // Aplicar padding
    switch (padding) {
      case 'none':
        baseStyle.padding = 0;
        break;
      case 'small':
        baseStyle.padding = spacing.sm;
        break;
      case 'large':
        baseStyle.padding = spacing.xl;
        break;
      default:
        baseStyle.padding = spacing.lg;
    }

    // Variantes de estilo
    switch (variant) {
      case 'outlined':
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.gray200;
        break;
      case 'elevated':
        Object.assign(baseStyle, shadows.lg);
        break;
      case 'primary':
        baseStyle.backgroundColor = colors.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = colors.secondary;
        break;
      case 'success':
        baseStyle.backgroundColor = colors.success;
        break;
      case 'warning':
        baseStyle.backgroundColor = colors.warning;
        break;
      case 'error':
        baseStyle.backgroundColor = colors.error;
        break;
      case 'transparent':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.shadowOpacity = 0;
        baseStyle.elevation = 0;
        break;
      default:
        // Manter estilo base
        break;
    }

    return baseStyle;
  };

  const cardStyle = [getCardStyle(), style];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

// Componente CardHeader para cabeçalhos de cards
export const CardHeader = ({ children, style }) => (
  <View style={[styles.header, style]}>
    {children}
  </View>
);

// Componente CardBody para conteúdo principal
export const CardBody = ({ children, style }) => (
  <View style={[styles.body, style]}>
    {children}
  </View>
);

// Componente CardFooter para rodapés de cards
export const CardFooter = ({ children, style }) => (
  <View style={[styles.footer, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
  },
  body: {
    flex: 1,
  },
  footer: {
    marginTop: spacing.md,
  },
});

export default Card;

