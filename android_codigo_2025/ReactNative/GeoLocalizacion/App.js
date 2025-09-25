import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState({})

  const buscaLocation = async () => {
    const {status}= await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted'){
      return Alert.alert('Acesso no autorizado')
    }
    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    console.log(location)
  }
  useEffect(()=>{
    console.log("Buscando localización...")
    buscaLocation()
  })

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <MapView style={styles.mapa}>
        {
          location.coords ? <Marker
            coordinate={location.coords}
            title="Mi oficina"
            description="Esta es mi oficina"
          />:null
        }
        <Marker
          coordinate={{
            latitude:19.4261,
            longitude:-99.2042
          }}
        />
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapa:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});