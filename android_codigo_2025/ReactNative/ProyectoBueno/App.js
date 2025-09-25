import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


const Texto = (props) => {
  const {texto} = props
  return(
    <Text>{texto}</Text>
  )
}

const Textoo = () => {
  const [texto, setTexto] = useState('Este es el texto Default')
  const actualizaTexto = () => {
    setTexto('Este no es el texto por default')
  }
  return(
    <Text style = {{backgroundColor:'red', color: 'white'}} onPress = {actualizaTexto}>{texto}</Text>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.rojo}>Hola desde React Native</Text>
      <Text style={styles.azul}>Hola desde React Native</Text>
      <Text style={styles.verde}>Hola desde React Native</Text>
      <Texto texto = {'Cambiado con props'}/>
      <Texto texto = {'Esta es la mejor clase del universo'}/>
      <Textoo />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rojo: {
    flex: 1,
    backgroundColor:'red',
    color: 'white',
    fontSize: 30,
    margin: 10,
  },
  verde: {
    flex: 3,
    backgroundColor:'green',
    color: 'white',
    fontSize: 30,
    margin: 10,
  },
  azul: { 
    flex: 2,  
    backgroundColor:'blue',
    color: 'white',
    fontSize: 30,
    margin: 10,
  }
});
