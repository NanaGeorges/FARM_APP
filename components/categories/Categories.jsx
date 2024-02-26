import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import useFetch from '../../hook/useFetch';
import {COLORS, SIZES} from  "../../constants/index";
import styles from './categories.style'; 
import CategoriesCardView from './CategoriesCardView';

const Categories = () => {
    const {data, isLoading, error } = useFetch();
    if(isLoading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={SIZES.xxLarge} 
                color={COLORS.primary} />
            </View>
        );
    
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={3}
                renderItem={({item}) => (<CategoriesCardView  item={item}/>)}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={()=> <View style={styles.separator}/>}
            />
        </View>
    )
}

export default Categories

