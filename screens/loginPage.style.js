import { StyleSheet } from "react-native"
import {COLORS, SIZES} from  '../constants'

const styles = StyleSheet.create({
    cover:{
        height: SIZES.height/2.4,
        width: SIZES.width -20 ,
        resizeMode: "contain",
        marginBottom: SIZES.xLarge
    },
    appTitle:{
        fontFamily: "bold",
        color: COLORS.primary,
        fontSize: SIZES.large,
        alignItems: 'center',
        marginHorizontal: '35%',
        marginBottom: SIZES.small
    },
    title:{
        fontFamily: "bold",
        color: COLORS.primary,
        fontSize: SIZES.large,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: SIZES.xxLarge
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
        alignItems: 'center'
    }),
    iconStyle:{
        marginRight: 10
    },
    errorMessage:{
        color: COLORS.red,
        fontFamily: "regular",
        marginTop:5,
        marginLeft: 5,
        fontSize: SIZES.xSmall,
    },
    registration: {
        marginTop: 20,
        textAlign: 'center'
    }


});

export default styles;