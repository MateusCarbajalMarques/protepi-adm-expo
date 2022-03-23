import React from 'react-native';
import { StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../../deafultstyles';


export default StyleSheet.create({
    ...general,
    emptyCart : {
        flex : 1,
        alignItems: 'center',
        marginTop: "20%",
    },
    emptyCartText : {
        textAlign: 'center',
    },
    subProductInfoP: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "1%"
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