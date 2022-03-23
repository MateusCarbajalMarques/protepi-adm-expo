import colors from './colors';
import fonts from './fonts';

const general = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  texTitle: {
    fontSize: 16,
    fontFamily: 'HindMadurai-SemiBold',
    color: colors.secondaryBlack,
  },
  containerInput: {
    alignItems: 'center',
  },
  input: {
    fontSize: fonts.input,
    lineHeight: 20,
    width: '85%',
    paddingHorizontal: 5,
    marginBottom: '2%',
    fontFamily: 'HindMadurai-Regular',
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

  buttonBorder : {
    backgroundColor: colors.white,
    paddingVertical: 10,
    width: '85%',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.secondaryColor,
  },

  textDefaultButtonBorder: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: fonts.title,
    color: colors.secondaryColor,
  },

  defaultButtonFixedEnd: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: "5%",
    // alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDefaultButton: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: fonts.title,
    color: colors.white,
  },

  textEmpresButton: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: fonts.title,
    color: colors.black,
  },
  modelTitle: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 20,
  },
  iconModelTitle: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  headerModel: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  identifyScreen : {
    flexDirection: 'row',
    alignItems: "center",
    marginRight: 10,
  },

  subHeaderModel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    alignItems: 'center',
  },

  threePoints: {
    width: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue'
  },

  imageModelTitle: {
    maxWidth: 40,
    maxHeight: 36,
    // borderWidth: 1,
    // borderColor: 'red'
  },

  productNameL: {
    color: colors.secondaryColor,
    fontSize: 16,
    fontFamily: "HindMadurai-Regular",
    width:"100%",
    flexShrink:1,
    padding:16,
    marginLeft: '5%',
    
  },

  productName: {
    color: colors.secondaryColor,
    fontSize: 16,
    fontFamily: "HindMadurai-Regular",
    width:"100%",
    flexShrink:1,
  },
  productPrice: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: fonts.atention,
    width: '100%',
    flexShrink: 1,
  },
  produt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#899DAC',
    paddingVertical: '5%',
    marginBottom: '5%',
    width: '90%',
    alignSelf: 'center',
  },
  productImage: {
    width: 89,
    height: 89,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.25)',
    borderRadius: 10,
  },
  productInfo: {
    marginLeft: '5%',
    flexShrink: 1,
  },
  details: {
    fontFamily: "HindMadurai-SemiBold",
    color: colors.secondaryColor,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  subProductInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
  },

  modalLoad: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,.8)",
    justifyContent: 'center',
    alignItems: 'center'
  },
  textModalLoad: {
    fontFamily: 'HindMadurai-Regular',
    fontSize: 20,
    marginTop: 25
  },

  action: {
    fontFamily: 'HindMadurai-SemiBold',
    fontSize: 18,
  },
  remove: {
    color: 'red'
  },
  change: {
    color: colors.primaryColor,
  },
};

export default general;
