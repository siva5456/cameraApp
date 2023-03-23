import React, { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image,Pressable } from 'react-native';
import { shareAsync } from 'expo-sharing';


function ShowImage({ route, navigation }) {
    const { photo } = route.params
    let sharePic = () => {
        shareAsync(photo)
            .then(() => {
            })
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<Pressable onPress={sharePic} style={{ margin: 9 }} >
                <Image style={{ height: 30, width: 30, }} source={{ uri: 'https://img.icons8.com/glyph-neue/1x/share-3.png' }} />
                <Text style={{ fontSize: 11, marginTop: -5, marginLeft: 3, color: 'silver' }}>share</Text>
            </Pressable>)
        });
    }, [])
   

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }} >
            <Image style={{ alignSelf: 'stretch', flex: 1, }} source={{ uri: photo }} />
        </SafeAreaView>
    )
}

export default ShowImage