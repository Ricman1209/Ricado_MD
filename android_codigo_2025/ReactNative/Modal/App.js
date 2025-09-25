import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const [modal, setModal]=useState(false)

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modal}
      >
        <View style={styles.center}>
          <View style={styles.content}>
            <Text>Estoy en un modal</Text>
            <Button
              title="Close Modal"
              onPress={()=>setModal(!modal)}
            />
          </View>
        </View>
      </Modal>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
        <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Text>Esta area esta fuera del contenido del modal</Text>
      <Button 
        title="Abrir modal"
        onPress={() =>setModal(!modal)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content:{
    flex:1,
    backgroundColor:"rgba(73, 156, 200, 1)",
    alignItems:"center",
    justifyContent:"center",
    margin:200,
  },
  center:{
    flex:1,
    alignItems:"strech",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.5)",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
