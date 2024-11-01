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
  keyboardType
}) => {
  return (
    <View style={[null, {gap:10,width: width ? width : responsiveWidth(90)}]}>
          
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
          fontSize: responsiveFontSize(1.8),
        }]}
      />
    </View>
  );
};

export default Input;


