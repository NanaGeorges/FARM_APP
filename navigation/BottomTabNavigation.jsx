import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../screens/Home';
// import Search from  '../screens/Search';
// import Profile from  '../screens/Profile';
import { Home, Search, Profile, Sell, Chats} from '../screens';
import {  Ionicons } from '@expo/vector-icons';
import { COLORS } from "../constants/index"
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70
    }
}

const BottomTabNavigation = () => {

    const [userData, setUserData] = useState(null)
    const [userLogin, setUserLogin] = useState(false)
    //console.log('userData in bottom nav with s: ', userData);
    //console.log('userLogin in bottom nav with s: ', userLogin);
    const isFocused = useIsFocused()
  
    const checkExistingUser = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
    
        // Logging id to ensure it's not null
        //console.log('id in bottom nav', id);
    
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
    
    useEffect(()=>{
      checkExistingUser();
     // console.log(userData._id);
    },[!userData]);
  
    useEffect(()=>{
      if(isFocused){
        checkExistingUser();
       // refetch()
      }
     // console.log(userData._id);
    },[isFocused && !userData]);


  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
           
            tabBarIcon: ({focused}) => {
                return <Ionicons name={focused ? "home"  : "home-outline"} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.gray2} 
                />
            }
        }}
        />

        {/* <Tab.Screen 
        name="Chats" 
        component={Chats}
        options={{
            
            tabBarIcon: ({focused}) => {
                return <Ionicons name={'chatbubbles'} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.gray2} 
                />
            }
        }}
        /> */}

          {userData && (
              <Tab.Screen
                  name="Chats"
                  component={Chats}
                  options={{
                      tabBarIcon: ({ focused }) => (
                          <Ionicons
                              name={'chatbubbles'}
                              size={24}
                              color={focused ? COLORS.primary : COLORS.gray2}
                          />
                      )
                  }}
              />
          )}
        
        
        <Tab.Screen 
        name="Search" 
        component={Search}
        options={{
            
            tabBarIcon: ({focused}) => {
                return <Ionicons name={'search-sharp'} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.gray2} 
                />
            }
        }}
        />

        <Tab.Screen 
        name="Sell" 
        component={Sell}
        options={{
            
            tabBarIcon: ({focused}) => {
                return <Ionicons name={'ios-add-circle'} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.gray2} 
                />
            }
        }}
        />

        <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
           
            tabBarIcon: ({focused}) => {
                return <Ionicons name={focused ? "person"  : "person-outline"} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.gray2} 
                />
            }
        }}
        />

    </Tab.Navigator>
  )
}

export default BottomTabNavigation

