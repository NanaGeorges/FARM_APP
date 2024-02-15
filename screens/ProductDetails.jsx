import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Ionicons} from  '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './productDetails.style'
import { COLORS } from '../constants';


const ProductDetails = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.upperRow}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name='chevron-back-circle' size={30}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name='heart' size={30} color={COLORS.primary}/>
            </TouchableOpacity>
        </View>
        <Image
            source={{uri: "https://d326fntlu7tb1e.cloudfront.net/uploads/5d445b91-c01a-4564-8ff8-c27c2b88ea5b-fn7.png"}}
            style={styles.image}
        />

        <View style={styles.details}>
            <View style={styles.titleRow}></View>
        </View>
        
    </View>
  )
}

export default ProductDetails