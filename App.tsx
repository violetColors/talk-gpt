import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
import { useVoiceRecognition } from "./hooks/useVoiceRecognition";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  staysActiveInBackground: false,
  playsInSilentModeIOS: true,
  shouldDuckAndroid:true,
  playThroughEarpieceAndroid: false,
})

export default function App() {
  const [borderColor, setBorderColor] = useState<"lightgray" | "lightgreen">(
    "lightgray"
    );
 const { state, startRecognizing, stopRecognizing, destroyRecognizer } =
    useVoiceRecognition();
  
    const handleSubmit = async () => {
        if (!state.results[0]) return;
      try {
        /// fetch the audio blob
        const audioBlob = await fetchAudio(state.results[0])

        const reader = new FileReader()
        reader.onload = async(e) => {
          if(e.target && typeof e.target.result === "string"){
            // data:audio/mpeg;base64,....factual base64 data)...
            const audioData = e.target.result.split(",")
          }

        }


      } catch (e){
        console.log(e)
      }
    }


  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 32, fontWeight:"bold",
    marginBottom:30
    }}>Talk GPT
    </Text>
    <Text 
    style={{
      textAlign: "center",
      color: "#33333",
      marginVertical: 5,
      fontSize:12,
    }}
    >Press and hold this button to record your voice
    </Text>
  
    <Text style={{ marginVertical: 10, fontSize: 17}}>Your message:</Text>
    <Pressable
    onPressIn={()=> {
      setBorderColor("lightgreen");
      startRecognizing();
    }}
    onPressOut={()=>{
      setBorderColor("lightgray");
      stopRecognizing();
      // handleSubmit();
    }}
    style={{
      width:"90%",
      padding:30,
      gap:10,
      borderWidth:3,
      alignItems: "center",
      borderRadius:10,
      borderColor: borderColor,
    }}
    >
      <Text>Hold to Speak</Text>
    </Pressable>
    <Text style={{ marginVertical: 10, fontSize: 17}}>
      {JSON.stringify(state, null, 21)}</Text>
    <Button title="Relpy last message" onPress={() => {}} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
