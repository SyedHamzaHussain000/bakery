import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../assets';
import SvgIcons from './SvgIcons';
import {cart} from '../assets/icons';
import { Color } from '../assets/Utils';
import { styles } from '../Styles';

const Header = ({handlePress,handleNavigate}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableOpacity onPress={handleNavigate} style={{
        borderRadius:15,
        backgroundColor:Color.white,
           }}>

        <Image  style={{height: 72, width: 72,backgroundColor:'red',borderRadius:20,resizeMode:'cover'}} source={Images.profilePic} />
        </TouchableOpacity>
        <Text style={styles.extraLargeBlack}>John Doe</Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <SvgIcons height={'30'} width={'35'} xml={cart} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
