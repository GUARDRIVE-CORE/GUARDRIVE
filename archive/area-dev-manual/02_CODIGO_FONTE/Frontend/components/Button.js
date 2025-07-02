import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      height: size === 'small' ? 40 : size === 'large' ? 56 : 48,
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...shadows.md,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
          ...shadows.md,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: colors.error,
          ...shadows.md,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseTextStyle = {
      fontSize: size === 'small' ? typography.fontSize.sm : 
                size === 'large' ? typography.fontSize.lg : typography.fontSize.base,
      fontFamily: typography.fontFamily.semiBold,
      textAlign: 'center',
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return {
          ...baseTextStyle,
          color: colors.white,
        };
      case 'outline':
      case 'ghost':
        return {
          ...baseTextStyle,
          color: colors.primary,
        };
      default:
        return baseTextStyle;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white}
        />
      );
    }

    return (
      <View style={styles.content}>
        {icon && iconPosition === 'left' && (
          <View style={[styles.icon, { marginRight: spacing.sm }]}>
            {icon}
          </View>
        )}
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <View style={[styles.icon, { marginLeft: spacing.sm }]}>
            {icon}
          </View>
        )}
      </View>
    );
  };

  const buttonStyle = [
    getButtonStyle(),
    disabled && styles.disabled,
    style,
  ];

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        <LinearGradient
          colors={colors.primaryGradient}
          style={buttonStyle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        <LinearGradient
          colors={colors.secondaryGradient}
          style={buttonStyle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;

