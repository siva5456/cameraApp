import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
    StatusBar,
} from "react-native";
import { shareAsync } from "expo-sharing";

function ShowImage({ }) {
    let sharePic = () => {
        shareAsync().then(() => { });
    };

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.container}>
                <Image
                    style={{ alignSelf: "stretch", flex: 1 }}
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa7ObT7V5LMOQWpMfh10OxxF2VeWCNXszlq2oI7ivRJw&usqp=CAU&ec=48665701",
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 0.9,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    SafeAreaView: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "yellow",
    },
});

export default ShowImage;
