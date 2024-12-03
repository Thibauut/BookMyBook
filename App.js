// import 'react-native-gesture-handler';
// import 'react-native-reanimated';
// navigator.geolocation = require('@react-native-community/geolocation');
import React, { useState, useEffect } from 'react';
import {StyleSheet, TextInput, View, Image, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeTabs from './screens/HomeScreen';
import BookCardScreen from './screens/BookCardScreen';
import { MyProvider } from './utils/Provider';

const Stack = createStackNavigator();


function App() {
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="HomeScreen" component={HomeTabs} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="BookCardScreen" component={BookCardScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
};

export default App;