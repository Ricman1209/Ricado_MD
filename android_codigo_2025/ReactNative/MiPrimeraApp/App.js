//EJERCICIO REACT
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { ScrollView } from 'react-native-web';

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const usuarioValido = 'admin';
  const contraseñaValida = '1234';

  const validarLogin = () => {
    if (usuario === usuarioValido && contraseña === contraseñaValida) {
      setMensaje(`Bienvenido, ${usuario}`);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
      setMensaje('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <TextInput 
        style={styles.input}   
        placeholder='Nombre de usuario'
        value={usuario} 
        onChangeText={setUsuario}  
      />
      <TextInput 
        style={styles.input}   
        placeholder='Contraseña'
        value={contraseña} 
        onChangeText={setContraseña}  
        secureTextEntry={true}
      />
      <Button 
        title='Ingresar'
        onPress={validarLogin} 
      />
      {mensaje !== '' && <Text style={styles.bienvenida}>{mensaje}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 250,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  bienvenida: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  }
});
