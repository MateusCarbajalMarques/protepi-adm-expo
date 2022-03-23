import React from 'react-native';
import {StyleSheet} from 'react-native';
import {general, colors, fonts} from '../../../deafultstyles';

export default StyleSheet.create({
  ...general,
  identifyScreen: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  headerDelivery: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  body: {
    width: '100%',
    paddingHorizontal: 20,
    flex: 1,
  },

  textModality: {
    fontSize: fonts.title,
    fontFamily: 'HindMadurai-SemiBold',
    color: colors.secondaryColor,
    marginVertical: '2%',
  },

  part: {
    paddingBottom: 20,
  },

  itemPedido: {
    // borderWidth: 2,
    // borderColor: 'red',
    flexDirection: 'row',
    marginTop: 8,
  },
  able: {
    color: colors.secondaryBlack,
  },

  disabled : {
    color: colors.desabled,
  },

  itemTitle: {
    marginTop: -5,
    marginLeft: 13,
    fontSize: 22,
    fontFamily: 'HindMadurai-SemiBold',
  },

  itemData: {
    marginTop: -2,
    marginLeft: 13,
    fontSize: 14,
    color: colors.secondaryColor,
  },

  titleAdress: {
    fontSize: 16,
    color: colors.secondaryColor,
  },

  itemAdress: {
    fontSize: 16,
    fontFamily: 'HindMadurai-SemiBold',
    color: colors.secondaryBlack,
  },

  contOption: {
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  auxOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'green'
  },

  textRadio: {
    fontSize: 16,
    fontFamily: 'HindMadurai-SemiBold',
    color: colors.primaryColor,
  },
  topDefault: {
    marginVertical: '2%',
    paddingHorizontal: 5,
    paddingBottom: '1%',
    borderBottomWidth: 0.5,
    borderColor: colors.secondaryColor,
  },
  texConteudo: {
    fontSize: 16,
    fontFamily: 'HindMadurai-Regular',
    color: colors.secondaryBlack,
    flexShrink: 1,
  },
  defaultButton: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    width: '85%',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    width: '60%',
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  actions: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-between',
    marginVertical: '1%',
  },
});
