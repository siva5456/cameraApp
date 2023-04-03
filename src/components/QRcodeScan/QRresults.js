import { StyleSheet, Text, View, Button, Linking, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

function QRresults({ scanData, setScanData }) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <View style={{ flex: 0.1 }}></View>
            {`${scanData.substr(0, 4)}` === `http` ? (
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                }} >
                    <Text>{scanData} </Text>
                    <View style={{ margin: 10 }} />

                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: "rgb(3, 179, 249)",
                            padding: 10,
                            width: 200,
                        }}
                        onPress={() => {
                            Linking.openURL(scanData);
                        }}
                    >
                        <Text
                            style={{
                                color: "rgb(3, 179, 249)",
                                fontSize: 17,
                                textAlign: "center",
                            }}
                        >
                            open Url ?
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text>copy rusult </Text>
                    <View style={{ margin: 10 }} />
                    <Text selectable={true}>{scanData} </Text>
                </View>
            )}

            <View style={{ margin: 10 }} />
            <Button title="Scan Again" onPress={() => setScanData(undefined)} />
        </View>
    )
}

export default QRresults