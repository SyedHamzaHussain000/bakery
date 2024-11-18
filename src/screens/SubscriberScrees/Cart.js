import {View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../assets/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import {baseUrl} from '../../baseUrl';
import PlainHeader from '../../Components/PlainHeader';
import Button from '../../Components/Button';
import axios from 'axios';
import {bookProducts} from '../../GlobalFunctionns';
import Products from '../../Components/Products';

const Cart = ({navigation}) => {
  const {addToCartProducts, token} = useSelector(state => state.user);
  console.log('addtoCartProducts',addToCartProducts)
  const [isLoading, setIsLoading] = useState(false);
  // console.log('addToCartProducts======>>>>', addToCartProducts);
const dispatch = useDispatch()
  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      await bookProducts(addToCartProducts, token,dispatch);
    } catch (error) {
      console.log('Error processing order:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <View style={{flex: 1, backgroundColor: Color.white, padding: 20}}>
      <PlainHeader
        iconSize={25}
        fntSize={22}
        fntWeight={600}
        handlePress={() => navigation.goBack()}
        text={'Carts'}
      />
      {addToCartProducts.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between', gap: 10}}
          contentContainerStyle={{
            justifyContent: 'space-between',
            marginTop: 30,
          }}
          numColumns={2}
          data={addToCartProducts}
          renderItem={(area, index) => {
            // console.log('area=====>>>>>>>>',area);
            return (
              // <TouchableOpacity
              //   onPress={() => navigation.navigate('EditCartProduct', {area})}
              //   style={{
              //     backgroundColor: Color.white,
              //     shadowColor: '#000',
              //     shadowOffset: {width: 0, height: 2},
              //     shadowOpacity: 0.25,
              //     shadowRadius: 3.84,
              //     borderBottomLeftRadius: 5,
              //     borderBottomRightRadius: 5,
              //     elevation: 2,
              //     marginBottom: 20,
              //   }}>
              //   <Image
              //     style={{height: 120, width: responsiveWidth(42)}}
              //     source={{uri: `${baseUrl}bakery/${area.item.productImage}`}}
              //   />
              //   {/* <Text>{area.item.productName}</Text> */}

              //   <View style={{padding: 10}}>
              //     <View
              //       style={{
              //         flexDirection: 'row',
              //         justifyContent: 'space-between',
              //       }}>
              //       <Text
              //         style={{
              //           color: Color.black,
              //           fontSize: 16,
              //           fontWeight: 'semibold',
              //         }}>
              //         {area.item.productName}
              //       </Text>
              //       <Text
              //         style={{
              //           color: Color.black,
              //           fontSize: 16,
              //           fontWeight: 'semibold',
              //         }}>
              //         {area.item.quantity}
              //       </Text>
              //     </View>
              //     <Text style={{color: '#B8B8B8', fontSize: 10, marginTop: 10}}>
              //       Flavor - {area.item.flavor ? area.item.flavor : 'Creamy'}
              //     </Text>

              //     <View
              //       style={{
              //         flexDirection: 'row',
              //         justifyContent: 'space-between',
              //         alignItems: 'center',
              //         marginTop: 10,
              //       }}>
              //       <Text
              //         style={{
              //           color: Color.themeColor,
              //           fontSize: 16,
              //           fontWeight: 'bold',
              //         }}>
              //         ${area.item.totalPrice}
              //       </Text>
              //       <View>
              //         <Text style={{color: Color.themeColor, fontSize: 10}}>
              //           View Details
              //         </Text>
              //         <View
              //           style={{
              //             height: 1,
              //             width: '100%',
              //             backgroundColor: Color.themeColor,
              //           }}></View>
              //       </View>
              //     </View>
              //   </View>
              // </TouchableOpacity>
              <Products carts={true} data={area} routesData={area} navigation={navigation} screen={'EditCartProduct'} />
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: responsiveHeight(5),
          }}>
          <Text style={{color: '#A9A9A9', fontSize: 30, fontWeight: 'bold'}}>
            There's Nothing To Show Here!
          </Text>
        </View>
      )}
      <Button
        styleName={'plainButton'}
        handleOnPress={() => handlePlaceOrder()}
        fontWeight={'light'}
        marginTop={20}
        title={isLoading ? (<ActivityIndicator size={'large'} color={Color.white}/>) : 'Place Order'}
        color={Color.themeColor}
      />
    </View>
  );
};

export default Cart;
