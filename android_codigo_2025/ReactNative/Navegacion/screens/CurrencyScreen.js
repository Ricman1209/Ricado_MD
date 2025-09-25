import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function CurrencyScreen() {
  // Tasa de ejemplo: 1 USD = 19.5 MXN (ajústala según necesites)
  const [tasa, setTasa] = useState('19.5');
  const [monto, setMonto] = useState('');
  const [direccion, setDireccion] = useState('USD→MXN'); // o 'MXN→USD'
  const resultado = useMemo(() => {
    const t = parseFloat(tasa);
    const m = parseFloat(monto);
    if (!t || !m || t <= 0 || m < 0) return null;
    if (direccion === 'USD→MXN') return (m * t).toFixed(2);
    return (m / t).toFixed(2);
  }, [tasa, monto, direccion]);

  const toggle = () => setDireccion(direccion === 'USD→MXN' ? 'MXN→USD' : 'USD→MXN');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding' })}>
      <Text style={styles.title}>Cambio de Divisas</Text>

      <TextInput
        style={styles.input}
        placeholder="Tasa (1 USD = X MXN)"
        keyboardType="decimal-pad"
        value={tasa}
        onChangeText={setTasa}
      />

      <TextInput
        style={styles.input}
        placeholder={direccion === 'USD→MXN' ? 'Monto en USD' : 'Monto en MXN'}
        keyboardType="decimal-pad"
        value={monto}
        onChangeText={setMonto}
      />

      <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={toggle}>
        <Text style={styles.btnText}>Invertir: {direccion}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.label}>Resultado:</Text>
        <Text style={styles.result}>
          {resultado === null ? '—' : direccion === 'USD→MXN' ? `${resultado} MXN` : `${resultado} USD`}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, fontSize: 16 },
  btn: { backgroundColor: '#007AFF', padding: 14, borderRadius: 10, alignItems: 'center' },
  secondary: { backgroundColor: '#5856D6' },
  btnText: { color: 'white', fontWeight: '700' },
  card: { marginTop: 16, padding: 16, borderRadius: 12, backgroundColor: '#F5F5F5' },
  label: { color: '#555' },
  result: { fontSize: 20, fontWeight: '700', marginTop: 6 },
});
