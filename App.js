import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/components/Home';
import MyCamera from './src/components/MyCamera';
import ShowImage from './src/components/photo/ShowImage';
import {  Image,Pressable,Text } from 'react-native';
import { useState } from 'react';
import VideoCamera from './src/components/video/VideoCamera';

const Stack = createStackNavigator();


export default function App() {

  

  return (
    < >
      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="camera" component={MyCamera} options={{ headerShown: false }} />
          <Stack.Screen name="photo" component={ShowImage} />
          <Stack.Screen name="VideoCamera" component={VideoCamera}options={{ headerShown: false }}  />



        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
  );
}

