import {StyleSheet} from 'react-native';
import {general, colors, fonts} from '../../../deafultstyles';

export default StyleSheet.create({
  ...general,

  headerBlue: {
    backgroundColor: colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },

  iconUser: {
    width: 50,
    height: 50,
  },

  textUser: {
    fontSize: fonts.title,
    color: colors.white,
    // fontWeight: 'bold',
    marginLeft: 10,
  },

  bodyMenu: {
    backgroundColor: colors.white,
    marginTop: -20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  backBlue : {
    marginTop: 40,
    backgroundColor: '#1ABC9C',
  },

  backOrange: {
    backgroundColor: '#5BC0DE'
  },

  backBlueThree : {
    backgroundColor: '#999999'
  },

  requests: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // padding: 20,
    borderRadius: 10,
  },

  iconRequests: {
    width: 60,
    height: 60,
  },

  infoRequests: {
    // borderWidth: 2,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  infoRequestsNumber: {
    fontSize: fonts.big,
    color: colors.white,
    fontWeight: 'bold',
  },

  infoRequestsText: {
    fontSize: fonts.atention,
    color: colors.white,
    fontWeight: 'bold',
  },

  optionsMenu: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  optionMenu : {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.borderColorLight,
    borderRadius: 10,
    width: '45%',    
    alignItems: 'center',
    paddingVertical: 20,    
  },

  iconMenu : {
    width: 70,
  },

  textMenu : {
      marginTop: 10,
      color: colors.primaryColor,
      fontWeight: 'bold',
      fontSize: fonts.medium,

  },
});
