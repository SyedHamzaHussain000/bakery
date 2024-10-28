import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../assets/Utils';
import SvgIcons from './SvgIcons';

const DiscoverCategory = ({handleOnPress, icon, activeTab, title}) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={{
        backgroundColor: activeTab === title ? Color.themeColor : Color.white,
        height: 90,
        width: 70,
        paddingTop: 7,
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
      }}>
      <View
        style={{
          backgroundColor: activeTab === title ? Color.white : '#EBEBEB',
          height: 60,
          width: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SvgIcons height={'32'} width={'32'} xml={icon} />
      </View>
    </TouchableOpacity>
  );
};

export default DiscoverCategory;
