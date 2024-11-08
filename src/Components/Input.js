import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Color} from '../assets/Utils';
import { styles } from '../Styles';
import { responsiveFontSize, responsiveWidth } from '../assets/Responsive_Dimensions';

const Input = ({
  placeholder,
  placeHolderColor,
  textAlignVertical,
  height,
  multiline,
  handleInputChange,
  value,
  width,
  text,
  keyboardType,
  brbtmRightRds,
  brTopRightsRds,
  elevation,
  bgColor,
  brdrWidth,flexGrow
}) => {
  return (
    <View style={[null, {gap:10,width: width ? width : responsiveWidth(90),flexGrow:flexGrow}]}>
          
          {text ? (
            <Text style={{color: Color.black, fontSize: responsiveFontSize(1.9)}}>{text}</Text>
            ) : null}
      <TextInput
      keyboardType= {keyboardType ? keyboardType : null}
        onChangeText={handleInputChange}
        multiline={multiline}
        value={value}
        placeholder={placeholder}
        textAlignVertical={textAlignVertical}
        placeholderTextColor={placeHolderColor ? placeHolderColor : Color.black}
        style={[styles.inputStyle,{
          color: Color.black,
          height: height,
          borderBottomLeftRadius:brbtmRightRds ? brbtmRightRds : 0,
          borderTopRightRadius:brTopRightsRds ? brTopRightsRds :30,
          elevation: elevation ? elevation : 2,
          fontSize: responsiveFontSize(1.8),
          backgroundColor:bgColor ? bgColor : Color.white,
          borderWidth:brdrWidth ? brdrWidth : 1
        }]}
      />
    </View>
  );
};

export default Input;


