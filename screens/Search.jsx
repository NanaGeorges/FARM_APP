import { FlatList, Image, TouchableOpacity, TextInput, View, Text} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './search.style'
import {COLORS, SIZES } from "../constants";
import {Feather, Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import SearchTile from '../components/products/SearchTile';
//import { FlatList } from 'react-native-gesture-handler';

const Search = () => {
    const [searchKey, setSearchKey] = useState("");
    const [searchResults, setSearchResuts] = useState([]);
    //console.log(searchResults);

    //http://localhost:3000/api/products/search/${searchKey}
    const handleSearch = async() =>{
        try {
            //const response = await axios.get(`http://192.168.1.5:3000/api/products/search/${searchKey}`);
            const response = await axios.get(`http://172.20.10.2:3000/api/products/search/${searchKey}`);
           // const response = await axios.get(`http://192.168.63.104:3000/api/products/search/${searchKey}`);
            
            setSearchResuts(response.data)
        } catch (error) {
            console.log("Failed to get products", error);
        }
    }

  return (
    <SafeAreaView>
        <View style= {styles.searchContainer}>
            <TouchableOpacity>
                <Ionicons name="camera-outline" size={SIZES.xLarge} style= {styles.searchIcon} />
            </TouchableOpacity>
            <View style={styles.searchWrapper}>
                <TextInput
                    style={styles.searchInput}
                    value={searchKey}
                    onChangeText={setSearchKey}
                    placeholder='What are you looking for'
                />
            </View>
            <View>
                <TouchableOpacity style={styles.searchBtn} onPress={()=>handleSearch()}>
                    <Feather name="search" 
                      size={24}
                      color={COLORS.offwhite}
                    />
                </TouchableOpacity>
            </View>
        </View>
        {searchResults.length === 0 ? (
            <View style= {{flex: 1}} >
                <Image
                    source={require('../assets/images/Pose23.png')}
                    style={styles.searchImage}
                />
            </View>
        ):(
            <FlatList
                data={searchResults}
                keyExtractor= {item => item._id}
                renderItem ={({item}) => (<SearchTile item={item}/>)}
                style={{marginHorizontal:12}}
            />
        )}
    </SafeAreaView>
  )
}

export default Search
