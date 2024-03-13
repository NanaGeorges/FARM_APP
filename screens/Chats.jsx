import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {COLORS, SIZES} from  '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {Ionicons} from  '@expo/vector-icons';
import {messagesData, users} from '../data'
import {icons, images} from '../constants'

const Chats = ({ navigation }) => {

  const [search, setSearch]= useState()

  const renderItem = ({ item, index }) => (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate("Chat", { username: item.fullName })}
        style={[
          styles.userContainer,
          index % 2 !== 0 ? styles.oddBackground : null
        ]}
      >
        <View style={styles.userImageContainer}>
          {item.isOnline && item.isOnline === true && (
            <View style={styles.onlineIndicator} />
          )}
          <Image
            source={item.userImg}
            resizeMode='contain'
            style={styles.userImage}
          />
        </View>

        <View style={
          {
            flexDirection: 'row',
            width: SIZES.width -104,
          }
        }>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{item.fullName}</Text>
            <Text style={styles.lastSeen}>{item.lastMessage}</Text>
          </View>

          <View style={{
            position: 'absolute',
            right: 4,
            alignItem: 'center'
          }}>
          <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
          </View>
          
          <TouchableOpacity style={{
            width: 20,
            height: 20,
            borderRadius: SIZES.small,
            backgroundColor: COLORS.gray,
            justifyContent:'center',
            alignItems: "center",
            marginTop: SIZES.small,
          }}>
            <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
          </TouchableOpacity>

        </View>

      </TouchableOpacity>
    )
 
  /**
   * Render Chat Content
   */

  const renderContent =()=>{
    return (
      <View>
        <View style={styles.searchBar}>
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={28}
              color={COLORS.gray} 
              />            
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder='Search contacts...'
          />
          <TouchableOpacity>
             <Image
               //source={require('../assets/icons/edit-pencil.png')}
               source={icons.editPencil}
               resizeMode='contain'
               style={{
                width:30, 
                height:30,
                tintColor: COLORS.gray
              }}
             />         
          </TouchableOpacity>
        </View>

        {/* Show Contacts List if Search is Empty */}  
       <View>
        <FlatList
          data={messagesData}
          showsVerticalScrollIndicator= {false}
          renderItem={renderItem}
          keyExtractor={(item)=>item.id.toString()}
        />
       </View>

      </View> 
    )
  }

  return (
    <SafeAreaView style={styles.area}>
          <StatusBar hidden/>
          <View style={styles.container}>
              {renderContent()}
          </View>
    </SafeAreaView>
  )
}

export default Chats

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  container:{
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: 16,
  },
  searchBar:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    width: SIZES.width - 32,
    height: 50,
    marginVertical: 22,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput:{
    flex: 1,
    height: "100%",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
  }
})