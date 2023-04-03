import { StyleSheet, Text, View, Button, Linking,Vibration } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRresults from "./QRresults";

export default function QRcodeScanner() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanData, setScanData] = useState();
    const [isUrl, setIsUrl] = useState();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Button
                    title="allow permission"
                    onPress={async () => (
                        (p = await BarCodeScanner.requestPermissionsAsync()),
                        setHasPermission(p.status === "granted")
                    )}
                />
            </View>
        );
    }

    if (scanData) {
        return (
          <QRresults scanData={scanData} setScanData={setScanData} /> 
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanData(data);
        console.log("data:" + data);
        console.log("type:" + type);
        Vibration.vibrate();
    };
    return (
        <View style={styles.baarCode_container}>
            <View style={{ height: 400, backgroundColor: "#fff" }}>
                <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
                    shouldRasterizeIOS
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    baarCode_container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
});
