import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings & History</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
