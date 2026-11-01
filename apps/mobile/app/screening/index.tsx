import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScreeningIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screening Session Overview</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
