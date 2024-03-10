import { Image, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getDocs, getFirestore, collection } from  'firebase/firestore'
import { app } from '../firebaseConfig';
import { Formik } from 'formik';
import {COLORS, SIZES} from '../constants/index'
import styles from './sell.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {MaterialCommunityIcons, Ionicons, MaterialIcons} from  '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker'


const Sell=()=> {

    const [image, setImage] = useState(null);
    const db = getFirestore(app);
    const [categoryList, setCategoryList]=useState([]);
    useEffect(()=>{
      getCtaegoryList()
    },[])

    // use to get category list
    const getCtaegoryList= async ()=> {
      setCategoryList([])
      const querySnapshot = await getDocs(collection(db,"category"));
      querySnapshot.forEach((doc)=>{
        console.log("Docs:",doc.data())
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

    const onSubmitMethod = (value)=>{
      value.image = image;
      console.log(value);
    };

    return (
      <KeyboardAwareScrollView extraHeight={200}>
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}>      Add Your Product</Text>
            <Formik
                  initialValues={{title:'', description:"", category:'', location:'',price:'', image:''}}
                  onSubmit={value=>onSubmitMethod(value)}
                  validate={(value)=>{
                    const errors = {}
                  }}
              >
              {({handleChange, handleBlur, touched, handleSubmit, values})=>(
                <View>

                  <TouchableOpacity 
                    onPress={pickImage} 
                    // style={styles.btnStyle}
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
                          value={values?.title}
                          onChangeText={handleChange('title')}
                          autoCapitalize='none'
                          autoCorrect={false}
                          style={{flex: 1}} 
                        />
                    </View>
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
                          autoCapitalize='none'
                          autoCorrect={false}
                          style={{flex: 1, minHeight: 150 }} // Set a minimum height to prevent the input from collapsing
                          multiline // Use multiline prop instead of numberOfLines
                          
                        />
                    </View>
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
                          autoCapitalize='none'
                          autoCorrect={false}
                          keyboardType='number-pad'
                          style={{flex: 1}}     
                        />
                    </View>
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
                          value={values?.location}
                          onChangeText={handleChange('location')}
                          autoCapitalize='none'
                          autoCorrect={false}
                          style={{flex: 1}} 
                        />
                    </View>
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
                  </View> 

                  <TouchableOpacity 
                    onPress={handleSubmit} 
                    style={styles.btnStyle}
                  >
                      <Text style={styles.btnText}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
                
              )}
            </Formik>
          </SafeAreaView>
      </KeyboardAwareScrollView>     
    )
}

export default Sell

