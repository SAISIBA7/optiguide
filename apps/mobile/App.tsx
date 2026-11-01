import React, { useState } from 'react';
import { HomeScreen } from './src/screens/HomeScreen';
import { DiagnosticsScreen } from './src/screens/DiagnosticsScreen';

export type ActiveScreen = 'home' | 'diagnostics';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('home');

  return currentScreen === 'home' ? (
    <HomeScreen onNavigateToDiagnostics={() => setCurrentScreen('diagnostics')} />
  ) : (
    <DiagnosticsScreen onBack={() => setCurrentScreen('home')} />
  );
}
