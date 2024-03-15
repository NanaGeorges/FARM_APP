import { TouchableOpacity, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import {Ionicons} from  '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles  from './newRivals.style'
import { COLORS, SIZES } from '../constants';
import ProductCardView from '../components/products/ProductCardView';
import useFetchCategory from '../hook/useFetchCategory'
import useFetchMyPosts from '../hook/useFetchMyPosts';


const MyPosts = ({navigation, route}) => {

  // Extracting the selectedItem parameter from the route prop
  const { selectedItem } = route.params;
  const supplierId=selectedItem
  console.log('iciiiiiii',supplierId)
  //await wait(1000); // Wait for 3 seconds (3000 milliseconds)
  
  const {data, isLoading, error } = useFetchMyPosts({supplierId});
    if(isLoading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={SIZES.xxLarge} 
                color={COLORS.primary} />
            </View>
        );
    
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.upperRow}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name='chevron-back-circle' 
                    size={30} color={COLORS.lightWhite}/>
                </TouchableOpacity>

                <Text style={styles.heading}> My Posts </Text>
            </View>
            {/* <ProductList/> */}
            <Text style={{height: 30}}> </Text>


            <View style={styles.containerFlatlist}>
              <FlatList
                  data={data}
                  numColumns={2}
                  renderItem={({item}) => (<ProductCardView  item={item}/>)}
                  contentContainerStyle={styles.container}
                  ItemSeparatorComponent={()=> <View style={styles.separator}/>}
              />
            </View>  
        </View>
    </SafeAreaView>
  )
}

export default MyPosts

//const styles = StyleSheet.create({})