import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';

export default StyleSheet.create({
      ...general,
      actions :{
        flexDirection: 'row',
        width : "40%",
        justifyContent: 'space-between',
        marginVertical: "1%"
      },
      button: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 10,
        width: '60%',
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20
    },
    });