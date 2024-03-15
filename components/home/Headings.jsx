import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './headings.style'
import {Ionicons} from "@expo/vector-icons"
import {COLORS} from "../../constants"
import { useNavigation } from '@react-navigation/native'

const Headings = ({ supplierId, userLogin }) => {
  const navigation = useNavigation();
  //console.log("supplierID in Heading: ", supplierId);
  //console.log("userLogin in Heading: ",userLogin)

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Buy and sell</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("NewRivals", {
            supplierId: supplierId,
            userLogin: userLogin
          });
        }}>
            <Ionicons name='ios-grid' size={24} color={COLORS.primary} />
            </TouchableOpacity>
        </View> 
    </View>
  )
}

export default Headings