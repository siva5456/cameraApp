import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Button,
    Image,
    StatusBar,
    Platform,
    Pressable,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native";
import TimeCounter from "./TimeCounter";

export default function ShortVideoCamera({ setTogglePhotoVideoShort }) {
    let cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();
    const [toggleFlash, setToggleFlash] = useState(false);

    useEffect(() => {
        (async () => {
            const mediaLibraryPermission =
                await MediaLibrary.requestPermissionsAsync();
            const microphonePermission =
                await Camera.requestMicrophonePermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
        })();
    }, []);

    let toggleCameraType = () => {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    };

    let recordVideo = () => {
        setIsRecording(true);
        setTimeout(() => {
            let options = {
                quality: "1080p",
                maxDuration: 20,
                mute: false,
            };
            cameraRef.current
                .recordAsync(options)
                .then((recordedVideo) => {
                    setVideo(recordedVideo);
                    setIsRecording(false);
                })
                .catch(() => {
                    setIsRecording(false);
                    alert(`can't record video now`);
                });
        }, 500);
    };
    let stopRecording = () => {
        cameraRef.current.stopRecording();
        setIsRecording(false);
    };

    if (!permission || hasMicrophonePermission === undefined) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View>
                <Text>please allow camera to open in your device</Text>
                <Button title="allow camera" onPress={requestPermission} />
            </View>
        );
    }

    if (video) {
        let shareVideo = () => {
            shareAsync(video.uri).then(() => {
                setVideo(undefined);
            });
        };

        let saveVideo = () => {
            MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
                setVideo(undefined);
            });
        };

        return (
            <SafeAreaView
                style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
            >
                <Video
                    style={styles.previw_image}
                    source={{ uri: video.uri }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                />
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: 300,
                        height: 60,
                    }}
                >
                    <Button title="share" onPress={shareVideo} />
                    {hasMediaLibraryPermission && (
                        <Button title="save" onPress={saveVideo} />
                    )}
                    <Button title="Discard" onPress={() => setVideo(undefined)} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <>
            <SafeAreaView style={styles.SafeAreaView} />
            {!isRecording && (
                <View style={{ backgroundColor: "black" }}>
                    <Pressable onPress={() => setToggleFlash(!toggleFlash)}>
                        {toggleFlash ? (
                            <Image
                                style={{ height: 35, width: 35 }}
                                source={{ uri: "https://img.icons8.com/color/1x/flash-on.png" }}
                            />
                        ) : (
                            <Image
                                style={{ height: 35, width: 35 }}
                                source={require("../../../assets/flash_off.png")}
                            />
                        )}
                    </Pressable>
                </View>
            )}
            <Camera
                flashMode={
                    toggleFlash
                        ? Camera.Constants.FlashMode.torch
                        : Camera.Constants.FlashMode.off
                }
                ref={cameraRef}
                type={type}
                style={styles.camera_container}
            >
                {isRecording && <TimeCounter />}
                <View style={styles.camera_Bottom}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            backgroundColor: "transparent",
                        }}
                    >
                        <TouchableOpacity onPress={() => setTogglePhotoVideoShort("video")}>
                            <Text style={{ color: "white" }}>Video</Text>
                        </TouchableOpacity>
                        <Text style={{ color: "rgb(3, 154, 213)", position: "relative" }}>
                            short Video
                        </Text>
                        <TouchableOpacity onPress={() => setTogglePhotoVideoShort("photo")}>
                            <Text style={{ color: "white", position: "relative" }}>
                                photo
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.camera_Bottom_Recod_Buttons}>
                        <View style={styles.last_image_View}></View>
                        <TouchableOpacity
                            onPress={isRecording ? stopRecording : recordVideo}
                            style={styles.capture}
                        >
                            {isRecording ? (
                                <View style={styles.stop_Video} />
                            ) : (
                                <View style={styles.start_video} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={toggleCameraType}
                            style={styles.flip_camera}
                        >
                            <Image
                                style={{ height: 40, width: 40 }}
                                source={{
                                    uri: "https://cdn-icons-png.flaticon.com/128/8518/8518236.png",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    SafeAreaView: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: "center",
        justifyContent: "center",
    },
    camera_container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    camera_Bottom: {
        backgroundColor: "rgba(255, 255, 255, 0.112)",
        alignContent: "center",
        justifyContent: "space-evenly",
        padding: 15,
    },
    camera_Bottom_Recod_Buttons: {
        alignContent: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        paddingTop: 5,
        backgroundColor: "transparent",
    },
    capture: {
        height: 60,
        width: 60,
        borderRadius: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: "center",
        backgroundColor: "transparent",
        justifyContent: "center",
        position: "relative",
    },
    start_video: {
        height: 55,
        width: 55,
        borderRadius: 50,
        backgroundColor: "red",
    },
    stop_Video: {
        height: 20,
        width: 20,
        backgroundColor: "red",
    },
    flip_camera: {
        border: 3,
        borderColor: "transparent",
        height: 60,
        width: 60,
        borderRadius: 50,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    previw_image: {
        alignSelf: "stretch",
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
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
});

// position:relative,right:10
