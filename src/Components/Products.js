import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Color} from '../assets/Utils';
import {baseUrl} from '../baseUrl';
import {responsiveWidth} from '../assets/Responsive_Dimensions';

const Products = ({navigation, data, screen, routesData, carts}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screen, {productData: routesData})}
      style={{
        backgroundColor: Color.white,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 2,
        marginBottom: 20,
      }}>
      <Image
        style={{height: 120, width: responsiveWidth(42)}}
        source={{uri: `${baseUrl}bakery/${data.item.productImage}`}}
      />
      {/* <Text>{data.item.productName}</Text> */}

      <View style={{padding: 10}}>
        <View
          style={{
            flexDirection: carts ? 'row' : null,
            justifyContent: carts ? 'space-between' : null,
          }}>
          <Text
            style={{
              color: Color.black,
              fontSize: 16,
              fontWeight: 'semibold',
            }}>
            {data.item.productName}
          </Text>
          {carts && (
            <Text
              style={{
                color: Color.black,
                fontSize: 16,
                fontWeight: 'semibold',
              }}>
              {data.item.quantity}
            </Text>
          )}
        </View>
        <Text style={{color: '#B8B8B8', fontSize: 10, marginTop: 10}}>
          Flavor - {data.item.flavor ? data.item.flavor : 'Creamy'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: Color.themeColor,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            ${data.item.discountPrice}
          </Text>
          <View>
            <Text style={{color: Color.themeColor, fontSize: 10}}>
              View Details
            </Text>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: Color.themeColor,
              }}></View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Products;
