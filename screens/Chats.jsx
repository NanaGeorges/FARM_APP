import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {COLORS, SIZES} from  '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Chats = () => {


  return (
    <SafeAreaView style={styles.area}>
          <StatusBar hidden/>
          <View style={styles.container}>
              {/*  {renderContent()} */}
          </View>
    </SafeAreaView>
  )
}

export default Chats

const styles = StyleSheet.create({})