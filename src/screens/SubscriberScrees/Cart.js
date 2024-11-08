import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { Color } from '../../assets/Utils'
import { useSelector } from 'react-redux'
import { responsiveWidth } from '../../assets/Responsive_Dimensions'
import { baseUrl } from '../../baseUrl'

const Cart = () => {
  const products = useSelector(state => state.user.addToCartProducts)
  console.log('products',products)
  return (
    <View style={{flex:1,backgroundColor:Color.white,padding:20}}>
        <FlatList
        showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between', gap: 10}}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginTop: 30,
          }}
          numColumns={2}
          data={products}
          renderItem={(area, index) => {
            console.log(area.item.productName);
            return (
   <TouchableOpacity
              
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
                  source={{uri: `${baseUrl}bakery/${area.item.productImage}`}}
                />
                {/* <Text>{area.item.productName}</Text> */}

                <View style={{padding: 10}}>
                  <View>
                    <Text
                      style={{
                        color: Color.black,
                        fontSize: 16,
                        fontWeight: 'semibold',
                      }}>
                      {area.item.productName}
                    </Text>
                  </View>
                  <Text style={{color: '#B8B8B8', fontSize: 10, marginTop: 10}}>
                    Flavor - {area.item.flavor ? area.item.flavor : 'Creamy'}
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
                      ${area.item.discountPrice}
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
            )
            }}
            />
    </View>
  )
}

export default Cart