import { StyleSheet } from 'react-native'
import {COLORS, SIZES} from '../constants/index'

const styles = StyleSheet.create({
    container:{
      padding: SIZES.small,
    },
    wrapper:{
        marginBottom: 20,
        //marginHorizontal: 20,
    },
    label:{
        fontFamily:"regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign:'right'
    },
    inputWrapper: (borderColor)=> ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    }),
    inputWrapperDescription: (borderColor)=> ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        //height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    }),
    inputWrapperCategory: (borderColor)=> ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        //height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    }),
    iconStyle:{
        marginRight: 10,
    },
    input:{
      //width: SIZES.width,
      borderWidth: 1,
      paddingHorizontal:17,
      padding:10,
      borderRadius:10,
      fontSize:17
    },
    title:{
        fontFamily: "bold",
        color: COLORS.primary,
        fontSize: SIZES.large,
        alignItems: 'center',
        marginHorizontal: '20%',
        marginBottom: SIZES.xxLarge
    },
    btnText:{
      fontFamily: 'bold',
      color: COLORS.white,
      fontSize:18,
    },
    pickerItem: {
        fontSize: 16, // Adjust font size as needed
        color: 'black', // Adjust text color as needed
        backgroundColor: COLORS.lightWhite,
        //height: 50,
        // Add more styling properties as needed
    },
    btnStyle:{
      height:50,
      width: '100%',
      marginVertical: 20,
      backgroundColor : COLORS.primary,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 12,
    },
  })

  export  default styles;