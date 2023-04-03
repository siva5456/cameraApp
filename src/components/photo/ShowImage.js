import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
    StatusBar,
    FlatList,
    Dimensions,
} from "react-native";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const screenDimensions = Dimensions.get("screen");

function ShowImage({ setTogglePhotoVideoShort }) {
    const [album, setAlbum] = useState([]);
    const [pic, setPic] = useState(null);
    // let picRef = useRef();
    // console.log(pic);
    // console.log(pic);

    // console.log(screenDimensions);
// rn fetch blob
    const getAlbum = async () => {
        const DCIM = await MediaLibrary.getAlbumAsync("DCIM");
        // console.log(DCIM);
        // alert('rendered')

        if (DCIM) {
            const response = await MediaLibrary.getAssetsAsync(DCIM.id);
            // console.log(response.assets[0]);
            setAlbum(response.assets);
        }
    };

    // console.log("==================");
    // console.log(album);

    useEffect(() => {
        getAlbum();
    }, []);

    let sharePic = () => {
        if(pic){
            console.log(pic.uri);

            // shareAsync(pic.uri).then(() => { });
        }
    };

    if (album.length === null) {
        // console.log(album);
        <SafeAreaView style={styles.SafeAreaView}>
            <View
                style={{ flex: 0.1, backgroundColor: "#fff", justifyContent: "center" }}
            >
                <Pressable onPress={() => setTogglePhotoVideoShort("photo")}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Back</Text>
                </Pressable>
            </View>
            <View style={{ backgroundColor: "#fff" }}>
                <Text>No photos yet</Text>
            </View>
        </SafeAreaView>;
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View
                style={{
                    flex: 0.1,
                    backgroundColor: "#fff",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                }}
            >
                <Pressable onPress={() => setTogglePhotoVideoShort("photo")}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Back</Text>
                </Pressable>
                <Pressable onPress={sharePic}>
                    {/* <Text style={{ fontSize: 18, fontWeight: "bold" }}>Back</Text> */}

                    <Image
                        style={{ height: 30, width: 30 }}
                        source={{
                            uri: "https://img.icons8.com/material-sharp/1x/share-rounded.png",
                        }}
                    />
                </Pressable>
            </View>

            <View style={styles.container}>
               {album && <FlatList
                    horizontal
                    data={album}
                    renderItem={({ item }) => {
                        // console.log(item);
                        return (
                            // <Pressable   onTouchMove={()=>setPic(item.uri)}>

                            <Image
                                onTouchMove={() => setPic(item)}
                                // ref={picRef.current = item.uri}
                                style={{
                                    alignSelf: "stretch",
                                    height: 240,
                                    width: screenDimensions.width - 10,
                                    margin: 5,
                                }}
                                source={{
                                    uri: item.uri,
                                }}
                            />
                            //    </Pressable>
                        );
                    }}
                />}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        // padding:5,
    },
    SafeAreaView: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "transparent",
    },
});

export default ShowImage;