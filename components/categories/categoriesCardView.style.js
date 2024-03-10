import { StyleSheet } from "react-native";
import {COLORS, SIZES} from "../../constants/index";

const styles = StyleSheet.create({
    container:{
        width: 100,
        height: 120,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.gray2,
    },
    imageContainer: {
        flex: 1,
        width: 95,
        height: 80,
        marginleft: SIZES.small,
        borderRadius: SIZES.small,
        overflow: "hidden",
    },
    image:{
        aspectRatio: 1.3,
        resizeMode: 'cover'
    },
    details:{
        padding: SIZES.small,
    },
    title:{
        fontFamily: 'regular',
        color: COLORS.white,
        fontSize: SIZES.small,
    }
})

export default styles