import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {

  async function playSound({}) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/Hello.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }

//   React.useEffect(() => {
//     return sound
//       ? () => {
//           console.log('Unloading Sound');
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

 
}

