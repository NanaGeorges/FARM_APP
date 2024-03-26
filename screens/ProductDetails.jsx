import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './productDetails.style'
import { COLORS, SIZES } from '../constants';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
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



//  const ProductDetails = ({navigation}) => {
//     const route = useRoute();
//     const {item} = route.params;
//     console.log('item in ProductsDetails: ', item);
//     const [userData, setUserData] = useState(null)
//     const [userLogin, setUserLogin] = useState(false)
//     console.log('userData in ProductsDetails: ', userData);
//     console.log('userLogin in ProductsDetails: ', userLogin);
//     const isFocused = useIsFocused()

//     // firebase need
//     const [myData, setMyData] = useState(null);
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState('Chats');
//     // fire base need 

//     useEffect(()=>{
//       checkExistingUser();
//     },[])

//     //check if user is loged in or not
//     const checkExistingUser = async () => {
//         try {
//           const id = await AsyncStorage.getItem('id');

//           // Logging id to ensure it's not null
//           console.log('id:', id);

//           if (id !== null) {
//             const parsedId = JSON.parse(id);
//             // Logging parsedId to ensure it's not null
//             //console.log('parsedId:', parsedId);

//             const userId = `user${parsedId._id}`;
//             const currentUser = await AsyncStorage.getItem(userId);

//             if (currentUser !== null) {
//               const parsedData = JSON.parse(currentUser);
//               setUserData(parsedData);
//               setUserLogin(true);
//             }
//           }
//         } catch (error) {
//           console.log("Error retrieving the data", error);
//         }
//     };

//     useEffect(()=>{
//         checkExistingUser();
//        // console.log(userData._id);
//       },[!userData]);

//       useEffect(()=>{
//         if(isFocused){
//           checkExistingUser();
//          // refetch()
//         }
//        // console.log(userData._id);
//       },[isFocused && !userData]);



//     const [count, setCount] = useState(1);
//     const increment = ()=>{
//         setCount(count+1)
//     }
//     const decrement = ()=>{
//         if(count>1){
//             setCount(count-1)
//         }
//     } 

//     // firebase
//     const onLogin = async () => {
//         try {
//           const database = getDatabase();
//           //first check if the user registered before

//           const supplierId = await findUser(item.supplierId);

//           //create a new user if not registered
//           if (supplierId) {
//             setMyData(supplierId);
//           } else {
//             const newUserObj = {
//               username: userData.userName,
//               supplierId: item.supplierId,
//               avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
//             };

//             set(ref(database, `users/${item.supplierId}`), newUserObj);
//             setMyData(newUserObj); //store it in local state
//           }

//           // set friends list change listener
//           const myUserRef = ref(database, `users/${item.supplierId}`);
//           onValue(myUserRef, snapshot => {
//             const data = snapshot.val();
//             setUsers(data.customers);
//             setMyData(prevData => ({
//               ...prevData,
//               customers: data.customers,
//             }));
//           });

//           setCurrentPage('Chats');
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       const findUser = async supplierId => {
//         const database = getDatabase();

//         const mySnapshot = await get(ref(database, `users/${supplierId}`));

//         return mySnapshot.val();
//       };

//       // firebase
//   return (
//     <View style={styles.container}>
//         <View style={styles.upperRow}>
//             <TouchableOpacity onPress={()=>navigation.goBack()}>
//                 <Ionicons name='chevron-back-circle' size={30}/>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={()=>navigation.goBack()}>
//                 <Ionicons name='heart' size={30} color={COLORS.primary}/>
//             </TouchableOpacity>
//         </View>
//         <Image
//             source={{uri: item.imageUrl}}
//             style={styles.image}
//         />

//         <View style={styles.details}>
//             <View style={styles.titleRow}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <View style={styles.priceWrapper}>
//                     <Text style={styles.price}>$ {item.price}</Text>
//                 </View>
//             </View>
//             <View style={styles.ratingRow}>
//                 <View style={styles.rating}>
//                     {[1,2,3,4,5].map((index)=>(
//                         <Ionicons
//                           key={index}
//                           name="star"
//                           size={24}
//                           color="gold"
//                         />
//                     ))}
//                     <Text style={styles.ratingText}> (4.9)</Text>
//                 </View>
//                 <View style={styles.rating}>
//                     <TouchableOpacity onPress={()=> increment()}>
//                         <SimpleLineIcons
//                             name='plus' size={20}
//                         />
//                     </TouchableOpacity>
//                     <Text style={styles.ratingText}>{count}</Text>
//                     <TouchableOpacity onPress={()=> decrement()}>
//                         <SimpleLineIcons
//                             name='minus' size={20}
//                         />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={styles.descriptionWrapper}>
//                 <Text style={styles.description}>Description</Text>
//                 <Text style={styles.descText}>{item.description}</Text>
//             </View>
//             <View style={{marginBottom: SIZES.small}}>
//                 <View style={styles.location}>
//                    <View style={{flexDirection: 'row'}}>
//                       <Ionicons name="location-outline" size={20}/> 
//                       <Text> {item.product_location}</Text>
//                    </View>
//                    <View style={{flexDirection: 'row'}}>
//                       <MaterialCommunityIcons name="truck-delivery-outline" size={20}/> 
//                       <Text> Free Delivery </Text>
//                    </View>
//                 </View>
//             </View>

//             {/* Buy Now Button */}
//             <View style={styles.cartRow}>
//                 <TouchableOpacity onPress={()=>{}} style={styles.cartBtn}>
//                     <Text style={styles.cartTitle}>BUY NOW</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={()=>{}} style={styles.addCart}>
//                      <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite}/>
//                 </TouchableOpacity>

//             </View> 

//             {/* Chat Button */}
//               <View style={styles.cartRow}>
//                   {userLogin ? (
//                       <TouchableOpacity onPress={() => {
//                           navigation.navigate("Chats", {
//                               userData: userData,
//                               userLogin: userLogin
//                           });
//                       }} style={styles.cartBtn}>
//                           <MaterialCommunityIcons name="message" size={20} color={'white'} />
//                           <Text style={styles.cartTitle}>Chat with Seller</Text>
//                       </TouchableOpacity>
//                   ) : (
//                       <TouchableOpacity onPress={() => {
//                           navigation.navigate("Login");
//                       }} style={styles.cartBtn}>
//                           <MaterialCommunityIcons name="login" size={20} color={'white'} />
//                           <Text style={styles.cartTitle}>Login to Chat</Text>
//                       </TouchableOpacity>
//                   )}
//               </View>

//         </View>
//     </View>
//   )
// } 

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  //console.log('item in ProductsDetails: ', item);
  const [userData, setUserData] = useState(null)
  const [userLogin, setUserLogin] = useState(false)
  //console.log('userData in ProductsDetails: ', userData);
  //console.log('userLogin in ProductsDetails: ', userLogin);
  const isFocused = useIsFocused()

  // firebase need
  let myData;
  let users;
 // const [myData, setMyData] = useState(null);
 // const [users, setUsers] = useState([]);
  // fire base need 

  const wait = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  useEffect(() => {
    checkExistingUser()
  }, [])

  //check if user is loged in or not
  const checkExistingUser = async () => {
    try {
      const id = await AsyncStorage.getItem('id');

      // Logging id to ensure it's not null
      // console.log('Product details id:', id);

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
      console.log("Error retrieving the data Product Details", error);
    }
  };

  useEffect(() => {
    checkExistingUser() //.then(onLogin())
    // console.log(userData._id);
  }, [!userData]);

  useEffect(() => {
    if (isFocused) {
      checkExistingUser();
      // refetch()
    }
    // console.log(userData._id);
  }, [isFocused && !userData]);



  const [count, setCount] = useState(1);
  const increment = () => {
    setCount(count + 1)
  }
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  // firebase

  const findUser = async supplierId => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${supplierId}`));
    // console.log('user info from db my snapshot Product details find users', mySnapshot);

    return mySnapshot.val();
  };

  const onAddCustomer = async () => {

    try {
      // Retrieve 'users' and 'myData' from AsyncStorage
      const usersJson = await AsyncStorage.getItem('users');
      const myDataJson = await AsyncStorage.getItem('myData');
    
      // Parse JSON strings back into JavaScript objects
      users = JSON.parse(usersJson);
      myData = JSON.parse(myDataJson);
    
      // Now you can use 'users' and 'myData' as needed in your application
      console.log('Retrieved users: products details', users);
      console.log('Retrieved myData: products details', myData);

      try {
        //find user and add it to my friends and also add me to his friends
        const database = getDatabase();
        const userRef = ref(database, `users/${myData.userId}/customers`);
        const snapshot = await get(userRef);
        const customers = snapshot.val();
  
        const user = await findUser(item.supplierId);
        console.log('user in try block on add function Product Details', user)
  
        if (user) {
          if (user.userId === myData.userId) {
            // don't let user add himself
            return;
          }
  
          if (customers) {
            // Check if the customerId exists in the customers array
            const customerExists = Object.values(customers).some(
              (customer) => customer.customerId === user.userId
            );
            
            if (customerExists) {
              // Customer already exists, handle accordingly
              return;
            }
          }

          // create a chatroom and store the chatroom id
  
          const newChatroomRef = push(ref(database, 'chatrooms'), {
            firstUserId: myData.userId,
            firstUser: myData.username,
            secondUserId: user.userId,
            secondUser: user.username,
            messages: [],
          });
  
          const newChatroomId = newChatroomRef.key;
  
          const userCustomers = user.customers || [];
          //join myself to this user customer list
          update(ref(database, `users/${user.userId}`), {
            customers: [
              ...userCustomers,
              {
                customerId: myData.userId,
                customerName: myData.username,
                avatar: myData.avatar,
                chatroomId: newChatroomId,
              },
            ],
          });
  
          const myCustomers = myData.customers || [];
          //add this user to my friend list
          update(ref(database, `users/${myData.userId}`), {
            customers: [
              ...myCustomers,
              {
                customerId: user.userId,
                customerName: user.username,
                avatar: user.avatar,
                chatroomId: newChatroomId,
              },
            ],
          });
        } 
      
      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
    
  };

  // firebase


  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back-circle' size={30} />
        </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='heart' size={30} color={COLORS.primary} />
        </TouchableOpacity> 
      </View>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons
                key={index}
                name="star"
                size={24}
                color="gold"
              />
            ))}
            <Text style={styles.ratingText}> (4.9)</Text>
          </View>
           <View style={styles.rating}>
            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons
                name='plus' size={20}
              />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons
                name='minus' size={20}
              />
            </TouchableOpacity>
          </View> 
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>
        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="location-outline" size={20} />
              <Text> {item.product_location}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text> Free Delivery </Text>
            </View>
          </View>
        </View>

        {/* Buy Now Button */}
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => { }} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.addCart}>
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>

        </View>

        {/* Chat Button */}
        <View style={styles.cartRow}>
          {userLogin ? (
            <TouchableOpacity
              onPress={() => {
                onAddCustomer()  // Call the onLogin function
                navigation.navigate("Chats",);// Navigate to the "Login" screen { users: users, myData: myData }
              }}
              style={styles.cartBtn}
            >
              <MaterialCommunityIcons name="message" size={20} color={'white'} />
              <Text style={styles.cartTitle}>Chat with Seller</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {
              navigation.navigate("Login");
            }} style={styles.cartBtn}>
              <MaterialCommunityIcons name="login" size={20} color={'white'} />
              <Text style={styles.cartTitle}>Login to Chat</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>
    </View>
  )
}

export default ProductDetails