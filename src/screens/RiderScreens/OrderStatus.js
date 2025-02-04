import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SvgIcons from '../../Components/SvgIcons';
import {clock, rider} from '../../assets/icons';
import {Color} from '../../assets/Utils';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import {responsiveHeight} from '../../assets/Responsive_Dimensions';
import MapView from 'react-native-maps';
import {
  getCurrentLocationHandler,
  riderStatusHandler,
} from '../../GlobalFunctionns';
import {useSelector} from 'react-redux';
import {PickImage} from '../../GlobalFunctionns/ImagePicker';
import MapViewDirections from 'react-native-maps-directions';
import {Apikey} from '../../assets/ApiKey';
const OrderStatus = ({navigation, route}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [orderCategory, setOrderCategory] = useState('Start');
  const {token} = useSelector(state => state.user);
  const [pickupOrder, setPickupOrder] = useState(false);
  const {data, currentLocation, pickup} = route.params;
  const [deliveryLocation, setDeliveryLocation] = useState();
  const destination = {
    latitude: deliveryLocation?.[1], // Latitude at index 1
    longitude: deliveryLocation?.[0], // Longitude at index 0
  };
  console.log('destination', destination);
  const currentOrigin = {
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
  };
  console.log('currentLocation==========<<<<<<<<<<<< ', currentLocation);
  console.log('pickup==========<<<<<<<<<<<< ', pickup);
  const pickOrderHandler = async () => {
    try {
      const res = await riderStatusHandler(data?._id, 'Pick', token);
      setPickupOrder(true);
      setDeliveryLocation(res.data.deliveryLocation.coordinates);
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (orderCategory === 'Pick') {
      pickOrderHandler();
    }
  }, [orderCategory]);

  const takePictureHandler = async () => {
    const response = await PickImage();
    console.log('pathhh', response);
    if (response.path) {
      navigation.navigate('Gallery', {response, data});
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20,
        backgroundColor: Color.white,
      }}>
      {/* <Image source={Images.map3} /> */}
      <MapView
        //  scrollEnabled={false}
        scrollEnabled
        style={{height: responsiveHeight(43)}}
        initialRegion={{
          latitude: currentOrigin?.latitude,
          longitude: currentOrigin?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <MapViewDirections
          origin={pickupOrder ? pickup : currentOrigin}
          strokeColor="red"
          strokeWidth={4}
          destination={pickupOrder ? destination : pickup}
          apikey={Apikey}
        />
      </MapView>
      <View
        style={{
          backgroundColor: Color.white,
          margin: 20,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Text style={{fontSize: 24, color: Color.black, fontWeight: '500'}}>
          {data.BakeryId.userName}
        </Text>
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
            <Text style={{color: Color.black, fontSize: 18}}>
              {data.BakeryId.bakeryName}:
            </Text>
            <Text
              style={{
                color: '#C5C5C5',
                fontSize: 16,
                width: '100%',
                flexWrap: 'wrap',
                marginTop: 5,
              }}>
              {data.productId.productName} - {data.productId.flavor} -{' '}
              {data.productId.chooseCategory}
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
            <Text style={{color: Color.black, fontSize: 18}}>Time:</Text>
            <Text
              style={{
                color: '#C5C5C5',
                fontSize: 16,
                width: '100%',
                flexWrap: 'wrap',
                marginTop: 5,
              }}>
              23 mins away
            </Text>
          </View>
        </View>

        <Text style={{color: Color.black, marginTop: 20, fontSize: 18}}>
          Order Status
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={[style.textStyle, {color: Color.themeColor}]}>
            Start
          </Text>
          <Text style={style.textStyle}>Pick</Text>
          <Text style={style.textStyle}>Drop</Text>
        </View>
        {/* <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
      <View style={{padding:2,height:18,width:18,borderRadius:9,justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:Color.themeColor}}>
        <View style={{backgroundColor:Color.themeColor,height:8,width:8,borderRadius:4}}></View>
      </View>
     <View style={{backgroundColor:'#D4D4D4',height:5,flex:1}}></View>
      </View> */}
        <View style={{width: '100%', marginTop: 10}}>
          <Progress.Bar
            borderColor="lightgray"
            height={4}
            progress={
              orderCategory === 'Start' ? 0 : orderCategory === 'Pick' ? 0.5 : 1
            }
            color={Color.themeColor}
            unfilledColor="#D4D4D4"
            width={null}
          />
        </View>

        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                fontSize: 30,
                color: Color.themeColor,
                fontWeight: 'bold',
              }}>
              $185.60
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                marginTop: 10,
                alignItems: 'center',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 15,
                borderWidth: 1.2,
                borderColor: Color.themeColor,
                width: 120,
                padding: 12,
              }}>
              <Text style={{color: Color.themeColor}}>Ongoing</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setShowDropDown(!showDropDown)}
              style={{
                flexDirection: 'row',
                gap: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1.2,
                borderColor: Color.themeColor,
                height: 45,
                width: 140,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 25,
                borderTopLeftRadius: 25,
              }}>
              <Text style={{color: Color.themeColor, fontSize: 15}}>
                Order Status
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={Color.themeColor}
              />
            </TouchableOpacity>
            {showDropDown ? (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Color.themeColor,
                  marginTop: 3,
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => setOrderCategory('Start')}
                  style={[
                    style.rideType,
                    {
                      borderTopLeftRadius: 7,
                      borderTopRightRadius: 7,
                      backgroundColor:
                        orderCategory === 'Start' ? Color.themeColor : null,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.themeColor,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        orderCategory === 'Start' ? Color.white : Color.black,
                    }}>
                    Start
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOrderCategory('Pick')}
                  style={[
                    style.rideType,
                    {
                      backgroundColor:
                        orderCategory === 'Pick' ? Color.themeColor : null,
                      borderBottomWidth: 1,
                      borderBottomColor: Color.themeColor,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        orderCategory === 'Pick' ? Color.white : Color.black,
                    }}>
                    Pick
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowDropDown(false);
                    setOrderCategory('Drop');
                  }}
                  style={[
                    style.rideType,
                    {
                      backgroundColor:
                        orderCategory === 'Drop' ? Color.themeColor : null,
                      borderBottomLeftRadius: 5,
                      borderBottomRightRadius: 5,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        orderCategory === 'Drop' ? Color.white : Color.black,
                    }}>
                    Drop
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 20}}>
        {orderCategory === 'Drop' ? (
          <Button
            handleOnPress={() => takePictureHandler()}
            VectorIcon={Ionicons}
            padding={responsiveHeight(1.9)}
            iconSize={25}
            styleName={'plainButton'}
            iconName={'camera-outline'}
            color={Color.themeColor}
            title={'Take a Picture'}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default OrderStatus;

const style = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    color: Color.black,
  },
  rideType: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
