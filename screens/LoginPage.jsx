import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './loginPage.style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import BackBtn from '../components/BackBtn';
import { Button, BackBtn } from '../components';
import { COLORS } from "../constants"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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


const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 character')
    .required('Required'),
  email: Yup.string().email('Provide a valid email address').required('Required'),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  //const [responseData, setResponseData] =useState(null);
  const [obsecureText, setObsecureText] = useState(false)

  // firebase need
  //let myData;
  // const [myData, setMyData] = useState(null);
  //const [users, setUsers] = useState([]);
  // fire base need 

  // useEffect to log responseData whenever it changes
  /*  useEffect(() => {
     if (responseData !== null) {
       console.log('responseData in useEffect in login page:', responseData);
       console.log('_id in useffect in login page:', `user${responseData._id}`);
     }
   }, [responseData]); */

  const inValidForm = () => {
    Alert.alert(
      "Invalid Form",
      "Please provide all required fields",
      [
        {
          text: "Cancel", onPress: () => { }
        },
        {
          text: "Continue", onPress: () => { }
        },
        { defaultIndex: 1 }
      ]
    )
  }

  const wait = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  const login = async (values) => {
    setLoader(true)

    try {
      const endpoint = 'http://192.168.1.4:3000/api/login'
      //const endpoint = 'http://172.20.10.2:3000/api/login'
      const data = values;
      const response = await axios.post(endpoint, data);
     // console.log('response in  login page', response.data);



      //await wait(4000);
      if (response.status === 200) {
        setLoader(false);
        //setResponseData(response.data);
        const responseData = response.data;

        // console.log('responseData in if in  login page: ',responseData);
        //console.log('_id in if in  login page: ', `user${responseData._id}`);
        //_id=0;

        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
        );

        await AsyncStorage.setItem('id', JSON.stringify(responseData))
        //  await AsyncStorage.setItem('id', JSON.stringify(response.data));
        
        if (responseData && responseData._id) {
          // Access _id property and perform actions
          onLogin(responseData)
          navigation.replace('Bottom Navigation')
          //onLogin(responseData)
        } else {
          console.log("Response data is null or missing _id property Login Page");
        }
       // onLogin(responseData)
        //const newUser = await AsyncStorage.getItem(`user${responseData._id}`); 
        //console.log('new user in login page:' , newUser)  
        const id = await AsyncStorage.getItem('id')
        //console.log('here is id in login Page:', id)  

      } else {
        Alert.alert(
          "Error Loggin in",
          "Please provide valid credentials",
          [
            {
              text: "Cancel", onPress: () => { }
            },
            {
              text: "Continue", onPress: () => { }
            },
            { defaultIndex: 1 }
          ]
        );
      }
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Error",
        "Oops, Error logging in try again ",
        [
          {
            text: "Cancel", onPress: () => { }
          },
          {
            text: "Continue", onPress: () => { }
          },
          { defaultIndex: 1 }
        ]
      );
    } finally {
      setLoader(false);
    }
  }

  // firebase
  /*  const onLogin = async (user) => {
    try {
      const database = getDatabase();
      //first check if the user registered before

      const user = await findUser(user._id);

      //create a new user if not registered
      if (user) {
        setMyData(user);
      } else {
        const newUserObj = {
          userId: user.user._id,
          username: user.username,
          avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
        };

        set(ref(database, `users/${user._id}`), newUserObj);
        setMyData(newUserObj);
      }

      // set customers list change listener
      const myUserRef = ref(database, `users/${user._id}`);
      onValue(myUserRef, snapshot => {
        const data = snapshot.val();
        setUsers(data.customers);
        setMyData(prevData => ({
          ...prevData,
          customers: data.customers,
        }));
      });
      //setCurrentPage('users');
    } catch (error) {
      console.error(error);
    }
  };
 */

  const onLogin = async (user) => {
    let users=[ ]
    console.log('here is users',users)
    let myData
    let updateMyData;
    try {
      if (user !== null) { // Check if user is not null
        const database = getDatabase();
        //first check if the user registered before

        const existingUser = await findUser(user._id);

        //create a new user if not registered
        if (existingUser) {
          //setMyData(existingUser);
          myData = existingUser
         // console.log('Logged in as an existing user! myData 1', myData)
        } else {
          const newUserObj = {
            userId: user._id,
            username: user.username,
            avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
          };

          set(ref(database, `users/${user._id}`), newUserObj);
         // setMyData(newUserObj);
          myData = newUserObj;
          //console.log('New User Created! my Data updated', myData)
        }

        // set customers list change listener
        const myUserRef = ref(database, `users/${user._id}`);
        onValue(myUserRef, async snapshot => {
          const data = snapshot.val();
          //console.log('data from users/uid snapshot value loginPage', data);
          //setUsers(data.customers);
          users=(data.customers);
          //console.log('users from users/uid snapshot value loginPage', users);
         /* myData= (prevData => ({
            ...prevData,
            customers: data.customers,
            // customers: [...prevData.customers, ...data.customers],
          })); */
          updateMyData = prevData => ({
            ...prevData,
            customers: data.customers,
            //customers: [...prevData.customers, ...data.customers],
        });
        myData = updateMyData(myData); // Call the function to get the updated value        
        console.log('myData with customers loginPage', myData);

          // Check if users is undefined
            if (users === undefined) {
              // If users is undefined, set a default or sample value
              users = [ ];
              console.log('users after found undefined loginPage', users);
            }
          // Store users and myData in AsyncStorage after their final updates
            try {
              await AsyncStorage.setItem('users', JSON.stringify(users));
              await AsyncStorage.setItem('myData', JSON.stringify(myData));
              //console.log('Data stored in AsyncStorage successfully');
            } catch (error) {
              console.error('Error storing data in AsyncStorage:', error);
            }
        });
        //setCurrentPage('users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const findUser = async userId => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${userId}`));

    return mySnapshot.val();
  };

  // firebase

  return (
    <KeyboardAwareScrollView extraHeight={200}>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk1.png")}
            style={styles.cover}
          />
          <Text style={styles.appTitle}>Faachi App</Text>
          <Text style={styles.title}>Empower your farming business</Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name='email-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      placeholder='Enter Email'
                      onFocus={() => { setFieldTouched('email') }} // to show error if user not fill the field
                      onBlur={() => { setFieldTouched('email', '') }}// to hide error when user start typing in
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(touched.password ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons
                      name='lock-outline'
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder='Password'
                      onFocus={() => { setFieldTouched('password') }} // to show error if user not fill the field
                      onBlur={() => { setFieldTouched('password', '') }}// to hide error when user start typing in
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => { setObsecureText(!obsecureText) }}>
                      <MaterialCommunityIcons
                        name={obsecureText ? 'eye-outline' : 'eye-off-outline'}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                < Button
                  loader={loader}
                  title={"L O G I N"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />

                <Text style={styles.registration} onPress={() => { navigation.navigate('SignUp') }}> Register </Text>

              </View>
            )}

          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

export default LoginPage