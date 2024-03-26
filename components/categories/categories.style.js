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
        //flex: 1,
        alignItems: "center",
        paddingTop: SIZES.large - 15,
        paddingLeft: SIZES.small/2,
        //width: '100%',
       // border: '2px',
       //marginHorizontal: SIZES.small,

    },
    separator:{
        height: 16,
    },
     /* item: {
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
        backgroundColor: COLORS.primary,
        
    },
    details:{
        padding: SIZES.small,
        alignItems:'center',
    },
    title:{
        fontFamily: 'regular',
        color: COLORS.lightWhite,
        fontSize: SIZES.small,
        
    },
    /* header:{
        paddingTop: SIZES.large -6,
        paddingHorizontal: '34%'
    },
    headerTitle:{
        fontFamily: "semibold",
        fontSize: SIZES.xLarge -2
    }, */
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: SIZES.large -6,
      },
      headerTitle: {
        fontFamily: "semibold",
        fontSize: SIZES.xLarge - 2,
      },
      


   /*  imageContainer: {
        flex: 1,
        width: 170,
        marginleft: SIZES.small,
        borderRadius: SIZES.small,
        overflow: "hidden",
    },
    image:{
        aspectRatio: 1,
        resizeMode: 'cover'
    }, */
    imageContainer: {
        flex: 1,
        width: 120,
        height: 100,
        paddingTop: 10,
       // marginHorizontal: SIZES.small ,
        //marginleft: SIZES.small,
        borderRadius: SIZES.xxLarge + 20,
        overflow: "hidden",
        //border: '10px',
        //borderColor: 'black',
        //borderStyle: 'solid',
    },
    image:{
        aspectRatio: 6/5,
        resizeMode: 'contain'
    },
})

export default styles;