import {StyleSheet} from 'react-native'

import { COLORS, SIZES } from '../constants'


const styles = StyleSheet.create({
    inputContainer: {
      backgroundColor: COLORS.secondary,
      height: 72,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputMessageContainer: {
      height: 54,
      width: SIZES.width - 48,
      flexDirection: "row",
      justifyContent: 'center',
      backgroundColor: COLORS.lightWhite,
      borderRadius: SIZES.medium,
      alignItems: 'center',
      borderColor: 'rgba(128,128,128,.4)',
      borderWidth: 1,
    },
    input: {
      color: 'black',
      flex: 1,
      paddingHorizontal: 10,
    },
    sendButton: {
      backgroundColor: COLORS.lightWhite,
      padding: 4,
      borderRadius: 999,
      marginHorizontal: 6,
    }
  })

  export default styles