import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button, Image, StatusBar, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'
import { TouchableOpacity } from 'react-native';
import PhotoCamera from './photo/PhotoCamera';
import VideoCamera from './video/VideoCamera';
import ShortVideoCamera from './video/ShortVideoCamera';

function MyCamera({ navigation }) {

    const [togglePhotoVideoShort, setTogglePhotoVideoShort] = useState('photo')

    switch (togglePhotoVideoShort) {
        case 'photo':
            return <PhotoCamera setTogglePhotoVideoShort={setTogglePhotoVideoShort} navigation={navigation} />
        case 'video':
            return <VideoCamera setTogglePhotoVideoShort={setTogglePhotoVideoShort} navigation={navigation} />
        case 'ShortVideoCamera':
            return <ShortVideoCamera setTogglePhotoVideoShort={setTogglePhotoVideoShort} navigation={navigation} />

        default:
            return <PhotoCamera setTogglePhotoVideoShort={setTogglePhotoVideoShort} navigation={navigation} />
    }
}


export default MyCamera