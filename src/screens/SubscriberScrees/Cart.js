import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../assets/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import PlainHeader from '../../Components/PlainHeader';
import Button from '../../Components/Button';
import {bookProducts, getLocationName} from '../../GlobalFunctionns';
import Products from '../../Components/Products';
import Modal from 'react-native-modal';

const Cart = ({navigation, route}) => {
  const {addToCartProducts, token, userData} = useSelector(state => state.user);
  const coordinates = userData.Location;
  const latLng = route?.params?.latLng;
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationName, setLocationName] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (latLng) {
      setLocationName(latLng?.location);
      setModalVisible(true);
    }
  }, [locationName, latLng]);

  const getLocation = async () => {
    setIsLoading(true);
    try {
      const response = await getLocationName(
        coordinates.coordinates[1],
        coordinates.coordinates[0],
      );
      setLocationName(response);
    } catch (error) {
      console.log('Error fetching location:', error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const placeOrderHandler = async () => {
    setIsLoading(true);
    try {
      await bookProducts(
        addToCartProducts,
        latLng ? latLng.latitude : coordinates.coordinates[1],
        latLng ? latLng.longitude : coordinates.coordinates[0],
        token,
        dispatch,
      );

      setModalVisible(false);
    } catch (error) {
      console.log('Error processing order:', error);
    } finally {
      setIsLoading(false);
    }

    // console.log('addToCartProducts',addToCartProducts,
    //    'lat' ,  latLng ? latLng.latitude : coordinates.coordinates[1],
    //    'lng',    latLng ? latLng.longitude : coordinates.coordinates[0],
    //   'token',    token)
      //    dispatch,)
  };

  const chooseLocationHandler = async () => {
    setModalVisible(!modalVisible);
    getLocation();
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
          renderItem={area => {
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
        padding={responsiveHeight(1.9)}
        styleName={'plainButton'}
          handleOnPress={() => chooseLocationHandler()}
          fontWeight={'light'}
          marginTop={20}
          title={'Place Order'}
          color={Color.themeColor}
        />
      ) : null}

      <View style={{}}>
        <Modal
          onBackdropPress={() => setModalVisible(false)}
          isVisible={modalVisible}
          backdropOpacity={0.2}
          animationInTiming={600}
          animationOutTiming={600}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={{
            margin: 0,
            backgroundColor: Color.white,
            position: 'absolute',
            bottom: 0,
            height: responsiveHeight(50),
            width: responsiveWidth(100),
            borderTopRightRadius: responsiveHeight(4),
            borderTopLeftRadius: responsiveHeight(4),
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center', gap: responsiveHeight(1.5)}}>
            <Text
              style={{fontSize: responsiveFontSize(2.5), fontWeight: 'bold'}}>
              Confirm Your Location
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: '400',
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              {locationName}
            </Text>
            <Button
              styleName={'plainButton'}
              padding={responsiveHeight(1.9)}
              disable={true}
              handleOnPress={() => placeOrderHandler()}
              fontWeight={'light'}
              color={Color.themeColor}
              title={
                isLoading ? (
                  <ActivityIndicator size={'large'} color={Color.white} />
                ) : (
                  'Proceed With This Location'
                )
              }
            />
            <Button
              styleName={'plainButton'}
              padding={responsiveHeight(1.9)}
              disable={true}
              handleOnPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('ChooseLocation', {
                  type: 'placeOrderHandler',
                });
              }}
              fontWeight={'light'}
              color={Color.themeColor}
              title={'Change Location'}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Cart;
