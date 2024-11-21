import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../Components/Header';
import EditProHeader from '../../Components/EditProHeader';
import SearchHeader from '../../Components/SearchHeader';
import {Color} from '../../assets/Utils';
import Entypo from 'react-native-vector-icons/Entypo';
import SvgIcons from '../../Components/SvgIcons';
import {category1, clock, Location, location, rider} from '../../assets/icons';
import Hr from '../../Components/Hr';
import ViewOrder from '../../Components/ViewOrder';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/Slices';
import PendingOrders from '../../Components/PendingOrders';
import axios from 'axios';
import {baseUrl} from '../../baseUrl';
import {getAllBookedProductsHandler} from '../../GlobalFunctionns';
import { responsiveHeight } from '../../assets/Responsive_Dimensions';
import CompletedOrders from '../../Components/CompletedOrders';

const Order = ({navigation}) => {
  const {token} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const getAllBookedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllBookedProductsHandler(token);
      setIsLoading(false);
       console.log('res',response)
      setData(response.userId);
    } catch (error) {
      setIsLoading(false);

      console.log('error', error);
    }
  };
  useEffect(() => {
    getAllBookedProducts();
    console.log('data======>', data);
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        flexGrow: 1,
        backgroundColor: Color.white,
      }}>
      <SearchHeader handlePress={() => navigation.navigate('UserProfile')} />
      <Text style={styles.header}>
        Hello <Text style={{fontWeight: 'bold'}}>John</Text>
      </Text>
      <Text style={styles.text1}>Your Todays Orders</Text>

      {/* <View
        style={[
          styles.elevation,
          {
            backgroundColor: Color.white,
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            marginTop: 20,
          },
        ]}>
        <Text style={{fontSize: 24, color: Color.black, fontWeight: '400'}}>
          John Doe
        </Text>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
          <View
            style={{
              backgroundColor: Color.themeColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 17,
              borderTopRightRadius: 17,
              borderBottomLeftRadius: 17,
              height: 45,
              width: 50,
            }}>
            <SvgIcons xml={category1} height={'30'} width={'30'} />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: Color.black, fontSize: 15}}>Items</Text>
            <Text
              style={{
                color: '#C5C5C5',
                fontSize: 12,
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
              borderTopLeftRadius: 17,
              borderTopRightRadius: 17,
              borderBottomRightRadius: 17,
              height: 45,
              width: 48,
            }}>
            <SvgIcons xml={clock} height={'30'} width={'30'} />
          </View>
          <View style={{flex: 1}}>
            <Text style={{color: Color.black, fontSize: 15}}>
              Time Duration:
            </Text>
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
        <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
          <View
            style={{
              backgroundColor: Color.themeColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 17,
              borderTopRightRadius: 17,
              borderBottomLeftRadius: 17,
              width: 48,
              width: 50,
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
        <Hr marginVertical={20} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{color: Color.themeColor, fontSize: 25, fontWeight: 'bold'}}>
            $185.60
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Color.themeColor,
              padding: 8,
              width: 120,
              borderRadius: 10,
              borderBottomRightRadius: 0,
            }}>
            <Text style={{color: Color.white, alignSelf: 'center'}}>
              Order Complete
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
   <CompletedOrders/>
      <View style={{flexGrow:1}}>
        {isLoading ? (
          <View style={{flex:1,justifyContent:'center'}}>
          <ActivityIndicator size={'large'} color={Color.black}/>
        </View>
        ):
           data?.map((area, index) => {
            return (
              <PendingOrders
                btnTitle={'View Order'}
                profilePic={area.subscriberId.profilePic}
                userName={area.subscriberId.userName}
                status={area.status}
                totalPrice={area.TotalPrice}
                productName={area.productId.productName}
                chooseCategory={area.productId.chooseCategory}
                navigation={navigation}
                navigationScreen={'OrderDetails'}
                area={area}
                key={index}
              />
            );
          })
        }
     
      </View>
    </ScrollView>
  );
};

export default Order;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: Color.black,
    fontWeight: 'light',
    marginTop: 20,
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text1: {
    fontSize: 15,
    fontWeight: 'light',
    color: Color.black,
  },
});
