import { View, Text, TouchableOpacity, Image, Touchable } from 'react-native'
import React from 'react'
import styles from './productCardView.style'
import {Ionicons} from "@expo/vector-icons"; 
import {COLORS} from "../../constants";
import { useNavigation } from '@react-navigation/native';



const ProductCardView = ({item}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("ProductDetails")} >
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                    <Image source={{uri: "https://d326fntlu7tb1e.cloudfront.net/uploads/5d445b91-c01a-4564-8ff8-c27c2b88ea5b-fn7.png"}} 
                    style={styles.image}
                    /> 
            </View>
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.supplier} numberOfLines={1}>
                    {item.supplier}
                </Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
                    <Ionicons  name="add-circle" size={35} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
  )
}

export default ProductCardView