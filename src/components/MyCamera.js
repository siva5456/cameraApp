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
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity } from "react-native";
import PhotoCamera from "./photo/PhotoCamera";
import VideoCamera from "./video/VideoCamera";
import ShortVideoCamera from "./video/ShortVideoCamera";
import ShowImage from "./photo/ShowImage";

function MyCamera({ navigation }) {
    const [togglePhotoVideoShort, setTogglePhotoVideoShort] = useState("photo");

    switch (togglePhotoVideoShort) {
        case "photo":
            return (
                <PhotoCamera setTogglePhotoVideoShort={setTogglePhotoVideoShort} />
            );
        case "video":
            return (
                <VideoCamera setTogglePhotoVideoShort={setTogglePhotoVideoShort} />
            );
        case "ShortVideoCamera":
            return (
                <ShortVideoCamera setTogglePhotoVideoShort={setTogglePhotoVideoShort} />
            );
        case "ShowImage":
            return <ShowImage setTogglePhotoVideoShort={setTogglePhotoVideoShort} />;

        default:
            return (
                <PhotoCamera setTogglePhotoVideoShort={setTogglePhotoVideoShort} />
            );
    }
}

export default MyCamera;
