import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';

const crearDialogo= () => Alert.alert(
  "Titulo de la alerta",
  "Subtitulo que podemos agregar al cuadro de dialogo de la alerta",
  [
    {
      text:"Cancelar",
      onPress: () => {},
      style: "cancel",
    },
    {
      text:"Aceptar",
      onPress: () => console.log("Boton presionado"),
    }
  ],
  {cancelable:false},
)

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Abrir dialogo"
        onPress={crearDialogo}
      />
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
});
