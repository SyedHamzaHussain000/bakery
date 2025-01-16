import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../assets/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {responsiveHeight} from '../../assets/Responsive_Dimensions';
import PlainHeader from '../../Components/PlainHeader';
import Button from '../../Components/Button';
import {bookProducts} from '../../GlobalFunctionns';
import Products from '../../Components/Products';

const Cart = ({navigation}) => {
  const {addToCartProducts, token} = useSelector(state => state.user);
  // console.log('addtoCartProducts', addToCartProducts);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      await bookProducts(addToCartProducts, token, dispatch);
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
      {addToCartProducts?.length ? (
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
            return (
              <Products
                carts={true}
                data={area}
                routesData={area}
                navigation={navigation}
                screen={'EditCartProduct'}
              />
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
      {addToCartProducts?.length ? (
         <Button
        styleName={'plainButton'}
        handleOnPress={() => handlePlaceOrder()}
        fontWeight={'light'}
        marginTop={20}
        title={
          isLoading ? (
            <ActivityIndicator size={'large'} color={Color.white} />
          ) : (
            'Place Order'
          )
        }
        color={Color.themeColor}
      />
      ): null}
     
    </View>
  );
};

export default Cart;
