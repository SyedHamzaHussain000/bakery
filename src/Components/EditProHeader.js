import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../assets/Utils';
import {styles} from '../Styles';
const EditProHeader = ({handleOnPress}) => {
  return (
    <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
      <TouchableOpacity onPress={handleOnPress}>
        <Ionicons name="chevron-back" size={25} color={Color.black} />
      </TouchableOpacity>
      <Text style={[styles.largeBlack, {fontWeight: '500'}]}>Set Profile</Text>
    </View>
  );
};

export default EditProHeader;
