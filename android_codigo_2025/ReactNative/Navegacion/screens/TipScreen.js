import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function TipScreen() {
  const [cuenta, setCuenta] = useState('');
  const [porcentaje, setPorcentaje] = useState('10');
  const [personas, setPersonas] = useState('1');

  const datos = useMemo(() => {
    const c = parseFloat(cuenta);
    const p = parseFloat(porcentaje);
    const n = parseInt(personas || '1', 10);
    if (!c || !p || !n || c < 0 || p < 0 || n <= 0) return null;

    const propina = c * (p / 100);
    const total = c + propina;
    return {
      propina: propina.toFixed(2),
      total: total.toFixed(2),
      porPersona: (total / n).toFixed(2),
    };
  }, [cuenta, porcentaje, personas]);

  const aplicarPorcentaje = (p) => setPorcentaje(String(p));

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding' })}>
      <Text style={styles.title}>Cálculo de Propinas</Text>

      <TextInput
        style={styles.input}
        placeholder="Cuenta ($)"
        keyboardType="decimal-pad"
        value={cuenta}
        onChangeText={setCuenta}
      />

      <TextInput
        style={styles.input}
        placeholder="Porcentaje (%)"
        keyboardType="number-pad"
        value={porcentaje}
        onChangeText={setPorcentaje}
      />

      <View style={{ flexDirection: 'row', gap: 8 }}>
        {[10, 12, 15, 20].map((p) => (
          <TouchableOpacity key={p} style={[styles.chip, porcentaje === String(p) && styles.chipActive]} onPress={() => aplicarPorcentaje(p)}>
            <Text style={[styles.chipText, porcentaje === String(p) && styles.chipTextActive]}>{p}%</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Número de personas"
        keyboardType="number-pad"
        value={personas}
        onChangeText={setPersonas}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Propina:</Text>
        <Text style={styles.result}>{datos ? `$ ${datos.propina}` : '—'}</Text>

        <Text style={[styles.label, { marginTop: 10 }]}>Total:</Text>
        <Text style={styles.result}>{datos ? `$ ${datos.total}` : '—'}</Text>

        <Text style={[styles.label, { marginTop: 10 }]}>Por persona:</Text>
        <Text style={styles.result}>{datos ? `$ ${datos.porPersona}` : '—'}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, fontSize: 16 },
  chip: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#ccc' },
  chipActive: { backgroundColor: '#FF9500', borderColor: '#FF9500' },
  chipText: { color: '#333', fontWeight: '600' },
  chipTextActive: { color: 'white' },
  card: { marginTop: 16, padding: 16, borderRadius: 12, backgroundColor: '#F5F5F5' },
  label: { color: '#555' },
  result: { fontSize: 20, fontWeight: '700', marginTop: 4 },
});
