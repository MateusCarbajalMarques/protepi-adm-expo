import { StyleSheet } from 'react-native';
//import { color } from 'react-native-reanimated';
import { general, colors, fonts } from '../../../deafultstyles';

export default StyleSheet.create({
      ...general,
      produt: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: '#899DAC',
          paddingVertical: '3%',
          marginVertical: '3%',
          width: '90%',
          alignSelf: 'center',
      },
      productImage: {
          width: 80,
          height: 80,
          paddingTop:'10%',
          position: 'absolute',
          marginLeft: 30,
      },
      productName: {
        fontSize: 15,
        color: colors.secondaryColor,
      },
      productPrice: {
        color: colors.secondaryColor,
        fontSize: 18,
        fontFamily: 'HindMadurai-Regular',
        width: '100%',
        flexShrink: 1,
      },
      productInfo: {
        marginLeft: '35%',
        flexShrink: 1,
      },
      productName2: {
        marginTop: -1,
        fontSize: 22,
        color: colors.secondaryBlack,
        fontFamily: 'HindMadurai-SemiBold',
      },
      noDates : {
        fontSize: 18,
        width: "70%",
        textAlign: 'center',
        fontFamily: 'HindMadurai-Regular',
        marginTop: 200,
        alignSelf: 'center'
      },
      boxFilter: {
        borderBottomColor: colors.white,
        borderBottomWidth: 3,
        marginHorizontal : 10,
        marginVertical : 10,
        paddingVertical: 10,
        paddingHorizontal : 15,
      },
      boxFilterSelected : {
        borderBottomColor: colors.primaryColor,
      },
      textFilter : {
        fontFamily: 'HindMadurai-Regular',
        color: '#1389DF',
      },
      textFilterSelected : {
        fontFamily: 'HindMadurai-SemiBold',
        color: '#1389DF',
      }
});
