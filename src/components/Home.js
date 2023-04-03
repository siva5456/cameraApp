import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("camera")}
        title="open camera"
      />
      <View style={{ margin: 5 }} />

      <Button
        onPress={() => navigation.navigate("RecordAudio")}
        title="Record Audio"
      />
      <View style={{ margin: 5 }} />

      <Button
        onPress={() => navigation.navigate("QRcodeScanner")}
        title="QRcodeScanner"
      />

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
});
