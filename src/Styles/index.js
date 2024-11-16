import {StyleSheet} from 'react-native';
import {Color} from '../assets/Utils';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from '../assets/Responsive_Dimensions';

export const styles = StyleSheet.create({
  viewDetails: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  proceedButton: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 13,
    paddingVertical: 15,
    fontSize: 16,
  },
  plainButton: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  editProfile:{
   height:responsiveHeight(4.2),
   width:responsiveWidth(40),
   borderRadius:10,
   justifyContent:'center',
   alignItems:'center'
  },
  productDetailsText:{
color:Color.black,
fontSize:responsiveFontSize(2),
fontWeight:'400'
  },
  smallBlack: {
    fontSize: 10,
    color: Color.black,
  },
  smallBlack2: {
    fontSize: 12,
    color: Color.black,
  },
  mediumBlack: {
    fontSize: 14,
    color: Color.black,
  },
  mediumBlack2: {
    fontSize: 15,
    color: Color.black,
  },
  mediumBlack3: {
    fontSize: responsiveFontSize(1.9),
    color: Color.black,
  },
  mediumBlack4: {
    fontSize: 18,
    color: Color.black,
  },
  dropdown: {
    paddingVertical: 15,
    borderRadius: 30,
    borderBottomRightRadius: 0,
    backgroundColor: 'white',
    borderColor: '#d4d4d4',
    borderWidth: 1,
    width:responsiveWidth(90),
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: Color.themeColor,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 13,
    paddingVertical: 15,
  },

  elevationStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  largeBlack: {
    fontSize: responsiveFontSize(2.4),
    color: Color.black,
  },
  largeBlack2: {
    fontSize: 22,
    color: Color.black,
  },
  extraLargeBlack: {
    fontSize: 24,
    color: Color.black,
  },
  navBarStyles: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  extraLargeBlack2: {
    fontSize: 30,
    color: Color.black,
  },
  inputStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor: 'white',
    borderColor: '#D4D4D4',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 30,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
});
