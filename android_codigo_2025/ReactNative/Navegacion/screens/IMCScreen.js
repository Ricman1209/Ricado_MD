import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function IMCScreen() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);
    if (!p || !a || p <= 0 || a <= 0) {
      setResultado({ imc: null, status: '⚠️ Ingresa valores válidos (kg y m).' });
      return;
    }
    const imc = p / (a * a);
    let clasificacion = '';
    if (imc < 18.5) clasificacion = 'Bajo peso';
    else if (imc < 25) clasificacion = 'Normal';
    else if (imc < 30) clasificacion = 'Sobrepeso';
    else clasificacion = 'Obesidad';

    setResultado({ imc: imc.toFixed(2), status: clasificacion });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <Text style={styles.title}>Calculadora IMC</Text>
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="decimal-pad"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (m) ej. 1.70"
        keyboardType="decimal-pad"
        value={altura}
        onChangeText={setAltura}
      />
      <TouchableOpacity style={styles.btn} onPress={calcular}>
        <Text style={styles.btnText}>Calcular</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.card}>
          {resultado.imc ? (
            <>
              <Text style={styles.result}>IMC: {resultado.imc}</Text>
              <Text style={styles.sub}>{resultado.status}</Text>
            </>
          ) : (
            <Text style={styles.sub}>{resultado.status}</Text>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12, fontSize: 16 },
  btn: { backgroundColor: '#34C759', padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '700' },
  card: { marginTop: 16, padding: 16, borderRadius: 12, backgroundColor: '#F5F5F5' },
  result: { fontSize: 20, fontWeight: '700' },
  sub: { fontSize: 16, marginTop: 6 },
});
