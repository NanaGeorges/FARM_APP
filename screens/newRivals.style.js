import { StyleSheet } from "react-native"
import {COLORS, SIZES} from  "../constants";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.lightWhite
    },
    wrapper:{
        flex: 1,
        backgroundColor: COLORS.lightWhite
    },
    upperRow:{
        width: SIZES.width-50,
        marginHorizontal: SIZES.large,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"flex-start",
        position: "absolute",
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.large,
        top: SIZES.large,
        zIndex: 999,
    },
    heading:{
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color: COLORS.lightWhite,
        marginLeft: 5
    },

    // style specifique to ProductsListsByCategory Flatlist
    loadingContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    containerFlatlist:{
        alignItems: "center",
        paddingTop: SIZES.xxLarge,
        paddingLeft: SIZES.small/2,
    },
    separator:{
        height: 16,
    }

    // End of specique styles for ProducslistsByCategory Flatlis

})

export default styles;