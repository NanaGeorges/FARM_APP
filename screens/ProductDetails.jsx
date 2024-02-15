import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import {Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto} from  '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './productDetails.style'
import { COLORS, SIZES } from '../constants';


const ProductDetails = ({navigation}) => {
    const [count, setCount] = useState(1)

    const increment = ()=>{
        setCount(count+1)
    }
    const decrement = ()=>{
        if(count>1){
            setCount(count-1)
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.upperRow}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name='chevron-back-circle' size={30}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name='heart' size={30} color={COLORS.primary}/>
            </TouchableOpacity>
        </View>
        <Image
            source={{uri: "https://d326fntlu7tb1e.cloudfront.net/uploads/5d445b91-c01a-4564-8ff8-c27c2b88ea5b-fn7.png"}}
            style={styles.image}
        />

        <View style={styles.details}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Product</Text>
                <View style={styles.priceWrapper}>
                    <Text style={styles.price}>$ 660.88</Text>
                </View>
            </View>
            <View style={styles.ratingRow}>
                <View style={styles.rating}>
                    {[1,2,3,4,5].map((index)=>(
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
                    <TouchableOpacity onPress={()=> increment()}>
                        <SimpleLineIcons
                            name='plus' size={20}
                        />
                    </TouchableOpacity>
                    <Text style={styles.ratingText}>{count}</Text>
                    <TouchableOpacity onPress={()=> decrement()}>
                        <SimpleLineIcons
                            name='minus' size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>Description</Text>
                <Text style={styles.descText}>Lorem ipsum dolor sit amet. Quo earum quam qui officiis maiores sit nostrum voluptate et sunt facilis est quam fugiat non expedita quia. Est corporis sunt rem laborum dolorem et dignissimos blanditiis. Aut commodi voluptatum qui quasi culpa et vero impedit ut enim beatae.
Eum totam consequatur qui fugit excepturi et repellat inventore et provident reprehenderit. Ut debitis molestias id labore nobis ea voluptatum totam hic amet eaque est eius assumenda non saepe eaque.
At quod consequatur ea fugit porro sed perspiciatis officiis qui numquam quasi aut illo atque. Non galisum repellat non obcaecati doloribus aut dolor fugiat sit distinctio tenetur.
                 </Text>
            </View>
            <View style={{marginBottom: SIZES.small}}>
                <View style={styles.location}>
                   <View style={{flexDirection: 'row'}}>
                      <Ionicons name="location-outline" size={20}/> 
                      <Text> Bamako </Text>
                   </View>
                   <View style={{flexDirection: 'row'}}>
                      <MaterialCommunityIcons name="truck-delivery-outline" size={20}/> 
                      <Text> Free Delivery </Text>
                   </View>
                </View>
            </View>

            <View style={styles.cartRow}>
                <TouchableOpacity onPress={()=>{}} style={styles.cartBtn}>
                    <Text style={styles.cartTitle}>BUY NOW</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{}} style={styles.addCart}>
                     <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite}/>
                </TouchableOpacity>
                
            </View>
        
        </View>
    </View>
  )
}

export default ProductDetails