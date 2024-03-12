import { Image, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getDocs, getFirestore, collection, addDoc } from  'firebase/firestore'
import { app } from '../firebaseConfig';
import { Formik } from 'formik';
import {COLORS, SIZES} from '../constants/index'
import styles from './sell.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {MaterialCommunityIcons, Ionicons, MaterialIcons} from  '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import {useUser} from '@clerk/clerk-expo';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as Yup from 'yup';
import { Button } from '../components';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const validationSchema= Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 character')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 character')
    .required('Required'),
  product_location: Yup.string()
    .min(3, 'Provide a valid location')
    .required('Required'),
  price: Yup.string()
    .min(1, 'Provide a valid price')
    .required('Required'),
  category: Yup.string()
    .required('Required'),
  //image: Yup.string()
   // .required('Required'),
});


// need to fix useFocusEct infinte loop later 
const Sell=({navigation})=> {


    const [image, setImage] = useState(null);
    const db = getFirestore(app);
  
    // Create a root reference
    const storage = getStorage();
    const [categoryList, setCategoryList]=useState([]);
    const [loader, setLoader] = useState(false);
    const [userData, setUserData] = useState(null)
    const [userLogin, setUserLogin] = useState(false)
    const [done, setDone] = useState(false)

    useEffect(()=>{
      getCtaegoryList();
      checkExistingUser();
    },[])

    useFocusEffect(() => {  
       //checkExistingUser();
       enableFeature(done)
    }); 

    const enableFeature = () => {
      if(done===true){
        if(userLogin === false){
          notLoggedIn();
         }
      }
     }
    
    const notLoggedIn = () => {
      Alert.alert(
        "Message",
        "You need to log in First before using this feature. You'll  be redirected to login page.",
        [
          {
            text: "Go Back", onPress: ()=>navigation.goBack()
          },
          {
            text: "Log In", onPress: ()=> {navigation.navigate('Login')}
          },
          {defaultIndex: 1}
        ]
      )
    }


    const wait = (milliseconds) => {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    };

    //check if user is loged in or not
    const checkExistingUser = async () => {      

        try {
          const id = await AsyncStorage.getItem('id');
         // await wait(1500); // Wait for 3 seconds (3000 milliseconds)

         // if(!cancelled){
            // Logging id to ensure it's not null
            console.log(' before if 1 -- id:', id);
            
            if (id !== null) {
    
              console.log(' after if 1 -- id:', id);
              const parsedId = JSON.parse(id);
              // Logging parsedId to ensure it's not null
              //console.log('parsedId:', parsedId);
        
              const userId = `user${parsedId._id}`;
              const currentUser = await AsyncStorage.getItem(userId);
              //await wait(3000); // Wait for 3 seconds (3000 milliseconds)
              if (currentUser !== null) {
                const parsedData = JSON.parse(currentUser);
                console.log('sell comp 1 :', parsedData)
                setUserData(parsedData);
                setUserLogin(true);
               // await wait(60000); // Wait for 3 seconds (3000 milliseconds)
                console.log('sell comp :', userData)
              }
            }else{
              //notLoggedIn()
              setDone(true);
            }
      // }
        } catch (error) {
          console.log("Error retrieving the data", error);
        }
      
    }; 


    // use to get category list
    const getCtaegoryList= async ()=> {
      setCategoryList([])
      const querySnapshot = await getDocs(collection(db,"category"));
       await wait(3000); // Wait for 3 seconds (3000 milliseconds)
      querySnapshot.forEach((doc)=>{
        //console.log("Docs:",doc.data())
        setCategoryList(categoryList =>[...categoryList, doc.data()])
      })
    }

    // use to pick image from gallery

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

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

    const onSubmitMethod = async (value)=>{
      setLoader(true);
      //value.image = image;
      //console.log(value);
      console.log('sell comp 2', userData)

      //Convert Uri to Blob File
      const resp=await fetch(image);
      const blob=await resp.blob();
      const storageRef = ref(storage, 'communityPOst/'+Date.now()+'.jpg');

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then((resp)=>{
        getDownloadURL(storageRef).then(async(downloadUrl) =>{
          console.log(downloadUrl);
          value.imageUrl = downloadUrl;
           value.supplierId = userData._id;
           value.supplier = userData.username;

          const docRef = await addDoc(collection(db,"UserProductPosts"), value );
          if(docRef.id){
            console.log("Document written with ID: ", docRef.id);
            //setLoader(false);
            console.log(value);
          }
        });
    });


    console.log('Submitted Value',value);

    try {

      await wait(4000); // Wait for 3 seconds (3000 milliseconds)
      //const endpoint = 'http://172.20.10.2:3000/api/register/'; //add your api here
      const endpoint = 'http://192.168.1.2:3000/api/products/'; //add your api here
      const data=value;
      console.log('data for mongoDb', data)
  
      const response = await axios.post(endpoint, data, { timeout: 10000 });
  
      if(response.status === 200){
        navigation.navigate('Profile')
        console.log('add to mongoDb succes')
        setLoader(false);
      }
    } catch (error) {
      console.log('!!!!! Axios error here ::::',error);
      Alert.alert(
        "Not Uploaded",
        "Please provide try again",
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
  }

    return (
      <KeyboardAwareScrollView extraHeight={200} showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}>      Add Your Product</Text>
            <Formik
                  initialValues={{title:'', description:"", category:'', product_location:'',price:'', imageUrl:'', supplier:'', supplierId:''}}
                  onSubmit={value=>onSubmitMethod(value)}
                  validationSchema={validationSchema}
              >
              {({handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched})=>(
                <View>
                  <View>
                      <Text style={styles.imageUploadLabel}>Upload your image here</Text>
                      <TouchableOpacity 
                        onPress={pickImage} 
                        // style={styles.btnStyle}
                        /* onFocus={()=> {setFieldTouched('image')}} // to show error if user not fill the field
                        onBlur={() => {setFieldTouched('image','')}}// to hide error when user start typing in */
                      >
                        {image?
                            <Image source={{uri:image}}
                            style={{width:100, height:100, borderRadius:15}}
                          />
                        :
                            <Image source={require('../assets/images/images.png')}
                                style={{width:100, height:100, borderRadius:15}}
                              />
                        }
                      </TouchableOpacity>
                      {/* {touched.image && errors.image &&(
                        <Text style={styles.errorMessage}>{errors.image}</Text>
                      )} */}
                  </View>
                  
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Title</Text>
                    <View style={styles.inputWrapper(touched.title ? COLORS.secondary: COLORS.offwhite)}>
                        <MaterialIcons
                            name='title'
                            size={20}
                            color={COLORS.gray}
                            style={styles.iconStyle}
                        />
                        <TextInput
                          placeholder='Title'
                          value={values.title}
                          onChangeText={handleChange('title')}
                          onFocus={()=> {setFieldTouched('title')}} // to show error if user not fill the field
                          onBlur={() => {setFieldTouched('title','')}}// to hide error when user start typing in
                          autoCapitalize='none'
                          autoCorrect={false}
                          style={{flex: 1}} 
                        />
                    </View>
                      {touched.title && errors.title &&(
                        <Text style={styles.errorMessage}>{errors.title}</Text>
                      )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Description</Text>
                    <View style={styles.inputWrapperDescription(touched.description ? COLORS.secondary: COLORS.offwhite)}>
                        <MaterialIcons
                            name='description'
                            size={20}
                            color={COLORS.gray}
                            style={styles.iconStyle}
                        />
                        <TextInput
                          placeholder='Description'
                          value={values?.description}
                          onChangeText={handleChange('description')}
                          onFocus={()=> {setFieldTouched('description')}} // to show error if user not fill the field
                          onBlur={() => {setFieldTouched('description','')}}// to hide error when user start typing in
                          autoCapitalize='none'
                          autoCorrect={false}
                          style={{flex: 1, minHeight: 150 }} // Set a minimum height to prevent the input from collapsing
                          multiline // Use multiline prop instead of numberOfLines
                          
                        />
                    </View>
                    {touched.description && errors.description &&(
                        <Text style={styles.errorMessage}>{errors.description}</Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Price</Text>
                    <View style={styles.inputWrapper(touched.price ? COLORS.secondary: COLORS.offwhite)}>
                        <Ionicons
                            name='pricetag-sharp'
                            size={20}
                            color={COLORS.gray}
                            style={styles.iconStyle}
                        />
                        <TextInput
                          placeholder='Price'
                          value={values?.price}
                          onChangeText={handleChange('price')}
                          onFocus={()=> {setFieldTouched('price')}} // to show error if user not fill the field
                          onBlur={() => {setFieldTouched('price','')}}// to hide error when user start typing in
                          autoCapitalize='none'
                          autoCorrect={false}
                          keyboardType='number-pad'
                          style={{flex: 1}}     
                        />
                    </View>
                    {touched.price && errors.price &&(
                        <Text style={styles.errorMessage}>{errors.price}</Text>
                      )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Location</Text>
                    <View style={styles.inputWrapper(touched.location ? COLORS.secondary: COLORS.offwhite)}>
                        <Ionicons
                            name='location'
                            size={20}
                            color={COLORS.gray}
                            style={styles.iconStyle}
                        />
                        <TextInput
                          placeholder='Location'
                          value={values?.product_location}
                          onChangeText={handleChange('product_location')}
                          onFocus={()=> {setFieldTouched('product_location')}} // to show error if user not fill the field
                          onBlur={() => {setFieldTouched('product_location','')}}// to hide error when user start typing in
                          autoCapitalize='none'
                          autoCorrect={false}
                          style={{flex: 1}} 
                        />
                    </View>
                     {touched.product_location && errors.product_location &&(
                        <Text style={styles.errorMessage}>{errors.product_location}</Text>
                    )}
                  </View>

                    {/* dropbox category */}

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.inputWrapperCategory(touched.category ? COLORS.secondary: COLORS.offwhite)}>
                        <MaterialIcons
                            name='category'
                            size={20}
                            color={COLORS.gray}
                            style={styles.iconStyle}
                        />
                        <Picker
                            selectedValue={values?.category}
                            onValueChange={handleChange('category')}
                            onFocus={()=> {setFieldTouched('category')}} // to show error if user not fill the field
                            onBlur={() => {setFieldTouched('category','')}}// to hide error when user start typing in
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{ flex: 1 , zIndex: -12}}  
                            labelStyle={styles.pickerItem}
                        >
                          {categoryList&&categoryList.map((item,index)=>(
                              <Picker.Item key={index}
                              label={item.name} value={item.name} />
                          ))}    
                        </Picker>
                    </View>
                    {touched.category && errors.category &&(
                        <Text style={styles.errorMessage}>{errors.category}</Text>
                      )}
                  </View> 

                  {/* <TouchableOpacity 
                    onPress={handleSubmit} 
                    style={styles.btnStyle}
                  >
                      <Text style={styles.btnText}>SUBMIT</Text>
                  </TouchableOpacity> */}

                  < Button 
                title={"S U B M I T"} 
                loader={loader}
                onPress={isValid ? handleSubmit: inValidForm} 
                isValid={isValid}/>

                </View>
                
              )}
            </Formik>
          </SafeAreaView>
      </KeyboardAwareScrollView>     
    )

}


export default Sell

