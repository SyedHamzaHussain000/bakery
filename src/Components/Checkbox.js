import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color } from '../assets/Utils';
import { styles } from '../Styles';
import Modal from 'react-native-modal';
import Button from './Button';

const Checkbox = ({ modalVisible, setModalVisible,onSelectedItemsChange}) => {
  const [selectedItems, setSelectedItems] = useState([]);
console.log(selectedItems)
  const data = [
    { id: 1, text: 'Cup Cakes' },
    { id: 2, text: 'Pastry' },
    { id: 3, text: 'Donuts' },
    { id: 4, text: 'Bread' },
    { id: 5, text: 'Biscuits' },
  ];
  const handleCheckboxToggle = (text) => {
    setSelectedItems(prevItems => {
      const updatedItems = prevItems.includes(text)
        ? prevItems.filter(item => item !== text)
        : [...prevItems, text];

      onSelectedItemsChange(updatedItems); // Pass updated items to parent
      return updatedItems;
    });
  };

  const isChecked = (text) => selectedItems.includes(text);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#D4D4D4',
          borderRadius: 30,
          borderBottomRightRadius:0,
          paddingVertical: 13,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 3.84,
          elevation: 2,
          backgroundColor: Color.white,
        }}
      >
        <Text style={{ color: '#8D8D8D', fontSize: 14 }}>
          Choose Categories...
        </Text>
        <Ionicons name="chevron-down" color={Color.themeColor} size={20} />
      </TouchableOpacity>

      <Modal
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        isVisible={modalVisible}
      >
        <View
          style={{
            backgroundColor: Color.white,
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: Color.black,
              marginBottom: 20,
            }}
          >
            Choose Categories
          </Text>
          <View style={{ gap: 20, marginBottom: 20 }}>
            {data.map((area) => (
              <TouchableOpacity
                key={area.id}
                onPress={() => handleCheckboxToggle(area.text)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}
              >
                <TouchableOpacity
                  onPress={() => handleCheckboxToggle(area.text)}
                  style={{
                    backgroundColor: isChecked(area.text)
                      ? Color.themeColor
                      : null,
                    borderWidth: 1,
                    borderColor: Color.themeColor,
                    height: 27,
                    width: 27,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {isChecked(area.text) && (
                    <Ionicons name="checkmark-sharp" size={20} color={Color.white} />
                  )}
                </TouchableOpacity>
                <Text style={[styles.mediumBlack3, { fontWeight: '400' }]}>
                  {area.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            handleOnPress={() => setModalVisible(!modalVisible)}
            fontWeight={'400'}
            marginTop={30}
            styleName={'plainButton'}
            title={'Submit'}
            color={Color.themeColor}
          />
        </View>
      </Modal>
    </>
  );
};

export default Checkbox;
