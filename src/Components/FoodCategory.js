import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../assets/Utils';
import SvgIcons from './SvgIcons';
import { styles } from '../Styles';

const FoodCategory = ({category, title,active,handlePress}) => {

  return (
    <TouchableOpacity
    onPress={handlePress}
      style={[styles.shadow,{
        // flexGrow: 1,
        backgroundColor: active === title ? Color.themeColor : Color.white,
        paddingTop: 10,
        marginVertical:5,
        paddingHorizontal: 8,
        alignItems: 'center',
        height: 115,
        gap: 10,
        borderTopLeftRadius:  30 ,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius:active === title ? null : 30
      }]}>
      <View
        style={{
          backgroundColor:active === title ? Color.white : '#EBEBEB',
          padding: 10,
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SvgIcons xml={category} height={'30'} width={'30'} />
      </View>
      <Text style={{color: active === title ? Color.white : Color.black}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FoodCategory;
