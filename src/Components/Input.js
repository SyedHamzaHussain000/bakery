import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import {Color} from '../assets/Utils';
import {styles} from '../Styles';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  brdrWidth,
  flexGrow,
  secure,
}) => {

  const [passwordHidden,setPasswordHidden] = useState(true)
  return (
    <View
      style={[
        null,
        {
          gap: 10,
          width: width ? width : responsiveWidth(90),
          flexGrow: flexGrow,
        },
      ]}>
      {text ? (
        <Text style={{color: Color.black, fontSize: responsiveFontSize(1.9)}}>
          {text}
        </Text>
      ) : null}

      {secure && (
          <TouchableOpacity
          onPress={()=>setPasswordHidden(!passwordHidden)}
        style={{
          position: 'absolute',
          zIndex: 10,
          right: 10,
          height: '100%',
          justifyContent: 'center',
        }}>
        <Ionicons name={passwordHidden ? "eye-off" : 'eye'} size={25} style={{}} />
      </TouchableOpacity>
      )}
    
      <TextInput
      
        keyboardType={keyboardType ? keyboardType : null}
        onChangeText={handleInputChange}
        multiline={multiline}
        value={value}
        secureTextEntry={secure ? passwordHidden : null}
        placeholder={placeholder}
        textAlignVertical={textAlignVertical}
        placeholderTextColor={placeHolderColor ? placeHolderColor : Color.black}
        style={[
          styles.inputStyle,
          {
            color: Color.black,
            height: height,
            borderBottomLeftRadius: brbtmRightRds ? brbtmRightRds : 0,
            borderTopRightRadius: brTopRightsRds ? brTopRightsRds : 30,
            elevation: elevation ? elevation : 2,
            fontSize: responsiveFontSize(1.8),
            backgroundColor: bgColor ? bgColor : Color.white,
            borderWidth: brdrWidth ? brdrWidth : 1,
          },
        ]}
      />
    </View>
  );
};

export default Input;
