import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../assets/Utils';
import {clock, rider} from '../assets/icons';
import SvgIcons from './SvgIcons';
import Hr from './Hr';
import Button from './Button';
import SubscriptionModal from './SubscriptionModal';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {
  responsiveHeight,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import {riderStatusHandler} from '../GlobalFunctionns';
import {Apikey} from '../assets/ApiKey';
const CompletedOrders = ({navigation, data, startLoc}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {userType, token} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const bakeryLocation = data?.BakeryId?.Location?.coordinates;
  const subscriberLocation = data?.subscriberId?.Location?.coordinates;
  const pickup = {latitude: bakeryLocation[1], longitude: bakeryLocation[0]};
  const dropoff = {
    latitude: subscriberLocation[1],
    longitude: subscriberLocation[0],
  };
  // const dropoff =  {latitude: 37.421998333333335, longitude: -122.084}
  const currentLocation = {
    latitude: startLoc?.latitude,
    longitude: startLoc?.longitude,
  };
  console.log('current loaction',currentLocation);
  const destination = {
    latitude: bakeryLocation[1],
    longitude: bakeryLocation[0],
  };
  const startDeliveryHandler = async () => {
    setIsLoading(true);
    try {
      const res = await riderStatusHandler(data?._id, 'Start', token);
      setIsLoading(false);
      if (res.success || res.message === 'Order already booked from rider.') {
        // console.log('dropoff data',dropoff)
        navigation.navigate('OrderStatus', {
          data,
          currentLocation,
          pickup,
          dropoff,
        });
      }
      console.log('response', res);
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
    }
  };
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: Color.white,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        elevation: 4,
        marginTop: 30,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Text style={{color: Color.black, fontSize: 22, fontWeight: '500'}}>
          {data?.BakeryId?.userName}
        </Text>
        <Text style={{fontSize: 12, color: '#C5C5C5'}}>Just Now</Text>
      </View>

      <View>
        <View
          style={{
            backgroundColor: Color.themeColor,
            borderTopLeftRadius: 20,
          }}></View>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
          <View
            style={{
              backgroundColor: Color.themeColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderBottomLeftRadius: 25,
              height: 55,
              width: 65,
            }}>
            <SvgIcons xml={rider} height={'30'} width={'30'} />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: Color.black, fontSize: 17, fontWeight: '500'}}>
              {data?.BakeryId?.bakeryName}:
            </Text>
            <Text
              style={{
                color: '#C5C5C5',
                fontSize: 14,
                fontWeight: 'light',
                width: '100%',
                flexWrap: 'wrap',
                marginTop: 5,
              }}>
              {data?.productId?.productName} - {data?.productId?.flavor} -{' '}
              {data?.productId?.chooseCategory}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
          <View
            style={{
              backgroundColor: Color.white,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 4,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              height: 55,
              width: 65,
            }}>
            <SvgIcons xml={clock} height={'30'} width={'30'} />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: Color.black, fontSize: 17, fontWeight: '500'}}>
              {userType === 'Owner' ? 'Time Duration' : 'Time:'}
            </Text>
            <Text
              style={{
                color: '#C5C5C5',
                fontSize: 14,
                width: '100%',
                flexWrap: 'wrap',
                marginTop: 5,
              }}>
              {userType === 'Owner'
                ? 'In 30 Mins'
                : data?.BakeryId?.businessHours}
            </Text>
          </View>
        </View>
        {userType === 'Owner' ? (
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View
              style={{
                backgroundColor: Color.themeColor,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 4,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 25,
                height: 55,
                width: 65,
              }}>
              <Entypo name="location-pin" size={25} color={Color.white} />
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: Color.black, fontSize: 15}}>Location</Text>
              <Text
                style={{
                  color: '#C5C5C5',
                  fontSize: 12,
                  fontWeight: 'light',
                  width: '100%',
                  flexWrap: 'wrap',
                  marginTop: 5,
                }}>
                In 30 Mins
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              marginTop: 20,
              height: responsiveHeight(13),
              marginBottom: 10,
              borderRadius: 10,
              borderRadius: responsiveHeight(1),
              overflow: 'hidden',
            }}>
            {/* <Image style={{width: '100%'}} source={Images.map} /> */}
            <MapView
              //  scrollEnabled={false}
              scrollEnabled
              style={{flex: 1}}
              initialRegion={{
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.longitude,
                latitudeDelta: 0.0952,
                longitudeDelta: 0.0451,
              }}>
              <MapViewDirections
                origin={currentLocation}
                strokeColor="red"
                strokeWidth={4}
                destination={destination}
                apikey={Apikey}
              />
            </MapView>
          </View>
        )}

        <Hr />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 25,
              color: Color.themeColor,
              fontWeight: 'bold',
            }}>
            $185.60
          </Text>

          <Button
            color={Color.themeColor}
            txtColor={Color.white}
            handleOnPress={() => {
              userType === 'Rider'
                ? startDeliveryHandler()
                : userType === 'Subscriber'
                ? setModalVisible(true)
                : null;
            }}
            title={
              isLoading ? (
                <ActivityIndicator size="large" color={Color.white} />
              ) : userType === 'Subscriber' ? (
                'Proceed With him'
              ) : userType === 'Rider' ? (
                'Start Delivery'
              ) : (
                'Order Complete'
              )
            }
            height={responsiveHeight(6)}
            width={responsiveWidth(30)}
            fontWeight={'light'}
            fontSize={16}
            styleName={'viewDetails'}
          />
        </View>
        {userType === 'Subscriber' && (
          <SubscriptionModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
      </View>
    </View>
  );
};

export default CompletedOrders;
