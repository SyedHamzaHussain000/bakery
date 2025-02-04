import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import {Color} from '../../assets/Utils';
import {useSelector} from 'react-redux';
import PendingOrders from '../../Components/PendingOrders';
import CompletedOrders from '../../Components/CompletedOrders';
import {
  getAllBookedProductsHandler,
  getAllRoutes,
  getRoutesByRadius,
} from '../../GlobalFunctionns';
import {useIsFocused} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
} from '../../assets/Responsive_Dimensions';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Apikey} from '../../assets/ApiKey';
import moment from 'moment';
import Button from '../../Components/Button';

const Vendors = ({navigation}) => {
  const {token} = useSelector(state => state.user);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const focus = useIsFocused();
  console.log('data', data);
  // const getAllBookedProducts = async () => {
  //   setIsLoading(true);
  //   const response = await getAllBookedProductsHandler(token);
  //   setData(response.userId);
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   if(focus){
  //     getAllBookedProducts();

  //   }
  // }, [focus]);

  // const getAllRoutesHandler = async () => {
  //   setIsLoading(true);
  //   const response = await getAllRoutes(token);
  //   setData(response.data);
  //   setIsLoading(false);
  // };
  const getRoutesByRadiusHandler = async () => {
    setIsLoading(true);
    const response = await getRoutesByRadius(token);
    setData(response.data);
    console.log('data', data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (focus) {
      getRoutesByRadiusHandler();
    }
  }, [focus]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 20,
        backgroundColor: Color.white,
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <Header
        handlePress={() => navigation.navigate('Cart')}
        handleNavigate={() => navigation.navigate('UserProfile')}
      />
      <View style={{padding: 10, flex: 1}}>
        {/* <CompletedOrders /> */}
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={Color.black} />
          </View>
        ) : (
          //  data?.reverse().map((area, index) => {
          //   console.log('area===>>>',area)
          //   return (
          //     <PendingOrders
          //       btnTitle={'View Details'}
          //       profilePic={area.BakeryId?.profilePic}
          //       userName={area.BakeryId?.userName}
          //       status={area?.status}
          //       totalPrice={area?.TotalPrice}
          //       productName={area.productId?.productName}
          //       chooseCategory={area.productId?.chooseCategory}
          //       navigation={navigation}
          //       navigationScreen={'OrderDetails'}
          //       area={area}
          //       key={index}
          //     />
          //   )
          // })
          data?.map((area, index) => {
            return (
              <View
                style={{
                  padding: responsiveHeight(1),
                  backgroundColor: Color.white,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  borderRadius: responsiveHeight(1),
                  shadowRadius: 3.84,
                  margin: responsiveHeight(2),
                  elevation: 5,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    margin: responsiveHeight(1),
                    fontWeight: '500',
                    fontSize: responsiveFontSize(2),
                  }}>
                  {moment(area.startTime).format('h:mm a')}
                </Text>
                {area?.startLocation?.coordinates.length > 1 &&
                area?.endLocation?.coordinates.length > 1 ? (
                  <MapView
                    scrollEnabled
                    style={{flex: 1, height: 200, width: '100%'}} // Ensure map has a defined height
                    initialRegion={{
                      latitude: parseFloat(area.startLocation.coordinates[1]),
                      longitude: parseFloat(area.startLocation.coordinates[0]),
                      latitudeDelta: 0.0952,
                      longitudeDelta: 0.0451,
                    }}>
                    <MapViewDirections
                      origin={{
                        latitude: parseFloat(
                          area?.startLocation?.coordinates[1],
                        ),
                        longitude: parseFloat(
                          area?.startLocation?.coordinates[0],
                        ),
                      }}
                      destination={{
                        latitude: parseFloat(area?.endLocation?.coordinates[1]),
                        longitude: parseFloat(
                          area?.endLocation?.coordinates[0],
                        ),
                      }}
                      strokeColor="red"
                      strokeWidth={4}
                      apikey={Apikey}
                    />
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: area?.startLocation?.coordinates[1],
                        longitude: area?.startLocation?.coordinates[0],
                      }}
                    />
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: area?.endLocation?.coordinates[1],
                        longitude: area?.endLocation?.coordinates[0],
                      }}
                    />
                    {area?.checkPoints?.map(checkpoint => (
                      <Marker
                        pinColor="green"
                        key={index} // Always add a unique key when mapping over an array
                        coordinate={{
                          latitude: checkpoint.coordinates[1],
                          longitude: checkpoint.coordinates[0],
                        }}
                      />
                    ))}
                  </MapView>
                ) : (
                  <ActivityIndicator size="large" color="blue" />
                )}
                <View
                  style={{
                    gap: responsiveHeight(1),
                    marginLeft: responsiveHeight(2),
                    marginTop: responsiveHeight(2),
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: responsiveFontSize(2),
                    }}>
                    <Text style={{fontWeight: '500'}}>From: </Text>
                    {area.startLocationName
                      ? area.startLocationName
                      : 'Abc Start Location '}{' '}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: responsiveFontSize(2),
                    }}>
                    <Text style={{fontWeight: '500'}}>To: </Text>
                    {area.endLocationName
                      ? area.endLocationName
                      : 'Abc End Location '}
                  </Text>
                </View>
                <View style={{width: '100%', margin: responsiveHeight(1.5)}}>
                  <Button
                    handleOnPress={() =>
                      navigation.navigate('ViewRouteDetails', {area})
                    }
                    width={'80%'}
                    alignSelf={'center'}
                    color={Color.themeColor}
                    styleName={'plainButton'}
                    padding={responsiveHeight(1.5)}
                    title={'View Details'}
                  />
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};
export default Vendors;
