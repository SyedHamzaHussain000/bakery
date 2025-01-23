import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchHeader from '../../Components/SearchHeader';
import { Color } from '../../assets/Utils';
import Button from '../../Components/Button';
import Modal from 'react-native-modal';
import CompletedOrders from '../../Components/CompletedOrders';
import { acceptOrderHandler, completedOrdersHandler, getAllAcceptedBookings, getAllReadyBookingHandler, orderReadyHandler, rejectOrderHandler } from '../../GlobalFunctionns';
import { useSelector } from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import { useIsFocused } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ShowToast } from '../../GlobalFunctionns/ShowToast';
import Card from '../../Components/Card';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const Bakeries = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { token, userData } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false)
  const [pendingLoading, setPendingLoading] = useState(false)
  const [rejectLoading, setRejectLoading] = useState(false)
  const [acceptedOrders, setAcceptedOrders] = useState([])
  const [reLoadApi, setReloadApi] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false);
  const [orderCategory, setOrderCategory] = useState('Start');
  const focus = useIsFocused();
  const [data, setData] = useState([]);
  const [productDetails, setProductDetails] = useState();
  const orderData = {
    bookingId: productDetails?.bookingId,
    riderId: userData?._id,
    type: 'Rider',
    riderStatus: 'Accepted',
    orderStatus: 'Ready'
  }
  const [activeCategory, setActiveCategory] = useState('Completed')
  console.log('productDetailsy', productDetails)
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

  ])

  const getCompletedOrders = async () => {
    setPendingLoading(true)
    setAcceptedOrders([])

    try {
      const res = await completedOrdersHandler(token)
      setPendingLoading(false)
      console.log('ress completed orders<<<<<<<<<<<<<', res)
      setData(res.data)
    } catch (error) {
      setPendingLoading(false)
      console.log('error', error)
    }
  }


  const getAllAcceptedHandler = async () => {
    setPendingLoading(true)

    try {
      const res = await getAllAcceptedBookings(token)
      setData([])
      setAcceptedOrders(res.data)
      console.log('dataa', data)
      setPendingLoading(false)

    } catch (error) {
      setPendingLoading(false)

      console.log('error', error)
    }
  }

  const getReadyBookings = async () => {
    setPendingLoading(true)
    setAcceptedOrders([])
    try {
      const res = await getAllReadyBookingHandler(token);
      setData(res.data.data);
      setPendingLoading(false)
    } catch (error) {
      setPendingLoading(false)
      console.log('Error:', error); // Check for errors
    }
  };
  useEffect(() => {
    console.log('dataaaa', data)

    if (activeCategory === 'Accepted') {
      getAllAcceptedHandler();
    } else if (activeCategory === 'Pending') {
      getReadyBookings();
    } else {
      getCompletedOrders()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, reLoadApi]);

  // getAllAcceptedHandler()
  // getReadyBookings();

  const acceptOrder = async () => {
    setIsLoading(true)
    try {
      const response = await acceptOrderHandler(orderData)
      setIsLoading(false)
      console.log('res', response.data.sucess)
      if (response.data.sucess) {
        setModalVisible(false)
        setReloadApi(!reLoadApi)
        return ShowToast('success', response.data.msg)
      } else {
        return ShowToast('error', response.data.msg)
      }
    } catch (error) {
      setIsLoading(false)
      console.log('error accept', error)
    }
  }
  const rejectOrder = async () => {
    setRejectLoading(true)
    try {
      const response = await rejectOrderHandler(orderData)
      setRejectLoading(false)

      if (response.data.sucess) {
        setModalVisible(false)
        setReloadApi(!reLoadApi)
        return ShowToast('success', response.data.msg)
      } else {
        return ShowToast('error', response.data.msg)
      }
    } catch (error) {
      setRejectLoading(false)
      console.log('error====reject<<<<<<<<<<<<<<', error)
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        backgroundColor: Color.white,
        flexGrow: 1,
      }}>

      <SearchHeader />
      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>

          <Text style={{ fontSize: 22, fontWeight: '400', color: Color.black }}>
            Hello{' '}
            <Text style={{ color: Color.black, fontWeight: 'bold', fontSize: 22 }}>
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
            <Text style={{ color: Color.themeColor, fontSize: 15 }}>
              Status
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
              }}
            >
              {statusData?.map((area, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(area?.category)}
                    key={index} // Ensure a unique key for each element
                    style={[
                      styles.rideType,
                      {
                        backgroundColor:
                          activeCategory === area?.category ? Color.themeColor : null,
                        borderBottomWidth: 1,
                        padding: responsiveHeight(0.3),
                        borderBottomLeftRadius: activeCategory === 'Pending' ? 5 : null,
                        borderBottomRightRadius: activeCategory === 'Pending' ? 5 : null,
                        borderBottomColor: Color.themeColor,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          activeCategory === area?.category ? Color.white : Color.black,
                      }}
                    >
                      {area?.category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}

        </View>
      </View>

      <View style={{ flex: 1 }}>
        {acceptedOrders?.map((area, index) => {
          return (
            <CompletedOrders key={index} navigation={navigation} data={area} />
          );
        })}

        {pendingLoading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size={'large'} color={Color.black} />
          </View>
        ) :
          data?.map((area, index) => {
            return (
              <Card handlePress={() => {
                setModalVisible(!modalVisible)
                setProductDetails(area)
              }} area={area} type={activeCategory} />
            );
          })
        }
        {


        }
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
              style={{ alignSelf: 'flex-end' }}>
              <Entypo name="circle-with-cross" color="black" size={30} />
            </TouchableOpacity>
            <View style={{ marginBottom: 20, gap: responsiveHeight(1) }}>
              <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '800', alignSelf: 'center', marginBottom: 10 }}>Product Details</Text>
              <Image style={{ height: responsiveHeight(16.3), aspectRatio: 1.75, width: '100%', alignSelf: 'center', borderRadius: 10, resizeMode: 'stretch' }} source={{ uri: `https://appsdemo.pro/Bakery/api/Bakery/${activeCategory === 'Pending' ? productDetails?.productImage : productDetails?.productId?.productImage}` }} />

              <View>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '800' }}>Product Name:</Text>

                <Text style={{ fontSize: responsiveFontSize(1.8), color: 'black', fontWeight: '600' }}>{activeCategory === 'Pending' ? productDetails?.productName : productDetails?.productId?.productName}</Text>
              </View>
              <View>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '800' }}>Client Name:</Text>

                <Text style={{ fontSize: responsiveFontSize(1.8), color: 'black', fontWeight: '600' }}>{productDetails?.subcbriberName}</Text>
              </View>
              <View>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '800' }}>Bakery Name:</Text>

                <Text style={{ fontSize: responsiveFontSize(1.8), color: 'black', fontWeight: '600' }}>{activeCategory === 'Pending' ? productDetails?.bakeryName : productDetails?.BakeryId?.bakeryName}</Text>
              </View>
              <View>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '800' }}>Business Hours:</Text>

                <Text style={{ fontSize: responsiveFontSize(1.8), color: 'black', fontWeight: '600' }}>{activeCategory === 'Pending' ? productDetails?.businessHours : productDetails?.BakeryId?.businessHours}</Text>
              </View>
              <View>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '800' }}>Order Status:</Text>

                <Text style={{ fontSize: responsiveFontSize(1.8), color: 'black', fontWeight: '600' }}>{productDetails?.orderStatus}</Text>
              </View>
            </View>
            {activeCategory === 'Pending' && (
              <View style={{ alignItems: 'center', gap: 15 }}>
                <Button
                  color={Color.themeColor}
                  txtColor={Color.white}
                  title={isLoading ? (<ActivityIndicator size={'large'} color={Color.white} />) : 'Accept'}
                  handleOnPress={acceptOrder}
                  height={responsiveHeight(5.5)}
                  width={'100%'}
                  fontWeight={'bold'}
                  fontSize={18}
                  styleName={'plainButton'}
                />
                <Button
                  color={Color.themeColor}
                  txtColor={Color.white}
                  title={rejectLoading ? (<ActivityIndicator size={'large'} color={Color.white} />) : 'Reject'}
                  height={responsiveHeight(5.5)}
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
