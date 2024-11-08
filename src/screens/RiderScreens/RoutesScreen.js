import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import PlainHeader from '../../Components/PlainHeader';
import {Images} from '../../assets';
import {Color} from '../../assets/Utils';
import Categories from '../../Components/Categories';
import Hr from '../../Components/Hr';
import {
  language,
  location,
  logout,
  order,
  subscription,
} from '../../assets/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {clearToken} from '../../redux/Slices';

const RoutesScreen = ({navigation}) => {
  console.log('edit rider');
  const dispatch = useDispatch();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 20, flexGrow: 1}}>
      <PlainHeader
        handlePress={() => navigation.goBack()}
        text={'My Profile'}
      />
      {/* <Text>RoutesScreen</Text> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginLeft: 15,
          marginTop: 30,
        }}>
        <View>
          <Image source={Images.profile3} />
        </View>
        <View>
          <Text style={{fontSize: 20, color: Color.black, fontWeight: 'bold'}}>
            Dave <Text style={{fontWeight: '300'}}> Miller</Text>
          </Text>
          <Text style={{color: Color.black, fontSize: 13}}>
            davemiller21276@gmail.com
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              backgroundColor: Color.themeColor,
              width: 95,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 4,
              marginTop: 15,
            }}>
            <Text style={{color: Color.white}}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <TouchableOpacity>
          <Categories xml={order} text={'Order History'} />
          <Hr marginVertical={20} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Categories xml={language} text={'Language'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Categories xml={location} text={'Location'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Categories xml={subscription} text={'Subscription'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(clearToken())}>
          <Categories vector={true} xml={logout} text={'Logout'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: Color.themeColor,
          flexDirection: 'row',
          marginTop: 30,
          alignItems: 'center',
          borderRadius: 10,
          height: 90,
          paddingVertical: 5,
        }}>
        <View style={{paddingHorizontal: 15}}>
          <Text style={style.textStyle}>Routes</Text>
          <Text style={style.textStyle}>Maps</Text>
        </View>
        <Image
          style={{borderRadius: 10, flex: 1}}
          resizeMode="contain"
          source={Images.mapSmall}
        />
      </View>

      <TouchableOpacity
      onPress={()=>navigation.navigate('RoadWay')}
        style={{
          backgroundColor: Color.themeColor,
          flexDirection: 'row',
          marginTop: 30,
          alignItems: 'center',
          borderRadius: 10,
          height: 90,
          paddingVertical: 5,
        }}>
        <View style={{paddingHorizontal: 15}}>
          <Text style={style.textStyle}>Setup</Text>
          <Text style={style.textStyle}>Routes</Text>
        </View>
        <Image
          style={{borderRadius: 10, flex: 1}}
          resizeMode="contain"
          source={Images.mapSmall}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RoutesScreen;
const style = StyleSheet.create({
  textStyle: {
    color: Color.white,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
