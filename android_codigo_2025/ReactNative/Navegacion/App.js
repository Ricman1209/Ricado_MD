import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import IMCScreen from './screens/IMCScreen';
import CurrencyScreen from './screens/CurrencyScreen';
import TipScreen from './screens/TipScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="IMC" component={IMCScreen} options={{ title: 'Calculadora IMC' }} />
        <Stack.Screen name="Divisas" component={CurrencyScreen} options={{ title: 'Cambio de Divisas' }} />
        <Stack.Screen name="Propinas" component={TipScreen} options={{ title: 'Cálculo de Propinas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
