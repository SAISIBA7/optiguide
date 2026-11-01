import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme/tokens';
import { Button } from './Button';

export interface ErrorMessageProps {
  message: string;
  code?: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  code,
  onRetry,
  style,
}) => {
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>Error</Text>
        {code ? <Text style={styles.codeBadge}>{code}</Text> : null}
      </View>
      <Text style={styles.messageText}>{message}</Text>
      {onRetry ? (
        <Button
          title="Retry"
          size="sm"
          variant="outline"
          onPress={onRetry}
          style={styles.retryButton}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.status.errorBg,
    borderColor: colors.status.error,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginVertical: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.status.error,
  },
  codeBadge: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[600],
    backgroundColor: colors.neutral[200],
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  messageText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[800],
    lineHeight: 20,
  },
  retryButton: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    borderColor: colors.status.error,
  },
});
