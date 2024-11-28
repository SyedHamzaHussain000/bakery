import {View, Text, Image} from 'react-native';
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
import {responsiveHeight} from '../assets/Responsive_Dimensions';
const CompletedOrders = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {userType} = useSelector(state => state.user);
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
          Dave Miller
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
              Mary Gold Café & Bakery:
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
              Sour Dough - Baggette - Cuban Bread
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
                : '6am - 7am, 8am - 9am, 10am - 11am'}
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
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0952,
                longitudeDelta: 0.0451,
              }}
            />
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
                ? navigation.navigate('OrderStatus')
                : userType === 'Subscriber'
                ? setModalVisible(true)
                : null;
            }}
            title={
              userType === 'Subscriber'
                ? 'Proceed With him'
                : userType === 'Rider'
                ? 'Start Delivery'
                : 'Order Complete'
            }
            width={'auto'}
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
