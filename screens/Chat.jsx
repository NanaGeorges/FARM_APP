import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants'
import { icons, images } from '../constants'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import styles from './chat.style'
//import {GiftedChat} from  'react-native-gifted-chat'


const Chat = ({ navigation, route }) => {

  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const scrollViewRef = useRef();

  // Extracting the selectedItem parameter from the route prop
  const { selectedItem } = route.params;
  const userName=selectedItem?.fullName;
  const isOnline=selectedItem?.isOnline

  const giftedChatRef = useRef();
  

  // Function to handle the sending of messages
  const handleInputText = (text) => {
    setInputMessage(text);
  }

  const renderMessage = (props) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 1) {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: COLORS.primary,
                marginRight: SIZES.small,
                marginVertical: 12,
              }
            }}
            textStyle={{
              right: {
                color: COLORS.lightWhite,
              }
            }}
          />

        </View>
      )
    }
  }

  //Function to handle sending a message 1
  /* const submitHandler = () => {
    const message = {
      _id: Math.random().toString(36).toString(7),
      text: inputMessage,
      createdAt: new Date().getTime(),
      user: { _id: 1 }
    }

    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, [message]))
    setInputMessage('')
  } */

 // Function to handle sending a message 2
   const submitHandler = () => {
    //console.log("Submit button pressed");
    const newMessage = {
      _id: Math.random().toString(36).substr(2, 9),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 }
    };
    //console.log("New Message:", newMessage); // Add this line to check the new message object

    // Update the messages state with the new message
    setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));

    // Clear the input message
    setInputMessage('');
  };  

   // Function to handle sending a message 3
  /*   const submitHandler = (newMessages) => {
    if (!newMessages || !Array.isArray(newMessages)) {
      // Handle the case where newMessages is undefined or not an array
      return;
    }
  
    const formattedMessages = newMessages.map((message) => ({
      ...message,
      _id: message._id || Math.random().toString(36).substr(2, 9),
      text: inputMessage,
      createdAt: new Date().getTime(),
      user: { _id: 1 }
    }));
    
    setMessages((previousMessages) => GiftedChat.append(previousMessages, formattedMessages));
    setInputMessage('');


     /*   // Check if the ref is available before calling scrollToBottom
      if (giftedChatRef.current) {
        giftedChatRef.current.scrollToBottom();
      }  
  };  */
  
  

  return (


    <KeyboardAvoidingView
      style={{ flex: 1, }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.secondary,


      }}>

        {/* Render Header  */}

        <View style={{
          flexDirection: 'row',
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: COLORS.secondary,
          borderBottomWidth: 2,
          borderBottomColor: COLORS.primary,
          
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginHorizontal: SIZES.small }}
            >
              <Image
                source={icons.back}
                resizeMode='contain'
                style={{
                  height: 24,
                  width: 24,
                  tintColor: COLORS.primary
                }}
              />
            </TouchableOpacity>
            <View>
              {isOnline && isOnline === true && (
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 4,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: COLORS.primary,
                  zIndex: 999,
                  borderWidth: 2,
                  borderColor: COLORS.lightWhite
                }} />
              )}
              <Image
                source={selectedItem.userImg}
                resizeMode='contain'
                style={{
                  height: 58,
                  width: 58,
                  borderRadius: 999
                }}
              />
            </View>

            <View style={{ marginLeft: 16 }}>
              <Text style={{
                fontFamily: 'bold',
                fontSize: SIZES.small + 2,
                lineHeight: 20,
                color: 'black'
              }}>
                {userName}
              </Text>
              <Text style={{
                fontFamily: 'regular',
                fontSize: SIZES.small,
                color: COLORS.primary
              }}>
                {isOnline && isOnline === true ? (
                  <Text>Online</Text>
                ) : <Text>Not Connected</Text> }
              </Text>
            </View>
          </View>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
          }}>

            {/* Video call button */}

            {/* <TouchableOpacity style={{
              marginHorizontal: SIZES.small
            }}>
              <Feather
                name="video"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity> */}

            {/* phone call button */}

            <TouchableOpacity style={{
              marginHorizontal: SIZES.small
            }}>
              <Feather
                name="phone"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>


          </View>
        </View>

        {/* Render Chats  */}

        {/* <View style={{ flex: 1,  flex: 1, 
                backgroundColor: COLORS.lightWhite, 
                borderRadius: SIZES.xxLarge, 
                overflow: 'hidden',}}>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
              <View style={{ paddingBottom: 10 }}>
                <GiftedChat
                  messages={messages}
                  renderInputToolbar={() => null}
                  user={{ _id: 1 }}
                  renderMessage={renderMessage}
                />
              </View>
            </ScrollView>
          </View> */}

         <View style={{ 
          flex: 1, 
          backgroundColor: COLORS.lightWhite, 
          borderRadius: SIZES.xxLarge, 
          overflow: 'hidden' 
          }}>
            <GiftedChat
              messages={messages}
              renderInputToolbar={() => { return null; }}
              user={{ _id: 1 }}
              minInputToolbarHeight={0}
              renderMessage={renderMessage}

              /*     //onSend={(newMessages) => submitHandler(newMessages)}
                  ref={giftedChatRef}
                  onLayout={() => {
                    // Ensure the ref is assigned once the GiftedChat component is mounted
                    giftedChatRef.current.scrollToBottom();
                  }} */
            />
        </View> 


        {/* Render input bar  */}

        <View style={styles.inputContainer}>
          <View style={styles.inputMessageContainer}>
            <TextInput
              style={styles.input}
              placeholder='Type a message'
              placeholderTextColor={COLORS.gray}
              value={inputMessage}
              onChangeText={handleInputText}
            />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <TouchableOpacity style={{
                marginHorizontal: 16,
              }}>
                <Image
                  source={icons.camera}
                  resizeMode='contain'
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={icons.stickyNote}
                  resizeMode='contain'
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary
                  }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={submitHandler}
              style={styles.sendButton}>
              <FontAwesome
                name='send'
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>

    </KeyboardAvoidingView>


  )
}

export default Chat

