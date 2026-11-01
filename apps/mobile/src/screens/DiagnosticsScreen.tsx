import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';
import { apiClient } from '../services/apiClient';
import { HealthResponse, DatabaseHealthResponse } from '@optiguide/shared';
import { colors, spacing, typography, borderRadius, elevation } from '../theme/tokens';

export interface DiagnosticsScreenProps {
  onBack: () => void;
}

export const DiagnosticsScreen: React.FC<DiagnosticsScreenProps> = ({ onBack }) => {
  const [apiUrl, setApiUrl] = useState(apiClient.getBaseUrl());
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [dbData, setDbData] = useState<DatabaseHealthResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      apiClient.setBaseUrl(apiUrl);
      const [healthRes, dbRes] = await Promise.all([
        apiClient.getV1Health(),
        apiClient.getDatabaseHealth(),
      ]);
      setHealthData(healthRes);
      setDbData(dbRes);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to connect to API server.');
      setHealthData(null);
      setDbData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleTestConnection();
  }, []);

  return (
    <ScreenContainer>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Button
          title="← Back to Dashboard"
          variant="outline"
          size="sm"
          onPress={onBack}
          testID="btn-back-dashboard"
        />
        <Text style={styles.topTitle}>API Diagnostics</Text>
      </View>

      {/* Base URL Configuration */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>Backend API Base URL</Text>
        <Text style={styles.hintText}>
          Adjust the endpoint for testing across Web, iOS Simulator, or Android Emulator.
        </Text>
        <TextField
          value={apiUrl}
          onChangeText={setApiUrl}
          placeholder="http://localhost:8000"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.presetRow}>
          <Button
            title="Localhost (Web/iOS)"
            size="sm"
            variant="outline"
            onPress={() => setApiUrl('http://localhost:8000')}
            style={styles.presetBtn}
          />
          <Button
            title="Android Emulator (10.0.2.2)"
            size="sm"
            variant="outline"
            onPress={() => setApiUrl('http://10.0.2.2:8000')}
            style={styles.presetBtn}
          />
        </View>
        <Button
          title="Save & Test Connection"
          variant="primary"
          onPress={handleTestConnection}
          loading={loading}
          style={styles.actionBtn}
          testID="btn-test-connection"
        />
      </View>

      {/* Loading state */}
      {loading && <LoadingIndicator message="Connecting to OptiGuide backend..." />}

      {/* Error display */}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          code="CONNECTION_ERROR"
          onRetry={handleTestConnection}
        />
      )}

      {/* Health telemetry results */}
      {healthData && (
        <View style={styles.resultsCard}>
          <Text style={styles.sectionHeading}>Live Health Status</Text>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Service Status:</Text>
            <View
              style={[
                styles.badge,
                healthData.status === 'ok' ? styles.badgeSuccess : styles.badgeWarning,
              ]}
            >
              <Text style={styles.badgeText}>{healthData.status.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Database Connectivity:</Text>
            <View
              style={[
                styles.badge,
                healthData.database === 'connected' ? styles.badgeSuccess : styles.badgeError,
              ]}
            >
              <Text style={styles.badgeText}>
                {healthData.database ? healthData.database.toUpperCase() : 'UNKNOWN'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.metricItem}>Service Name: {healthData.service}</Text>
          <Text style={styles.metricItem}>Version: {healthData.version}</Text>
          <Text style={styles.metricItem}>Environment: {healthData.environment}</Text>
          <Text style={styles.metricItem}>Timestamp: {healthData.timestamp}</Text>

          {dbData && (
            <>
              <View style={styles.divider} />
              <Text style={styles.metricItem}>Database Dialect: {dbData.database_type}</Text>
              <Text style={styles.metricItem}>
                Ping Latency: {dbData.latency_ms !== null && dbData.latency_ms !== undefined ? `${dbData.latency_ms} ms` : 'N/A'}
              </Text>
              <Text style={styles.metricItem}>Message: {dbData.message}</Text>
            </>
          )}
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  topTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.base,
    ...elevation.low,
  },
  resultsCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[600],
    ...elevation.low,
  },
  sectionHeading: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    marginBottom: spacing.xs,
  },
  hintText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    marginBottom: spacing.md,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  presetBtn: {
    flex: 1,
    minWidth: 140,
  },
  actionBtn: {
    marginTop: spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.xs,
  },
  statusLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[700],
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  badgeSuccess: {
    backgroundColor: colors.status.successBg,
  },
  badgeWarning: {
    backgroundColor: colors.status.warningBg,
  },
  badgeError: {
    backgroundColor: colors.status.errorBg,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: spacing.sm,
  },
  metricItem: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[600],
    marginVertical: 2,
    fontFamily: 'monospace',
  },
});
