import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { COLORS } from '../../constants'


const Carousel = () => {
    const slides = [
       // "https://d326fntlu7tb1e.cLoudfront.net/uploads/cb2e64a8-ad4c-4d45-b58b-b0c7e11b6bb4-fn1.jpg",
        //"https://d326fntlu7tb1e.cloudfront.net/uploads/b1f6d96d-3297-4270-ba65-657dc2bc0236-fn2.jpg",
        //"https://d326fntlu7tb1e.cloudfront.net/uploads/5d445b91-c01a-4564-8ff8-c27c2b88ea5b-fn7.png",
        "https://drive.google.com/uc?export=view&id=1rRA-_OAwuni6B7vpObBayJrfvWILaaVD",
        "https://drive.google.com/uc?export=view&id=1hAfJKRMlQY22pUfTYgHajHSOw7lVZpG8",
        //"https://drive.google.com/uc?export=view&id=1rRA-_OAwuni6B7vpObBayJrfvWILaaVD",
        "https://drive.google.com/uc?export=view&id=1rIYjkbKWaX5FAp2mNnelSs-FEMrrec5U",
        "https://drive.google.com/uc?export=view&id=1FV6XPypCt7PFVTgXJsN5YXfGVDDGX9-E",
        "https://drive.google.com/uc?export=view&id=1U2ecDE2b_dCyjmxugrpEL8e0uVhfSTKF",
    ]
    return (
    <View style={styles.carouselContainer}> 
      <SliderBox images={slides}
        dotColor = {COLORS.primary}
        inactiveDotColor= {COLORS.primary}
        ImageComponentStyle = {{borderRadius: 15, width: "92%", marginTop: 15}}
        autoplay
        circleLoop
      />
    </View>
  )
}

export default Carousel
const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: 'Center'
     }
})