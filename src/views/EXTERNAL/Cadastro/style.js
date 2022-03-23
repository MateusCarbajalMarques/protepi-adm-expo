import React from 'react-native';
import {StyleSheet} from 'react-native';
import {general, colors, fonts} from '../../../deafultstyles';

export default StyleSheet.create({
  ...general,
  backPhoto: {
    width: 160,
    height: 160,
    marginVertical:'10%',
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center',
  },
  photo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent:'center',
  },
  textPhoto: {
    fontFamily: 'HindMadurai-Regular',
    fontSize: fonts.input,
    color: colors.secondaryBlack,
    marginTop: "5%"
  },
  modePhoto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    alignSelf: 'center'
  },
  modeBlock: {
    alignItems:'center',
		justifyContent: 'center'
  },
  modeIcon: {
    width: 32,
  },
  modeText: {
    fontSize: fonts.input,
    marginVertical:'10%',
    fontFamily: 'HindMadurai-Regular',
    color:colors.borderColor,
  },
  containerInput: {
    alignItems: 'center',
  },
  inputSide : {
    width: '45%',
  },
  compCheckbox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    flexDirection: 'row',
  },
});
