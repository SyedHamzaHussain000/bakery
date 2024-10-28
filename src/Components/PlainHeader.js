import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../assets/Utils';
import {styles} from '../Styles';
const PlainHeader = ({text, handlePress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={handlePress}>
        <Ionicons name="chevron-back" size={20} color={Color.black} />
      </TouchableOpacity>
      <Text style={[styles.mediumBlack4, {fontWeight: '400'}]}>{text}</Text>
      <Text style={{color: Color.white}}>.</Text>
    </View>
  );
};

export default PlainHeader;
