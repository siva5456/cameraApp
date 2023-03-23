import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button, Image, StatusBar, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'
import { TouchableOpacity } from 'react-native';

function MyCamera() {

    const [type, setType] = useState(CameraType.back)
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

    const [photo, setPhoto] = useState(undefined);

    let cameraRef = useRef();

    let toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }

    let takePic = async () => {

        let options = {
            quality: 1,
            base64: true,
            exif: true,
        }
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
        // console.log(newPhoto.uri);
    }

    useEffect(() => {
        (async () => {
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
            // console.log(mediaLibraryPermission);
            // console.log('================================');
            // console.log(mediaLibraryPermission.granted);
        })()
    }, [])

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View>
                <Text>please allow camera to open in your device</Text>
                <Button title='allow camera' onPress={requestPermission} />
            </View>
        )
    }


    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri)
                .then(() => {
                    setPhoto(undefined)
                })
        }


        let savePic = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri)
                .then(() => {
                    setPhoto(undefined)
                })
        }

        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }} >
                <Image style={styles.previw_image} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Button title='share' onPress={sharePic} />
                {hasMediaLibraryPermission && <Button title='save' onPress={savePic} />}
                <Button title='Discard' onPress={() => setPhoto(undefined)} />
            </SafeAreaView>
        )
    }


    return (
        <>
            <SafeAreaView style={styles.SafeAreaView} />
            <Camera ref={cameraRef} type={type} style={styles.camera_container}>
            </Camera>
            <View style={styles.camera_Bottom}>
                <TouchableOpacity onPress={takePic} style={styles.capture}>
                    <Image style={{ height: 40, width: 40, }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3178/3178294.png" }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleCameraType}
                    style={styles.flip_camera} >
                    <Image style={{ height: 40, width: 40, }} source={{ uri: "https://cdn-icons-png.flaticon.com/128/8518/8518236.png" }} onPress={toggleCameraType} />
                </TouchableOpacity>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SafeAreaView: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera_container: {
        flex: 0.9,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    camera_Bottom: {
        flex: 0.1,
        backgroundColor: 'black',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    capture: {
        height: 60,
        width: 60,
        borderRadius: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',

    },
    flip_camera: {
        border: 3,
        borderColor: 'transparent',
        height: 55,
        width: 55,
        borderRadius: 50,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',
        left: 100,
        top: 2,
    },
    previw_image: {
        alignSelf: 'stretch',
        flex: 1,
    }
});

export default MyCamera