import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Color} from '../assets/Utils';

const Input = ({placeholder}) => {
  return (
    <View style={styles.inputStyle}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Color.black}
        style={{
          color: Color.black,
          fontSize: 14,
        
        }}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    backgroundColor: 'white',

    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    padding:5,
    paddingVertical: 3,
    // height: 45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 0,
  },
});
