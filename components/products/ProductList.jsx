import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import useFetch from '../../hook/useFetch';
import {COLORS, SIZES} from  "../../constants";
import styles from './productList.style'; 
import ProductCardView  from "./ProductCardView"
import { useFocusEffect } from '@react-navigation/native';

const ProductList = ({navigation, supplierId, userLogin}) => {
    //console.log("supplierID in Product List: ", supplierId);
    //console.log("userLogin in Products List: ",userLogin)

    const {data, isLoading, error, refetch } = useFetch({ supplierId, userLogin });
    if(isLoading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={SIZES.xxLarge} 
                color={COLORS.primary} />
            </View>
        );
    
    }

    /* useFocusEffect(
        React.useCallback(() => {
          refetch();
        }, [])
      ); */

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={({item}) => (<ProductCardView  item={item}/>)}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={()=> <View style={styles.separator}/>}
            />
        </View>
    )
}

export default ProductList
