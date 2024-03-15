import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import {Ionicons} from  '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles  from './newRivals.style'
import { COLORS } from '../constants';
import ProductList  from '../components/products/ProductList';

const NewRivals = ({navigation, route}) => {
  const { supplierId, userLogin } = route.params;
  //console.log("supplierID in Newrivals: ", supplierId);
  //console.log("userLogin in NewRivals: ",userLogin)

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => {
            console.log("Navigating back with supplierId:", supplierId);
            navigation.goBack({ supplierId: supplierId });
          }}>
                <Ionicons name='chevron-back-circle' 
                    size={30} color={COLORS.lightWhite}/>
                </TouchableOpacity>

                <Text style={styles.heading}> Products </Text>
            </View>
            <ProductList navigation={navigation} supplierId={supplierId} userLogin={userLogin} />
        </View>
    </SafeAreaView>
  )
}

export default NewRivals

