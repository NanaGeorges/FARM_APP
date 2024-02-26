import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './loginPage.style';
import {MaterialCommunityIcons} from  '@expo/vector-icons'; 
//import BackBtn from '../components/BackBtn';
import { Button, BackBtn } from '../components';
import {COLORS} from "../constants"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const validationSchema= Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 character')
    .required('Required'),
  email: Yup.string().email('Provide a valid email address').required('Required'),
});

const LoginPage = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] =useState(null);
  const [obsecureText, setObsecureText] = useState(false)

  const inValidForm = () => {
    Alert.alert(
      "Invalid Form",
      "Please provide all required fields",
      [
        {
          text: "Cancel", onPress: ()=> {}
        },
        {
          text: "Continue", onPress: ()=> {}
        },
        {defaultIndex: 1}
      ]
    )
  }

  const login = async (values)=>{
    setLoader(true)
    
    try{
      const endpoint = 'http://192.168.1.3:3000/api/login'
      const data = values;
      const response = await axios.post(endpoint,data);
      
      if(response.status === 200){
        setLoader(false);
        //console.log(responseData);
        setResponseData(response.data);
       // console.log(`user${responseData._id}`);
        await AsyncStorage.setItem(
          `user${responseData._id}`, 
          JSON.stringify(responseData)
          );
        await AsyncStorage.setItem('id', JSON.stringify(responseData))
        if (responseData && responseData._id) {
          // Access _id property and perform actions
          navigation.replace('Bottom Navigation')
        } else {
          console.log("Response data is null or missing _id property");
        }
        const newUser = await AsyncStorage.getItem(`user${responseData._id}`); 
        console.log(newUser)  
        const id= await AsyncStorage.getItem('id')
        console.log('here is id:', id)

      }else{
        Alert.alert(
          "Error Loggin in",
          "Please provide valid credentials",
          [
            {
              text: "Cancel", onPress: ()=> {}
            },
            {
              text: "Continue", onPress: ()=> {}
            },
            {defaultIndex: 1}
          ]
        );
      }
    }catch(error){
      console.log(error)
      Alert.alert(
        "Error",
        "Oops, Error logging in try again ",
        [
          {
            text: "Cancel", onPress: ()=> {}
          },
          {
            text: "Continue", onPress: ()=> {}
          },
          {defaultIndex: 1}
        ]
      );
    }finally{
      setLoader(false);
    }
  }

  return (
    <KeyboardAwareScrollView extraHeight={200}>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <BackBtn onPress={()=>navigation.goBack()} />
          <Image 
            source={require("../assets/images/bk1.png")}
            style={styles.cover}
           />
          <Text style={styles.appTitle}>Faachi App</Text>
          <Text style={styles.title}>Empower your farming business</Text>
          
          <Formik
            initialValues={{email:'',password:'' }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur,touched, handleSubmit, values, errors, isValid, setFieldTouched}) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary: COLORS.offwhite)}>
                      <MaterialCommunityIcons
                          name='email-outline'
                          size={20}
                          color={COLORS.gray}
                          style={styles.iconStyle}
                      />

                      <TextInput
                        placeholder='Enter Email'
                        onFocus={()=> {setFieldTouched('email')}} // to show error if user not fill the field
                        onBlur={() => {setFieldTouched('email','')}}// to hide error when user start typing in
                        value={values.email}
                        onChangeText={handleChange('email')}
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                  </View>
                  {touched.email && errors.email &&(
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(touched.password ? COLORS.secondary: COLORS.offwhite)}>
                      <MaterialCommunityIcons
                          name='lock-outline'
                          size={20}
                          color={COLORS.gray}
                          style={styles.iconStyle}
                      />

                      <TextInput
                        secureTextEntry={obsecureText}
                        placeholder='Password'
                        onFocus={()=> {setFieldTouched('password')}} // to show error if user not fill the field
                        onBlur={() => {setFieldTouched('password','')}}// to hide error when user start typing in
                        value={values.password}
                        onChangeText={handleChange('password')}
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={{flex: 1}}
                      />
                      <TouchableOpacity onPress={()=> {setObsecureText(!obsecureText)}}>
                          <MaterialCommunityIcons
                              name={obsecureText ? 'eye-outline': 'eye-off-outline'}
                              size={18}
                          />
                      </TouchableOpacity>
                  </View>
                  {touched.password && errors.password &&(
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
              
                < Button 
                loader={loader}
                title={"L O G I N"} 
                onPress={isValid? handleSubmit: inValidForm} 
                isValid={isValid}
                />
            
                <Text style={styles.registration} onPress={()=>{navigation.navigate('SignUp')}}> Register </Text>
            
              </View>
            )}
            
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

export default LoginPage