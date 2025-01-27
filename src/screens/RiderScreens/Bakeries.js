import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchHeader from '../../Components/SearchHeader';
import {Color} from '../../assets/Utils';
import Button from '../../Components/Button';
import Modal from 'react-native-modal';
import CompletedOrders from '../../Components/CompletedOrders';
import {
  acceptOrderHandler,
  completedOrdersHandler,
  getAllAcceptedBookings,
  getAllReadyBookingHandler,
  getCurrentLocationHandler,
  orderReadyHandler,
  rejectOrderHandler,
} from '../../GlobalFunctionns';
import {useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import Card from '../../Components/Card';
import {Apikey} from '../../assets/ApiKey';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const Bakeries = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {token, userData} = useSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.421998333333335,
    location:
      'Google Building 43, 43 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
    longitude: -122.084,
  });
  console.log('current Location', currentLocation);
  const [reLoadApi, setReloadApi] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const focus = useIsFocused();
  const [data, setData] = useState([]);
  const [productDetails, setProductDetails] = useState();
  const [emptyData, setEmptyData] = useState('');
  const orderData = {
    bookingId: productDetails?.bookingId,
    riderId: userData?._id,
    type: 'Rider',
    riderStatus: 'Accepted',
    orderStatus: 'Ready',
  };
  const [activeCategory, setActiveCategory] = useState('Completed');
  console.log('productDetails=====>>>>', productDetails);
  const origin = {
    latitude: productDetails?.Location?.coordinates[1],
    longitude: productDetails?.Location?.coordinates[0],
  };
  const destination = {
    latitude: Number(productDetails?.subscriberLocation?.coordinates[1]),
    longitude: Number(productDetails?.subscriberLocation?.coordinates[0]),
  };

  console.log('origin', origin);
  console.log('destination', destination);
  const [statusData, setStatusData] = useState([
    {
      id: 1,
      category: 'Completed',
    },
    {
      id: 2,
      category: 'Accepted',
    },
    {
      id: 3,
      category: 'Pending',
    },
  ]);

  const getCurrentLocation = async () => {
    try {
      const response = await getCurrentLocationHandler();
      setCurrentLocation(response);
    } catch (error) {
      console.log('error', error.message);
    }
    // finally{
    //   console.log('first')
    // }
  };
  const getCompletedOrders = async () => {
    setPendingLoading(true);
    setAcceptedOrders([]);
    setEmptyData('');

    try {
      const res = await completedOrdersHandler(token);
      setPendingLoading(false);
      console.log('ress completed orders<<<<<<<<<<<<<', res);
      setData(res.data);
      if (res.data.length < 1) {
        setEmptyData('No Completed Orders To Show');
      }
    } catch (error) {
      setPendingLoading(false);
      console.log('error', error);
    }
  };

  const getAllAcceptedHandler = async () => {
    setPendingLoading(true);
    setEmptyData('');

    try {
      const res = await getAllAcceptedBookings(token);
      setData([]);
      setAcceptedOrders(res.data);
      // setNewData(res.data);
      // console.log('response of  orders', res.data);
      // console.log('response of accepted orders', newData);

      // if (res.data.length < 1) {
      //   setEmptyData('No Accepted Orders To Show');
      // }
      setPendingLoading(false);
    } catch (error) {
      setPendingLoading(false);

      console.log('error', error);
    }
  };

  const getReadyBookings = async () => {
    setPendingLoading(true);
    setAcceptedOrders([]);
    setEmptyData('');

    try {
      const res = await getAllReadyBookingHandler(token);
      setData(res.data.data);
      if (res.data.length < 1) {
        setEmptyData('No Pending Orders To Show');
      }
      setPendingLoading(false);
    } catch (error) {
      setPendingLoading(false);
      console.log('Error:', error); // Check for errors
    }
  };
  useEffect(() => {
    console.log('dataaaa', data);

    if (activeCategory === 'Accepted') {
      getAllAcceptedHandler();
    } else if (activeCategory === 'Pending') {
      getReadyBookings();
    } else {
      getCompletedOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, reLoadApi]);

  // getAllAcceptedHandler()
  // getReadyBookings();

  const acceptOrder = async () => {
    setIsLoading(true);
    try {
      const response = await acceptOrderHandler(orderData);
      setIsLoading(false);
      console.log('res', response.data.sucess);
      if (response.data.sucess) {
        setModalVisible(false);
        setReloadApi(!reLoadApi);
        return ShowToast('success', response.data.msg);
      } else {
        return ShowToast('error', response.data.msg);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error accept', error);
    }
  };
  const rejectOrder = async () => {
    setRejectLoading(true);
    try {
      const response = await rejectOrderHandler(orderData);
      setRejectLoading(false);

      if (response.data.sucess) {
        setModalVisible(false);
        setReloadApi(!reLoadApi);
        return ShowToast('success', response.data.msg);
      } else {
        return ShowToast('error', response.data.msg);
      }
    } catch (error) {
      setRejectLoading(false);
      console.log('error====reject<<<<<<<<<<<<<<', error);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        backgroundColor: Color.white,
        flexGrow: 1,
      }}>
      <SearchHeader handleSearchPress={() => getCurrentLocation()} />
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 22, fontWeight: '400', color: Color.black}}>
            Hello{' '}
            <Text
              style={{color: Color.black, fontWeight: 'bold', fontSize: 22}}>
              {userData.userName},
            </Text>
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 15,
              color: Color.black,
              fontWeight: '400',
            }}>
            Your Todays Job
          </Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              setShowDropDown(!showDropDown);
            }}
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
            <Text style={{color: Color.themeColor, fontSize: 15}}>Status</Text>
            <Ionicons name="chevron-down" size={20} color={Color.themeColor} />
          </TouchableOpacity>
          {showDropDown ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: Color.themeColor,
                marginTop: 3,
                borderRadius: 10,
              }}>
              {statusData?.map((area, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(area?.category)}
                    key={index} // Ensure a unique key for each element
                    style={[
                      styles.rideType,
                      {
                        backgroundColor:
                          activeCategory === area?.category
                            ? Color.themeColor
                            : null,
                        borderBottomWidth: 1,
                        padding: responsiveHeight(0.3),
                        borderBottomLeftRadius:
                          activeCategory === 'Pending' ? 5 : null,
                        borderBottomRightRadius:
                          activeCategory === 'Pending' ? 5 : null,
                        borderBottomColor: Color.themeColor,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          activeCategory === area?.category
                            ? Color.white
                            : Color.black,
                      }}>
                      {area?.category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
      </View>

      <View style={{flex: 1}}>
        {acceptedOrders?.map(area => {
          return (
            <CompletedOrders
              navigation={navigation}
              data={area}
              startLoc={currentLocation}
            />
          );
        })}

        {pendingLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={Color.black} />
          </View>
        ) : (
          data?.map((area, index) => {
            return (
              <Card
                handlePress={() => {
                  setModalVisible(!modalVisible);
                  setProductDetails(area);
                }}
                area={area}
                type={activeCategory}
              />
            );
          })
        )}
        {emptyData && (
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#A9A9A9',
              marginTop: responsiveHeight(3),
            }}>
            {emptyData}
          </Text>
        )}
      </View>
      <View>
        <Modal
          animationInTiming={600}
          animationOutTiming={600}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          onBackdropPress={() => setModalVisible(!modalVisible)}
          isVisible={modalVisible}
          style={{
            margin: 0, // Removes default margin
            justifyContent: 'center', // Centers the modal vertically
            alignItems: 'center', // Centers the modal horizontally
          }}>
          <View
            style={{
              backgroundColor: Color.white,
              // height: 300, // Set your desired height here
              width: responsiveWidth(85), // Set your desired width here
              borderRadius: 10, // Optional: adds rounded corners
              padding: 20, // Optional: adds inner padding
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{alignSelf: 'flex-end'}}>
              <Entypo name="circle-with-cross" color="black" size={30} />
            </TouchableOpacity>
            <View style={{marginBottom: 20, gap: responsiveHeight(1)}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: '800',
                  alignSelf: 'center',
                  marginBottom: 10,
                }}>
                Product Details
              </Text>
              {activeCategory == 'Pending' ? (
                <View
                  style={{
                    height: responsiveHeight(20),
                    width: '100%',
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}>
                  <MapView
                    scrollEnabled
                    style={{
                      flex: 1,
                    }}
                    initialRegion={{
                      latitude: origin.latitude,
                      longitude: origin.longitude,
                      latitudeDelta: 0.1, // Adjust to zoom out (this will show a city-sized area)
                      longitudeDelta: 0.1,
                    }}>
                    <MapViewDirections
                      origin={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                      }}
                      strokeColor="red"
                      strokeWidth={6}
                      destination={{
                        latitude: destination.latitude, // Ensure different coordinates
                        longitude: destination.longitude,
                      }}
                      apikey={Apikey}
                    />
                  </MapView>
                </View>
              ) : (
                <Image
                  style={{
                    height: responsiveHeight(16.3),
                    aspectRatio: 1.75,
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 10,
                    resizeMode: 'stretch',
                  }}
                  source={{
                    uri: `https://appsdemo.pro/Bakery/api/Bakery/${
                      activeCategory === 'Pending'
                        ? productDetails?.productImage
                        : productDetails?.productId?.productImage
                    }`,
                  }}
                />
              )}

              <View>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: '800'}}>
                  Product Name:
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {activeCategory === 'Pending'
                    ? productDetails?.productName
                    : productDetails?.productId?.productName}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: '800'}}>
                  {activeCategory === 'Pending'
                    ? 'Client Name:'
                    : 'Delivered To:'}
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {activeCategory === 'Pending'
                    ? productDetails?.subcbriberName
                    : productDetails?.subscriberId?.userName}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: '800'}}>
                  Bakery Name:
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {activeCategory === 'Pending'
                    ? productDetails?.bakeryName
                    : productDetails?.BakeryId?.bakeryName}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: '800'}}>
                  Business Hours:
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {activeCategory === 'Pending'
                    ? productDetails?.businessHours
                    : productDetails?.BakeryId?.businessHours}
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: responsiveFontSize(2), fontWeight: '800'}}>
                  Order Status:
                </Text>

                <Text
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {productDetails?.orderStatus}
                </Text>
              </View>
            </View>
            {activeCategory === 'Pending' && (
              <View style={{alignItems: 'center', gap: 15}}>
                <Button
                  color={Color.themeColor}
                  txtColor={Color.white}
                  title={
                    isLoading ? (
                      <ActivityIndicator size={'large'} color={Color.white} />
                    ) : (
                      'Accept'
                    )
                  }
                  handleOnPress={acceptOrder}
                  // height={responsiveHeight(5.5)}
                  padding={responsiveHeight(1.5)}
                  width={'100%'}
                  fontWeight={'bold'}
                  fontSize={18}
                  styleName={'plainButton'}
                />
                <Button
                  color={Color.themeColor}
                  txtColor={Color.white}
                  title={
                    rejectLoading ? (
                      <ActivityIndicator size={'large'} color={Color.white} />
                    ) : (
                      'Reject'
                    )
                  }
                  padding={responsiveHeight(1.5)}
                  handleOnPress={rejectOrder}
                  width={'100%'}
                  fontWeight={'bold'}
                  fontSize={18}
                  styleName={'plainButton'}
                />
              </View>
            )}
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Bakeries;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Color.themeColor,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 13,
  },
  textStyle: {
    fontSize: 16,
    color: Color.black,
  },
  rideType: {
    justifyContent: 'center',
    alignItems: 'center',
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
  container: {
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
