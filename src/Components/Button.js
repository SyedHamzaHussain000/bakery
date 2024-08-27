import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../assets/Utils';

const Button = ({title, color, handleOnPress}) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={{
        width: '90%',
        backgroundColor: color,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: Color.white, fontSize: 18, fontWeight: '600'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
