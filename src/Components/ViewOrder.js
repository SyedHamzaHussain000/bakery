import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../assets/Utils';
import Button from './Button';

const ViewOrder = ({
  name1,
  name2,
  price1,
  price2,
  order1,
  order2,
  buttonTitle,
}
) => {
  const data = [
    {
      id: 1,
      name: name1,
      price: price1,
      order: order1,
    },
    {
      id: 2,
      name: name2,
      price: price2,
      order: order2,
    },
  ];
  return (
    <View style={{}}>
      {data.map((area, index) => {
        return (
          <View
            style={[
              styles.elevationStyle,
              styles.buttonStyle,
              {
                elevation: 4,
                backgroundColor: Color.white,
                marginTop: 25,
                padding: 10,
              },
            ]}
            key={index}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Color.black,
                    fontSize: 20,
                    fontWeight: '500',
                  }}>
                  {area.name}
                </Text>
                <Text style={{fontSize: 12, color: '#C5C5C5'}}>Just Now</Text>
              </View>
              <Text
                style={{
                  color: Color.themeColor,
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                {area.price}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: '#C5C5C5'}}>{area.order}</Text>
             
               <Button
               width={'auto'}
          styleName={'viewDetails'}
          title={buttonTitle}
          fontSize={16}
          fontWeight={'light'}
          color={Color.themeColor}
        />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ViewOrder;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Color.themeColor,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingVertical:12,
    paddingHorizontal:15
  },

  elevationStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
