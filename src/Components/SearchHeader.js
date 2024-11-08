import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../assets/Utils';
import SvgIcons from './SvgIcons';
import {User} from '../assets/icons';
const SearchHeader = ({handlePress}) => {
  return (
    <View style={{justifyContent: 'space-between', flexDirection: 'row',alignItems:'center'}}>
      <TouchableOpacity>

      <Ionicons size={35} color={Color.black} name="search-sharp" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>

      <SvgIcons height={'25'} width={'25'} xml={User} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;
