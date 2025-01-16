import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../assets';
import SvgIcons from './SvgIcons';
import {cart} from '../assets/icons';
import {Color} from '../assets/Utils';
import {styles} from '../Styles';
import {
  responsiveHeight,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import { useSelector } from 'react-redux';
import { baseUrl } from '../baseUrl';

const Header = ({handlePress, handleNavigate, products}) => {
  const {userData} = useSelector(state => state.user)
  console.log('carts', cart);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableOpacity
          onPress={handleNavigate}
          style={{
            borderRadius: 15,
            backgroundColor: Color.white,
          }}>
          <Image
            style={{
              height: 72,
              width: 72,
              backgroundColor: 'red',
              borderRadius:12,
              resizeMode: 'cover',
            }}
            source={userData?.profilePic ? {uri: `${baseUrl}user/${userData.profilePic}`} : Images.user} 
          />
        </TouchableOpacity>
        <Text style={styles.extraLargeBlack}>{userData.userName}</Text>
      </View>

        {products ? (
          <TouchableOpacity onPress={handlePress}>
            <View style={{zIndex: 10}}>
              <View
                style={{
                  backgroundColor: 'red',
                  height: responsiveHeight(1.7),
                  width: responsiveWidth(3.5),
                  borderRadius: responsiveHeight(2),
                  position: 'absolute',
                  zIndex: 10,
                  left: responsiveWidth(5.8),
                }}></View>
            </View>
            <View style={{zIndex: 5}}>
              <SvgIcons height={'30'} width={'35'} xml={cart} />
            </View>
          </TouchableOpacity>
        ) : (
      <TouchableOpacity onPress={handlePress}>

          <SvgIcons height={'30'} width={'35'} xml={cart} />
      </TouchableOpacity>

        )}
    </View>
  );
};

export default Header;
