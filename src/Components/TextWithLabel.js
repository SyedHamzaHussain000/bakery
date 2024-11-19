import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../Styles';

const TextWithLabel = ({title, text}) => {
  return (
    <View>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.orderDetailsText}>{text}</Text>
    </View>
  );
};

export default TextWithLabel;
