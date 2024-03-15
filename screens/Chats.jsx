import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { messagesData, users } from '../data'
import { icons} from '../constants'
import styles from  './chats.style'

const Chats = ({ navigation }) => {

  const [search, setSearch] = useState()
  const [filteredUsers, setFilteredUsers] = useState(messagesData)

  const handleSearch = (text)=>{
    setSearch(text);

    const filteredData = messagesData.filter((user)=>
    user.fullName.toLowerCase( ).includes( text.toLowerCase()));
    setFilteredUsers(filteredData);
  }


  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate("Chat", { selectedItem : item })}
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
          width: SIZES.width - 104,
          justifyContent: "space-between"
        }
      }>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{item.fullName}</Text>
          <Text style={styles.lastSeen}>{item.lastMessage}</Text>
        </View>

        <View style={{
          position: 'absolute',
          right: 2,
          alignItem: 'center'
        }}>
          <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
          <View>
            <TouchableOpacity style={{
              width: 20,
              height: 20,
              borderRadius: SIZES.small,
              backgroundColor: item.messageInQueue ? COLORS.gray : 'transparent',
              justifyContent: 'center',
              alignItems: "center",
              marginTop: SIZES.small,
              marginRight: 12,
            }}>
              <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    </TouchableOpacity>
  )

  /**
   * Render Chat Content
   */

  const renderContent = () => {
    return (
      <View style={{marginBottom: 5}}> 
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
            value={search}
            onChangeText={handleSearch} 
          />
          <TouchableOpacity>
            <Image
              //source={require('../assets/icons/edit-pencil.png')}
              source={icons.editPencil}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.gray
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Render Flatlist  */}
        <View>
          <FlatList
            data={filteredUsers}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

      </View>
    )
  }

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar hidden />
      <View style={styles.container}>
        {renderContent()}
      </View>
    </SafeAreaView>
  )
}

export default Chats

