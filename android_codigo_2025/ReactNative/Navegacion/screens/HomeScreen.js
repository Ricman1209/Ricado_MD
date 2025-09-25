import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navegación (Native Stack)</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('IMC')}>
        <Text style={styles.btnText}>Ir a IMC</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Divisas')}>
        <Text style={styles.btnText}>Ir a Cambio de Divisas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Propinas')}>
        <Text style={styles.btnText}>Ir a Cálculo de Propinas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', gap: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  btn: { backgroundColor: '#007AFF', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10, width: '100%' },
  btnText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});
