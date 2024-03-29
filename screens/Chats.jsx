import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
//import { messagesData, users } from '../data'
import { icons} from '../constants'
import styles from  './chats.style'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//firebase need
import { app } from '../firebaseConfig'
import {
  getDatabase,
  get,
  ref,
  set,
  onValue,
  push,
  update,
} from 'firebase/database';
//firebase need



// const Chats = ({ navigation }) => {

//   const [search, setSearch] = useState()
//   const [filteredUsers, setFilteredUsers] = useState(messagesData)

//   const handleSearch = (text)=>{
//     setSearch(text);

//     const filteredData = messagesData.filter((user)=>
//     user.fullName.toLowerCase( ).includes( text.toLowerCase()));
//     setFilteredUsers(filteredData);
//   }


//   const renderItem = ({ item, index }) => (
//     <TouchableOpacity
//       key={index}
//       onPress={() => navigation.navigate("Chat", { selectedItem : item })}
//       style={[
//         styles.userContainer,
//         index % 2 !== 0 ? styles.oddBackground : null
//       ]}
//     >
//       <View style={styles.userImageContainer}>
//         {item.isOnline && item.isOnline === true && (
//           <View style={styles.onlineIndicator} />
//         )}
//         <Image
//           source={item.userImg}
//           resizeMode='contain'
//           style={styles.userImage}
//         />
//       </View>

//       <View style={
//         {
//           flexDirection: 'row',
//           width: SIZES.width - 104,
//           justifyContent: "space-between"
//         }
//       }>
//         <View style={styles.userInfoContainer}>
//           <Text style={styles.userName}>{item.fullName}</Text>
//           <Text style={styles.lastSeen}>{item.lastMessage}</Text>
//         </View>

//         <View style={{
//           position: 'absolute',
//           right: 2,
//           alignItem: 'center'
//         }}>
//           <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
//           <View>
//             <TouchableOpacity style={{
//               width: 20,
//               height: 20,
//               borderRadius: SIZES.small,
//               backgroundColor: item.messageInQueue ? COLORS.gray : 'transparent',
//               justifyContent: 'center',
//               alignItems: "center",
//               marginTop: SIZES.small,
//               marginRight: 12,
//             }}>
//               <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
//             </TouchableOpacity>
//           </View>

//         </View>
//       </View>

//     </TouchableOpacity>
//   )

//   /**
//    * Render Chat Content
//    */

//   const renderContent = () => {
//     return (
//       <View style={{marginBottom: 5}}> 
//         <View style={styles.searchBar}>
//           <TouchableOpacity>
//             <Ionicons
//               name="search-outline"
//               size={28}
//               color={COLORS.gray}
//             />
//           </TouchableOpacity>
//           <TextInput
//             style={styles.searchInput}
//             placeholder='Search contacts...'
//             value={search}
//             onChangeText={handleSearch} 
//           />
//           <TouchableOpacity>
//             <Image
//               //source={require('../assets/icons/edit-pencil.png')}
//               source={icons.editPencil}
//               resizeMode='contain'
//               style={{
//                 width: 30,
//                 height: 30,
//                 tintColor: COLORS.gray
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Render Flatlist  */}
//         <View>
//           <FlatList
//             data={filteredUsers}
//             showsVerticalScrollIndicator={false}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//           />
//         </View>

//       </View>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.area}>
//       <StatusBar hidden />
//       <View style={styles.container}>
//         {renderContent()}
//       </View>
//     </SafeAreaView>
//   )
// }

// const Chats = ({ navigation, route }) => {

//   //const { users = [], myData = {} } = route.params;

//  // const { users, myData } = route.params;
//   const [userData, setUserData] = useState(null)
//   const [userLogin, setUserLogin] = useState(false)
//   //console.log('users in Chat with s: ', users);
//   //console.log('myData in Chat with s: ', myData);

//   //Firebase
//   //let users;
//   const [users, setUsers] = useState([])
//   //Firebase

//   const isFocused = useIsFocused()
//   const [search, setSearch] = useState()
//   const [filteredUsers, setFilteredUsers] = useState()

  



//   const checkExistingUser = async () => {
//     try {
//       const id = await AsyncStorage.getItem('id');
  
//       // Logging id to ensure it's not null
//       //console.log('id:', id);
  
//       if (id !== null) {
//         const parsedId = JSON.parse(id);
//         // Logging parsedId to ensure it's not null
//         //console.log('parsedId:', parsedId);
  
//         const userId = `user${parsedId._id}`;
//         const currentUser = await AsyncStorage.getItem(userId);
  
//         if (currentUser !== null) {
//           const parsedData = JSON.parse(currentUser);
//           setUserData(parsedData);
//           setUserLogin(true);
//         }
//       }
//     } catch (error) {
//       console.log("Error retrieving the data", error);
//     }
//   };
  
//   useEffect(()=>{

//     checkExistingUser();
//    // console.log(userData._id);
   
//   },[!userData]);

//   useEffect(()=>{
//     if(isFocused){
//       checkExistingUser();
//      // refetch()
//     }
//    // console.log(userData._id);
//   },[isFocused && !userData]);

//   const handleSearch = (text)=>{
//    setSearch(text);

//     const filteredData = users.filter((user)=>
//     user.username.toLowerCase( ).includes( text.toLowerCase()));
//     setFilteredUsers(filteredData);
//   }

//   //Firebase
//   const retrieveUsers = async () => {
//     let myData
//     let updateMyData;
//     try {
//        // Retrieve 'myData' from AsyncStorage
//        const myDataJson = await AsyncStorage.getItem('myData');
     
//        // Parse JSON strings back into JavaScript objects
//        myData = JSON.parse(myDataJson);
     
//        //console.log('Retrieved myData: chats', myData);
  
//        if(myData !== null){
//         const database = getDatabase();
  
//         // set customers list change listener
//         const myUserRef = ref(database, `users/${myData.userId}`);
//         onValue(myUserRef, async snapshot => {
//           const data = snapshot.val();
//           //console.log('data from users/uid snapshot value loginPage', data);
//           //users = (data.customers);
//           setUsers(data.customers);
//           console.log('users from users/uid snapshot value Chats', users);
         
//           updateMyData = prevData => ({
//             ...prevData,
//             customers: data.customers,
//         });
//         //myData = updateMyData(myData); // Call the function to get the updated value        
//         //console.log('myData with customers loginPage', myData);
//           // Check if users is undefined
//             if (users === undefined) {
//               // If users is undefined, set a default or sample value
//               users = [ ];
//               console.log('users after found undefined users', users);
//             }
//         });
//         //setCurrentPage('users');
//         setFilteredUsers(users)
//        }
       
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(()=>{

//     retrieveUsers()
     
//   },[]);

//   useEffect(()=>{

//     retrieveUsers()
     
//   },[!users]);

//   useEffect(()=>{

//     retrieveUsers()
     
//   },[navigation]);

//   useEffect(()=>{
//     if(isFocused){
//       retrieveUsers();
     
//     }
//   },[isFocused && !users]); 

//   useEffect(() => {
//     retrieveUsers();
// }, []);

// useEffect(() => {
//     if (isFocused) {
//         retrieveUsers();
//     }
// }, [isFocused]);

//   //Firebase






//   const renderItem = ({ item, index }) => (
//     <TouchableOpacity
//       key={index}
//       onPress={() => navigation.navigate("Chat", { selectedItem : item })}
//       style={[
//         styles.userContainer,
//         index % 2 !== 0 ? styles.oddBackground : null
//       ]}
//     >
//       <View style={styles.userImageContainer}>
//         {/* {item.isOnline && item.isOnline === true && (
//           <View style={styles.onlineIndicator} />
//         )} */}
//         <Image
//           source={{ uri: item.avatar }}
//           resizeMode='contain'
//           style={styles.userImage}
//         />
//       </View>

//       <View style={
//         {
//           flexDirection: 'row',
//           width: SIZES.width - 104,
//           justifyContent: "space-between"
//         }
//       }>
//         <View style={styles.userInfoContainer}>
//           <Text style={styles.userName}>{item.customerName}</Text>
//           {/* <Text style={styles.lastSeen}>{item.lastMessage}</Text> */}
//         </View>

//       {/*   <View style={{
//           position: 'absolute',
//           right: 2,
//           alignItem: 'center'
//         }}>
//           <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text> 
//           <View>
//             <TouchableOpacity style={{
//               width: 20,
//               height: 20,
//               borderRadius: SIZES.small,
//               backgroundColor: item.messageInQueue ? COLORS.gray : 'transparent',
//               justifyContent: 'center',
//               alignItems: "center",
//               marginTop: SIZES.small,
//               marginRight: 12,
//             }}>
//               <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
//             </TouchableOpacity>
//           </View> 

//         </View> */}
        
//       </View>

//     </TouchableOpacity>
//   )

//   /**
//    * Render Chat Content
//    */

//   const renderContent = () => {
//     return (
//       <View style={{marginBottom: 5}}> 
//         <View style={styles.searchBar}>
//           <TouchableOpacity>
//             <Ionicons
//               name="search-outline"
//               size={28}
//               color={COLORS.gray}
//             />
//           </TouchableOpacity>
//           <TextInput
//             style={styles.searchInput}
//             placeholder='Search contacts...'
//             value={search}
//             onChangeText={handleSearch} 
//           />
//           <TouchableOpacity>
//             <Image
//               //source={require('../assets/icons/edit-pencil.png')}
//               source={icons.editPencil}
//               resizeMode='contain'
//               style={{
//                 width: 30,
//                 height: 30,
//                 tintColor: COLORS.gray
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Render Flatlist  */}
//         <View>
//           <FlatList
//             data={filteredUsers}
//             //data={users}
//             showsVerticalScrollIndicator={false}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.customerId.toString()}
//           />
//         </View>

//       </View>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.area}>
//       <StatusBar hidden />
//       <View style={styles.container}>
//         {renderContent()}
//       </View>
//     </SafeAreaView>
//   )
// }

const Chats = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [myPassedData, setMyPassedData] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();

  const checkExistingUser = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (id !== null) {
        const parsedId = JSON.parse(id);
        const userId = `user${parsedId._id}`;
        const currentUser = await AsyncStorage.getItem(userId);
        if (currentUser !== null) {
          const parsedData = JSON.parse(currentUser);
          setUserData(parsedData);
        }
      }
    } catch (error) {
      console.log("Error retrieving the data", error);
    }
  };

  useEffect(() => {
    checkExistingUser();
  }, []);

  useEffect(() => {
    if (isFocused) {
      checkExistingUser();
    }
  }, [isFocused]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  useEffect(() => {
    retrieveUsers();
  }, [isFocused]);

  /* const retrieveUsers = async () => {
    try {
      const myDataJson = await AsyncStorage.getItem('myData');
      const myData = JSON.parse(myDataJson);
      if (myData !== null) {
        const database = getDatabase();
        const myUserRef = ref(database, `users/${myData.userId}`);
        onValue(myUserRef, (snapshot) => {
          const data = snapshot.val();
          if (data && data.customers) {
            setUsers(data.customers);
            setFilteredUsers(data.customers);
          } else {
            setUsers([]);
            setFilteredUsers([]);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }; */

  const retrieveUsers = async () => {
    try {
      const myDataJson = await AsyncStorage.getItem('myData');
      const myData = JSON.parse(myDataJson);
  
      if (myData !== null) {
        const database = getDatabase();
        const myUserRef = ref(database, `users/${myData.userId}`);
        
        onValue(myUserRef, async snapshot => {
          const data = snapshot.val();
  
          if (data && data.customers) {
            setUsers(prevUsers => {
              const newUsers = data.customers.filter(newUser => {
                return !prevUsers.some(prevUser => prevUser.customerId === newUser.customerId);
              });
              return [...prevUsers, ...newUsers];
            });
  
            setFilteredUsers(prevFilteredUsers => {
              const newFilteredUsers = data.customers.filter(newUser => {
                return !prevFilteredUsers.some(prevUser => prevUser.customerId === newUser.customerId);
              });
              return [...prevFilteredUsers, ...newFilteredUsers];
            });
          }
        });
        setMyPassedData(myData)
        console.log('myPassedData set in Chats: ', myPassedData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = users.filter((user) =>
      user.customerName && user.customerName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate("Chat", { selectedUser: item, myData: myPassedData })}
      style={[
        styles.userContainer,
        index % 2 !== 0 ? styles.oddBackground : null
      ]}
    >
      <View style={styles.userImageContainer}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode='contain'
          style={styles.userImage}
        />
      </View>

      <View style={{
        flexDirection: 'row',
        width: SIZES.width - 104,
        justifyContent: "space-between"
      }}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{item.customerName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    return (
      <View style={{ marginBottom: 5 }}>
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
            placeholder='Search customer...'
            value={search}
            onChangeText={handleSearch}
          />
          {/* <TouchableOpacity>
            <Image
              source={icons.editPencil}
              resizeMode='contain'
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.gray
              }}
            />
          </TouchableOpacity> */}
        </View>

        <View>
          <FlatList
            data={filteredUsers}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.customerId.toString() + index}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar hidden />
      <View style={styles.container}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};


export default Chats

