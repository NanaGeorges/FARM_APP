import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import ProductCardView from './ProductCardView';
import styles from  "./productRow.style";
import useFetchRow from '../../hook/useFetch';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';



const ProductRow = ({ supplierId, userLogin, offline}) => {
  //console.log("supplierID in  Products Row: ", supplierId);
  //console.log("userLogin in Products Row: ",userLogin)
  
  const {data, isLoading, error, refetch} = useFetchRow({ supplierId, userLogin, offline})

  /* useEffect(() => {
    // Call refetch function from useFetch whenever supplierId changes
    refetch();
  }, [supplierId]); // Dependency array
  
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  ); */
  //const products = [1,2,3,4];
  
  return (
    <View style={styles.container}> 
        {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ): error ? (
        <Text> Something went wrong </Text>
      ):(
        <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ProductCardView item={item} /> }
        horizontal
        contentContainerStyle= {{ columnGap: SIZES.medium}}
        showsHorizontalScrollIndicator= {false}
      />
    )}
    </View>
  );
};

export default ProductRow;