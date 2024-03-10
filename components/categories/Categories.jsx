import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import useFetch from '../../hook/useFetch';
import {COLORS, SIZES} from  "../../constants/index";
import styles from './categories.style'; 
import CategoriesCardView from './CategoriesCardView';
import { useNavigation } from '@react-navigation/native';

const DATA = [
    { id: '1', title: 'Vegetables', image: require('../../assets/images/categories/vegetables.jpg') },
    { id: '2', title: 'Live Stock', image: require('../../assets/images/categories/livestock.jpg') },
    { id: '3', title: 'Tools', image: require('../../assets/images/categories/tools.jpg') },
    { id: '4', title: 'Raw Meat', image: require('../../assets/images/categories/rawmeat.jpg') },
    { id: '5', title: 'Fertiliser', image: require('../../assets/images/categories/fertiliser.jpg') },
    { id: '6', title: 'Seeds', image: require('../../assets/images/categories/seeds.jpg') },
  ];
 


  const Item = ({ title, image}) => (
    
    <TouchableOpacity >
          <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
              </View>
          </View>
      </TouchableOpacity>

   // <View style={styles.item}>
   //   <Image source={image} style={styles.image} />
    //  <Text style={styles.title}>{title}</Text>
  //  </View>
  );

const Categories = () => {
   /*  const {data, isLoading, error } = useFetch();
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
    ) */

    const renderItem = ({ item }) => (
        <Item title={item.title} image={item.image} />
      );
    
      return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CATEGORIES</Text>
            </View> 
            <View style={styles.containerFlatlist}>
                <FlatList
                    data={DATA}
                   // numColumns={3}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    contentContainerStyle={styles.containerFlatlist}
                    ItemSeparatorComponent={()=> <View style={styles.separator}/>}
                />
            </View>
        </View>
      );
}

export default Categories

