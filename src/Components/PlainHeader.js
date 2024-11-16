import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../assets/Utils';
import {styles} from '../Styles';
const PlainHeader = ({text, handlePress, color,fntWeight,fntSize,iconSize,bgColor,notification}) => {
  return (
    <View
      style={[{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:bgColor,

      },notification ? styles.navBarStyles : null]}>
      <TouchableOpacity onPress={handlePress}>
        <Ionicons name="chevron-back" size={iconSize ? iconSize : 20} color={color ? color : Color.black} />
      </TouchableOpacity>
      <Text
        style={[
          styles.mediumBlack4,
          {fontWeight:fntWeight ? fntWeight :  '400',fontSize:fntSize ? fntSize : 18, color: color ? color : Color.black},
        ]}>
        {text}
      </Text>
      <Text style={{color: color ? color : Color.white}}>.</Text>
    </View>
  );
};

export default PlainHeader;
