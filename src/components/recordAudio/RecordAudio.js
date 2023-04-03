import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Audio, Video } from "expo-av";
import * as Sharing from "expo-sharing";
import TimeCounter from "../video/TimeCounter";

export default function RecordAudio() {
  const [isrecording, setIsRecording] = useState(undefined);
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState(null);


  useEffect(()=>{
(async()=>{
  const permission = await Audio.requestPermissionsAsync();
  // console.log('====================================');
  // console.log(permission);
  // console.log('====================================');
})()
  },[])

  const StartRecording = async () => {
    setMessage(null);

    try {
      const permission = await Audio.requestPermissionsAsync();
      // console.log(permission);

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setIsRecording(recording);
        // console.log('====================================');
        // console.log("recording");
        // console.log('====================================');
        setMessage(null);
      }
    } catch (e) {
      setMessage("please grant permission to app to access microphone");
      alert(e.toString());
    }
  };
  const StopRecording = async () => {
    await isrecording.stopAndUnloadAsync();
    let updatedRecordings = [...recordings];
    const { sound, status } = await isrecording.createNewLoadedSoundAsync();

    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: isrecording.getURI(),
    });
    setIsRecording(undefined);

    setRecordings(updatedRecordings);
  };

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingList() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={{ padding: 5 }}>
          <Video
            style={{
              height: 80,
              width: 300,
              borderWidth: 1,
              borderColor: "black",
              backgroundColor: "black",
            }}
            source={{ uri: recordingLine.file }}
            useNativeControls
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            isLooping
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                textAlignVertical: "center",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              {" "}
              🎧{" "}
            </Text>
          </Video>
          <View style={styles.row}>
            <Text style={styles.fill}>
              Recording: {index + 1} Duration:{recordingLine.duration}
            </Text>

            {/* <Button
            color="green"
            title="play"
            onPress={() => recordingLine.sound.replayAsync()}
          /> */}

            <View style={{ marginHorizontal: 3 }} />
            <Button
              style={styles.button}
              onPress={() => Sharing.shareAsync(recordingLine.file)}
              title="Share"
            />
          </View>
        </View>
      );
    });
  }

  return (
    <>
      <SafeAreaView style={styles.SafeAreaView} />

      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>
          {message && <Text>{message}</Text>}
          {isrecording && !message ? (
            <TimeCounter val={0} />
          ) : (
            <View style={{ height: 32 }} />
          )}
          {!message && (
            <Button
              color={isrecording ? "crimson" : ""}
              title={isrecording ? "Stop Recording" : "Start Recording"}
              onPress={isrecording ? StopRecording : StartRecording}
            />
          )}
          {!message && getRecordingList()}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});
