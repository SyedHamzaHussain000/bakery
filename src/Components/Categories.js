import {View, Text} from 'react-native';
import React from 'react';
import SvgIcons from './SvgIcons';
import {order} from '../assets/icons';
import {Color} from '../assets/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../Styles';
const Categories = ({text, xml, vector}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
        {vector ? (
          <MaterialIcons name="logout" size={25} color={Color.black} />
        ) : (
          <SvgIcons xml={xml} height={'26'} width={'26'} />
        )}
        <Text style={styles.mediumBlack3}>{text}</Text>
      </View>
      <View>
        <Ionicons name="chevron-forward" color={Color.black} size={20} />
      </View>
    </View>
  );
};

export default Categories;
