import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button, Image, StatusBar, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'
import { TouchableOpacity } from 'react-native';

function PhotoCamera({ navigation ,setTogglePhotoVideoShort}) {

    const [type, setType] = useState(CameraType.back)
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

    const [photo, setPhoto] = useState(undefined);
    const [lastphoto, setLastphoto] = useState(null);


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
                    setLastphoto(photo.uri)
                    setPhoto(undefined)
                })

        }

        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }} >
                <Image style={styles.previw_image} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: 300, height: 60 }}>
                    <Button title='share' onPress={sharePic} />
                    {hasMediaLibraryPermission && <Button title='save' onPress={savePic} />}
                    <Button title='Discard' onPress={() => (setLastphoto(photo.uri), setPhoto(undefined))} />
                </View>
            </SafeAreaView>
        )
    }


    return (
        <>
            <SafeAreaView style={styles.SafeAreaView} />
            <Camera ref={cameraRef} type={type} style={styles.camera_container}>
            </Camera>
            <View style={styles.camera_Bottom}>
            <View style={{flexDirection:'row',justifyContent: 'space-evenly',backgroundColor: 'transparent',}} >
                   <TouchableOpacity onPress={() => setTogglePhotoVideoShort('ShortVideoCamera')}>
                    <Text style={{color:'white'}}>short Video</Text>
                   </TouchableOpacity>
                    <Text style={{color:'rgb(3, 154, 213)',position:"relative",right:20}}>photo</Text>
                    <TouchableOpacity onPress={() => setTogglePhotoVideoShort('video')} >
                    <Text style={{color:'white',position:"relative",right:20}}>video</Text>
                   </TouchableOpacity>

                </View>
            <View style={styles.camera_Bottom_Recod_Buttons}>
                {
                    lastphoto ? <TouchableOpacity onPress={() => navigation.navigate('photo', { photo: lastphoto })}
                        style={styles.last_image_View} >
                        <Image style={styles.last_image} source={{ uri: lastphoto }} />
                    </TouchableOpacity  > : <View style={styles.last_image_View}>
                        <Image style={styles.last_image} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa7ObT7V5LMOQWpMfh10OxxF2VeWCNXszlq2oI7ivRJw&usqp=CAU&ec=48665701" }} />
                    </View>
                }
                <TouchableOpacity onPress={takePic} style={styles.capture}>
                    <Image style={{ height: 40, width: 40, }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3178/3178294.png" }} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleCameraType}
                    style={styles.flip_camera} >
                    <Image style={{ height: 40, width: 40, }} source={{ uri: "https://cdn-icons-png.flaticon.com/128/8518/8518236.png" }} />
                </TouchableOpacity>
            </View>
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
        padding: 15,

    },
    camera_Bottom_Recod_Buttons: {
        alignContent: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        paddingTop: 5,
        backgroundColor: 'transparent',


    },
    capture: {
        height: 60,
        width: 60,
        borderRadius: 50,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",

    },
    flip_camera: {
        border: 3,
        borderColor: 'transparent',
        height: 60,
        width: 60,
        borderRadius: 50,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",

    },
    previw_image: {
        alignSelf: 'stretch',
        flex: 1,
    },
    last_image: {
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    last_image_View: {
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: 'transparent',
        alignItems: "center",
        justifyContent: "center",
    }
});

export default PhotoCamera