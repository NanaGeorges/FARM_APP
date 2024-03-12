import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import {COLORS, SIZES} from  "../../constants/index";
import styles from './categories.style'; 
import { useNavigation } from '@react-navigation/native';
import { getDocs, getFirestore, collection, addDoc } from  'firebase/firestore';
import { app } from '../../firebaseConfig';


/* 
 const DATA = [
    { id: '1', title: 'Vegetables', image: require('../../assets/images/categories/vegetables.jpg') },
    { id: '2', title: 'Live Stock', image: require('../../assets/images/categories/livestock.jpg') },
    { id: '3', title: 'Tools', image: require('../../assets/images/categories/tools.jpg') },
    { id: '4', title: 'Raw Meat', image: require('../../assets/images/categories/rawmeat.jpg') },
    { id: '5', title: 'Fertiliser', image: require('../../assets/images/categories/fertiliser.jpg') },
    { id: '6', title: 'Seeds', image: require('../../assets/images/categories/seeds.jpg') },
  ]; */
 


 /*  const Item = ({ title, image}) => (
    
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

  ); */

const Categories = () => {
  
   /*  const renderItem = ({ item }) => (
        <Item title={item.title} image={item.image} />
      ); */

      const navigation = useNavigation();
      const db = getFirestore(app);

      const [categoryList, setCategoryList]=useState([]);
      useEffect(()=>{
        getCtaegoryList()
      },[])
  
      // use to get category list
      const getCtaegoryList= async ()=> {
          setCategoryList([])
          const querySnapshot = await getDocs(collection(db,"category"));
          querySnapshot.forEach((doc)=>{
           // console.log("Docs:",doc.data())
            setCategoryList(categoryList =>[...categoryList, doc.data()])
          })
        }
    
      return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CATEGORIES</Text>
            </View> 
            <View style={styles.containerFlatlist}>
                <FlatList
                    data={categoryList}
                    //renderItem={renderItem}
                    renderItem={({item,index})=>(
                      <TouchableOpacity onPress={()=> navigation.navigate('ProductsListsByCategory',{ selectedItem: item })}>
                          <View style={styles.container}>
                              <View style={styles.imageContainer}>
                                  <Image source={{uri:item.icon}}
                                      style={styles.image}
                                  />
                              </View>
                              <View style={styles.details}>
                                  <Text style={styles.title}>{item.name}</Text>
                              </View>
                          </View>
                      </TouchableOpacity>
                  )}
                  showsHorizontalScrollIndicator= {false}
                   // keyExtractor={item => item.index}
                    horizontal
                    contentContainerStyle={styles.containerFlatlist}
                    ItemSeparatorComponent={()=> <View style={styles.separator}/>}
                />
            </View>
        </View>
      );
} 




/* const Categories = () => {

    const BottomFlatlist = ()=>{
        return(
          <View>
            <Headings/>
            <ProductRow/>
            <Text style={{paddingVertical: 50 }}>    </Text>
          </View>
        )
      }
    const TopFlatlist = ()=>{
        return(
          <View>
            <Welcome/>
            <Carousel/>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CATEGORIES</Text>
            </View>
          </View>
        )
    }

    const db = getFirestore(app);

    const [categoryList, setCategoryList]=useState([]);
    useEffect(()=>{
      getCtaegoryList()
    },[])

    // use to get category list
    const getCtaegoryList= async ()=> {
        setCategoryList([])
        const querySnapshot = await getDocs(collection(db,"category"));
        querySnapshot.forEach((doc)=>{
          console.log("Docs:",doc.data())
          setCategoryList(categoryList =>[...categoryList, doc.data()])
        })
      }

      return (
        <View> 
            <View style={styles.containerFlatlist}>
                <FlatList
                    data={categoryList}
                    numColumns={3}
                    renderItem={({item,index})=>(
                        <TouchableOpacity 
                        style={{ marginHorizontal: 12,flex:1, justifyContent:'center', backgroundColor: COLORS.secondary, borderRadius: 16, margin: 3}}>
                            <Image source={{uri:item.icon}}
                                style={styles.image}
                            />
                            <View style={styles.details}>
                                <Text style={styles.title}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    bounces= {false}
                    alwaysBounceHorizontal= 'false'
                    left
                    showsVerticalScrollIndicator= {false}
                    //keyExtractor={item => item.index}
                    //horizontal
                    //contentContainerStyle={styles.containerFlatlist}
                    //ItemSeparatorComponent={()=> <View style={styles.separator}/>}
                    ListHeaderComponent={<TopFlatlist/>}
                    ListFooterComponent={<BottomFlatlist/>}
                />
            </View>
        </View>
      );
} */

export default Categories

