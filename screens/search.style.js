import { StyleSheet } from "react-native";
import {COLORS, SIZES} from "../constants";

const styles = StyleSheet.create({

    searchContainer: {
        flexDirection: "row",
        justifyContent: "center", 
        alignContent: "center",
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.medium,
        marginVertical: SIZES.medium,
        height: 50
    },
    searchIcon: {
        marginHorizontal: 10,
        color: COLORS.gray,
        marginTop: SIZES.small
    }, 
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        marginRight: SIZES.medium,
        borderRadius: SIZES.small
    },
    searchInput: {
        fontFamily: "regular",
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.small
    },
    searchBtn:{
        width: 50,
        height: "100%",
        borderRadius: SIZES.small,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: COLORS.primary
    }


})

export default styles