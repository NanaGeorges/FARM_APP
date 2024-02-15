import { StyleSheet } from "react-native";
import {COLORS, SIZES} from "../../constants/index";

const styles = StyleSheet.create({
    container:{
        width: 182,
        height: 248,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
    },
    imageContainer: {
        flex: 1,
        width: 170,
        marginleft: SIZES.small,
        borderRadius: SIZES.small,
        overflow: "hidden",
    },
    image:{
        aspectRatio: 1,
        resizeMode: 'cover'
    },
    details:{
        padding: SIZES.small,
    },
    supplier:{
        fontFamily: 'regular',
        color: COLORS.gray,
        fontSize: SIZES.small,
    },
    price:{
        fontFamily:'bold',
        fontSize: SIZES.medium,
    },
    addBtn:{
        position: "absolute",
        bottom: SIZES.xSmall,
        right: SIZES.xSmall,
    }
})

export default styles