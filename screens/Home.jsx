import { RefreshControl,TouchableOpacity, Text, View, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Ionicons, Fontisto} from  '@expo/vector-icons';  // Import a component to display an icon.
import styles from './home.style';
import { Welcome, Headings, ProductRow, Categories } from '../components';
import Carousel from '../components/home/Carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';


//import Headings from '../components/home/Headings';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
  const [userData, setUserData] = useState(null)
  const [userLogin, setUserLogin] = useState(false)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Fetch new data from the server
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  
  useEffect(()=>{
    checkExistingUser();
  },[]);

  /* const checkExistingUser = async()=>{
      const id= await AsyncStorage.getItem('id')
      //const userId = `user${JSON.parse(id)}`;

      const parsedId = JSON.parse(id);
       const userId = `user${parsedId._id}`;
   

      try{
        const currentUser = await AsyncStorage.getItem(userId);
        
        if (currentUser !== null){
          const parsedData = JSON.parse(currentUser)
          setUserData(parsedData)
          setUserLogin(true)
        }
      }catch(error){
        console.log("Error retrieving the data", error)
      }
  }; */

  
  const checkExistingUser = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
  
      // Logging id to ensure it's not null
      console.log('id:', id);
  
      if (id !== null) {
        const parsedId = JSON.parse(id);
        // Logging parsedId to ensure it's not null
        //console.log('parsedId:', parsedId);
  
        const userId = `user${parsedId._id}`;
        const currentUser = await AsyncStorage.getItem(userId);
  
        if (currentUser !== null) {
          const parsedData = JSON.parse(currentUser);
          setUserData(parsedData);
          setUserLogin(true);
        }
      }
    } catch (error) {
      console.log("Error retrieving the data", error);
    }
  };
  
 
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>

        <View style={styles.appBar}>

          <Ionicons name='location-outline' size={24}/>
         
          <Text style={styles.location} >{ userData ? userData.location : 'Bangalore'} </Text>

          <View style={{alignItems:"flex-end"}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}> 8 </Text>
            </View>
            <TouchableOpacity>
              <Fontisto name='shopping-bag' size={24}/>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
         <Welcome/>
        <Carousel/> 
        <Categories/>
        <Headings/> 
        <ProductRow/> 
         <Text style={{paddingVertical: 50 }}>    </Text>
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default Home
