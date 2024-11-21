import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Button from '../../Components/Button';
import {Color} from '../../assets/Utils';
import {clearProducts, clearToken, clearUserData} from '../../redux/Slices';
import {useDispatch, useSelector} from 'react-redux';
import Hr from '../../Components/Hr';
import {logout} from '../../assets/icons';
import Categories from '../../Components/Categories';
import PlainHeader from '../../Components/PlainHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import {baseUrl} from '../../baseUrl';
import { Images } from '../../assets';
const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const {user, userType} = useSelector(state => state.user);
  const userdata = useSelector(state => state.user.userData)
  console.log('user.profilePic============>>>>>>', user.profilePic);
  return (
    <View style={{flex: 1, padding: 20}}>
      <PlainHeader
        iconSize={25}
        fntSize={22}
        fntWeight={600}
        handlePress={() => navigation.goBack()}
        text={'Profile'}
      />
      <View>
        <View
          style={{
            borderColor: 'gray',
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}>
          <Image
            style={{
              height: responsiveHeight(12),
              width: responsiveWidth(25),
              borderRadius: responsiveHeight(8),
              backgroundColor: 'lightgray',
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 3,
            }}
            
           source={user.profilePic ? {uri: `${baseUrl}user/${user.profilePic}`} : Images.dummyPic} 
          />
          <View style={{justifyContent: 'space-around'}}>
            <View>
              <Text
                style={{
                  color: Color.black,
                  fontSize: responsiveFontSize(2),
                  fontWeight: 'bold',
                }}>
                {user.length > 0 ?  user.userName : userdata.userName}
              </Text>
              <Text
                style={{color: Color.black, fontSize: responsiveFontSize(1.8)}}>
                {user.length > 0 ? user.email : userdata.email}
              </Text>
            </View>
            <Button
              styleName={'editProfile'}
              width={responsiveWidth(35)}
              handleOnPress={() => navigation.navigate('EditProfile')}
              fontWeight={'light'}
              color={Color.themeColor}
              title={'Edit Profile'}
            />
          </View>
        </View>
      </View>

      <View style={{marginTop: responsiveHeight(4)}}>
        <TouchableOpacity onPress={() => navigation.navigate('BookedProducts')}>
          <Categories vector={true} xml={logout} text={'Booked Products'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Categories vector={true} xml={logout} text={'Favourites'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: responsiveHeight(2)}}>
          <Categories vector={true} xml={logout} text={'Downloads'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Categories vector={true} xml={logout} text={'Subscription'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearToken());
            dispatch(clearUserData());
          }}>
          <Categories vector={true} xml={logout} text={'Logout'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
