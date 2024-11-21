import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Header from '../../Components/Header';
import {Color} from '../../assets/Utils';
import {Images} from '../../assets';
import SvgIcons from '../../Components/SvgIcons';
import {clock, masterCard, rider} from '../../assets/icons';
import Hr from '../../Components/Hr';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../Components/Input';
import Modal from 'react-native-modal';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/Slices';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import {baseUrl} from '../../baseUrl';
import axios from 'axios';
import PendingOrders from '../../Components/PendingOrders';
import {styles} from '../../Styles';
import CompletedOrders from '../../Components/CompletedOrders';
const Vendors = ({navigation}) => {
  const {token} = useSelector(state => state.user);
  const [data, setData] = useState();
  const getAllBookedProducts = () => {
    let data = '';

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}subscriber/GetAllMyBookingProducts`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setData(response.data.userId);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllBookedProducts();
  }, []);

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
      <View style={{padding: 10}}>
        <CompletedOrders />
        {data?.map((area, index) => {
          return (
            <PendingOrders
            btnTitle={'View Details'}
              profilePic={area.BakeryId.profilePic}
              userName={area.BakeryId.userName}
              status={area.status}
              totalPrice={area.TotalPrice}
              productName={area.productId.productName}
              chooseCategory={area.productId.chooseCategory}
              navigation={navigation}
              navigationScreen={'OrderProductDetails'}
              area={area}
              key={index}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
export default Vendors;
