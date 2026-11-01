import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScreeningLayout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vision Screening (Phase 2)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
