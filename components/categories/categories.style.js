import { StyleSheet } from "react-native"
import { COLORS, SIZES} from "../../constants";

const styles = StyleSheet.create({
   /*  loadingContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    container:{
        alignItems: "center",
        paddingTop: SIZES.xxLarge,
        paddingLeft: SIZES.small/2,
    },
    separator:{
        height: 16,
    } */

    containerFlatlist:{
        alignItems: "center",
        paddingTop: SIZES.large - 15,
        paddingLeft: SIZES.small/2,
    },
    separator:{
        height: 16,
    },
     /*  item: {
        backgroundColor: COLORS.secondary,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
      },
      title: {
        fontSize: 18,
      },
      image: {
        width: 50,
        height: 50,
        marginRight: 10,
      }, */
      container:{
        width: 130,
        height: 150,
        marginEnd: 22,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
    },
    imageContainer: {
        flex: 1,
        width: 120,
        height: 100,
        marginleft: SIZES.small,
        borderRadius: SIZES.xxLarge + 10,
        overflow: "hidden",
    },
    image:{
        aspectRatio: 6/5,
        resizeMode: 'contain'
    },
    details:{
        padding: SIZES.small,
    },
    title:{
        fontFamily: 'regular',
        color: COLORS.black,
        fontSize: SIZES.small,
    },
    header:{
        paddingTop: SIZES.large -6,
        paddingHorizontal: '34%'
    },
    headerTitle:{
        fontFamily: "semibold",
        fontSize: SIZES.xLarge -2
    }
})

export default styles;