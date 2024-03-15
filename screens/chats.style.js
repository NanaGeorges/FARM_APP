import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES } from '../constants';


const styles = StyleSheet.create({
    area: {
      flex: 1,
      backgroundColor: COLORS.lightWhite,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.lightWhite,
      padding: 16,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.secondary,
      width: SIZES.width - 32,
      height: 50,
      marginVertical: 22,
      paddingHorizontal: SIZES.small,
      borderRadius: SIZES.small,
    },
    searchInput: {
      flex: 1,
      height: "100%",
      marginHorizontal: SIZES.small,
      backgroundColor: COLORS.secondary,
    },
    saerchInput: {
      flex: 1,
      height: '100%',
      marginHorizontal: SIZES.small,
      backgroundColor: COLORS.white,
    },
    userContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: COLORS.secondary,
      borderBottomWidth: 1,
    },
    oddBackground: {
      backgroundColor: COLORS.lightWhite,
    },
    userImageContainer: {
      paddingVertical: 15,
      marginRight: 22,
    },
    onlineIndicator: {
      height: 14,
      width: 14,
      borderRadius: 7,
      backgroundColor: COLORS.primary,
      position: "absolute",
      top: 14,
      right: 2,
      zIndex: 999,
      borderWidth: 2,
      borderColor: COLORS.white
    },
    userImage: {
      height: 50,
      width: 50,
      borderRadius: 25
    },
    userInfoContainer: {
      flexDirection: 'column',
      //marginRight: 12,
    },
    userName: {
      fontSize: 14,
      fontFamily: 'semibold',
      color: COLORS.black,
      marginBottom: 4,
    },
    lastSeen: {
      fontSize: 14,
      color: COLORS.gray,
    },
    lastMessageTime: {
      fontSize: SIZES.small,
      color: COLORS.black,
    },
    messageInQueue: {
      fontSize: SIZES.small,
      fontFamily: 'regular',
      color: COLORS.white,
    }
  })

  export default styles