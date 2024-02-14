import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as splashScreen from "expo-splash-screen"
import { useCallback } from 'react';


export default function App() {

// load our fonts

const [fontsLoaded] = useFonts({
  regular: require("./assets/fonts/Poppins-Regular.ttf"),
  ligth: require("./assets/fonts/Poppins-Light.ttf"),
  bold: require("./assets/fonts/Poppins-Bold.ttf"),
  medium: require("./assets/fonts/Poppins-Medium.ttf"),
  extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
  semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
})

const onLayoutRootView = useCallback(async() => {
  if(fontsLoaded){
    await splashScreen.hideAsync();
  }
},[fontsLoaded]);

if(!fontsLoaded){
  return null; // we'll render nothing until the fonts are loaded
}

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: "regular",
    fontSize: 20,
  }
});
