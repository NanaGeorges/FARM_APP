import { View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import styles from './categoriesCardView.style';
import {Ionicons} from "@expo/vector-icons"; 
import {COLORS} from "../../constants";
import { useNavigation } from '@react-navigation/native';

const CategoriesCardView = ({item}) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={()=> navigation.navigate("ProductDetails", {item} )} >
          <View style={styles.container}>
              <View style={styles.imageContainer}>
                      <Image source={{
                      uri: item.imageUrl }} 
                      style={styles.image}
                      /> 
              </View>
              <View style={styles.details}>
                  <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                  </Text>
              </View>
          </View>
      </TouchableOpacity>
    )
}

export default CategoriesCardView

